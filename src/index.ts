import { Hono } from 'hono';
import { logger } from 'hono/logger';
import apiRouter from './router'; // Renamed import
import { handleReferRedirect } from './handlers/redirect'; // Import directly if outside /api

// Define the Hono app type based on Cloudflare Worker bindings
export type AppEnv = {
  Bindings: Env & {
      JWT_SECRET: string; // Add secrets/vars used
      // Add other bindings like KV, R2 etc. here when needed
  };
  Variables: { // For storing context data like user payload from middleware
      user?: import('./utils/auth').UserPayload;
  }
};

const app = new Hono<AppEnv>();

// Middleware
app.use('*', logger());

// --- Public Routes ---
app.get('/', (c) => c.text('BuyerNepal API Root'));
// If you want /refer/:slug at the root level:
app.get('/refer/:slug', handleReferRedirect);

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
