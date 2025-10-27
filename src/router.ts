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
import { // <<< CORRECT THIS IMPORT BLOCK
    handleAdminGetReferSlugs,
    handleAdminCreateReferSlug, handleAdminCreateReferSlugAction,
    handleAdminUpdateReferSlug, handleAdminUpdateReferSlugAction,
    handleAdminDeleteReferSlug
} from './handlers/refer_slugs.ts'; // <<< ADD .ts EXTENSION HERE
import { handleReferRedirect } from './handlers/redirect'; // Public redirect handler
import { requireAdmin } from './utils/auth'; // Auth middleware

const router = new Hono<AppEnv>();

// --- Public API Routes ---
router.get('/products', handleGetProducts);
// router.get('/products/:slug', handleGetProductBySlug); // Add handler later
// router.get('/categories', handleGetCategories); // Add handler later

// --- Admin Auth Routes ---
router.post('/admin/register', handleRegister);
router.post('/admin/login', handleLogin);
router.post('/admin/logout', handleLogout);
router.get('/admin/me', requireAdmin, handleGetCurrentUser);

// --- Admin CRUD Routes (Protected) ---
const adminApi = new Hono<AppEnv>();
adminApi.use('*', requireAdmin);

// Products
adminApi.get('/products', handleAdminGetProducts);
adminApi.post('/products', handleAdminCreateProduct, handleAdminCreateProductAction);
adminApi.get('/products/:id', handleAdminGetProductById);
adminApi.put('/products/:id', handleAdminUpdateProduct, handleAdminUpdateProductAction);
adminApi.delete('/products/:id', handleAdminDeleteProduct);

// Refer Slugs
adminApi.get('/refer-slugs', handleAdminGetReferSlugs);
adminApi.post('/refer-slugs', handleAdminCreateReferSlug, handleAdminCreateReferSlugAction);
adminApi.get('/refer-slugs/:id', async (c) => c.text('GET /admin/refer-slugs/:id - Not Implemented Yet'));
adminApi.put('/refer-slugs/:id', handleAdminUpdateReferSlug, handleAdminUpdateReferSlugAction);
adminApi.delete('/refer-slugs/:id', handleAdminDeleteReferSlug);

// Mount the protected admin routes under /api/admin
router.route('/admin', adminApi);


// --- Public Redirect Route ---
router.get('/refer/:slug', handleReferRedirect);


export default router;
