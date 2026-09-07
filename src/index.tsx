import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env, Order } from './types';
import {
  getSettings,
  updateSettings,
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  getReviews,
  getAllReviewsAdmin,
  createReview,
  updateReviewStatus,
  deleteReview,
  getUsers,
  createUser,
  toggleUserStatus,
  deleteUser,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAdminStats,
  seedCatalog,
  clearCatalog,
  savePriceAlert,
  getArticles,
  getAllArticlesAdmin,
  getArticleBySlug,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleArticlePublish,
  saveProductScores,
  saveProductVariant,
  deleteProductVariant,
  saveStoreOffer,
  deleteStoreOffer,
  getStores,
  getStoreBySlug,
  getBrands,
  getBrandBySlug,
  createOrder,
  getOrdersAdmin,
  getOrderByIdOrNumber,
  updateOrderStatus,
  recordOutboundClick,
  getOutboundClicksAdmin
} from './db';
import { getSession, createSession, clearSession, passwordHash, safeEqual, digest } from './auth';
import { HomePage } from './views/home';
import { CategoryPage } from './views/category';
import { ProductPage } from './views/product';
import { BlogIndexPage, ArticleDetailPage } from './views/blog';
import { CouponsPage } from './views/coupons';
import { StoresListPage, StoreDetailPage, BrandsListPage, BrandDetailPage } from './views/directory';
import { TrackOrderPage, OrderSuccessPage } from './views/orders';
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

// Mount existing REST API
app.route('/api', api);

// SEO: robots.txt
app.get('/robots.txt', (c) => {
  return c.text(
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin\nSitemap: https://buyernepal.com/sitemap.xml\n`
  );
});

// SEO: dynamic sitemap.xml for Google/Bing indexing
app.get('/sitemap.xml', async (c) => {
  const [categories, products, articles, stores, brands] = await Promise.all([
    getCategories(c.env?.DB),
    getProducts(c.env?.DB),
    getArticles(c.env?.DB, { limit: 100 }),
    getStores(c.env?.DB),
    getBrands(c.env?.DB)
  ]);
  const baseUrl = 'https://buyernepal.com';
  const urls = [
    baseUrl + '/',
    baseUrl + '/blog',
    baseUrl + '/coupons',
    baseUrl + '/stores',
    baseUrl + '/brands',
    baseUrl + '/track-order',
    ...articles.map((art) => `${baseUrl}/blog/${art.slug}`),
    ...categories.map((cat) => `${baseUrl}/category/${cat.slug}`),
    ...products.map((prod) => `${baseUrl}/product/${prod.id}`),
    ...stores.map((s) => `${baseUrl}/store/${s.slug}`),
    ...brands.map((b) => `${baseUrl}/brand/${b.slug}`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;
  return c.text(xml, 200, { 'Content-Type': 'application/xml; charset=utf-8' });
});

// SSR: Storefront Home
app.get('/', async (c) => {
  const [settings, categories, products, coupons] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getProducts(c.env?.DB),
    getCoupons(c.env?.DB)
  ]);
  return c.html(
    <HomePage
      settings={settings}
      categories={categories}
      products={products}
      coupons={coupons}
    />
  );
});

// SSR: Magazine Blog Index
app.get('/blog', async (c) => {
  const categoryQuery = c.req.query('category') || 'All';
  const [settings, categories, articles] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getArticles(c.env?.DB, { category: categoryQuery !== 'All' ? categoryQuery : undefined })
  ]);

  return c.html(
    <BlogIndexPage
      articles={articles}
      settings={settings}
      categories={categories}
      activeCategory={categoryQuery}
    />
  );
});

// SSR: Magazine Article Detail
app.get('/blog/:slug', async (c) => {
  const slug = c.req.param('slug');
  const [settings, categories, article, allArticles, allProducts] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getArticleBySlug(c.env?.DB, slug),
    getArticles(c.env?.DB, { limit: 4 }),
    getProducts(c.env?.DB, undefined, 10)
  ]);

  if (!article) {
    return c.redirect('/blog');
  }

  const related = allArticles.filter((a) => a.id !== article.id);
  const featuredProds = allProducts.slice(0, 2);

  return c.html(
    <ArticleDetailPage
      article={article}
      relatedArticles={related}
      featuredProducts={featuredProds}
      settings={settings}
      categories={categories}
    />
  );
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
    <ProductPage
      settings={settings}
      categories={categories}
      product={product}
      reviews={reviews}
    />
  );
});

