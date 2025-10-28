import { Hono } from 'hono';
import { logger } from 'hono/logger';
import apiRouter from './router'; // Renamed import
import { handleReferRedirect } from './handlers/redirect'; // Import directly if outside /api

// Define the Hono app type based on Cloudflare Worker bindings
export type AppEnv = {
  Bindings: Env & {
      JWT_SECRET: string;
      DARAZ_POSTBACK_SECRET?: string;
      CACHE_KV?: KVNamespace;
  };
  Variables: { // For storing context data like user payload from middleware
      user?: import('./utils/auth').UserPayload;
  }
};

const app = new Hono<AppEnv>();

// Middleware
app.use('*', logger());

// --- Public Routes ---
import { renderLandingPage } from './views/landing';
import { renderProductPage } from './views/product';
import { renderCategoryPage } from './views/category';
import { renderReferralInterstitial } from './views/refer';
import { renderSearchResultsPage } from './views/search';

app.get('/', renderLandingPage);
app.get('/p/:slug', renderProductPage);
app.get('/c/:slug', renderCategoryPage);
app.get('/refer/:slug', handleReferRedirect);
app.get('/r/:slug', renderReferralInterstitial);
app.get('/search', renderSearchResultsPage);

// PWA and SEO files
app.get('/manifest.json', async (c) => {
  const settings = await c.env.DB.prepare("SELECT * FROM site_settings WHERE id = 1").first();
  return c.json({
    name: settings?.site_name || "BuyerNepal",
    short_name: "BuyerNepal",
    description: settings?.tagline || "Honest tech reviews in Nepal",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  });
});

app.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${new URL('/sitemap.xml', c.req.url).href}`);
});

app.get('/sitemap.xml', async (c) => {
  const products = await c.env.DB.prepare("SELECT slug, updated_at FROM products WHERE status = 'active' LIMIT 500").all();
  const categories = await c.env.DB.prepare("SELECT slug, name FROM categories LIMIT 50").all();
  
  const baseUrl = new URL(c.req.url).origin;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>`;
  
  products.results?.forEach((p: any) => {
    xml += `<url><loc>${baseUrl}/p/${p.slug}</loc><lastmod>${p.updated_at}</lastmod><priority>0.8</priority></url>`;
  });
  
  categories.results?.forEach((c: any) => {
    xml += `<url><loc>${baseUrl}/c/${c.slug}</loc><priority>0.6</priority></url>`;
  });
  
  xml += `</urlset>`;
  return c.text(xml, 200, { 'Content-Type': 'application/xml' });
});

// --- API Routes ---
app.route('/api', apiRouter); // Mount the main API router under /api

// Fallback for 404
app.notFound((c) => {
  return c.json({ error: 'Not Found', message: `Route ${c.req.method} ${c.req.path} not found.` }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error(`Unhandled Error [${c.req.method} ${c.req.path}]:`, err);
  // Basic error response
  const statusCode = (err instanceof Error && 'status' in err) ? (err as any).status : 500;
  return c.json({ error: 'Internal Server Error', message: err.message || 'An unexpected error occurred.' }, statusCode || 500);
});

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
