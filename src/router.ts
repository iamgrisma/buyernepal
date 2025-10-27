import { Hono } from 'hono';
import { AppEnv } from './index'; // Import the type from index.ts
import { handleGetProducts } from './handlers/products';
import { handleLogin, handleRegister, handleLogout, handleGetCurrentUser } from './handlers/auth';
import { // <<< ENSURE THIS IMPORT BLOCK IS COMPLETE
    handleAdminGetProducts,
    handleAdminGetProductById,
    handleAdminCreateProduct, // <<< Make sure this is imported
    handleAdminCreateProductAction,
    handleAdminUpdateProduct, // <<< Make sure this is imported
    handleAdminUpdateProductAction,
    handleAdminDeleteProduct
} from './handlers/admin_products.ts'; // Corrected path
import { // <<< ENSURE THIS IMPORT BLOCK IS COMPLETE
    handleAdminGetReferSlugs,
    handleAdminCreateReferSlug, // <<< Make sure this is imported
    handleAdminCreateReferSlugAction,
    handleAdminUpdateReferSlug, // <<< Make sure this is imported
    handleAdminUpdateReferSlugAction,
    handleAdminDeleteReferSlug
} from './handlers/refer_slugs.ts';
import { handleReferRedirect } from './handlers/redirect'; // Public redirect handler
import { requireAdmin } from './utils/auth'; // Auth middleware
// --- IMPORTS FOR MISSING FILES ADDED EARLIER ---
import {
    handleAdminGetCategories,
    handleAdminCreateCategory, handleAdminCreateCategoryAction, // <<< Make sure these are imported
    handleAdminUpdateCategory, handleAdminUpdateCategoryAction, // <<< Make sure these are imported
    handleAdminDeleteCategory
} from './handlers/admin_categories.ts';
import { handleGetCategories, handleGetCategoryBySlug } from './handlers/categories.ts';
import {
    handleAdminGetReviews,
    handleAdminCreateReview, handleAdminCreateReviewAction, // <<< Make sure these are imported
    handleAdminUpdateReview, handleAdminUpdateReviewAction, // <<< Make sure these are imported
    handleAdminDeleteReview
} from './handlers/admin_reviews.ts';
import {
    handleAdminGetCoupons,
    handleAdminCreateCoupon, handleAdminCreateCouponAction, // <<< Make sure these are imported
    handleAdminUpdateCoupon, handleAdminUpdateCouponAction, // <<< Make sure these are imported
    handleAdminDeleteCoupon
} from './handlers/admin_coupons.ts';
import {
    handleAdminGetSettings,
    handleAdminUpdateSettings, handleAdminUpdateSettingsAction // <<< Make sure these are imported
} from './handlers/admin_settings.ts';
import {
    handleAdminGetScripts,
    handleAdminCreateScript, handleAdminCreateScriptAction, // <<< Make sure these are imported
    handleAdminUpdateScript, handleAdminUpdateScriptAction, // <<< Make sure these are imported
    handleAdminDeleteScript
} from './handlers/admin_scripts.ts';
import { handleAdminGetAnalyticsOverview, handleAdminGetProductAnalytics } from './handlers/admin_analytics.ts';
import { handleSearch, handleSearchAction } from './handlers/search.ts'; // <<< Make sure these are imported
import { handleTrackEvents, handleTrackEventsAction } from './handlers/tracking.ts'; // <<< Make sure these are imported
import { handleDarazPostback } from './handlers/postback.ts';
import { cacheMiddleware } from './utils/cache';

const router = new Hono<AppEnv>();

// --- Public API Routes ---
router.get('/products', cacheMiddleware('products-list'), handleGetProducts);
router.get('/categories', cacheMiddleware('categories-list'), handleGetCategories);
router.get('/categories/:slug', cacheMiddleware('category-detail'), handleGetCategoryBySlug);
router.get('/search', handleSearch, handleSearchAction);
router.post('/events', handleTrackEvents, handleTrackEventsAction);
router.post('/postback/daraz', handleDarazPostback);


// --- Admin Auth Routes ---
router.post('/admin/register', handleRegister);
router.post('/admin/login', handleLogin);
router.post('/admin/logout', handleLogout);
router.get('/admin/me', requireAdmin, handleGetCurrentUser);

// --- Admin CRUD Routes (Protected) ---
const adminApi = new Hono<AppEnv>();
adminApi.use('*', requireAdmin);

// Products (Line 45 referenced in error)
adminApi.get('/products', handleAdminGetProducts);
adminApi.post('/products', handleAdminCreateProduct, handleAdminCreateProductAction); // Uses validator + action
adminApi.get('/products/:id', handleAdminGetProductById);
adminApi.put('/products/:id', handleAdminUpdateProduct, handleAdminUpdateProductAction); // Uses validator + action
adminApi.delete('/products/:id', handleAdminDeleteProduct);

// Categories
adminApi.get('/categories', handleAdminGetCategories);
adminApi.post('/categories', handleAdminCreateCategory, handleAdminCreateCategoryAction);
adminApi.put('/categories/:id', handleAdminUpdateCategory, handleAdminUpdateCategoryAction);
adminApi.delete('/categories/:id', handleAdminDeleteCategory);

// Refer Slugs
adminApi.get('/refer-slugs', handleAdminGetReferSlugs);
adminApi.post('/refer-slugs', handleAdminCreateReferSlug, handleAdminCreateReferSlugAction);
adminApi.put('/refer-slugs/:id', handleAdminUpdateReferSlug, handleAdminUpdateReferSlugAction);
adminApi.delete('/refer-slugs/:id', handleAdminDeleteReferSlug);

// Reviews
adminApi.get('/reviews', handleAdminGetReviews);
adminApi.post('/reviews', handleAdminCreateReview, handleAdminCreateReviewAction);
adminApi.put('/reviews/:id', handleAdminUpdateReview, handleAdminUpdateReviewAction);
adminApi.delete('/reviews/:id', handleAdminDeleteReview);

// Coupons
adminApi.get('/coupons', handleAdminGetCoupons);
adminApi.post('/coupons', handleAdminCreateCoupon, handleAdminCreateCouponAction);
adminApi.put('/coupons/:id', handleAdminUpdateCoupon, handleAdminUpdateCouponAction);
adminApi.delete('/coupons/:id', handleAdminDeleteCoupon);

// Settings
adminApi.get('/settings', handleAdminGetSettings);
adminApi.put('/settings', handleAdminUpdateSettings, handleAdminUpdateSettingsAction);

// Scripts
adminApi.get('/scripts', handleAdminGetScripts);
adminApi.post('/scripts', handleAdminCreateScript, handleAdminCreateScriptAction);
adminApi.put('/scripts/:id', handleAdminUpdateScript, handleAdminUpdateScriptAction);
adminApi.delete('/scripts/:id', handleAdminDeleteScript);

// Analytics (Placeholders)
adminApi.get('/analytics/overview', handleAdminGetAnalyticsOverview);
adminApi.get('/analytics/products/:id', handleAdminGetProductAnalytics);


// Mount the protected admin routes under /api/admin
router.route('/admin', adminApi);


// --- Public Redirect Route ---
// Keep this outside /api if defined at root in index.ts
// router.get('/refer/:slug', handleReferRedirect);


export default router;