// SSR: Coupons & Deals Directory
app.get('/coupons', async (c) => {
  const [settings, categories, coupons] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getCoupons(c.env?.DB)
  ]);
  const activeStore = c.req.query('store') || 'all';
  return c.html(
    <CouponsPage
      coupons={coupons}
      settings={settings}
      categories={categories}
      activeStore={activeStore}
    />
  );
});

// SSR: Verified Stores Directory
app.get('/stores', async (c) => {
  const [settings, categories, stores] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getStores(c.env?.DB)
  ]);
  return c.html(
    <StoresListPage
      stores={stores}
      settings={settings}
      categories={categories}
    />
  );
});

// SSR: Single Store Profile & Deals
app.get('/store/:slug', async (c) => {
  const slug = c.req.param('slug');
  const [settings, categories, store, allProducts] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getStoreBySlug(c.env?.DB, slug),
    getProducts(c.env?.DB, undefined, 40)
  ]);

  if (!store) {
    return c.redirect('/stores');
  }

  const storeKey = store.name.toLowerCase().split(' ')[0];
  const storeProducts = allProducts.filter(
    (p) =>
      (p.store_name && p.store_name.toLowerCase().includes(storeKey)) ||
      (p.store_offers && p.store_offers.some((o) => o.store_name.toLowerCase().includes(storeKey)))
  );

  return c.html(
    <StoreDetailPage
      store={store}
      products={storeProducts.length > 0 ? storeProducts : allProducts.slice(0, 6)}
      settings={settings}
      categories={categories}
    />
  );
});

// SSR: Official Brands Directory
app.get('/brands', async (c) => {
  const [settings, categories, brands] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getBrands(c.env?.DB)
  ]);
  return c.html(
    <BrandsListPage
      brands={brands}
      settings={settings}
      categories={categories}
    />
  );
});

// SSR: Single Brand Profile & Catalog
app.get('/brand/:slug', async (c) => {
  const slug = c.req.param('slug');
  const [settings, categories, brand, allProducts] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB),
    getBrandBySlug(c.env?.DB, slug),
    getProducts(c.env?.DB, undefined, 50)
  ]);

  if (!brand) {
    return c.redirect('/brands');
  }

  const brandProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(brand.name.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(brand.name.toLowerCase()))
  );

  return c.html(
    <BrandDetailPage
      brand={brand}
      products={brandProducts.length > 0 ? brandProducts : allProducts.slice(0, 4)}
      settings={settings}
      categories={categories}
    />
  );
});

// SSR: Live Order Tracking
app.get('/track-order', async (c) => {
  const q = c.req.query('q') || '';
  const [settings, categories] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB)
  ]);

  let order: Order | null = null;
  if (q.trim()) {
    order = await getOrderByIdOrNumber(c.env?.DB, q.trim());
  }

  return c.html(
    <TrackOrderPage
      order={order}
      searchedQuery={q}
      settings={settings}
      categories={categories}
    />
  );
});

// Outbound Cloaked Affiliate Engine (/go/:type/:id)
app.get('/go/:type/:id', async (c) => {
  const type = c.req.param('type');
  const idStr = c.req.param('id');
  const id = Number(idStr);

  let targetUrl = 'https://buyernepal.com';
  let storeName = 'Partner Store';
  let productId: number | undefined = undefined;

  if (type === 'product' && id) {
    const prod = await getProductById(c.env?.DB, id);
    if (prod && prod.affiliate_url) {
      targetUrl = prod.affiliate_url;
      storeName = prod.store_name || 'Daraz';
      productId = prod.id;
    }
  } else if (type === 'coupon' && id) {
    const coupons = await getCoupons(c.env?.DB);
    const coupon = coupons.find((cp) => cp.id === id);
    if (coupon && coupon.store_url) {
      targetUrl = coupon.store_url;
      storeName = coupon.store_name || 'Store';
    }
  } else if (type === 'store' && idStr) {
    const store = await getStoreBySlug(c.env?.DB, idStr);
    if (store && (store.affiliate_url || store.website_url)) {
      targetUrl = store.affiliate_url || store.website_url || 'https://buyernepal.com';
      storeName = store.name;
    }
  }

  try {
    const cf = (c.req.raw as any)?.cf;
    const country = cf?.country || 'NP';
    const userAgent = c.req.header('user-agent') || '';
    const referrer = c.req.header('referer') || '';

    await recordOutboundClick(c.env?.DB, {
      product_id: productId,
      target_type: (['product', 'store_offer', 'coupon'].includes(type) ? type : 'custom') as any,
      store_name: storeName,
      target_url: targetUrl,
      referrer,
      user_agent: userAgent,
      ip_country: country
    });
  } catch {
    // Non-blocking tracking
  }

  return c.redirect(targetUrl, 302);
});

