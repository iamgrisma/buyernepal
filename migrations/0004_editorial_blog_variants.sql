-- Migration 0004: Editorial Blog, Articles, Product Variants, Review Scores, and Multi-Store Offers

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE COLLATE NOCASE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  author_name TEXT NOT NULL DEFAULT 'BuyerNepal Editorial Team',
  category TEXT NOT NULL DEFAULT 'Buying Guides',
  tags TEXT NOT NULL DEFAULT '',
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0,1)),
  is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0,1)),
  views_count INTEGER NOT NULL DEFAULT 0,
  featured_product_ids TEXT NOT NULL DEFAULT '',
  published_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

CREATE TABLE IF NOT EXISTS product_variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_name TEXT NOT NULL,
  price REAL NOT NULL,
  original_price REAL,
  sku TEXT NOT NULL DEFAULT '',
  is_in_stock INTEGER NOT NULL DEFAULT 1 CHECK (is_in_stock IN (0,1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);

CREATE TABLE IF NOT EXISTS product_scores (
  product_id INTEGER PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  display_score REAL NOT NULL DEFAULT 9.0,
  performance_score REAL NOT NULL DEFAULT 9.0,
  camera_score REAL NOT NULL DEFAULT 9.0,
  battery_score REAL NOT NULL DEFAULT 8.5,
  value_score REAL NOT NULL DEFAULT 8.5,
  overall_score REAL NOT NULL DEFAULT 8.8,
  verdict TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_offers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  price REAL NOT NULL,
  store_url TEXT NOT NULL DEFAULT '',
  badge TEXT NOT NULL DEFAULT 'Authorized Seller',
  in_stock INTEGER NOT NULL DEFAULT 1 CHECK (in_stock IN (0,1)),
  delivery_time TEXT NOT NULL DEFAULT '24-48 Hours',
  warranty_info TEXT NOT NULL DEFAULT '1 Year Official Warranty',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_store_offers_product ON store_offers(product_id);
