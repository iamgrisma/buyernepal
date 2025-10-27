-- Migration number: 0005

-- Reviews Table
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER, -- Nullable if allowing anonymous reviews initially
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Coupons/Deals Table
CREATE TABLE coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER, -- Link to a specific product if applicable
    category_id INTEGER, -- Link to a category if applicable
    vendor_name TEXT, -- Link to a vendor if applicable
    code TEXT, -- The coupon code itself
    description TEXT NOT NULL,
    discount_type TEXT NOT NULL, -- 'percentage', 'fixed'
    discount_value REAL NOT NULL,
    affiliate_url TEXT, -- Link to apply the coupon/deal
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'expired'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Settings Table (Key-Value Store)
CREATE TABLE settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scripts Table (for custom JS/CSS injection)
CREATE TABLE scripts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    location TEXT NOT NULL, -- 'head', 'body_start', 'body_end'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log Table
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER, -- Who performed the action (if logged in)
    action TEXT NOT NULL, -- e.g., 'product_create', 'setting_update'
    target_type TEXT, -- e.g., 'product', 'category', 'setting'
    target_id TEXT, -- ID of the affected entity
    details TEXT, -- JSON blob of changes or context
    ip_address TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_coupons_status ON coupons(status);
CREATE INDEX idx_coupons_end_date ON coupons(end_date);
CREATE INDEX idx_scripts_location_active ON scripts(location, is_active);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);

-- Triggers for updated_at
CREATE TRIGGER trigger_reviews_update_updated_at AFTER UPDATE ON reviews
BEGIN
    UPDATE reviews SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
CREATE TRIGGER trigger_coupons_update_updated_at AFTER UPDATE ON coupons
BEGIN
    UPDATE coupons SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
CREATE TRIGGER trigger_settings_update_updated_at AFTER UPDATE ON settings
BEGIN
    UPDATE settings SET updated_at = CURRENT_TIMESTAMP WHERE key = old.key;
END;
CREATE TRIGGER trigger_scripts_update_updated_at AFTER UPDATE ON scripts
BEGIN
    UPDATE scripts SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