// API: Direct Purchase Order Placement (COD / eSewa)
app.post('/api/orders/create', async (c) => {
  try {
    const body = await c.req.parseBody();
    const productId = Number(body['product_id']);
    const productName = String(body['product_name'] || 'Product').trim();
    const unitPrice = Number(body['product_price'] || 0);
    const quantity = Number(body['quantity'] || 1);
    const totalAmount = unitPrice * quantity;
    const customerName = String(body['customer_name'] || '').trim();
    const customerEmail = String(body['customer_email'] || '').trim();
    const customerPhone = String(body['customer_phone'] || '').trim();
    const shippingAddress = String(body['delivery_address'] || '').trim();
    const city = String(body['city'] || 'Kathmandu').trim();
    const rawPayment = String(body['payment_method'] || 'cod').trim();
    const paymentMethod = (rawPayment === 'fonepay' ? 'fonepay' : rawPayment === 'bank' ? 'bank_transfer' : 'cod') as 'cod' | 'esewa' | 'khalti' | 'fonepay' | 'bank_transfer';
    const productType = String(body['product_type'] || 'physical').trim();
    const notes = String(body['notes'] || '').trim();

    if (!customerName || !customerPhone || !customerEmail) {
      return c.text('Please provide Name, Phone, and Email to complete your order.', 400);
    }

    const orderResult = await createOrder(c.env?.DB, {
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      shipping_address: shippingAddress,
      city: city,
      district: city,
      product_id: productId,
      product_name: productName,
      quantity,
      unit_price: unitPrice,
      total_amount: totalAmount,
      payment_method: paymentMethod,
      delivery_type: productType === 'digital' ? 'digital' : 'physical',
      notes
    });

    if (!orderResult.success) {
      return c.text('Order creation failed: ' + (orderResult.error || 'Unknown error'), 500);
    }

    const [settings, categories] = await Promise.all([
      getSettings(c.env?.DB),
      getCategories(c.env?.DB)
    ]);

    return c.html(
      <OrderSuccessPage
        orderNumber={orderResult.order_number}
        productName={productName}
        totalAmount={totalAmount}
        paymentMethod={paymentMethod}
        isDigital={productType === 'digital'}
        digitalCode={orderResult.digital_code}
        settings={settings}
        categories={categories}
      />
    );
  } catch (err: any) {
    return c.text('Order failed: ' + err?.message, 500);
  }
});

// API: Instant Live Search Autocomplete
app.get('/api/search/live', async (c) => {
  const query = (c.req.query('q') || '').trim().toLowerCase();
  if (!query || query.length < 2) {
    return c.json({ products: [], articles: [], stores: [] });
  }

  const [products, articles, stores] = await Promise.all([
    getProducts(c.env?.DB, undefined, 30),
    getArticles(c.env?.DB, { limit: 20 }),
    getStores(c.env?.DB)
  ]);

  const matchedProducts = products
    .filter((p) => p.name.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query)))
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image_url: p.image_url,
      store_name: p.store_name,
      url: `/product/${p.id}`
    }));

  const matchedArticles = articles
    .filter((a) => a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query))
    .slice(0, 3)
    .map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      cover_image: a.cover_image,
      category: a.category,
      url: `/blog/${a.slug}`
    }));

  const matchedStores = stores
    .filter((s) => s.name.toLowerCase().includes(query) || (s.description && s.description.toLowerCase().includes(query)))
    .slice(0, 3)
    .map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      logo_url: s.logo_url,
      url: `/store/${s.slug}`
    }));

  return c.json({
    products: matchedProducts,
    articles: matchedArticles,
    stores: matchedStores
  });
});

// API: Submit Customer Review
app.post('/api/reviews', async (c) => {
  try {
    const body = await c.req.parseBody();
    const productId = Number(body['product_id']);
    const userName = String(body['user_name'] || '').trim();
    const rating = Number(body['rating'] || 5);
    const comment = String(body['comment'] || '').trim();

    if (!productId || !userName || !comment) {
      return c.json({ success: false, error: 'Product, name, and comment are required.' }, 400);
    }

    const res = await createReview(c.env?.DB, productId, userName, rating, comment);
    return c.json(res);
  } catch (err: any) {
    return c.json({ success: false, error: err?.message || 'Failed to submit review' }, 500);
  }
});

