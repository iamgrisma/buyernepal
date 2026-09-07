import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { Context } from 'hono';
import { Env, Session } from './types';

const PBKDF2_ITERATIONS = 120000;
const SESSION_DAYS = 7;

export async function digest(v: string) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v)))]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}

function hexBytes(v: string) {
  const a = new Uint8Array(v.length / 2);
  for (let i = 0; i < a.length; i++) a[i] = parseInt(v.slice(i * 2, i * 2 + 2), 16);
  return a;
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function passwordHash(password: string, saltHex?: string) {
  const salt = saltHex ? hexBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits'
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256
  );
  return {
    salt: [...salt].map((x) => x.toString(16).padStart(2, '0')).join(''),
    hash: [...new Uint8Array(bits)].map((x) => x.toString(16).padStart(2, '0')).join('')
  };
}

export async function getSession(c: Context<{ Bindings: Env }>): Promise<Session | null> {
  const token = getCookie(c, 'bn_session');
  if (!token || token.length < 32) return null;
  const db = c.env?.DB;
  if (!db) return null;

  try {
    const tokenHash = await digest(token);
    const s = await db
      .prepare(
        `SELECT s.user_id, s.expires_at, u.username, u.email, u.is_active, COALESCE(r.role, 'user') role
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         LEFT JOIN user_roles r ON r.user_id = u.id
         WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = 1
         LIMIT 1`
      )
      .bind(tokenHash)
      .first<Session>();
    return s || null;
  } catch {
    return null;
  }
}

export async function createSession(c: Context<{ Bindings: Env }>, userId: number): Promise<string> {
  const token = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '');
  const db = c.env?.DB;
  if (db) {
    try {
      await db.prepare('DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP').run();
      await db
        .prepare(
          `INSERT INTO sessions(user_id, token_hash, csrf_token, expires_at)
           VALUES(?, ?, ?, datetime('now', '+${SESSION_DAYS} days'))`
        )
        .bind(userId, await digest(token), crypto.randomUUID().replaceAll('-', ''))
        .run();
    } catch (e) {
      console.error('Session creation error:', e);
    }
  }

  setCookie(c, 'bn_session', token, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: SESSION_DAYS * 86400
  });

  return token;
}

export function clearSession(c: Context) {
  deleteCookie(c, 'bn_session', { path: '/' });
}
