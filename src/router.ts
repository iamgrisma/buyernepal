import { Hono } from 'hono';
import { AppEnv } from './index'; // Import the type from index.ts
import { handleGetProducts } from './handlers/products'; // Example handler

const router = new Hono<AppEnv>();

// Define routes here
router.get('/products', handleGetProducts);
// router.get('/products/:slug', handleGetProductBySlug);
// router.get('/categories', handleGetCategories);
// router.get('/refer/:code', handleReferral);
// ... Add other routes for search, admin, etc.

export default router;
