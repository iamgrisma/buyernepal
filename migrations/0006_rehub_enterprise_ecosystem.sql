-- Migration 0006: REHub-Style Enterprise Brand Ecosystem
-- Orders (Physical & Digital Goods), Outbound Click Tracking, SEO Metadata, Stores & Brand Slugs

-- 1. Direct Customer Orders for Physical & Digital Goods
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'Kathmandu',
  district TEXT NOT NULL DEFAULT 'Kathmandu',
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price REAL NOT NULL,
  total_amount REAL NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cod' CHECK (payment_method IN ('cod', 'esewa', 'khalti', 'fonepay', 'bank_transfer')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  order_status TEXT NOT NULL DEFAULT 'placed' CHECK (order_status IN ('placed', 'processing', 'shipped', 'delivered', 'cancelled')),
  delivery_type TEXT NOT NULL DEFAULT 'physical' CHECK (delivery_type IN ('physical', 'digital')),
  digital_download_code TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_email, customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status, created_at DESC);

-- 2. Outbound Affiliate Click Tracking & Monetization Analytics
CREATE TABLE IF NOT EXISTS outbound_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER REFERENCES products(id),
  target_type TEXT NOT NULL DEFAULT 'product' CHECK (target_type IN ('product', 'store_offer', 'coupon', 'custom')),
  store_name TEXT NOT NULL DEFAULT 'Affiliate Store',
  target_url TEXT NOT NULL,
  referrer TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  ip_country TEXT NOT NULL DEFAULT 'NP',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_clicks_product ON outbound_clicks(product_id);
CREATE INDEX IF NOT EXISTS idx_clicks_created ON outbound_clicks(created_at DESC);

-- 3. Stores Directory Table
CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE COLLATE NOCASE,
  logo_url TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL DEFAULT '',
  affiliate_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  rating REAL NOT NULL DEFAULT 4.8,
  review_count INTEGER NOT NULL DEFAULT 15,
  is_verified INTEGER NOT NULL DEFAULT 1 CHECK (is_verified IN (0, 1)),
  location TEXT NOT NULL DEFAULT 'Kathmandu, Nepal',
  delivery_coverage TEXT NOT NULL DEFAULT 'All 77 Districts',
  return_policy TEXT NOT NULL DEFAULT '7-Day Replacement Guarantee',
  warranty_support TEXT NOT NULL DEFAULT 'Authorized Distributor Service',
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_stores_slug ON stores(slug);

-- 4. Brands Directory Table
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE COLLATE NOCASE,
  logo_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  origin_country TEXT NOT NULL DEFAULT 'Global',
  warranty_service_center TEXT NOT NULL DEFAULT 'Official Importer Service Centers in Kathmandu & Major Cities',
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);

