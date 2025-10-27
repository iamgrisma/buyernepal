import { sign, verify } from 'hono/jwt';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import { Context } from 'hono';
import { AppEnv } from '../index'; // Adjust path if necessary

const JWT_SECRET_KEY = 'JWT_SECRET'; // Key for wrangler secrets
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface UserPayload {
  userId: number;
  username: string;
  role: string;
  exp?: number; // Added automatically by hono/jwt
  iat?: number; // Added automatically by hono/jwt
}

// Function to create a JWT session token
export async function createSessionToken(c: Context<AppEnv>, payload: Omit<UserPayload, 'exp' | 'iat'>): Promise<string> {
  const secret = c.env.JWT_SECRET; // Fetch secret from environment
  if (!secret) {
      console.error('JWT_SECRET is not configured in Cloudflare Worker secrets.');
      throw new Error('Authentication configuration error.');
  }
  const token = await sign({ ...payload, exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS }, secret);
  return token;
}

// Function to set the session cookie
export function setSessionCookie(c: Context<AppEnv>, token: string): void {
  setCookie(c, 'auth_session', token, {
    path: '/',
    secure: true, // Only send over HTTPS
    httpOnly: true, // Prevent client-side JS access
    maxAge: SESSION_DURATION_SECONDS,
    sameSite: 'Lax', // Protects against CSRF in most cases
  });
}

// Function to get the session token from the cookie
export function getSessionToken(c: Context<AppEnv>): string | undefined {
  return getCookie(c, 'auth_session');
}

// Function to verify the session token and return the payload
export async function verifySessionToken(c: Context<AppEnv>, token: string): Promise<UserPayload | null> {
    const secret = c.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET is not configured.');
        return null;
    }
  try {
    const payload = await verify(token, secret);
    return payload as UserPayload; // Assuming verify throws on invalid/expired
  } catch (error) {
    console.warn("JWT verification failed:", error);
    return null;
  }
}

// Function to delete the session cookie
export function deleteSessionCookie(c: Context<AppEnv>): void {
  deleteCookie(c, 'auth_session', {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'Lax',
  });
}

// Middleware to protect routes (example)
export const requireAdmin = async (c: Context<AppEnv>, next: Function) => {
    const token = getSessionToken(c);
    if (!token) {
        return c.json({ error: 'Unauthorized', message: 'Missing session token' }, 401);
    }

    const payload = await verifySessionToken(c, token);
    if (!payload || payload.role !== 'admin') {
        return c.json({ error: 'Forbidden', message: 'Admin privileges required' }, 403);
    }

    // Optionally attach user payload to context for downstream handlers
    c.set('user', payload);

    await next();
};
