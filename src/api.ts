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

// Live Forex Exchange Rates (from GrismaInfo API with NRB fallback)
let forexCache: { data: any; expiresAt: number } | null = null;

api.get('/forex', async (c) => {
  const now = Date.now();
  if (forexCache && forexCache.expiresAt > now) {
    return c.json({ ...forexCache.data, cached: true });
  }

  // Fallback defaults based on official NRB peg and recent USD rates
  let usdSell = 151.48;
  let usdBuy = 150.88;
  let inrBuy = 160;
  let date = new Date().toISOString().split('T')[0];
  let source = 'fallback';

  // 1. Try GrismaInfo API (user's primary API: https://api.grisma.info.np/api/forex/latest)
  try {
    const res = await fetch('https://api.grisma.info.np/api/forex/latest', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data: any = await res.json();
      if (data && (data.USD_sell || data.USD_buy)) {
        usdSell = Number(data.USD_sell || data.USD_buy || usdSell);
        usdBuy = Number(data.USD_buy || usdBuy);
        inrBuy = Number(data.INR_buy || 160);
        date = String(data.date || date);
        source = 'grismainfo';
      }
    }
  } catch {
    // 2. Secondary fallback: direct NRB API
    try {
      const today = new Date().toISOString().split('T')[0];
      const nrbRes = await fetch(`https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=1&from=${today}&to=${today}`, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(3000)
      });
      if (nrbRes.ok) {
        const nrbData: any = await nrbRes.json();
        const payload = nrbData?.data?.payload?.[0]?.rates;
        if (Array.isArray(payload)) {
          const usdObj = payload.find((r: any) => r?.currency?.iso3 === 'USD');
          const inrObj = payload.find((r: any) => r?.currency?.iso3 === 'INR');
          if (usdObj) {
            usdSell = Number(usdObj.sell || usdSell);
            usdBuy = Number(usdObj.buy || usdBuy);
          }
          if (inrObj) {
            inrBuy = Number(inrObj.buy || 160);
          }
          source = 'nrb_direct';
        }
      }
    } catch {
      // Use fallback defaults
    }
  }

  // Base currency is NPR (Nepali Rupee).
  // INR is pegged: 100 INR = 160 NPR, so 1 INR = 1.6 NPR
  const inrNpr = inrBuy ? inrBuy / 100 : 1.6;
  const result = {
    success: true,
    source,
    date,
    base: 'NPR',
    rates: {
      NPR: 1,
      USD: usdSell, // 1 USD = usdSell NPR
      INR: inrNpr   // 1 INR = 1.6 NPR
    },
    raw: {
      USD_sell: usdSell,
      USD_buy: usdBuy,
      INR_buy: inrBuy
    },
    cached: false,
    timestamp: now
  };

  // Cache in-memory for 30 minutes
  forexCache = { data: result, expiresAt: now + 30 * 60 * 1000 };
  c.header('Cache-Control', 'public, max-age=1800');
  return c.json(result);
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