-- 5. Seed Core Verified Nepal Stores
INSERT OR IGNORE INTO stores (id, name, slug, logo_url, website_url, affiliate_url, description, rating, review_count, is_verified, location, delivery_coverage, return_policy, warranty_support)
VALUES
(1, 'Daraz Mall Nepal', 'daraz-mall', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=120&auto=format&fit=crop&q=80', 'https://www.daraz.com.np', 'https://www.daraz.com.np', 'Nepal''s largest e-commerce platform offering 100% genuine products directly from official brand flagships with 14-day easy returns.', 4.8, 1420, 1, 'Kathmandu (Central Hub)', 'All 77 Districts across Nepal', '14-Day Free Returns on Mall items', 'Authorized Brand Service Centers'),
(2, 'Oliz Store Kathmandu', 'oliz-store', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=120&auto=format&fit=crop&q=80', 'https://www.olizstore.com', 'https://www.olizstore.com', 'Premier authorized tech haven in Babarmahal, Kathmandu specializing in genuine Apple devices, audiophile gear, and premium accessories.', 4.9, 890, 1, 'Babarmahal, Kathmandu', 'Kathmandu Valley Express + Courier Nationwide', '7-Day Defect Replacement', 'Official GenNext Apple Nepal Warranty'),
(3, 'EvoStore Official', 'evostore', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120&auto=format&fit=crop&q=80', 'https://www.evostore.com.np', 'https://www.evostore.com.np', 'Authorized Apple Premium Reseller in Nepal with flagship showrooms in Durbar Marg, Labim Mall, and Sherpa Mall.', 4.9, 640, 1, 'Durbar Marg & Labim Mall', 'Kathmandu Valley + Major Cities', '7-Day Return on Unopened Units', '1 Year Apple Authorized Warranty'),
(4, 'Samsung Plaza Nepal', 'samsung-plaza', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&auto=format&fit=crop&q=80', 'https://www.samsung.com/np', 'https://www.samsung.com/np', 'Him Electronics authorized nationwide showroom network for genuine Samsung smartphones, OLED displays, and home appliances.', 4.8, 520, 1, 'Nationwide (50+ Showrooms)', 'All 77 Districts', 'Official Importer Exchange Program', '1 Year Official Samsung Nepal Warranty + Breakage Protection'),
(5, 'Smart Living Nepal', 'smart-living', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=120&auto=format&fit=crop&q=80', 'https://www.smartlivingnepal.com', 'https://www.smartlivingnepal.com', 'Nepal''s leading smart home and robotic vacuum automation retailer offering authorized Roborock, Dyson, and IoT devices.', 4.8, 210, 1, 'New Baneshwor, Kathmandu', 'Kathmandu Valley 24h & Major Hubs', '7-Day Free Replacement', '1 Year Authorized Service Guarantee'),
(6, 'Gurkha Blades Nepal', 'gurkha-blades', 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=120&auto=format&fit=crop&q=80', 'https://www.gurkhablades.com', 'https://www.gurkhablades.com', 'Authentic traditional blacksmith forge in Bhojpur and Dharan producing genuine high-carbon service Khukuris and heritage crafts.', 4.9, 380, 1, 'Bhojpur & Dharan (Shipped from KTM)', 'Worldwide & All Nepal Districts', '100% Authentic Hand-Forged Guarantee', 'Lifetime Steel Craftsmanship Assurance'),
(7, 'Goldstar Official Store', 'goldstar-shoes', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80', 'https://www.goldstarshoes.com', 'https://www.goldstarshoes.com', 'The pride of Nepal. Iconic rugged, stylish, and extraordinarily durable footwear designed and manufactured right here in Nepal.', 4.9, 1850, 1, 'Balaju, Kathmandu', 'Nationwide Delivery', '15-Day Size & Defect Exchange', 'Official Factory Warranty');

-- 6. Seed Leading Brands in Nepal
INSERT OR IGNORE INTO brands (id, name, slug, logo_url, description, origin_country, warranty_service_center, is_featured)
VALUES
(1, 'Apple', 'apple', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=120&auto=format&fit=crop&q=80', 'World leader in personal computing, iPhones, iPads, and wearables with official NTA MDMS registration in Nepal.', 'USA', 'GenNext Authorized Service Centers: Sherpa Mall Kathmandu, Pokhara, Butwal', 1),
(2, 'Samsung', 'samsung', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&auto=format&fit=crop&q=80', 'Global electronics titan with highest market presence in Nepal, backed by official distributor Him Electronics & IMS.', 'South Korea', 'Samsung Authorized Service Plaza: Sundhara, Jawalakhel, Pokhara, Biratnagar, Narayangarh', 1),
(3, 'OnePlus', 'oneplus', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&auto=format&fit=crop&q=80', 'Never Settle flagship killer smartphones and audio devices with official authorized distributor warranty in Nepal.', 'Global', 'Smart Talk Authorized Service Center, CTC Mall 5th Floor, Sundhara, Kathmandu', 1),
(4, 'Sony', 'sony', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80', 'Industry-standard active noise cancellation, mirrorless Alpha cameras, and home cinema systems distributed by Nepa Hima.', 'Japan', 'Nepa Hima Service Center, Kantipath, Kathmandu', 1),
(5, 'DJI', 'dji', 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=120&auto=format&fit=crop&q=80', 'Industry benchmark for camera drones, handheld gimbals, and action cameras compliant with CAAN Nepal drone regulations.', 'Global', 'Oliz Store DJI Authorized Service, Babarmahal, Kathmandu', 1),
(6, 'Roborock', 'roborock', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80', 'Intelligent robotic vacuum cleaners and automated mopping solutions engineered for high-altitude dust management.', 'Global', 'Smart Living Service Hub, Kathmandu', 1),
(7, 'Bhojpur Gurkha', 'bhojpur-gurkha', 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=120&auto=format&fit=crop&q=80', 'Centuries-old blacksmith heritage of Bhojpur, crafting world-renowned Khukuris for the Gurkha Regiments.', 'Nepal', 'Bhojpur Master Kami Workshops & Kathmandu Distribution Guild', 1),
(8, 'Goldstar', 'goldstar', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80', 'The undisputed footwear champion of Nepal, worn by millions for daily commute, trekking, and style.', 'Nepal', 'Kiran Shoes Manufacturers, Balaju Industrial Area, Kathmandu', 1);

-- 7. Seed Sample Digital Goods for Direct Sale
INSERT OR IGNORE INTO products (id, name, description, price, image_url, affiliate_url, category_id, is_active)
VALUES
(25, 'Nepal Tech Buyer''s Definitive Field Guide 2026 (PDF & Checklist)', 'Complete 180-page comprehensive handbook detailing how to avoid gray-market phones, verify NTA MDMS tax compliance, calculate customs duties, negotiate with local New Road merchants, and compare bank 0% EMI schemes.', 499, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80', '#', 1, 1);
