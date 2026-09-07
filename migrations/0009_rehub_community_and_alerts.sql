-- Migration 0009: REHub-Style Community Deal Heat, Price Alerts & History Tracking

-- 1. Add Community Voting & Deal Heat to Products
ALTER TABLE products ADD COLUMN votes_up INTEGER NOT NULL DEFAULT 15;
ALTER TABLE products ADD COLUMN votes_down INTEGER NOT NULL DEFAULT 1;
ALTER TABLE products ADD COLUMN temperature INTEGER NOT NULL DEFAULT 95;

-- 2. Price Drop Alerts Table (CamelCamelCamel style for Nepal)
CREATE TABLE IF NOT EXISTS price_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  target_price REAL NOT NULL,
  current_price REAL NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_price_alerts_prod ON price_alerts(product_id, target_price);
CREATE INDEX IF NOT EXISTS idx_price_alerts_email ON price_alerts(email);

-- 3. Dedicated Price History Points Table
CREATE TABLE IF NOT EXISTS price_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  price REAL NOT NULL,
  store_name TEXT NOT NULL DEFAULT 'Official Store',
  recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_price_history_prod ON price_history(product_id, recorded_at DESC);

-- Seed initial price history points for top flagship products
INSERT INTO price_history (product_id, price, store_name, recorded_at) VALUES
(1, 224000, 'Oliz Store', '2026-04-15 10:00:00'),
(1, 219000, 'EvoStore', '2026-06-01 12:00:00'),
(1, 215000, 'Daraz Mall', '2026-08-10 14:00:00'),
(1, 209999, 'Oliz Store', '2026-09-01 09:00:00'),

(2, 195000, 'Samsung Plaza', '2026-05-10 11:00:00'),
(2, 189999, 'Daraz Mall', '2026-07-20 16:00:00'),
(2, 184999, 'Samsung Plaza', '2026-09-02 08:00:00'),

(3, 199000, 'EvoStore', '2026-04-20 10:00:00'),
(3, 189000, 'Oliz Store', '2026-06-15 12:00:00'),
(3, 179500, 'Daraz Mall', '2026-09-01 10:00:00');
