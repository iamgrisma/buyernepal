import { Category, Product, Review, SiteSettings } from './types';

// Fallback seed data if D1 is not yet bound or empty
const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Electronics & Gadgets', slug: 'electronics', description: 'Curated smartphones, laptops, audio and accessories in Nepal.' },
  { id: 2, name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Useful appliances and essentials for Nepali homes.' },
  { id: 3, name: 'Fashion & Style', slug: 'fashion', description: 'Trendy and comfortable apparel, shoes and bags.' },
  { id: 4, name: 'Health & Beauty', slug: 'beauty', description: 'Skincare, grooming and wellness products verified for Nepal.' }
];

const DEFAULT_PRODUCTS: Product[] = [
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

export async function getCategories(db?: D1Database): Promise<Category[]> {
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const r = await db
      .prepare('SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE is_active = 1 ORDER BY name COLLATE NOCASE')
      .all<Category>();
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

export async function getProducts(db?: D1Database, categoryId?: number | null): Promise<Product[]> {
  if (!db) {
    if (categoryId) return DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId);
    return DEFAULT_PRODUCTS;
  }
  try {
    let query =
      'SELECT p.id, p.name, p.description, p.price, p.image_url, p.affiliate_url, p.category_id, p.is_active, p.created_at, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.is_active = 1';
    let r;
    if (categoryId) {
      query += ' AND p.category_id = ? ORDER BY p.created_at DESC LIMIT 100';
      r = await db.prepare(query).bind(categoryId).all<Product>();
    } else {
      query += ' ORDER BY p.created_at DESC LIMIT 100';
      r = await db.prepare(query).all<Product>();
    }
    const list = r.results || [];
    if (list.length > 0) return list;
    return categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
  } catch {
    return categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
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
