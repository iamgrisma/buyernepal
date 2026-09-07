import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../types';

export const Header: FC<{
  settings: SiteSettings;
  categories?: Category[];
  activeSlug?: string;
}> = ({ settings, categories = [], activeSlug }) => {
  const title = settings.site_title || 'BuyerNepal';
  const announcement =
    settings.announcement_text ||
    '🇳🇵 Nepal\'s Independent Shopping Intelligence • Real-Time Multi-Store Price Comparison & Tech Reviews';
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
        {/* Tier 1: Brand, Search & Actions */}
        <div className="store-shell store-header-main">
          <a href="/" className="store-brand" aria-label={`${title} Home`}>
            <span className="store-logo-mark">B</span>
            <span>
              <strong>{title}</strong>
              <small>NEPAL SHOPPING INTELLIGENCE</small>
            </span>
          </a>

          {/* Central Header Quick Search with Live Dropdown */}
          <div className="store-header-search">
            <div className="search-form-wrap">
              <form
                action="/"
                method="get"
                className="header-search-form"
                onsubmit="event.preventDefault(); const inp = this.querySelector('input'); const val = inp ? inp.value.trim() : ''; window.location.href = '/?q=' + encodeURIComponent(val);"
              >
                <span className="search-icon">🔍</span>
                <input
                  id="headerSearchInput"
                  type="search"
                  placeholder="Search iPhone, MacBook, Goldstar, Pashmina..."
                  className="header-search-input"
                  aria-label="Search verified deals in Nepal"
                  autoComplete="off"
                />
                <button type="submit" className="header-search-submit">Search</button>
              </form>
              <div id="headerSearchDropdown" className="search-autocomplete-dropdown" />
            </div>
          </div>

          {/* Header Action Utilities: Currency, Theme, Wishlist, Admin */}
          <div className="store-header-actions">
            {/* Multi-Currency Switcher */}
            {settings.currency_converter_enabled !== '0' && (
              <div className="currency-selector" title="Switch Display Currency">
                <button type="button" className="currency-btn active" data-currency="NPR">🇳🇵 NPR</button>
                <button type="button" className="currency-btn" data-currency="USD">🇺🇸 USD</button>
                <button type="button" className="currency-btn" data-currency="INR">🇮🇳 INR</button>
              </div>
            )}

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

            {/* Staff / Admin Access */}
            <a href="/admin" className="store-admin-link" title="Store Management Portal">
              🔐 <span>Admin</span>
            </a>

            {/* Mobile Hamburger */}
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

        {/* Tier 2: Dedicated Category Navigation Strip */}
        <div className="store-nav-strip">
          <div className="store-shell store-nav-strip-inner">
            <div className="store-nav-scroll-wrapper">
              <nav className="store-nav-pills" aria-label="Department navigation">
                {settings.menu_show_deals !== '0' && (
                  <a href="/" className={`nav-pill ${!activeSlug ? 'nav-pill-active' : ''}`}>
                    <span>🏠</span>
                    <span>All Deals</span>
                  </a>
                )}
                {settings.menu_show_compare !== '0' && (
                  <a
                    href="/compare"
                    className={`nav-pill ${activeSlug === 'compare' ? 'nav-pill-active' : ''}`}
                    style={{ borderColor: 'rgba(99, 102, 241, 0.35)', background: activeSlug === 'compare' ? 'var(--primary)' : 'rgba(99, 102, 241, 0.08)' }}
                  >
                    <span>⚖️</span>
                    <span>Compare</span>
                  </a>
                )}
                {settings.menu_show_charts !== '0' && (
                  <a
                    href="/charts"
                    className={`nav-pill ${activeSlug === 'charts' ? 'nav-pill-active' : ''}`}
                    style={{ borderColor: 'rgba(234, 179, 8, 0.35)', background: activeSlug === 'charts' ? 'var(--primary)' : 'rgba(234, 179, 8, 0.08)' }}
                  >
                    <span>🏆</span>
                    <span>Top Charts</span>
                  </a>
                )}
                {settings.menu_show_blog !== '0' && (
                  <a
                    href="/blog"
                    className={`nav-pill ${activeSlug === 'blog' ? 'nav-pill-active' : ''}`}
                    style={{ borderColor: 'rgba(217, 119, 6, 0.35)', background: activeSlug === 'blog' ? 'var(--primary)' : 'rgba(245, 158, 11, 0.08)' }}
                  >
                    <span>📰</span>
                    <span>Tech Guides &amp; Blog</span>
                  </a>
                )}
                {settings.menu_show_coupons !== '0' && (
                  <a
                    href="/coupons"
                    className={`nav-pill ${activeSlug === 'coupons' ? 'nav-pill-active' : ''}`}
                    style={{ borderColor: 'rgba(225, 29, 72, 0.35)', background: activeSlug === 'coupons' ? 'var(--primary)' : 'rgba(225, 29, 72, 0.08)' }}
                  >
                    <span>🎟️</span>
                    <span>Coupons &amp; Deals</span>
                  </a>
                )}
                {settings.menu_show_stores !== '0' && (
                  <a
                    href="/stores"
                    className={`nav-pill ${activeSlug === 'stores' ? 'nav-pill-active' : ''}`}
                  >
                    <span>🏪</span>
                    <span>Stores</span>
                  </a>
                )}
                {settings.menu_show_brands !== '0' && (
                  <a
                    href="/brands"
                    className={`nav-pill ${activeSlug === 'brands' ? 'nav-pill-active' : ''}`}
                  >
                    <span>🏷️</span>
                    <span>Brands</span>
                  </a>
                )}
                {settings.custom_nav_1_label && settings.custom_nav_1_url && (
                  <a href={settings.custom_nav_1_url} className="nav-pill">
                    <span>🔗</span>
                    <span>{settings.custom_nav_1_label}</span>
                  </a>
                )}
                {settings.custom_nav_2_label && settings.custom_nav_2_url && (
                  <a href={settings.custom_nav_2_url} className="nav-pill">
                    <span>🔗</span>
                    <span>{settings.custom_nav_2_label}</span>
                  </a>
                )}
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className={`nav-pill ${activeSlug === cat.slug ? 'nav-pill-active' : ''}`}
                  >
                    <span className="nav-pill-icon">{cat.icon || '🛍️'}</span>
                    <span>{cat.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Review Authority & Trust Badges */}
            {settings.header_badges_enabled !== '0' && (
              <div className="store-nav-highlights">
                <span className="nav-highlight-item">{settings.nav_highlight_1 || '🔍 Independent Reviews'}</span>
                <span className="nav-highlight-item">{settings.nav_highlight_2 || '⚖️ Multi-Store Compare'}</span>
                <span className="nav-highlight-item">{settings.nav_highlight_3 || '🇳🇵 Verified Nepal Pricing'}</span>
              </div>
            )}
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
            <span className="mobile-drawer-label">EXPLORE DEPARTMENTS &amp; TOOLS</span>
            <nav className="mobile-nav-links">
              <a href="/" className={!activeSlug ? 'active' : ''}>
                🏠 All Products &amp; Deals
              </a>
              <a href="/compare" className={activeSlug === 'compare' ? 'active' : ''}>
                ⚖️ Head-to-Head Compare
              </a>
              <a href="/charts" className={activeSlug === 'charts' ? 'active' : ''}>
                🏆 Top 10 Ranked Charts
              </a>
              <a href="/blog" className={activeSlug === 'blog' ? 'active' : ''}>
                📰 Tech Blog &amp; Guides
              </a>
              <a href="/coupons" className={activeSlug === 'coupons' ? 'active' : ''}>
                🎟️ Verified Promo Codes
              </a>
              <a href="/stores" className={activeSlug === 'stores' ? 'active' : ''}>
                🏪 Verified Nepal Stores
              </a>
              <a href="/brands" className={activeSlug === 'brands' ? 'active' : ''}>
                🏷️ Official Brands
              </a>
              <a href="/track-order" className={activeSlug === 'orders' ? 'active' : ''}>
                📦 Track My Order
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
  const eyebrow = settings.hero_eyebrow || "🇳🇵 NEPAL'S PREMIER SHOPPING INTELLIGENCE";
  const headlineLine1 = settings.hero_headline_line1 || 'Shop smarter.';
  const headlineLine2 = settings.hero_headline_line2 || 'Never overpay in Nepal.';
  const subtitle =
    settings.hero_subtitle ||
    settings.site_description ||
    'Discover products worth buying in Nepal — verified NPR prices, authorized store links, and zero marketplace markups.';

  const tags = (settings.hero_tags || 'iPhone 16, Galaxy S25, MacBook M3, Sony WH-1000XM5, Xiaomi Air Fryer, Goldstar Shoes, Chyangra Pashmina')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const trustPoints = [
    settings.hero_point_1 || '✓ Verified NPR Pricing',
    settings.hero_point_2 || '✓ Official Nepal Warranties',
    settings.hero_point_3 || '✓ 0% Bank Credit Card EMI',
    settings.hero_point_4 || '✓ Direct Seller Links'
  ].filter(Boolean);

  const stat1Num = settings.hero_stat1_num || '500+';
  const stat1Lbl = settings.hero_stat1_lbl || 'Curated Products';
  const stat2Num = settings.hero_stat2_num || '15+';
  const stat2Lbl = settings.hero_stat2_lbl || 'Nepal Stores';
  const stat3Num = settings.hero_stat3_num || '100%';
  const stat3Lbl = settings.hero_stat3_lbl || 'Unbiased Testing';

  return (
    <section className="store-hero">
      <div className="store-shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>
            {headlineLine1}
            <br />
            <em>{headlineLine2}</em>
          </h1>
          <p>{subtitle}</p>

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

          {tags.length > 0 && (
            <div className="hero-tags">
              <span>Popular:</span>
              {tags.map((tag) => (
                <button key={tag} type="button" className="quick-tag" data-search={tag}>
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="hero-points">
            {trustPoints.map((pt, i) => (
              <span key={i}>{pt}</span>
            ))}
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
              <strong>{stat1Num}</strong>
              <span>{stat1Lbl}</span>
            </div>
            <div className="hero-stat-box">
              <strong>{stat2Num}</strong>
              <span>{stat2Lbl}</span>
            </div>
            <div className="hero-stat-box">
              <strong>{stat3Num}</strong>
              <span>{stat3Lbl}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustStrip: FC<{ settings?: SiteSettings }> = ({ settings }) => {
  const item1Icon = settings?.trust_item1_icon || '🇳🇵';
  const item1Title = settings?.trust_item1_title || 'Curated for Nepal';
  const item1Desc = settings?.trust_item1_desc || 'Prices, models and distributor warranties verified for Nepali buyers.';

  const item2Icon = settings?.trust_item2_icon || '🏷️';
  const item2Title = settings?.trust_item2_title || 'Zero Price Markups';
  const item2Desc = settings?.trust_item2_desc || 'Compare authentic prices across Daraz, Oliz Store, EvoStore & more.';

  const item3Icon = settings?.trust_item3_icon || '🔍';
  const item3Title = settings?.trust_item3_title || 'Independent Testing';
  const item3Desc = settings?.trust_item3_desc || 'In-depth benchmarks, real-world testing, pros & cons from Nepal editors.';

  const item4Icon = settings?.trust_item4_icon || '⚖️';
  const item4Title = settings?.trust_item4_title || 'Multi-Store Comparison';
  const item4Desc = settings?.trust_item4_desc || 'Live price tracking & stock verification across verified Nepal retailers.';

  return (
    <section className="store-shell">
      <div className="trust-strip">
        <div className="trust-item">
          <div className="trust-icon">{item1Icon}</div>
          <div className="trust-text">
            <strong>{item1Title}</strong>
            <span>{item1Desc}</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">{item2Icon}</div>
          <div className="trust-text">
            <strong>{item2Title}</strong>
            <span>{item2Desc}</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">{item3Icon}</div>
          <div className="trust-text">
            <strong>{item3Title}</strong>
            <span>{item3Desc}</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">{item4Icon}</div>
          <div className="trust-text">
            <strong>{item4Title}</strong>
            <span>{item4Desc}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FlashSaleSection: FC<{ products: Product[]; settings?: SiteSettings }> = ({ products, settings }) => {
  const flashProducts = products.filter((p) => p.flash_deal === 1 || (p.price > 40000 && p.original_price));
  const displayItems = flashProducts.slice(0, 4);

  if (displayItems.length === 0) return null;

  const title = settings?.flash_sale_title || '⚡ 2026 Mega Flash Sale • Limited Nepal Inventory';
  const subtitle = settings?.flash_sale_subtitle || 'Exclusive discounts with verified authorized warranty. Prices end at countdown!';

  return (
    <section className="store-shell">
      <div className="flash-sale-section">
        <div className="flash-sale-header">
          <div className="flash-sale-title-group">
            <span className="flash-flame-icon">🔥</span>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                {title}
              </h2>
              <p style={{ fontSize: '13px', color: '#fda4af', marginTop: '2px' }}>
                {subtitle}
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
            const storeName = p.store_name || 'Daraz Mall';

            return (
              <article
                key={p.id}
                className="product-card"
                style={{ border: '1px solid rgba(220, 38, 38, 0.25)' }}
              >
                <div className="product-card-top-stage">
                  <a href={`/product/${p.id}`} className="product-image-link" aria-label={`View deal for ${p.name}`}>
                    <img src={p.image_url} alt={p.name} loading="lazy" decoding="async" />
                  </a>

                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="product-card-badges">
                      <span className="product-badge-overlay deal-accent">-{discountPercent}%</span>
                    </div>
                  )}

                  {/* Quick Action Circles */}
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
                      aria-label="Save to Wishlist"
                    >
                      ♡
                    </button>
                    <button
                      type="button"
                      className="btn-action-circle btn-compare-add"
                      data-id={p.id}
                      data-name={p.name}
                      data-price={price}
                      data-image={p.image_url}
                      data-store={storeName}
                      data-warranty={p.specs?.['Official Warranty'] || '1 Year Official'}
                      title="Add to Comparison"
                      aria-label="Add to Comparison"
                    >
                      ⇌
                    </button>
                  </div>
                </div>

                <div className="product-card-body">
                  <div className="pc-meta">
                    <span className="pc-cat">{p.category_name || 'Flash Deal'}</span>
                    <span className="pc-rating">★ {(p.rating || 4.8).toFixed(1)}</span>
                  </div>

                  <a href={`/product/${p.id}`} className="product-name" title={p.name}>
                    {p.name}
                  </a>

                  <div className="pc-store-row">
                    <span className="pc-store-chip">✓ {storeName}</span>
                    <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 700, marginLeft: 'auto' }}>
                      🔥 {claimed}% Claimed
                    </span>
                  </div>

                  <div className="flash-meter-box" style={{ margin: '0 0 10px 0' }}>
                    <div className="flash-meter-track" style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div className="flash-meter-fill" style={{ width: `${claimed}%`, height: '100%', background: 'linear-gradient(90deg, #dc2626, #f97316)', borderRadius: '2px' }} />
                    </div>
                  </div>

                  <div className="product-card-bottom">
                    <div className="price-block">
                      <span className="original-price" data-base-npr={originalPrice}>
                        Rs. {originalPrice.toLocaleString()}
                      </span>
                      <strong className="product-price" data-base-npr={price}>
                        Rs. {price.toLocaleString()}
                      </strong>
                    </div>

                    <a
                      className="product-buy"
                      href={p.affiliate_url || `/product/${p.id}`}
                      target={p.affiliate_url ? '_blank' : '_self'}
                      rel="noopener noreferrer nofollow"
                      style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
                    >
                      Grab Deal ⚡
                    </a>
                  </div>
                </div>
              </article>
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
  const brand = product.brand || '';
  const catName = product.category_name || 'Tech';

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
      data-brand={(brand).toLowerCase()}
      data-emi={emiAvailable ? '1' : '0'}
    >
      <div className="product-card-top-stage">
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
        </a>

        {/* Discount Badge — top-left only when there's a deal */}
        {discountPercent > 0 && (
          <div className="product-card-badges">
            <span className="product-badge-overlay deal-accent">-{discountPercent}%</span>
          </div>
        )}

        {/* Quick Action Circles — top-right */}
        <div className="card-actions-float">
          <button
            type="button"
            className="btn-action-circle btn-wishlist-add"
            data-id={product.id}
            data-name={product.name}
            data-price={price}
            data-image={product.image_url}
            data-url={`/product/${product.id}`}
            title="Save to Wishlist"
            aria-label="Save to Wishlist"
          >
            ♡
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
            title="Compare"
            aria-label="Add to Compare"
          >
            ⇌
          </button>
        </div>
      </div>

      {/* Card Body — Clean hierarchy, no clutter */}
      <div className="product-card-body">
        {/* Row 1: Category + Rating */}
        <div className="pc-meta">
          <span className="pc-cat">{catName}{brand ? ` · ${brand}` : ''}</span>
          <span className="pc-rating">★ {rating.toFixed(1)}</span>
        </div>

        {/* Row 2: Product Name */}
        <a href={`/product/${product.id}`} className="product-name" title={product.name}>
          {product.name}
        </a>

        {/* Row 3: Store verified tag + Deal Heat */}
        <div className="pc-store-row">
          <span className="pc-store-chip">✓ {storeName}</span>
          <div className={`deal-temperature-badge ${(product.temperature || 95) < 30 ? 'cold' : ''}`} title={`${product.votes_up || 18} upvotes`}>
            <span>🔥</span>
            <span>+{product.temperature || 95}°</span>
          </div>
          {emiAvailable && <span className="pc-emi-chip">0% EMI</span>}
        </div>

        {/* Row 4: Price + CTA */}
        <div className="product-card-bottom">
          <div className="price-block">
            {discountPercent > 0 && originalPrice > 0 && (
              <span className="original-price" data-base-npr={originalPrice}>
                Rs. {formattedOriginal}
              </span>
            )}
            <strong className="product-price" data-base-npr={price}>
              Rs. {formattedPrice}
            </strong>
          </div>

          <a
            className="product-buy"
            href={product.affiliate_url || `/product/${product.id}`}
            target={product.affiliate_url ? '_blank' : '_self'}
            rel="noopener noreferrer nofollow"
            title={`View deal on ${storeName}`}
          >
            {product.affiliate_url ? 'Buy Now' : 'Details'}
          </a>
        </div>
      </div>
    </article>
  );
};

export const EditorialBanner: FC<{ count: number; settings?: SiteSettings }> = ({ count, settings }) => {
  const kicker = settings?.editorial_banner_kicker || 'A BETTER SHOPPING EXPERIENCE';
  const title = settings?.editorial_banner_title || 'Verified Nepal prices.\nNo marketplace confusion.';
  const text =
    settings?.editorial_banner_text ||
    'BuyerNepal cuts through endless copycat listings, fake discounts, and unverified sellers. Every product listed here is inspected for authentic Nepal pricing, manufacturer warranty, and buyer satisfaction.';

  return (
    <section className="store-shell">
      <div className="editorial-banner">
        <div>
          <span className="section-kicker" style={{ color: '#fda4af' }}>{kicker}</span>
          <h2 style={{ whiteSpace: 'pre-line' }}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="editorial-stat">
          <strong>{count || '22+'}</strong>
          <span>Hand-Curated Items</span>
        </div>
      </div>
    </section>
  );
};

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
          <a
            id="openComparePageDirectLink"
            href="/compare"
            className="product-buy"
            style={{ padding: '6px 14px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Full Compare Page ⚖️
          </a>
          <button id="openCompareModalBtn" type="button" className="filter-pill" style={{ padding: '6px 12px', fontSize: '12px' }}>
            Quick Pop-up 🔍
          </button>
          <button id="closeCompareDockBtn" type="button" className="filter-pill" style={{ padding: '6px 10px' }}>
            ✕
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
        <strong style={{ fontSize: '14px', display: 'block' }}>Nepal Merchant Shipping &amp; Transit Guide</strong>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Average seller dispatch speed and courier availability across Nepal</span>
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
        ⚡ 24h KTM Valley Delivery • 2-3 Days Nationwide Courier (COD supported by most stores)
      </div>
    </div>
  </div>
);

export const NepalShoppingFaq: FC<{ settings?: SiteSettings }> = ({ settings }) => {
  const kicker = settings?.faq_kicker || 'BUYER GUIDE & HELP';
  const title = settings?.faq_title || 'Frequently Asked Questions in Nepal';

  return (
    <section className="store-shell faq-container">
      <div className="section-heading" style={{ marginBottom: '24px' }}>
        <div>
          <span className="section-kicker">{kicker}</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="faq-item">
        <div className="faq-question">
          <span>Are all featured products 100% genuine with official Nepal warranty?</span>
          <span className="faq-icon">▾</span>
        </div>
        <div className="faq-answer">
          Yes, 100%. All products featured on BuyerNepal are sourced exclusively through authorized national distributors and verified retailers, complete with official brand warranty and genuine VAT invoices.
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
};

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

export const Footer: FC<{ settings: SiteSettings; categories?: Category[] }> = ({
  settings,
  categories = []
}) => {
  const title = settings.site_title || 'BuyerNepal';
  const description =
    settings.footer_about_text ||
    settings.site_description ||
    'Discover products worth buying in Nepal — curated recommendations, verified NPR prices, and direct store links.';
  const disclosure =
    settings.footer_disclosure_text ||
    'BuyerNepal is an independent consumer guide and price comparison platform in Nepal. We research and verify products independently. When you click our partner links to retailers (such as Daraz, Hamrobazar, Oliz Store, Samsung Plaza) and make a purchase, we may receive a referral commission at no additional cost to you.';
  const copyright =
    settings.copyright_text ||
    `© ${new Date().getFullYear()} ${title}. All verified prices in NPR (Nepali Rupees). Crafted with ❤️ for shoppers across Nepal 🇳🇵`;

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
          <h3>Nepal Directory</h3>
          <a href="/stores">🏪 Verified Stores Directory</a>
          <a href="/brands">🏷️ Official Brands in Nepal</a>
          <a href="/coupons">🎟️ Verified Promo Codes &amp; Deals</a>
          <a href="/track-order">📦 Track My Order Live</a>
        </div>

        <div>
          <h3>Shopping Guides &amp; Tools</h3>
          <a href="/compare">⚖️ Side-by-Side Comparison Matrix</a>
          <a href="/charts">🏆 Top 10 Ranked Gadget Charts</a>
          <a href="/blog">📰 Tech Reviews &amp; Guides</a>
          <a href="/category/electronics">📱 Smartphone Buying Guide</a>
          <a href="/category/laptops-computing">💻 Laptop Price Guide Nepal</a>
          <a href="/stores">🏪 Verified Nepal Stores Directory</a>
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

      <div className="store-shell" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 0', fontSize: '11.5px', color: '#94a3b8', lineHeight: '1.6' }}>
        <strong style={{ color: '#cbd5e1' }}>Affiliate Transparency Disclosure:</strong> {disclosure}
      </div>

      <div className="store-shell footer-bottom">
        <span>{copyright}</span>
        <span>Crafted with ❤️ for shoppers across Nepal 🇳🇵</span>
      </div>

      {/* Global Wishlist Drawer Component */}
      <WishlistDrawer />

      {/* Global Comparison Floating Dock */}
      {settings.comparison_enabled !== '0' && <ComparisonDock />}

      {/* Global Toast Alert */}
      <div id="toastMessage" className="toast-msg">
        <span>✓</span> <span id="toastText">Action successful!</span>
      </div>
    </footer>
  );
};
