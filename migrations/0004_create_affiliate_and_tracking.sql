CREATE TABLE affiliate_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_offer_id INTEGER NOT NULL,
    short_code TEXT UNIQUE NOT NULL, -- Short identifier for the /ref link
    destination_url TEXT NOT NULL, -- The final affiliate URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_offer_id) REFERENCES product_offers(id) ON DELETE CASCADE
);

-- Refer Slugs Table (Main table for /refer/:slug links)
CREATE TABLE refer_slugs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_slug TEXT UNIQUE NOT NULL, -- The part used in the /refer/:slug URL
    product_offer_id INTEGER NOT NULL,
    campaign_tag TEXT, -- Optional tracking tag
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_offer_id) REFERENCES product_offers(id) ON DELETE CASCADE
);

-- Click Tracking Table
CREATE TABLE click_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    refer_slug_id INTEGER, -- Link to refer_slugs.id
    product_offer_id INTEGER NOT NULL, -- Denormalized for easier reporting
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_hash TEXT, -- Store hash, not raw IP
    user_agent TEXT,
    referer TEXT,
    country TEXT, -- From CF-IPCountry header
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    FOREIGN KEY (refer_slug_id) REFERENCES refer_slugs(id) ON DELETE SET NULL,
    FOREIGN KEY (product_offer_id) REFERENCES product_offers(id) ON DELETE CASCADE
);

-- Conversion Tracking Table (more complex, might need adjustments)
CREATE TABLE conversions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    click_id INTEGER, -- Link back to the click_tracking entry if possible
    product_offer_id INTEGER NOT NULL,
    vendor_name TEXT NOT NULL,
    order_id TEXT, -- Vendor's order ID, if available
    commission REAL,
    currency TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    conversion_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_payload TEXT, -- Store raw postback data as JSON
    FOREIGN KEY (click_id) REFERENCES click_tracking(id) ON DELETE SET NULL,
    FOREIGN KEY (product_offer_id) REFERENCES product_offers(id) ON DELETE RESTRICT
);

-- Indexes
CREATE INDEX idx_affiliate_links_short_code ON affiliate_links(short_code);
CREATE UNIQUE INDEX idx_refer_slugs_public_slug ON refer_slugs(public_slug); -- Ensure uniqueness
CREATE INDEX idx_refer_slugs_product_offer_id ON refer_slugs(product_offer_id);
CREATE INDEX idx_click_tracking_refer_slug_id ON click_tracking(refer_slug_id);
CREATE INDEX idx_click_tracking_product_offer_id ON click_tracking(product_offer_id);
CREATE INDEX idx_click_tracking_timestamp ON click_tracking(timestamp);
CREATE INDEX idx_conversions_product_offer_id ON conversions(product_offer_id);
CREATE INDEX idx_conversions_status ON conversions(status);

-- Triggers for updated_at
CREATE TRIGGER trigger_affiliate_links_update_updated_at AFTER UPDATE ON affiliate_links
BEGIN
    UPDATE affiliate_links SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
CREATE TRIGGER trigger_refer_slugs_update_updated_at AFTER UPDATE ON refer_slugs
BEGIN
    UPDATE refer_slugs SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
