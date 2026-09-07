import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env } from './types';
import { getSettings, getCategories, getCategoryBySlug, getProducts, getProductById, getReviews, getAdminStats } from './db';
import { getSession, createSession, clearSession, passwordHash, safeEqual } from './auth';
import { HomePage } from './views/home';
import { CategoryPage } from './views/category';
import { ProductPage } from './views/product';
import { AdminLoginView, AdminDashboardView } from './views/admin';
import { api } from './api';

const app = new Hono<{ Bindings: Env }>();

// Security and CORS middleware
app.use('*', cors());
app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

// Mount REST API
app.route('/api', api);

// SEO: robots.txt
app.get('/robots.txt', (c) => {
  return c.text(
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin\nSitemap: https://buyernepal.pages.dev/sitemap.xml\n`
  );
});

// SEO: dynamic sitemap.xml for Google/Bing indexing
app.get('/sitemap.xml', async (c) => {
  const categories = await getCategories(c.env?.DB);
  const products = await getProducts(c.env?.DB);
  const urls = [
    'https://buyernepal.pages.dev/',
    ...categories.map((cat) => `https://buyernepal.pages.dev/category/${cat.slug}`),
    ...products.map((prod) => `https://buyernepal.pages.dev/product/${prod.id}`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;
  return c.text(xml, 200, { 'Content-Type': 'application/xml; charset=utf-8' });
});

// SSR: Storefront Home
app.get('/', async (c) => {
  const [settings, categories, products] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProducts(c.env?.DB)
  ]);
  return c.html(<HomePage settings={settings} categories={categories} products={products} />);
});

// SSR: Category Page
app.get('/category/:slug', async (c) => {
  const slug = c.req.param('slug');
  const [settings, categories, category] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getCategoryBySlug(c.env?.DB, slug)
  ]);

  if (!category) {
    return c.redirect('/');
  }

  const products = await getProducts(c.env?.DB, category.id);
  return c.html(
    <CategoryPage settings={settings} categories={categories} category={category} products={products} />
  );
});

// SSR: Product Detail Page
app.get('/product/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (!id) return c.redirect('/');

  const [settings, categories, product] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProductById(c.env?.DB, id)
  ]);

  if (!product) {
    return c.redirect('/');
  }

  const reviews = await getReviews(c.env?.DB, id);
  return c.html(
    <ProductPage settings={settings} categories={categories} product={product} reviews={reviews} />
  );
});

// SSR: Admin Login Form
app.get('/admin/login', async (c) => {
  const s = await getSession(c);
  if (s && s.role === 'admin') return c.redirect('/admin');
  return c.html(<AdminLoginView />);
});

// Form POST: Admin Login
app.post('/admin/login', async (c) => {
  let username = '';
  let password = '';
  try {
    const body = await c.req.parseBody();
    username = String(body['username'] || '').trim();
    password = String(body['password'] || '');
  } catch {
    return c.html(<AdminLoginView error="Invalid form submission" />);
  }

  const db = c.env?.DB;
  if (!db) {
    // Default bootstrap admin if DB is not yet attached
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      await createSession(c, 1);
      return c.redirect('/admin');
    }
    return c.html(<AdminLoginView error="Invalid username or password" />);
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

    if (!u || !u.is_active || u.role !== 'admin') {
      return c.html(<AdminLoginView error="Invalid administrator credentials" />);
    }

    const h = await passwordHash(password, u.password_salt);
    if (!safeEqual(h.hash, u.password_hash)) {
      return c.html(<AdminLoginView error="Invalid administrator credentials" />);
    }

    await createSession(c, u.id);
    return c.redirect('/admin');
  } catch {
    return c.html(<AdminLoginView error="Login service temporarily unavailable" />);
  }
});

// SSR: Admin Dashboard
app.get('/admin', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') {
    return c.redirect('/admin/login');
  }

  const [settings, categories, products, stats] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProducts(c.env?.DB),
    getAdminStats(c.env?.DB)
  ]);

  return c.html(
    <AdminDashboardView
      user={{ username: s.username, email: s.email }}
      stats={stats}
      products={products}
      categories={categories}
      settings={settings}
    />
  );
});

// Export Hono app for Cloudflare Workers / Pages
export default app;
