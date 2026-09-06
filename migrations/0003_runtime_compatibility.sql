-- Runtime compatibility for the current Worker analytics/script APIs.
CREATE TABLE IF NOT EXISTS custom_scripts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('javascript','css','html')),
  content TEXT NOT NULL,
  location TEXT NOT NULL CHECK (location IN ('head','body_start','body_end')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_custom_scripts_active_location ON custom_scripts(is_active,location);

CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL DEFAULT 'click',
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  path TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_product ON analytics_events(product_id,created_at);
