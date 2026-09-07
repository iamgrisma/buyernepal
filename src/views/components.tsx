import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../types';

export const Header: FC<{
  settings: SiteSettings;
  categories: Category[];
  activeSlug?: string;
}> = ({ settings, categories, activeSlug }) => {
  const title = settings.site_title || 'BuyerNepal';
  const announcement =
    settings.announcement_text ||
    '⚡ Grand 2026 Festive Deals in Nepal • Verified NPR Prices • 0% Bank EMI • Same-Day Kathmandu Delivery';
  const showAnnouncement = settings.announcement_active !== '0';
  const primaryCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  return (
    <>
      {showAnnouncement && (
        <div className="store-topbar">
          <div className="store-shell store-topbar-inner">
            <span>{announcement}</span>
            <div className="store-topbar-note">
              <span className="topbar-badge">VERIFIED SELLER LINKS</span>
              {settings.contact_phone && <span>📞 {settings.contact_phone}</span>}
            </div>
          </div>
        </div>
      )}

      <header className="store-header">
        <div className="store-shell store-header-inner">
          <a href="/" className="store-brand" aria-label={`${title} Home`}>
            <span className="store-logo-mark">B</span>
            <span>
              <strong>{title}</strong>
              <small>NEPAL SHOPPING INTELLIGENCE</small>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="store-nav" aria-label="Primary navigation">
            <a href="/" className={!activeSlug ? 'store-nav-active' : ''}>
              🏠 All Deals
            </a>
            {primaryCategories.map((cat) => (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={activeSlug === cat.slug ? 'store-nav-active' : ''}
              >
                <span>{cat.icon || '📁'}</span>
                <span>{cat.name}</span>
              </a>
            ))}

            {extraCategories.length > 0 && (
              <div className="nav-dropdown">
                <button type="button" className="nav-dropdown-btn">
                  More Categories ▾
                </button>
                <div className="nav-dropdown-menu">
                  {extraCategories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className={activeSlug === cat.slug ? 'active' : ''}
                    >
                      <span>{cat.icon || '📁'}</span>
                      <span>{cat.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Header Action Utilities: Currency, Theme, Wishlist, Compare, Admin */}
          <div className="store-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Multi-Currency Switcher */}
            <div className="currency-selector" title="Switch Currency">
              <button type="button" className="currency-btn active" data-currency="NPR">🇳🇵 NPR</button>
              <button type="button" className="currency-btn" data-currency="USD">🇺🇸 USD</button>
              <button type="button" className="currency-btn" data-currency="INR">🇮🇳 INR</button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="themeToggleBtn"
              type="button"
              className="theme-toggle-btn"
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              <span id="themeIcon">🌙</span>
            </button>

            {/* Wishlist Header Icon */}
            <button
              id="openWishlistBtn"
              type="button"
              className="wishlist-btn-header"
              aria-label="Open Wishlist"
              title="View saved items"
            >
              <span>❤️</span>
              <span id="wishlistCountBadge" className="wishlist-badge" style={{ display: 'none' }}>0</span>
            </button>

            <a href="/admin" className="store-admin-link">
              🔐 <span>Admin</span>
            </a>

            <button
              id="mobileMenuBtn"
              className="store-menu"
              aria-label="Open mobile navigation menu"
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div id="mobileDrawerBackdrop" className="mobile-drawer-backdrop" />
        <div id="mobileDrawer" className="mobile-drawer">
          <div className="mobile-drawer-header">
            <div className="store-brand">
              <span className="store-logo-mark">B</span>
              <span>
                <strong>{title}</strong>
                <small>SHOP SMARTER</small>
              </span>
            </div>
            <button id="closeMobileMenuBtn" className="mobile-drawer-close" type="button" aria-label="Close menu">
              ×
            </button>
          </div>

          <div className="mobile-drawer-content">
            <span className="mobile-drawer-label">EXPLORE DEPARTMENTS</span>
            <nav className="mobile-nav-links">
              <a href="/" className={!activeSlug ? 'active' : ''}>
                🏠 All Products &amp; Deals
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={activeSlug === cat.slug ? 'active' : ''}
                >
                  <span>{cat.icon || '📁'}</span>
                  <span>{cat.name}</span>
                </a>
              ))}
            </nav>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
              <span className="mobile-drawer-label">MANAGEMENT &amp; SUPPORT</span>
              <nav className="mobile-nav-links">
                <a href="/admin">🔐 Admin Portal Login</a>
                {settings.contact_email && <a href={`mailto:${settings.contact_email}`}>✉️ {settings.contact_email}</a>}
                {settings.whatsapp_number && (
                  <a href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp Support
                  </a>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export const Hero: FC<{ settings: SiteSettings }> = ({ settings }) => {
  const description =
    settings.site_description ||
    'Discover products worth buying in Nepal — verified NPR prices, authorized store links, and zero marketplace markups.';

  return (
    <section className="store-hero">
      <div className="store-shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">🇳🇵 NEPAL'S PREMIER SHOPPING INTELLIGENCE</span>
          <h1>
            Shop smarter.
            <br />
            <em>Never overpay in Nepal.</em>
          </h1>
          <p>{description}</p>

          <div className="hero-search-wrapper">
            <div className="hero-search">
              <span aria-hidden="true">🔍</span>
              <input
                id="searchInput"
                type="text"
                placeholder="Search iPhone, MacBook, Air Fryer, Goldstar, Pashmina…"
                aria-label="Search curated products"
              />
              <button id="clearSearchBtn" type="button" aria-label="Clear search">
                ×
              </button>
            </div>
          </div>

          <div className="hero-tags">
            <span>Popular:</span>
            <button type="button" className="quick-tag" data-search="iPhone">iPhone 16</button>
            <button type="button" className="quick-tag" data-search="Galaxy">Galaxy S25</button>
            <button type="button" className="quick-tag" data-search="MacBook">MacBook M3</button>
            <button type="button" className="quick-tag" data-search="Sony">Sony WH-1000XM5</button>
            <button type="button" className="quick-tag" data-search="Air Fryer">Xiaomi Air Fryer</button>
            <button type="button" className="quick-tag" data-search="Goldstar">Goldstar Shoes</button>
            <button type="button" className="quick-tag" data-search="Pashmina">Chyangra Pashmina</button>
          </div>

          <div className="hero-points">
            <span>✓ Verified NPR Pricing</span>
            <span>✓ Official Nepal Warranties</span>
            <span>✓ 0% Bank Credit Card EMI</span>
            <span>✓ Direct Seller Links</span>
          </div>
        </div>

        <div className="hero-card" aria-hidden="true">
          <div className="hero-card-glow" />
          <div className="hero-card-label">
            <span>⚡ BUYERNEPAL CURATION ENGINE</span>
          </div>
          <div className="hero-card-title">
            Less scrolling.
            <br />
            <strong>Best deals in Nepal.</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
            We monitor authorized sellers across Kathmandu, Lalitpur, and major verified online platforms daily so you buy with 100% confidence.
          </p>
          <div className="hero-stat-row">
            <div className="hero-stat-box">
              <strong>500+</strong>
              <span>Verified Deals</span>
            </div>
            <div className="hero-stat-box">
              <strong>0% EMI</strong>
              <span>Bank Partners</span>
            </div>
            <div className="hero-stat-box">
              <strong>24h</strong>
              <span>KTM Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustStrip: FC = () => (
  <section className="store-shell">
    <div className="trust-strip">
      <div className="trust-item">
        <div className="trust-icon">🇳🇵</div>
        <div className="trust-text">
          <strong>Curated for Nepal</strong>
          <span>Prices, models and distributor warranties verified for Nepali buyers.</span>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">🏷️</div>
        <div className="trust-text">
          <strong>Zero Price Markups</strong>
          <span>Compare authentic prices across Daraz, Oliz Store, EvoStore &amp; more.</span>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">💳</div>
        <div className="trust-text">
          <strong>0% Bank EMI Ready</strong>
          <span>Calculate monthly installments across Nabil, NIC Asia &amp; Global IME.</span>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">⚡</div>
        <div className="trust-text">
          <strong>Fast Nepal Delivery</strong>
          <span>Listed sellers offer 24h Kathmandu delivery and reliable nationwide courier.</span>
        </div>
      </div>
    </div>
  </section>
);

export const FlashSaleSection: FC<{ products: Product[] }> = ({ products }) => {
  const flashProducts = products.filter((p) => p.flash_deal === 1 || (p.price > 40000 && p.original_price));
  const displayItems = flashProducts.slice(0, 4);

  if (displayItems.length === 0) return null;

  return (
    <section className="store-shell">
      <div className="flash-sale-section">
        <div className="flash-sale-header">
          <div className="flash-sale-title-group">
            <span className="flash-flame-icon">🔥</span>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                ⚡ 2026 Mega Flash Sale • Limited Nepal Inventory
              </h2>
              <p style={{ fontSize: '13px', color: '#fda4af', marginTop: '2px' }}>
                Exclusive discounts with verified authorized warranty. Prices end at countdown!
              </p>
            </div>
          </div>

          <div className="flash-timer-wrapper">
            <span className="flash-timer-label">ENDS IN</span>
            <div className="flash-timer-box" id="flashTimer">
              <span className="flash-timer-unit" id="timerHours">05</span>:
              <span className="flash-timer-unit" id="timerMinutes">43</span>:
              <span className="flash-timer-unit" id="timerSeconds">21</span>
            </div>
          </div>
        </div>

        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {displayItems.map((p) => {
            const price = Number(p.price) || 0;
            const originalPrice = Number(p.original_price) || Math.round(price * 1.15);
            const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
            const claimed = p.claimed_percentage || 78;

            return (
              <div
                key={p.id}
                className="product-card"
                style={{ background: 'var(--card-bg)', border: '1px solid rgba(244, 63, 94, 0.3)' }}
              >
                <div style={{ position: 'relative' }}>
                  <a href={`/product/${p.id}`} className="product-image-link">
                    <img src={p.image_url} alt={p.name} loading="lazy" style={{ height: '180px', objectFit: 'cover' }} />
                    <span className="product-badge-overlay" style={{ background: '#e11d48', color: '#ffffff' }}>
                      🔥 -{discountPercent}%
                    </span>
                    <span className="product-store-badge">{p.store_name || 'Daraz Mall'}</span>
                  </a>

                  <div className="card-actions-float">
                    <button
                      type="button"
                      className="btn-action-circle btn-wishlist-add"
                      data-id={p.id}
                      data-name={p.name}
                      data-price={price}
                      data-image={p.image_url}
                      data-url={`/product/${p.id}`}
                      title="Save to Wishlist"
                    >
                      ❤️
                    </button>
                    <button
                      type="button"
                      className="btn-action-circle btn-compare-add"
                      data-id={p.id}
                      data-name={p.name}
                      data-price={price}
                      data-image={p.image_url}
                      data-store={p.store_name || 'Daraz Mall'}
                      data-warranty={p.specs?.['Official Warranty'] || '1 Year Official'}
                      title="Add to Comparison"
                    >
                      ⚖️
                    </button>
                  </div>
                </div>

                <div className="product-card-body" style={{ padding: '16px' }}>
                  <a href={`/product/${p.id}`} className="product-name" style={{ fontSize: '14px' }}>
                    {p.name}
                  </a>

                  <div className="flash-meter-box">
                    <div className="flash-meter-label">
                      <span>⚡ Claimed: <strong>{claimed}%</strong></span>
                      <span style={{ color: '#f43f5e' }}>Only 3 left</span>
                    </div>
                    <div className="flash-meter-track">
                      <div className="flash-meter-fill" style={{ width: `${claimed}%` }} />
                    </div>
                  </div>

                  <div className="product-card-bottom" style={{ marginTop: '14px' }}>
                    <div className="price-block">
                      <div className="original-price-row">
                        <span className="original-price" data-base-npr={originalPrice}>
                          Rs. {originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <strong className="product-price" data-base-npr={price}>
                        Rs. {price.toLocaleString()}
                      </strong>
                    </div>

                    <a
                      className="product-buy"
                      href={p.affiliate_url || `/product/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      style={{ background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' }}
                    >
                      Grab Deal ⚡
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const CouponsStrip: FC<{ coupons: Coupon[] }> = ({ coupons }) => {
  if (!coupons || coupons.length === 0) return null;

  return (
    <section className="store-shell coupons-section">
      <div className="coupons-heading">
        <h3>
          <span>🏷️</span> Exclusive Nepali Promo Codes &amp; Vouchers
        </h3>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Click code to copy</span>
      </div>
      <div className="coupons-grid">
        {coupons.map((c) => (
          <div key={c.id} className="coupon-card">
            <div className="coupon-info">
              <strong>{c.code}</strong>
              <span>{c.description}</span>
            </div>
            <button
              type="button"
              className="copy-coupon-btn"
              data-code={c.code}
            >
              Copy Code
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.original_price) || 0;
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  let formattedPrice = String(price);
  let formattedOriginal = String(originalPrice);
  try {
    formattedPrice = price.toLocaleString('en-NP');
    if (originalPrice > 0) formattedOriginal = originalPrice.toLocaleString('en-NP');
  } catch {
    formattedPrice = price.toLocaleString();
    if (originalPrice > 0) formattedOriginal = originalPrice.toLocaleString();
  }

  const badge = product.badge || 'Verified Deal';
  const storeName = product.store_name || 'Daraz Mall';
  const rating = product.rating || 4.8;
  const reviewCount = product.review_count || 42;
  const emiAvailable = product.emi_available === 1;
  const emiPrice = product.emi_starting_price || Math.round(price / 18);

  return (
    <article
      className="product-card"
      data-id={product.id}
      data-name={product.name.toLowerCase()}
      data-desc={(product.description || '').toLowerCase()}
      data-category={String(product.category_id || '')}
      data-price={price}
      data-store={storeName.toLowerCase()}
      data-badge={badge.toLowerCase()}
      data-rating={rating}
      data-discount={discountPercent}
      data-brand={(product.brand || '').toLowerCase()}
      data-emi={emiAvailable ? '1' : '0'}
    >
      <div style={{ position: 'relative' }}>
        <a
          href={`/product/${product.id}`}
          className="product-image-link"
          aria-label={`View details for ${product.name}`}
        >
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} loading="lazy" decoding="async" />
          ) : (
            <div className="product-image-placeholder" aria-hidden="true">
              <span>BN</span>
            </div>
          )}
          <span className="product-badge-overlay">{badge}</span>
          <span className="product-store-badge">{storeName}</span>
        </a>

        {/* Quick Action Floating Circles: Wishlist Heart + Comparison Balance */}
        <div className="card-actions-float">
          <button
            type="button"
            className="btn-action-circle btn-wishlist-add"
            data-id={product.id}
            data-name={product.name}
            data-price={price}
            data-image={product.image_url}
            data-url={`/product/${product.id}`}
            title="Add to Wishlist"
          >
            ❤️
          </button>
          <button
            type="button"
            className="btn-action-circle btn-compare-add"
            data-id={product.id}
            data-name={product.name}
            data-price={price}
            data-image={product.image_url}
            data-store={storeName}
            data-warranty={product.specs?.['Official Warranty'] || '1 Year Official'}
            title="Add to Compare"
          >
            ⚖️
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category-tag">{product.category_name || 'Featured'}</span>
          <span className="product-rating">
            ★ {rating.toFixed(1)} <small style={{ color: 'var(--muted)', fontWeight: 500 }}>({reviewCount})</small>
          </span>
        </div>

        <a href={`/product/${product.id}`} className="product-name">
          {product.name}
        </a>

        <p className="product-description">{product.description || 'Explore verified specifications and Nepal store pricing.'}</p>

        {/* 0% EMI Indicator Pill */}
        {emiAvailable && (
          <div style={{ margin: '6px 0', fontSize: '11px', fontWeight: 700, color: 'var(--emerald)' }}>
            💳 0% EMI from Rs. {emiPrice.toLocaleString()}/mo
          </div>
        )}

        <div className="product-card-bottom">
          <div className="price-block">
            {discountPercent > 0 && (
              <div className="original-price-row">
                <span className="original-price" data-base-npr={originalPrice}>
                  Rs. {formattedOriginal}
                </span>
                <span className="discount-pill">-{discountPercent}%</span>
              </div>
            )}
            <strong className="product-price" data-base-npr={price}>
              Rs. {formattedPrice}
            </strong>
          </div>

          {product.affiliate_url ? (
            <a
              className="product-buy"
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              title={`Buy on ${storeName}`}
            >
              Shop <span>↗</span>
            </a>
          ) : (
            <a className="product-buy" href={`/product/${product.id}`}>
              View <span>→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const EditorialBanner: FC<{ count: number }> = ({ count }) => (
  <section className="store-shell">
    <div className="editorial-banner">
      <div>
        <span className="section-kicker" style={{ color: '#fda4af' }}>A BETTER SHOPPING EXPERIENCE</span>
        <h2>
          Verified Nepal prices.
          <br />
          No marketplace confusion.
        </h2>
        <p>
          BuyerNepal cuts through endless copycat listings, fake discounts, and unverified sellers.
          Every product listed here is inspected for authentic Nepal pricing, manufacturer warranty,
          and buyer satisfaction.
        </p>
      </div>
      <div className="editorial-stat">
        <strong>{count || '22+'}</strong>
        <span>Hand-Curated Items</span>
      </div>
    </div>
  </section>
);

export const WishlistDrawer: FC = () => (
  <>
    <div id="wishlistDrawerBackdrop" className="wishlist-drawer-backdrop" />
    <aside id="wishlistDrawer" className="wishlist-drawer" aria-label="Saved Deals Wishlist">
      <div className="wishlist-drawer-header">
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Saved Deals Wishlist</h3>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }} id="wishlistSubCount">
            0 items saved
          </span>
        </div>
        <button id="closeWishlistBtn" type="button" className="mobile-drawer-close" aria-label="Close wishlist">
          ×
        </button>
      </div>

      <div id="wishlistItemsList" className="wishlist-drawer-body">
        <div className="wishlist-empty" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>❤️</span>
          <strong style={{ display: 'block', color: 'var(--ink)' }}>Your wishlist is empty</strong>
          <p style={{ fontSize: '13px', marginTop: '6px' }}>Click the heart icon on any product to save it here for later.</p>
        </div>
      </div>

      <div className="wishlist-drawer-footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
          <span>Total Saved Value:</span>
          <strong id="wishlistTotalValue" style={{ color: 'var(--accent)', fontSize: '15px' }}>Rs. 0</strong>
        </div>
        <button id="clearWishlistBtn" type="button" className="filter-pill" style={{ width: '100%', padding: '10px' }}>
          Clear Wishlist
        </button>
      </div>
    </aside>
  </>
);

export const ComparisonDock: FC = () => (
  <>
    <div id="compareDock" className="compare-dock">
      <div className="store-shell compare-dock-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚖️</span>
          <strong>Product Comparison Dock</strong>
          <span id="compareDockCount" style={{ fontSize: '12px', color: 'var(--muted)' }}>(0 of 3 items)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button id="openCompareModalBtn" type="button" className="product-buy" style={{ padding: '6px 14px', fontSize: '12px' }}>
            Compare Side-by-Side 🔍
          </button>
          <button id="closeCompareDockBtn" type="button" className="filter-pill" style={{ padding: '6px 12px' }}>
            Close
          </button>
        </div>
      </div>
      <div className="store-shell compare-dock-body">
        <div id="compareDockItems" className="compare-dock-items">
          {/* Populated dynamically via client JS */}
        </div>
      </div>
    </div>

    {/* Full Screen Comparison Modal */}
    <div id="compareModalBackdrop" className="compare-modal-backdrop">
      <div className="compare-modal-content">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Detailed Product Comparison</h3>
          <button id="closeCompareModalBtn" type="button" className="mobile-drawer-close" aria-label="Close modal">
            ×
          </button>
        </div>
        <div id="compareModalBody" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Dynamic Comparison Matrix injected via JS */}
        </div>
      </div>
    </div>
  </>
);

export const NepalCityDeliveryEstimator: FC = () => (
  <div className="delivery-estimator-card">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '24px' }}>🚚</span>
      <div>
        <strong style={{ fontSize: '14px', display: 'block' }}>Nepal Courier &amp; Delivery Coverage</strong>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Check delivery time and charges to your city</span>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <select id="deliveryCitySelect" className="delivery-city-select" aria-label="Select delivery city">
        <option value="ktm">Kathmandu / Lalitpur / Bhaktapur</option>
        <option value="pkr">Pokhara Valley</option>
        <option value="chw">Chitwan (Bharatpur / Narayangarh)</option>
        <option value="brt">Biratnagar / Itahari</option>
        <option value="btw">Butwal / Bhairahawa</option>
        <option value="dhn">Dharan</option>
        <option value="oth">Other Districts</option>
      </select>

      <div id="deliveryOutput" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--emerald)' }}>
        ⚡ Same-Day / 24h Free Delivery • Cash on Delivery Available
      </div>
    </div>
  </div>
);

export const NepalShoppingFaq: FC = () => (
  <section className="store-shell faq-container">
    <div className="section-heading" style={{ marginBottom: '24px' }}>
      <div>
        <span className="section-kicker">BUYER GUIDE &amp; HELP</span>
        <h2>Frequently Asked Questions in Nepal</h2>
      </div>
    </div>

    <div className="faq-item">
      <div className="faq-question">
        <span>Are all smartphones and tablets NTA / MDMS approved in Nepal?</span>
        <span className="faq-icon">▾</span>
      </div>
      <div className="faq-answer">
        Yes, 100%. All mobile devices featured on BuyerNepal are sourced exclusively through authorized national distributors (such as GenNext for Apple, Samsung Plaza for Samsung) with official customs clearance, VAT invoice, and verified MDMS registration with Nepal Telecommunications Authority.
      </div>
    </div>

    <div className="faq-item">
      <div className="faq-question">
        <span>How does 0% Bank Credit Card EMI work in Nepal?</span>
        <span className="faq-icon">▾</span>
      </div>
      <div className="faq-answer">
        Cardholders of partner Nepali commercial banks (including Nabil Bank, NIC Asia, Global IME, Himalayan Bank, and Sanima Bank) can convert purchases of Rs. 10,000 or above into 6, 12, or 18 equal monthly installments at 0% markup without any hidden processing charges.
      </div>
    </div>

    <div className="faq-item">
      <div className="faq-question">
        <span>Is Cash on Delivery (COD) available outside Kathmandu Valley?</span>
        <span className="faq-icon">▾</span>
      </div>
      <div className="faq-answer">
        Yes! Most verified sellers and courier partners (Nepal Can Move, Sundar Courier, Daraz Express) support Cash on Delivery across major cities including Pokhara, Chitwan, Biratnagar, Butwal, and Dharan. You can inspect the sealed package upon courier handover.
      </div>
    </div>

    <div className="faq-item">
      <div className="faq-question">
        <span>How do I claim authorized warranty on products bought through BuyerNepal links?</span>
        <span className="faq-icon">▾</span>
      </div>
      <div className="faq-answer">
        Every purchase made through our verified store links includes an official VAT bill and manufacturer warranty card. You can present these at any official brand service center in Kathmandu, Pokhara, or provincial branch hubs for complimentary warranty repairs.
      </div>
    </div>
  </section>
);

export const MobileBottomBar: FC<{ activeTab?: string }> = ({ activeTab = 'home' }) => (
  <div className="mobile-bottom-bar" aria-label="Mobile Navigation">
    <div className="mobile-bottom-inner">
      <a href="/" className={`mobile-bottom-item ${activeTab === 'home' ? 'active' : ''}`}>
        <span>🏠</span>
        <span>Home</span>
      </a>
      <a
        href="#searchInput"
        className="mobile-bottom-item"
        onClick={(e: any) => {
          const inp = document.getElementById('searchInput');
          if (inp) {
            e.preventDefault();
            inp.scrollIntoView({ behavior: 'smooth' });
            inp.focus();
          }
        }}
      >
        <span>🔍</span>
        <span>Search</span>
      </a>
      <a
        href="#"
        id="mobileWishlistBtn"
        className="mobile-bottom-item"
        onClick={(e: any) => {
          e.preventDefault();
          const btn = document.getElementById('openWishlistBtn');
          if (btn) btn.click();
        }}
      >
        <span>❤️</span>
        <span>Wishlist</span>
      </a>
      <a href="/category/electronics" className="mobile-bottom-item">
        <span>📱</span>
        <span>Mobiles</span>
      </a>
      <a href="/admin" className="mobile-bottom-item">
        <span>🔐</span>
        <span>Admin</span>
      </a>
    </div>
  </div>
);

export const Footer: FC<{ settings: SiteSettings; categories: Category[] }> = ({
  settings,
  categories
}) => {
  const title = settings.site_title || 'BuyerNepal';
  const description =
    settings.site_description ||
    'Discover products worth buying in Nepal — curated recommendations, verified NPR prices, and direct store links.';

  return (
    <footer className="store-footer">
      <div className="store-shell footer-grid">
        <div>
          <a href="/" className="store-brand">
            <span className="store-logo-mark">B</span>
            <span>
              <strong>{title}</strong>
              <small>NEPAL SHOPPING INTELLIGENCE</small>
            </span>
          </a>
          <p>{description}</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', fontSize: '18px' }}>
            {settings.social_facebook && (
              <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                📘
              </a>
            )}
            {settings.social_instagram && (
              <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                📸
              </a>
            )}
            {settings.whatsapp_number && (
              <a href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                💬
              </a>
            )}
          </div>
        </div>

        <div>
          <h3>Top Departments</h3>
          {categories.slice(0, 5).map((cat) => (
            <a key={cat.id} href={`/category/${cat.slug}`}>
              {cat.icon || '📁'} {cat.name}
            </a>
          ))}
        </div>

        <div>
          <h3>Verified Stores</h3>
          <a href="https://www.daraz.com.np" target="_blank" rel="noopener noreferrer nofollow">Daraz Mall Nepal ↗</a>
          <a href="/" onClick={(e: any) => e.preventDefault()}>Oliz Store Kathmandu</a>
          <a href="/" onClick={(e: any) => e.preventDefault()}>EvoStore Official</a>
          <a href="/" onClick={(e: any) => e.preventDefault()}>Samsung Plaza Nepal</a>
          <a href="/" onClick={(e: any) => e.preventDefault()}>Goldstar Official Store</a>
        </div>

        <div>
          <h3>Administration</h3>
          <a href="/admin">Admin Management Portal</a>
          <a href="/admin/login">Staff Login</a>
          <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '10px', lineHeight: '1.5' }}>
            Built with pure Hono Edge SSR on Cloudflare Workers + D1 database in Kathmandu, Nepal.
          </span>
        </div>
      </div>

      <div className="store-shell footer-bottom">
        <span>© {new Date().getFullYear()} {title}. All verified prices in NPR (Nepali Rupees).</span>
        <span>Crafted with ❤️ for shoppers across Nepal 🇳🇵</span>
      </div>

      {/* Global Wishlist Drawer Component */}
      <WishlistDrawer />

      {/* Global Comparison Floating Dock */}
      <ComparisonDock />

      {/* Global Toast Alert */}
      <div id="toastMessage" className="toast-msg">
        <span>✓</span> <span id="toastText">Action successful!</span>
      </div>
    </footer>
  );
};