// API: Register Price Drop Alert
app.post('/api/price-alert', async (c) => {
  try {
    const body = await c.req.parseBody();
    const productId = Number(body['product_id']);
    const productName = String(body['product_name'] || '').trim();
    const email = String(body['email'] || '').trim();
    const targetPrice = Number(body['target_price']);
    const currentPrice = Number(body['current_price']);

    if (!productId || !email || !targetPrice) {
      return c.json({ success: false, error: 'Product, email, and target price are required.' }, 400);
    }

    await savePriceAlert(c.env?.DB, {
      productId,
      productName,
      email,
      targetPrice,
      currentPrice
    });

    return c.json({ success: true, message: 'Price alert registered successfully!' });
  } catch (err: any) {
    return c.json({ success: false, error: err?.message || 'Failed to register price alert' }, 500);
  }
});

// SSR: Admin Login Form
app.get('/admin/login', async (c) => {
  const s = await getSession(c);
  if (s && (s.role === 'admin' || s.role === 'moderator')) return c.redirect('/admin');
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
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      await createSession(c, 1);
      return c.redirect('/admin');
    }
    return c.html(<AdminLoginView error="Invalid username or password" />);
  }

  try {
    const u = await db
      .prepare(
        `SELECT u.*, COALESCE(u.role, r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON CAST(r.user_id AS TEXT) = CAST(u.id AS TEXT)
         WHERE u.username = ? COLLATE NOCASE OR u.email = ? COLLATE NOCASE LIMIT 1`
      )
      .bind(username, username)
      .first<any>();

    if (!u || !u.is_active || (u.role !== 'admin' && u.role !== 'moderator')) {
      return c.html(<AdminLoginView error="Invalid administrator credentials" />);
    }

    let passwordMatches = false;
    if (u.password_salt) {
      const h = await passwordHash(password, u.password_salt);
      passwordMatches = safeEqual(h.hash, u.password_hash);
    } else if (u.password_hash) {
      const d = await digest(password);
      passwordMatches = safeEqual(d, u.password_hash) || password === u.password_hash;
    }

    if (!passwordMatches) {
      return c.html(<AdminLoginView error="Invalid administrator credentials" />);
    }

    await createSession(c, u.id);
    return c.redirect('/admin');
  } catch (err) {
    console.error('Login error:', err);
    return c.html(<AdminLoginView error="Login service temporarily unavailable" />);
  }
});

// SSR: Admin Dashboard
app.get('/admin', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) {
    return c.redirect('/admin/login');
  }

  const tab = c.req.query('tab') || 'overview';
  const msg = c.req.query('msg');
  const err = c.req.query('err');
  const notice = msg
    ? { type: 'success' as const, message: msg }
    : err
    ? { type: 'error' as const, message: err }
    : undefined;

  const [settings, categories, products, stats, users, reviews, coupons, articles, orders, outboundClicks] = await Promise.all([
    getSettings(c.env?.DB),
    getCategories(c.env?.DB, false),
    getAllProductsAdmin(c.env?.DB),
    getAdminStats(c.env?.DB),
    getUsers(c.env?.DB),
    getAllReviewsAdmin(c.env?.DB),
    getCoupons(c.env?.DB),
    getAllArticlesAdmin(c.env?.DB),
    getOrdersAdmin(c.env?.DB),
    getOutboundClicksAdmin(c.env?.DB)
  ]);

  return c.html(
    <AdminDashboardView
      currentUser={{ id: s.user_id, username: s.username, email: s.email, role: s.role }}
      stats={stats}
      products={products}
      categories={categories}
      users={users}
      reviews={reviews}
      coupons={coupons}
      articles={articles}
      orders={orders}
      outboundClicks={outboundClicks}
      settings={settings}
      activeTab={tab}
      notice={notice}
    />
  );
});

// Admin Action: Update Order Status
app.post('/admin/orders/:id/status', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  const body = await c.req.parseBody();
  const status = String(body['status'] || 'placed');
  const paymentStatus = body['payment_status'] ? String(body['payment_status']) : undefined;

  await updateOrderStatus(c.env?.DB, id, status, paymentStatus);
  return c.redirect(`/admin?tab=orders&msg=${encodeURIComponent(`Order #${id} status updated to ${status}`)}`);
});

// Admin Logout
app.get('/admin/logout', (c) => {
  clearSession(c);
  return c.redirect('/admin/login');
});
app.post('/admin/logout', (c) => {
  clearSession(c);
  return c.redirect('/admin/login');
});

