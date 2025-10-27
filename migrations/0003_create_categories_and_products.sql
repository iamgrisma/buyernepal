-- Migration number: 0003

-- Categories Table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    parent_id INTEGER, -- For subcategories
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Products Table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    brand TEXT,
    model TEXT,
    image_url TEXT, -- URL to image stored elsewhere (e.g., R2)
    category_id INTEGER,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'draft'
    features TEXT, -- JSON array of features
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Product Variants/Offers Table (Stores details from different vendors)
CREATE TABLE product_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    vendor_name TEXT NOT NULL, -- e.g., 'Amazon', 'Daraz', 'BestBuy'
    vendor_product_id TEXT, -- Vendor's specific ID for the product
    price REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NPR',
    affiliate_url TEXT NOT NULL, -- The direct affiliate link for this offer
    is_available BOOLEAN DEFAULT TRUE,
    last_checked_at TIMESTAMP, -- When the price/availability was last verified
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_product_offers_product_id ON product_offers(product_id);
CREATE INDEX idx_product_offers_vendor_name ON product_offers(vendor_name);

-- Triggers for updated_at timestamps
CREATE TRIGGER trigger_categories_update_updated_at AFTER UPDATE ON categories
BEGIN
    UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
CREATE TRIGGER trigger_products_update_updated_at AFTER UPDATE ON products
BEGIN
    UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
CREATE TRIGGER trigger_product_offers_update_updated_at AFTER UPDATE ON product_offers
BEGIN
    UPDATE product_offers SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
