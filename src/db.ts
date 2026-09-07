import { Category, Product, Review, SiteSettings, User, Coupon } from './types';

// Fallback seed data if D1 is not yet bound or empty
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Electronics & Gadgets', slug: 'electronics', description: 'Curated smartphones, laptops, audio and accessories in Nepal.', is_active: 1, in_menu: 1, display_order: 1 },
  { id: 2, name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Useful appliances and essentials for Nepali homes.', is_active: 1, in_menu: 1, display_order: 2 },
  { id: 3, name: 'Fashion & Style', slug: 'fashion', description: 'Trendy and comfortable apparel, shoes and bags.', is_active: 1, in_menu: 1, display_order: 3 },
  { id: 4, name: 'Health & Beauty', slug: 'beauty', description: 'Skincare, grooming and wellness products verified for Nepal.', is_active: 1, in_menu: 1, display_order: 4 }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Anker Soundcore Space One ANC Headphones',
    description: 'Noise-cancelling wireless headphones with 2x stronger voice reduction, 40 hours of playtime and Hi-Res wireless audio.',
    price: 13999,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Electronics & Gadgets',
    is_active: 1
  },
  {
    id: 2,
    name: 'Xiaomi Smart Air Fryer Pro 4L',
    description: 'Transparent window design, 360-degree heated air circulation, 40-200°C adjustable temperature range with OLED touch display.',
    price: 11499,
    image_url: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=600&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 2,
    category_name: 'Home & Kitchen',
    is_active: 1
  },
  {
    id: 3,
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    description: 'Quiet clicks, 8K DPI any-surface tracking, MagSpeed electromagnetic scrolling and USB-C quick charging.',
    price: 16500,
    image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Electronics & Gadgets',
    is_active: 1
  },
  {
    id: 4,
    name: 'Minimalist Anti-Theft Water-Resistant Backpack',
    description: 'Ergonomic business laptop backpack with USB charging port, hidden security pockets and durable Oxford fabric.',
    price: 3850,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 3,
    category_name: 'Fashion & Style',
    is_active: 1
  }
];

export async function getSettings(db?: D1Database): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    site_title: 'BuyerNepal',
    site_description: 'Discover products worth buying in Nepal — curated, compared and easy to shop.'
  };

  if (!db) return defaults;
  try {
    const r = await db.prepare('SELECT key, value FROM settings').all<{ key: string; value: string }>();
    const settings: Record<string, string> = { ...defaults };
    for (const row of r.results || []) {
      settings[row.key] = row.value;
    }
    return settings;
  } catch {
    return defaults;
  }
}

export async function updateSettings(db: D1Database | undefined, settings: Record<string, string>): Promise<boolean> {
  if (!db) return false;
  try {
    for (const [k, v] of Object.entries(settings)) {
      await db
        .prepare(
          `INSERT INTO settings(key, value, updated_at)
           VALUES(?, ?, CURRENT_TIMESTAMP)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`
        )
        .bind(k, v)
        .run();
    }
    return true;
  } catch {
    return false;
  }
}