// Admin Action: Seed Demo Catalog in D1
app.post('/admin/seed', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const res = await seedCatalog(c.env?.DB);
  const key = res.success ? 'msg' : 'err';
  return c.redirect(`/admin?tab=overview&${key}=${encodeURIComponent(res.message)}`);
});

// Admin Action: Clear/Wipe Catalog in D1
app.post('/admin/catalog/clear', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const res = await clearCatalog(c.env?.DB);
  const key = res.success ? 'msg' : 'err';
  return c.redirect(`/admin?tab=overview&${key}=${encodeURIComponent(res.message)}`);
});

// Admin Action: Add Product
app.post('/admin/products/new', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  try {
    const body = await c.req.parseBody();
    const name = String(body['name'] || '').trim();
    const price = Number(body['price']);
    const categoryId = body['category_id'] ? Number(body['category_id']) : null;
    const affiliateUrl = String(body['affiliate_url'] || '').trim();
    const imageUrl = String(body['image_url'] || '').trim();
    const description = String(body['description'] || '').trim();
    const storeName = String(body['store_name'] || 'Daraz Mall').trim();
    const originalPrice = Number(body['original_price'] || 0);
    const badge = String(body['badge'] || '🔥 Hot Deal').trim();
    const brand = String(body['brand'] || '').trim();
    const emiAvailable = body['emi_available'] ? 1 : 0;
    const verdict = String(body['verdict'] || '').trim();

    if (!name || isNaN(price) || price < 0) {
      return c.redirect('/admin?tab=products&err=Invalid+product+name+or+price');
    }

    const res = await createProduct(
      c.env?.DB,
      name,
      price,
      description,
      imageUrl,
      affiliateUrl,
      categoryId,
      1,
      storeName,
      originalPrice,
      badge,
      brand,
      emiAvailable,
      verdict
    );

    if (!res.success) {
      return c.redirect(`/admin?tab=products&err=${encodeURIComponent(res.error || 'Failed to create product')}`);
    }
    return c.redirect('/admin?tab=products&msg=Product+published+successfully');
  } catch {
    return c.redirect('/admin?tab=products&err=Failed+to+process+request');
  }
});

// Admin Action: Toggle Product Active/Draft
app.post('/admin/products/:id/toggle', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  const body = await c.req.parseBody();
  const isActive = Number(body['is_active']) === 1 ? 1 : 0;
  if (id) {
    await toggleProductStatus(c.env?.DB, id, isActive);
  }
  return c.redirect('/admin?tab=products&msg=Product+status+updated');
});

// Admin Action: Delete Product
app.post('/admin/products/:id/delete', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await deleteProduct(c.env?.DB, id);
  }
  return c.redirect('/admin?tab=products&msg=Product+deleted');
});

// Admin Action: Edit / Update Product
app.post('/admin/products/:id/edit', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (!id) return c.redirect('/admin?tab=products&err=Invalid+product+ID');

  try {
    const body = await c.req.parseBody();
    const name = String(body['name'] || '').trim();
    const price = Number(body['price']);
    const originalPrice = body['original_price'] ? Number(body['original_price']) : 0;
    const categoryId = body['category_id'] ? Number(body['category_id']) : null;
    const affiliateUrl = String(body['affiliate_url'] || '').trim();
    const imageUrl = String(body['image_url'] || '').trim();
    const description = String(body['description'] || '').trim();
    const storeName = String(body['store_name'] || 'Daraz Mall').trim();
    const badge = String(body['badge'] || '').trim();
    const brand = String(body['brand'] || '').trim();
    const emiAvailable = body['emi_available'] ? 1 : 0;
    const verdict = String(body['verdict'] || '').trim();
    const isActive = body['is_active'] !== undefined ? (Number(body['is_active']) === 1 ? 1 : 0) : 1;

    if (!name || isNaN(price) || price < 0) {
      return c.redirect('/admin?tab=products&err=Invalid+product+title+or+price');
    }

    const res = await updateProduct(c.env?.DB, id, {
      name,
      price,
      originalPrice,
      categoryId,
      affiliateUrl,
      imageUrl,
      description,
      storeName,
      badge,
      brand,
      emiAvailable,
      verdict,
      isActive
    });

    if (!res.success) {
      return c.redirect(`/admin?tab=products&err=${encodeURIComponent(res.error || 'Failed to update product')}`);
    }
    return c.redirect('/admin?tab=products&msg=Product+updated+successfully');
  } catch (err: any) {
    return c.redirect(`/admin?tab=products&err=${encodeURIComponent(err?.message || 'Failed to update product')}`);
  }
});

