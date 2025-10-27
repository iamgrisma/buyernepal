-- Migration number: 0004

-- Affiliate Links Table (optional, if generating intermediate links)
CREATE TABLE affiliate_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_offer_id INTEGER NOT NULL,
    short_code TEXT UNIQUE NOT NULL, -- Short identifier for the /ref link
    destination_url TEXT NOT NULL, -- The final affiliate URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_offer_id) REFERENCES product_offers(id) ON DELETE CASCADE
);

-- Click Tracking Table
CREATE TABLE click_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    link_id INTEGER, -- Could be affiliate_links.id or product_offers.id
    link_type TEXT NOT NULL, -- 'offer' or 'shortlink'
    ip_address TEXT,
    user_agent TEXT,
    referer TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Add campaign/source tracking if needed
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT
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
    FOREIGN KEY (click_id) REFERENCES click_tracking(id) ON DELETE SET NULL,
    FOREIGN KEY (product_offer_id) REFERENCES product_offers(id) ON DELETE RESTRICT -- Don't delete offers with conversions easily
);

-- Indexes
CREATE INDEX idx_affiliate_links_short_code ON affiliate_links(short_code);
CREATE INDEX idx_click_tracking_link_id_type ON click_tracking(link_id, link_type);
CREATE INDEX idx_click_tracking_timestamp ON click_tracking(timestamp);
CREATE INDEX idx_conversions_product_offer_id ON conversions(product_offer_id);
CREATE INDEX idx_conversions_status ON conversions(status);

-- Trigger for affiliate_links updated_at
CREATE TRIGGER trigger_affiliate_links_update_updated_at AFTER UPDATE ON affiliate_links
BEGIN
    UPDATE affiliate_links SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
