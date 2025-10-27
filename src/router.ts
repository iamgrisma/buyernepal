import { Hono } from 'hono';
import { AppEnv } from './index';
import { handleGetProducts } from './handlers/products';
import { handleLogin, handleRegister, handleLogout, handleGetCurrentUser } from './handlers/auth';
import { handleAdminGetProducts, /* ... other product handlers ... */ } from './handlers/admin_products';
import { handleAdminGetReferSlugs, /* ... other slug handlers ... */ } from './handlers/refer_slugs';
import { handleReferRedirect } from './handlers/redirect';
import { requireAdmin } from './utils/auth';
// --- NEW IMPORTS ---
import { handleAdminGetCategories, handleAdminCreateCategory, handleAdminCreateCategoryAction, handleAdminUpdateCategory, handleAdminUpdateCategoryAction, handleAdminDeleteCategory } from './handlers/admin_categories';
import { handleGetCategories, handleGetCategoryBySlug } from './handlers/categories';
import { handleAdminGetReviews, handleAdminCreateReview, handleAdminCreateReviewAction, handleAdminUpdateReview, handleAdminUpdateReviewAction, handleAdminDeleteReview } from './handlers/admin_reviews';
import { handleAdminGetCoupons, handleAdminCreateCoupon, handleAdminCreateCouponAction, handleAdminUpdateCoupon, handleAdminUpdateCouponAction, handleAdminDeleteCoupon } from './handlers/admin_coupons';
import { handleAdminGetSettings, handleAdminUpdateSettings, handleAdminUpdateSettingsAction } from './handlers/admin_settings';
import { handleAdminGetScripts, handleAdminCreateScript, handleAdminCreateScriptAction, handleAdminUpdateScript, handleAdminUpdateScriptAction, handleAdminDeleteScript } from './handlers/admin_scripts';
import { handleAdminGetAnalyticsOverview, handleAdminGetProductAnalytics } from './handlers/admin_analytics';
import { handleSearch, handleSearchAction } from './handlers/search';
import { handleTrackEvents, handleTrackEventsAction } from './handlers/tracking';
import { handleDarazPostback } from './handlers/postback';
import { cacheMiddleware } from './utils/cache'; // Optional cache middleware

const router = new Hono<AppEnv>();

// --- Public API Routes ---
router.get('/products', cacheMiddleware('products-list'), handleGetProducts); // Example caching
router.get('/categories', cacheMiddleware('categories-list'), handleGetCategories);
router.get('/categories/:slug', cacheMiddleware('category-detail'), handleGetCategoryBySlug);
router.get('/search', handleSearch, handleSearchAction);
router.post('/events', handleTrackEvents, handleTrackEventsAction); // Tracking endpoint
router.post('/postback/daraz', handleDarazPostback); // Postback endpoint (needs secret protection)


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


// --- Public Redirect Route (if separate from /api) ---
// router.get('/refer/:slug', handleReferRedirect); // Already handled in index.ts if at root


export default router;