// Admin Action: Add Category
app.post('/admin/categories/new', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  try {
    const body = await c.req.parseBody();
    const name = String(body['name'] || '').trim();
    let slug = String(body['slug'] || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const description = String(body['description'] || '').trim();

    if (!name || !slug) {
      return c.redirect('/admin?tab=categories&err=Department+name+and+slug+are+required');
    }

    const res = await createCategory(c.env?.DB, name, slug, description);
    if (!res.success) {
      return c.redirect(`/admin?tab=categories&err=${encodeURIComponent(res.error || 'Failed to create department')}`);
    }
    return c.redirect('/admin?tab=categories&msg=Department+created+successfully');
  } catch {
    return c.redirect('/admin?tab=categories&err=Failed+to+process+request');
  }
});

// Admin Action: Edit / Update Category
app.post('/admin/categories/:id/edit', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (!id) return c.redirect('/admin?tab=categories&err=Invalid+category+ID');

  try {
    const body = await c.req.parseBody();
    const name = String(body['name'] || '').trim();
    let slug = String(body['slug'] || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const icon = String(body['icon'] || '📁').trim();
    const description = String(body['description'] || '').trim();
    const isActive = body['is_active'] !== undefined ? (Number(body['is_active']) === 1 ? 1 : 0) : 1;

    if (!name || !slug) {
      return c.redirect('/admin?tab=categories&err=Department+name+and+slug+are+required');
    }

    const res = await updateCategory(c.env?.DB, id, {
      name,
      slug,
      icon,
      description,
      isActive
    });

    if (!res.success) {
      return c.redirect(`/admin?tab=categories&err=${encodeURIComponent(res.error || 'Failed to update department')}`);
    }
    return c.redirect('/admin?tab=categories&msg=Department+updated+successfully');
  } catch (err: any) {
    return c.redirect(`/admin?tab=categories&err=${encodeURIComponent(err?.message || 'Failed to update department')}`);
  }
});

// Admin Action: Delete Category
app.post('/admin/categories/:id/delete', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await deleteCategory(c.env?.DB, id);
  }
  return c.redirect('/admin?tab=categories&msg=Department+deleted');
});

// Admin Action: Approve Review
app.post('/admin/reviews/:id/approve', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await updateReviewStatus(c.env?.DB, id, 'approved');
  }
  return c.redirect('/admin?tab=reviews&msg=Review+approved+for+storefront');
});

// Admin Action: Reject Review
app.post('/admin/reviews/:id/reject', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await updateReviewStatus(c.env?.DB, id, 'rejected');
  }
  return c.redirect('/admin?tab=reviews&msg=Review+rejected');
});

// Admin Action: Delete Review
app.post('/admin/reviews/:id/delete', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await deleteReview(c.env?.DB, id);
  }
  return c.redirect('/admin?tab=reviews&msg=Review+deleted');
});

// Admin Action: Create Coupon
app.post('/admin/coupons/new', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  try {
    const body = await c.req.parseBody();
    const code = String(body['code'] || '').trim().toUpperCase();
    const discountType = (body['discount_type'] as 'fixed' | 'percentage') || 'percentage';
    const discountValue = Number(body['discount_value']);
    const minPurchase = Number(body['min_purchase'] || 0);
    const description = String(body['description'] || '').trim();

    if (!code || isNaN(discountValue) || discountValue <= 0) {
      return c.redirect('/admin?tab=coupons&err=Invalid+coupon+code+or+discount+value');
    }

    await createCoupon(c.env?.DB, code, discountType, discountValue, minPurchase, description);
    return c.redirect('/admin?tab=coupons&msg=Promo+voucher+published');
  } catch {
    return c.redirect('/admin?tab=coupons&err=Failed+to+create+coupon');
  }
});

// Admin Action: Delete Coupon
app.post('/admin/coupons/:id/delete', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await deleteCoupon(c.env?.DB, id);
  }
  return c.redirect('/admin?tab=coupons&msg=Coupon+deleted');
});

