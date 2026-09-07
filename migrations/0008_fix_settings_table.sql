-- Migration 0008: Fix settings table schema for key-value upserts
CREATE TABLE IF NOT EXISTS settings_v2 (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR REPLACE INTO settings_v2(key, value)
SELECT key, value FROM settings WHERE key IS NOT NULL;

DROP TABLE settings;

ALTER TABLE settings_v2 RENAME TO settings;
