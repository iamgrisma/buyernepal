import { Hono } from 'hono';
import { Env } from './types';
import {
  getSettings,
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductById,
  getReviews,
  getAdminStats
} from './db';
import { getSession, createSession, clearSession, passwordHash, safeEqual } from './auth';

export const api = new Hono<{ Bindings: Env }>();

// Public Storefront APIs
api.get('/settings', async (c) => {
  const settings = await getSettings(c.env?.DB);
  return c.json({ settings });
});

api.get('/categories', async (c) => {
  const categories = await getCategories(c.env?.DB);
  return c.json({ categories });
});

api.get('/categories/:slug', async (c) => {
  const slug = c.req.param('slug');
  const category = await getCategoryBySlug(c.env?.DB, slug);
  if (!category) return c.json({ error: 'Category not found' }, 404);
  const products = await getProducts(c.env?.DB, category.id);
  return c.json({ category, products });
});

api.get('/products', async (c) => {
  const products = await getProducts(c.env?.DB);
  return c.json({ products });
});

api.get('/products/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (!id) return c.json({ error: 'Invalid product id' }, 400);
  const product = await getProductById(c.env?.DB, id);
  if (!product) return c.json({ error: 'Product not found' }, 404);
  const reviews = await getReviews(c.env?.DB, id);
  return c.json({ product, reviews });
});

// Authentication APIs
api.post('/auth/login', async (c) => {
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
  const username = String(body.username || '').trim();
  const password = String(body.password || '');

  if (!username || !password) {
    return c.json({ error: 'Username and password required' }, 400);
  }

  const db = c.env?.DB;
  if (!db) {
    // Demo admin login if DB not yet connected
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      return c.json({ ok: true, user: { id: 1, username: 'admin', email: 'admin@buyernepal.com', role: 'admin' } });
    }
    return c.json({ error: 'Invalid username or password' }, 401);
  }

  try {
    const u = await db
      .prepare(
        `SELECT u.*, COALESCE(r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON r.user_id = u.id
         WHERE u.username = ? COLLATE NOCASE LIMIT 1`
      )
      .bind(username)
      .first<any>();

    if (!u || !u.is_active) {
      return c.json({ error: 'Invalid username or password' }, 401);
    }

    const h = await passwordHash(password, u.password_salt);
    if (!safeEqual(h.hash, u.password_hash)) {
      return c.json({ error: 'Invalid username or password' }, 401);
    }

    await createSession(c, u.id);
    return c.json({ ok: true, user: { id: u.id, username: u.username, email: u.email, role: u.role } });
  } catch (e) {
    console.error('Login error:', e);
    return c.json({ error: 'Login service temporarily unavailable' }, 500);
  }
});

api.get('/auth/me', async (c) => {
  const s = await getSession(c);
  if (!s) return c.json({ error: 'Not authenticated' }, 401);
  return c.json({ user: { id: s.user_id, username: s.username, email: s.email, role: s.role } });
});

api.post('/auth/logout', (c) => {
  clearSession(c);
  return c.redirect('/admin/login');
});

// Admin Analytics API
api.get('/admin/analytics/stats', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.json({ error: 'Unauthorized' }, 403);
  const stats = await getAdminStats(c.env?.DB);
  return c.json({ stats });
});

// Admin Products API
api.get('/admin/products', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.json({ error: 'Unauthorized' }, 403);
  const products = await getProducts(c.env?.DB);
  return c.json({ products });
});

api.post('/admin/products', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.json({ error: 'Unauthorized' }, 403);
  const db = c.env?.DB;
  if (!db) return c.json({ error: 'Database not connected' }, 503);

  const i = await c.req.json();
  const name = String(i.name || '').trim();
  const price = Number(i.price);
  if (!name || isNaN(price) || price < 0) return c.json({ error: 'Invalid product data' }, 400);

  const r = await db
    .prepare(
      `INSERT INTO products(name, description, price, image_url, affiliate_url, category_id, is_active)
       VALUES(?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      name,
      String(i.description || ''),
      price,
      String(i.image_url || ''),
      String(i.affiliate_url || ''),
      i.category_id ? Number(i.category_id) : null,
      i.is_active ? 1 : 0
    )
    .run();

  return c.json({ id: r.meta.last_row_id }, 201);
});