// Admin Action: Edit / Update Coupon
app.post('/admin/coupons/:id/edit', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (!id) return c.redirect('/admin?tab=coupons&err=Invalid+coupon+ID');

  try {
    const body = await c.req.parseBody();
    const code = String(body['code'] || '').trim().toUpperCase();
    const discountType = (body['discount_type'] as 'fixed' | 'percentage') || 'percentage';
    const discountValue = Number(body['discount_value']);
    const minPurchase = Number(body['min_purchase'] || 0);
    const description = String(body['description'] || '').trim();
    const isActive = body['is_active'] !== undefined ? (Number(body['is_active']) === 1 ? 1 : 0) : 1;

    if (!code || isNaN(discountValue) || discountValue <= 0) {
      return c.redirect('/admin?tab=coupons&err=Invalid+coupon+code+or+discount+value');
    }

    const res = await updateCoupon(c.env?.DB, id, {
      code,
      discountType,
      discountValue,
      minPurchase,
      description,
      isActive
    });

    if (!res.success) {
      return c.redirect(`/admin?tab=coupons&err=${encodeURIComponent(res.error || 'Failed to update coupon')}`);
    }
    return c.redirect('/admin?tab=coupons&msg=Promo+voucher+updated+successfully');
  } catch (err: any) {
    return c.redirect(`/admin?tab=coupons&err=${encodeURIComponent(err?.message || 'Failed to update coupon')}`);
  }
});

// Admin Action: Delete User
app.post('/admin/users/:id/delete', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id === s.user_id) {
    return c.redirect('/admin?tab=users&err=Cannot+delete+your+own+account');
  }

  await deleteUser(c.env?.DB, id);
  return c.redirect('/admin?tab=users&msg=User+access+revoked');
});

// Admin Action: Update Site Settings & Feature Flags
app.post('/admin/settings', async (c) => {
  const s = await getSession(c);
  if (!s || s.role !== 'admin') return c.redirect('/admin/login');

  try {
    const body = await c.req.parseBody();
    const returnTab = String(body['_return_tab'] || 'settings');

    const updatePayload: Record<string, string> = {};

    if (body['site_title'] !== undefined) updatePayload.site_title = String(body['site_title']).trim();
    if (body['site_description'] !== undefined) updatePayload.site_description = String(body['site_description']).trim();
    if (body['announcement_text'] !== undefined) updatePayload.announcement_text = String(body['announcement_text']).trim();
    if (body['contact_phone'] !== undefined) updatePayload.contact_phone = String(body['contact_phone']).trim();
    if (body['whatsapp_number'] !== undefined) updatePayload.whatsapp_number = String(body['whatsapp_number']).trim();
    if (body['social_facebook'] !== undefined) updatePayload.social_facebook = String(body['social_facebook']).trim();
    if (body['social_instagram'] !== undefined) updatePayload.social_instagram = String(body['social_instagram']).trim();

    // Feature Flags Toggles
    if (returnTab === 'customizer') {
      updatePayload.flash_sale_enabled = body['flash_sale_enabled'] ? '1' : '0';
      updatePayload.emi_enabled = body['emi_enabled'] ? '1' : '0';
      updatePayload.currency_converter_enabled = body['currency_converter_enabled'] ? '1' : '0';
      updatePayload.delivery_estimator_enabled = body['delivery_estimator_enabled'] ? '1' : '0';
      updatePayload.comparison_enabled = body['comparison_enabled'] ? '1' : '0';
      updatePayload.announcement_active = body['announcement_active'] ? '1' : '0';
      if (body['flash_sale_title'] !== undefined) updatePayload.flash_sale_title = String(body['flash_sale_title']).trim();
    }

    await updateSettings(c.env?.DB, updatePayload);
    return c.redirect(`/admin?tab=${returnTab}&msg=Customizer+settings+saved+successfully`);
  } catch {
    return c.redirect('/admin?tab=settings&err=Failed+to+save+settings');
  }
});

// Admin Action: Create Article
app.post('/admin/articles/new', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  try {
    const body = await c.req.parseBody();
    const title = String(body['title'] || '').trim();
    const category = String(body['category'] || 'Buying Guides').trim();
    const authorName = String(body['author_name'] || 'BuyerNepal Editorial Team').trim();
    const coverImage = String(body['cover_image'] || '').trim();
    const excerpt = String(body['excerpt'] || '').trim();
    const content = String(body['content'] || '').trim();
    const tags = String(body['tags'] || '').trim();
    const readTimeMinutes = Number(body['read_time_minutes']) || 5;
    const isFeatured = body['is_featured'] ? 1 : 0;
    const isPublished = body['is_published'] ? 1 : 0;

    if (!title || !excerpt || !content) {
      return c.redirect('/admin?tab=blog&err=Title,+excerpt,+and+content+are+required');
    }

    const res = await createArticle(c.env?.DB, {
      title,
      category,
      authorName,
      coverImage,
      excerpt,
      content,
      tags,
      readTimeMinutes,
      isFeatured,
      isPublished
    });

    if (!res.success) {
      return c.redirect(`/admin?tab=blog&err=${encodeURIComponent(res.error || 'Failed to create article')}`);
    }
    return c.redirect('/admin?tab=blog&msg=Article+published+successfully');
  } catch (err: any) {
    return c.redirect(`/admin?tab=blog&err=${encodeURIComponent(err?.message || 'Failed to create article')}`);
  }
});

