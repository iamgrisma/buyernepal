import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { hashPassword, verifyPassword, generateSalt } from '../utils/crypto';
import { createSessionToken, setSessionCookie, deleteSessionCookie, verifySessionToken, getSessionToken, UserPayload } from '../utils/auth';
import { AppEnv } from '../index'; // Adjust path

const LoginSchema = z.object({
  usernameOrEmail: z.string().min(1),
  password: z.string().min(1),
});

const RegisterSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
});

// --- LOGIN ---
export const handleLogin = async (c: Context<AppEnv>) => {
  const body = await c.req.json();
  const validation = LoginSchema.safeParse(body);

  if (!validation.success) {
    return c.json({ error: 'Invalid input', details: validation.error.errors }, 400);
  }

  const { usernameOrEmail, password } = validation.data;

  try {
    const isEmail = usernameOrEmail.includes('@');
    const query = isEmail
      ? "SELECT id, username, email, password_hash, role FROM users WHERE email = ?1 LIMIT 1"
      : "SELECT id, username, email, password_hash, role FROM users WHERE username = ?1 LIMIT 1";

    const user = await c.env.DB.prepare(query).bind(usernameOrEmail).first<{
        id: number;
        username: string;
        email: string;
        password_hash: string;
        role: string;
      }>();

    if (!user) {
      return c.json({ error: 'Unauthorized', message: 'Invalid credentials' }, 401);
    }

    const passwordMatch = await verifyPassword(password, user.password_hash);

    if (!passwordMatch) {
      return c.json({ error: 'Unauthorized', message: 'Invalid credentials' }, 401);
    }

    // Generate JWT and set cookie
    const tokenPayload: Omit<UserPayload, 'exp' | 'iat'> = {
        userId: user.id,
        username: user.username,
        role: user.role
    };
    const token = await createSessionToken(c, tokenPayload);
    setSessionCookie(c, token);

    return c.json({ success: true, user: { id: user.id, username: user.username, email: user.email, role: user.role } });

  } catch (e: any) {
    console.error("Login error:", e);
    return c.json({ error: 'Internal Server Error', message: e.message }, 500);
  }
};

// --- REGISTER (Basic example, adjust roles/permissions as needed) ---
export const handleRegister = async (c: Context<AppEnv>) => {
    // !! IMPORTANT: In a real app, registration should be restricted or require approval for admins !!
    // This is a basic example.
    const body = await c.req.json();
    const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
        return c.json({ error: 'Invalid input', details: validation.error.errors }, 400);
    }

    const { username, email, password } = validation.data;

    try {
        // Check if user already exists
        const existingUser = await c.env.DB.prepare("SELECT id FROM users WHERE username = ?1 OR email = ?2 LIMIT 1")
            .bind(username, email)
            .first();

        if (existingUser) {
            return c.json({ error: 'Conflict', message: 'Username or email already exists' }, 409);
        }

        const salt = generateSalt();
        const passwordHash = await hashPassword(password, salt);

        // For simplicity, make the first registered user an admin, others users.
        // A better approach would be manual admin creation or invitation system.
        const userCountResult = await c.env.DB.prepare("SELECT COUNT(*) as count FROM users").first<{ count: number }>();
        const role = (userCountResult?.count ?? 0) === 0 ? 'admin' : 'user';

        const { success, meta } = await c.env.DB.prepare(
            "INSERT INTO users (username, email, password_hash, role) VALUES (?1, ?2, ?3, ?4)"
        ).bind(username, email, passwordHash, role).run();

        if (!success) {
            throw new Error("Failed to insert user into database.");
        }

        const userId = meta?.last_row_id;
        if (!userId) {
            throw new Error("Failed to get inserted user ID.");
        }

        return c.json({ success: true, user: { id: userId, username, email, role } }, 201);

    } catch (e: any) {
        console.error("Registration error:", e);
        // Check for unique constraint error (though the check above should mostly prevent this)
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ error: 'Conflict', message: 'Username or email already exists' }, 409);
        }
        return c.json({ error: 'Internal Server Error', message: e.message }, 500);
    }
};


// --- LOGOUT ---
export const handleLogout = async (c: Context<AppEnv>) => {
  deleteSessionCookie(c);
  return c.json({ success: true, message: 'Logged out successfully' });
};

// --- GET CURRENT USER (ME) ---
export const handleGetCurrentUser = async (c: Context<AppEnv>) => {
    // This handler assumes requireAdmin or similar middleware has run
    const userPayload = c.get('user') as UserPayload | undefined;

    if (!userPayload) {
         // Fallback if middleware didn't run or failed, though middleware should handle unauthorized
        const token = getSessionToken(c);
        if (!token) {
            return c.json({ error: 'Unauthorized', message: 'Not logged in' }, 401);
        }
        const verifiedPayload = await verifySessionToken(c, token);
        if (!verifiedPayload) {
            deleteSessionCookie(c); // Clean up invalid cookie
            return c.json({ error: 'Unauthorized', message: 'Invalid or expired session' }, 401);
        }
         return c.json({ success: true, user: verifiedPayload });
    }

    return c.json({ success: true, user: userPayload });
};