// Categories & Menu Control
export async function getCategories(db?: D1Database, onlyActive = true): Promise<Category[]> {
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const query = onlyActive
      ? 'SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE is_active = 1 ORDER BY name COLLATE NOCASE'
      : 'SELECT id, name, slug, description, parent_id, is_active FROM categories ORDER BY name COLLATE NOCASE';
    const r = await db.prepare(query).all<Category>();
    const list = r.results || [];
    return list.length > 0 ? list : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export async function getCategoryBySlug(db: D1Database | undefined, slug: string): Promise<Category | null> {
  if (!db) {
    return DEFAULT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
  try {
    const c = await db
      .prepare('SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE slug = ? COLLATE NOCASE AND is_active = 1 LIMIT 1')
      .bind(slug)
      .first<Category>();
    if (c) return c;
    return DEFAULT_CATEGORIES.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase()) || null;
  } catch {
    return DEFAULT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
}

export async function createCategory(
  db: D1Database | undefined,
  name: string,
  slug: string,
  description = '',
  parentId: number | null = null,
  isActive = 1
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    await db
      .prepare('INSERT INTO categories(name, slug, description, parent_id, is_active) VALUES(?, ?, ?, ?, ?)')
      .bind(name, slug.toLowerCase(), description, parentId, isActive)
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to create category' };
  }
}

export async function updateCategory(
  db: D1Database | undefined,
  id: number,
  name: string,
  slug: string,
  description = '',
  isActive = 1
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    await db
      .prepare('UPDATE categories SET name = ?, slug = ?, description = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(name, slug.toLowerCase(), description, isActive, id)
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to update category' };
  }
}

export async function deleteCategory(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Products
export async function getProducts(db?: D1Database, categoryId?: number | null, limit = 100): Promise<Product[]> {
  if (!db) {
    if (categoryId) return DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId);
    return DEFAULT_PRODUCTS;
  }
  try {
    let query =
      'SELECT p.id, p.name, p.description, p.price, p.image_url, p.affiliate_url, p.category_id, p.is_active, p.created_at, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.is_active = 1';
    let r;
    if (categoryId) {
      query += ' AND p.category_id = ? ORDER BY p.created_at DESC LIMIT ?';
      r = await db.prepare(query).bind(categoryId, limit).all<Product>();
    } else {
      query += ' ORDER BY p.created_at DESC LIMIT ?';
      r = await db.prepare(query).bind(limit).all<Product>();
    }
    const list = r.results || [];
    if (list.length > 0) return list;
    return categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
  } catch {
    return categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
  }
}

export async function getAllProductsAdmin(db?: D1Database): Promise<Product[]> {
  if (!db) return DEFAULT_PRODUCTS;
  try {
    const r = await db
      .prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.created_at DESC LIMIT 200')
      .all<Product>();
    const list = r.results || [];
    return list.length > 0 ? list : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export async function getProductById(db: D1Database | undefined, id: number): Promise<Product | null> {
  if (!db) {
    return DEFAULT_PRODUCTS.find((p) => p.id === id) || null;
  }
  try {
    const p = await db
      .prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.id = ? AND p.is_active = 1 LIMIT 1')
      .bind(id)
      .first<Product>();
    if (p) return p;
    return DEFAULT_PRODUCTS.find((prod) => prod.id === id) || null;
  } catch {
    return DEFAULT_PRODUCTS.find((prod) => prod.id === id) || null;
  }
}

export async function createProduct(
  db: D1Database | undefined,
  name: string,
  price: number,
  description = '',
  imageUrl = '',
  affiliateUrl = '',
  categoryId: number | null = null,
  isActive = 1
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    const r = await db
      .prepare(
        `INSERT INTO products(name, description, price, image_url, affiliate_url, category_id, is_active)
         VALUES(?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(name, description, price, imageUrl, affiliateUrl, categoryId, isActive)
      .run();
    return { success: true, id: Number(r.meta.last_row_id) };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to create product' };
  }
}

export async function updateProduct(
  db: D1Database | undefined,
  id: number,
  name: string,
  price: number,
  description = '',
  imageUrl = '',
  affiliateUrl = '',
  categoryId: number | null = null,
  isActive = 1
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    await db
      .prepare(
        `UPDATE products
         SET name = ?, description = ?, price = ?, image_url = ?, affiliate_url = ?, category_id = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(name, description, price, imageUrl, affiliateUrl, categoryId, isActive, id)
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to update product' };
  }
}

export async function deleteProduct(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Reviews
export async function getReviews(db: D1Database | undefined, productId: number): Promise<Review[]> {
  if (!db) return [];
  try {
    const r = await db
      .prepare("SELECT id, product_id, user_name, rating, comment, status, created_at FROM reviews WHERE product_id = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 50")
      .bind(productId)
      .all<Review>();
    return r.results || [];
  } catch {
    return [];
  }
}

export async function getAllReviewsAdmin(db?: D1Database): Promise<Review[]> {
  if (!db) return [];
  try {
    const r = await db
      .prepare('SELECT r.*, p.name product_name FROM reviews r LEFT JOIN products p ON p.id = r.product_id ORDER BY r.created_at DESC LIMIT 100')
      .all<Review>();
    return r.results || [];
  } catch {
    return [];
  }
}

export async function updateReviewStatus(db: D1Database | undefined, id: number, status: 'approved' | 'rejected'): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('UPDATE reviews SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, id).run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteReview(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM reviews WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// User System
export async function getUsers(db?: D1Database): Promise<User[]> {
  const fallbackUsers: User[] = [
    { id: 1, username: 'admin', email: 'admin@buyernepal.com', role: 'admin', is_active: 1, created_at: new Date().toISOString() }
  ];
  if (!db) return fallbackUsers;
  try {
    const r = await db
      .prepare(
        `SELECT u.id, u.username, u.email, u.is_active, u.created_at, COALESCE(r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON r.user_id = u.id
         ORDER BY u.created_at DESC`
      )
      .all<User>();
    const list = r.results || [];
    return list.length > 0 ? list : fallbackUsers;
  } catch {
    return fallbackUsers;
  }
}

export async function createUser(
  db: D1Database | undefined,
  username: string,
  email: string,
  passwordHash: string,
  passwordSalt: string,
  role: 'admin' | 'moderator' | 'user' = 'user'
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    const r = await db
      .prepare('INSERT INTO users(username, email, password_hash, password_salt, is_active) VALUES(?, ?, ?, ?, 1)')
      .bind(username, email.toLowerCase(), passwordHash, passwordSalt)
      .run();
    const id = Number(r.meta.last_row_id);
    await db.prepare('INSERT INTO user_roles(user_id, role) VALUES(?, ?)').bind(id, role).run();
    return { success: true, id };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Username or email already exists' };
  }
}

export async function updateUserRole(
  db: D1Database | undefined,
  userId: number,
  role: 'admin' | 'moderator' | 'user'
): Promise<boolean> {
  if (!db) return false;
  try {
    await db
      .prepare(
        `INSERT INTO user_roles(user_id, role) VALUES(?, ?)
         ON CONFLICT(user_id) DO UPDATE SET role = excluded.role`
      )
      .bind(userId, role)
      .run();
    return true;
  } catch {
    return false;
  }
}

export async function toggleUserStatus(db: D1Database | undefined, userId: number, isActive: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(isActive, userId).run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteUser(db: D1Database | undefined, userId: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    return true;
  } catch {
    return false;
  }
}

// Coupons
export async function getCoupons(db?: D1Database): Promise<Coupon[]> {
  if (!db) return [];
  try {
    const r = await db.prepare('SELECT * FROM coupons ORDER BY created_at DESC').all<Coupon>();
    return r.results || [];
  } catch {
    return [];
  }
}

export async function createCoupon(
  db: D1Database | undefined,
  code: string,
  discountType: 'fixed' | 'percentage',
  discountValue: number,
  minPurchase = 0,
  description = ''
): Promise<boolean> {
  if (!db) return false;
  try {
    await db
      .prepare('INSERT INTO coupons(code, discount_type, discount_value, min_purchase, description, is_active) VALUES(?, ?, ?, ?, ?, 1)')
      .bind(code.toUpperCase().trim(), discountType, discountValue, minPurchase, description)
      .run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteCoupon(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM coupons WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Analytics Stats
export async function getAdminStats(db?: D1Database) {
  const fallback = {
    products: DEFAULT_PRODUCTS.length,
    categories: DEFAULT_CATEGORIES.length,
    pendingReviews: 0,
    activeCoupons: 0,
    users: 1
  };
  if (!db) return fallback;
  try {
    const [p, u, r, c, co] = await Promise.all([
      db.prepare('SELECT COUNT(*) count FROM products').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM users').first<any>(),
      db.prepare("SELECT COUNT(*) count FROM reviews WHERE status = 'pending'").first<any>(),
      db.prepare('SELECT COUNT(*) count FROM categories').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM coupons WHERE is_active = 1').first<any>()
    ]);
    return {
      products: Number(p?.count || fallback.products),
      users: Number(u?.count || fallback.users),
      pendingReviews: Number(r?.count || 0),
      categories: Number(c?.count || fallback.categories),
      activeCoupons: Number(co?.count || 0)
    };
  } catch {
    return fallback;
  }
}