// Admin Action: Edit Article
app.post('/admin/articles/:id/edit', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (!id) return c.redirect('/admin?tab=blog&err=Invalid+article+ID');

  try {
    const body = await c.req.parseBody();
    const title = String(body['title'] || '').trim();
    const slug = String(body['slug'] || '').trim();
    const category = String(body['category'] || 'Buying Guides').trim();
    const authorName = String(body['author_name'] || '').trim();
    const coverImage = String(body['cover_image'] || '').trim();
    const excerpt = String(body['excerpt'] || '').trim();
    const content = String(body['content'] || '').trim();
    const tags = String(body['tags'] || '').trim();
    const readTimeMinutes = Number(body['read_time_minutes']) || 5;
    const isFeatured = body['is_featured'] ? 1 : 0;
    const isPublished = body['is_published'] ? 1 : 0;

    if (!title || !excerpt || !content) {
      return c.redirect('/admin?tab=blog&err=Title,+excerpt,+and+content+are+required');
    }

    const res = await updateArticle(c.env?.DB, id, {
      title,
      slug,
      category,
      authorName,
      coverImage,
      excerpt,
      content,
      tags,
      readTimeMinutes,
      isFeatured,
      isPublished
    });

    if (!res.success) {
      return c.redirect(`/admin?tab=blog&err=${encodeURIComponent(res.error || 'Failed to update article')}`);
    }
    return c.redirect('/admin?tab=blog&msg=Article+updated+successfully');
  } catch (err: any) {
    return c.redirect(`/admin?tab=blog&err=${encodeURIComponent(err?.message || 'Failed to update article')}`);
  }
});

// Admin Action: Toggle Article Publish Status
app.post('/admin/articles/:id/toggle', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    const body = await c.req.parseBody();
    const isPublished = Number(body['is_published']) === 1 ? 1 : 0;
    await toggleArticlePublish(c.env?.DB, id, isPublished);
  }
  return c.redirect('/admin?tab=blog&msg=Article+status+updated');
});

// Admin Action: Delete Article
app.post('/admin/articles/:id/delete', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const id = Number(c.req.param('id'));
  if (id) {
    await deleteArticle(c.env?.DB, id);
  }
  return c.redirect('/admin?tab=blog&msg=Article+deleted');
});

// Admin Action: Save Product Evaluation Scores
app.post('/admin/products/:id/scores', async (c) => {
  const s = await getSession(c);
  if (!s || (s.role !== 'admin' && s.role !== 'moderator')) return c.redirect('/admin/login');

  const productId = Number(c.req.param('id'));
  if (!productId) return c.redirect('/admin?tab=products&err=Invalid+product+ID');

  try {
    const body = await c.req.parseBody();
    const displayScore = parseFloat(String(body['displayScore'] || '8.5'));
    const performanceScore = parseFloat(String(body['performanceScore'] || '8.5'));
    const cameraScore = parseFloat(String(body['cameraScore'] || '8.5'));
    const batteryScore = parseFloat(String(body['batteryScore'] || '8.5'));
    const valueScore = parseFloat(String(body['valueScore'] || '8.5'));
    const overallScore = parseFloat(String(body['overallScore'] || '8.5'));
    const verdict = String(body['verdict'] || '').trim();

    const res = await saveProductScores(c.env?.DB, {
      productId,
      displayScore,
      performanceScore,
      cameraScore,
      batteryScore,
      valueScore,
      overallScore,
      verdict
    });

    if (!res.success) {
      return c.redirect(`/admin?tab=products&err=${encodeURIComponent(res.error || 'Failed to save scores')}`);
    }
    return c.redirect('/admin?tab=products&msg=Evaluation+scores+saved+successfully');
  } catch (err: any) {
    return c.redirect(`/admin?tab=products&err=${encodeURIComponent(err?.message || 'Error saving scores')}`);
  }
});

export default app;
