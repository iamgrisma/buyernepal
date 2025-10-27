import { Hono } from 'hono';
import { AppEnv } from './index'; // Import the type from index.ts
import { handleGetProducts } from './handlers/products';
import { handleLogin, handleRegister, handleLogout, handleGetCurrentUser } from './handlers/auth';
import {
    handleAdminGetProducts,
    handleAdminGetProductById,
    handleAdminCreateProduct, handleAdminCreateProductAction,
    handleAdminUpdateProduct, handleAdminUpdateProductAction,
    handleAdminDeleteProduct
} from './handlers/admin_products';
import {
    handleAdminGetReferSlugs,
    handleAdminCreateReferSlug, handleAdminCreateReferSlugAction,
    handleAdminUpdateReferSlug, handleAdminUpdateReferSlugAction,
    handleAdminDeleteReferSlug
} from './handlers/refer_slugs';
import { handleReferRedirect } from './handlers/redirect'; // Public redirect handler
import { requireAdmin } from './utils/auth'; // Auth middleware

const router = new Hono<AppEnv>();

// --- Public API Routes ---
router.get('/products', handleGetProducts);
// router.get('/products/:slug', handleGetProductBySlug); // Add handler later
// router.get('/categories', handleGetCategories); // Add handler later

// --- Admin Auth Routes ---
// Note: Register might need tighter control in production
router.post('/admin/register', handleRegister); // Example: Keep accessible for initial setup maybe? Or restrict.
router.post('/admin/login', handleLogin);
router.post('/admin/logout', handleLogout); // Doesn't strictly need auth, but good practice
router.get('/admin/me', requireAdmin, handleGetCurrentUser); // Protected route

// --- Admin CRUD Routes (Protected) ---
const adminApi = new Hono<AppEnv>();
adminApi.use('*', requireAdmin); // Apply admin check to all routes in this group

// Products
adminApi.get('/products', handleAdminGetProducts);
adminApi.post('/products', handleAdminCreateProduct, handleAdminCreateProductAction); // Uses validator middleware
adminApi.get('/products/:id', handleAdminGetProductById);
adminApi.put('/products/:id', handleAdminUpdateProduct, handleAdminUpdateProductAction); // Uses validator middleware
adminApi.delete('/products/:id', handleAdminDeleteProduct);
// TODO: Add Product Offers routes here e.g., POST /products/:productId/offers etc.

// Refer Slugs
adminApi.get('/refer-slugs', handleAdminGetReferSlugs);
adminApi.post('/refer-slugs', handleAdminCreateReferSlug, handleAdminCreateReferSlugAction);
adminApi.get('/refer-slugs/:id', async (c) => c.text('GET /admin/refer-slugs/:id - Not Implemented Yet')); // Placeholder
adminApi.put('/refer-slugs/:id', handleAdminUpdateReferSlug, handleAdminUpdateReferSlugAction);
adminApi.delete('/refer-slugs/:id', handleAdminDeleteReferSlug);


// TODO: Add other admin routes (Categories, Reviews, Coupons, Settings, Scripts)

// Mount the protected admin routes under /api/admin
router.route('/admin', adminApi);


// --- Public Redirect Route ---
// Place this outside the /api prefix if you want top-level /refer/slug URLs
// For now, keeping it consistent under /api for simplicity. Adjust if needed.
router.get('/refer/:slug', handleReferRedirect);


export default router;
