import { Hono } from 'hono';
import { logger } from 'hono/logger';
import router from './router'; // We will create this next

// Define the Hono app type based on Cloudflare Worker bindings
export type AppEnv = {
  Bindings: Env; // Assuming Env is defined in worker-configuration.d.ts via wrangler types
};

const app = new Hono<AppEnv>();

// Middleware
app.use('*', logger());

// Simple root handler for testing
app.get('/', (c) => c.text('BuyerNepal API Root'));

// Mount the main router
app.route('/api', router); // All API routes will be under /api

// Fallback for 404
app.notFound((c) => {
  return c.json({ error: 'Not Found', message: `Route ${c.req.method} ${c.req.path} not found.` }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error('Unhandled Error:', err);
  // Basic error response, might want more detail based on environment
  return c.json({ error: 'Internal Server Error', message: err.message || 'An unexpected error occurred.' }, 500);
});

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
