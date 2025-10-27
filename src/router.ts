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
} from './handlers/admin_products';
import {
    handleAdminGetReferSlugs,
    handleAdminCreateReferSlug,
    handleAdminCreateReferSlugAction,
    handleAdminUpdateReferSlug,
    handleAdminUpdateReferSlugAction,
    handleAdminDeleteReferSlug
} from './handlers/refer_slugs';
import { handleReferRedirect } from './handlers/redirect'; // Public redirect handler
import { requireAdmin } from './utils/auth'; // Auth middleware
// --- IMPORTS FOR MISSING FILES ADDED EARLIER ---
import {
    handleAdminGetCategories,
    handleAdminCreateCategory, handleAdminCreateCategoryAction, // <<< Make sure these are imported
    handleAdminUpdateCategory, handleAdminUpdateCategoryAction, // <<< Make sure these are imported
    handleAdminDeleteCategory
} from './handlers/admin_categories';
import { handleGetCategories, handleGetCategoryBySlug } from './handlers/categories';
import {
    handleAdminGetReviews,
    handleAdminCreateReview, handleAdminCreateReviewAction,
    handleAdminUpdateReview, handleAdminUpdateReviewAction,
    handleAdminDeleteReview
} from './handlers/admin_reviews';
import {
    handleAdminGetCoupons,
    handleAdminCreateCoupon, handleAdminCreateCouponAction,
    handleAdminUpdateCoupon, handleAdminUpdateCouponAction,
    handleAdminDeleteCoupon
} from './handlers/admin_coupons';
import {
    handleAdminGetSettings,
    handleAdminUpdateSettings, handleAdminUpdateSettingsAction
} from './handlers/admin_settings';
import {
    handleAdminGetScripts,
    handleAdminCreateScript, handleAdminCreateScriptAction,
    handleAdminUpdateScript, handleAdminUpdateScriptAction,
    handleAdminDeleteScript
} from './handlers/admin_scripts';
import { handleAdminGetAnalyticsOverview, handleAdminGetProductAnalytics } from './handlers/admin_analytics';
import { handleSearch, handleSearchAction } from './handlers/search';
import { handleTrackEvents, handleTrackEventsAction } from './handlers/tracking';
import { handleDarazPostback } from './handlers/postback';
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
