import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../types';

export const Header: FC<{
  settings: SiteSettings;
  categories: Category[];
  activeSlug?: string;
}> = ({ settings, categories, activeSlug }) => {
  const title = settings.site_title || 'BuyerNepal';
  const announcement = settings.announcement_text || '🔥 Grand Festive Deals in Nepal • Verified NPR Prices • Direct Store Links • Zero Marketplace Markups';
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

          <div className="store-header-actions">
            <a href="/admin" className="store-admin-link">
              🔐 <span>Admin Portal</span>
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
                {settings.whatsapp_number && <a href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp Support</a>}
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
            <button type="button" className="quick-tag" data-search="MacBook">MacBook M3</button>
            <button type="button" className="quick-tag" data-search="Sony">Sony WH-1000XM5</button>
            <button type="button" className="quick-tag" data-search="Air Fryer">Xiaomi Air Fryer</button>
            <button type="button" className="quick-tag" data-search="Goldstar">Goldstar Shoes</button>
            <button type="button" className="quick-tag" data-search="Pashmina">Chyangra Pashmina</button>
          </div>

          <div className="hero-points">
            <span>✓ Verified NPR Pricing</span>
            <span>✓ Official Nepal Warranties</span>
            <span>✓ Direct Seller &amp; Daraz Links</span>
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
              <strong>100%</strong>
              <span>NTA / Genuine</span>
            </div>
            <div className="hero-stat-box">
              <strong>Daily</strong>
              <span>Price Updates</span>
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
        <div className="trust-icon">🛡️</div>
        <div className="trust-text">
          <strong>Direct Seller Links</strong>
          <span>Zero middlemen. Buy directly on verified store platforms.</span>
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

  return (
    <article
      className="product-card"
      data-name={product.name.toLowerCase()}
      data-desc={(product.description || '').toLowerCase()}
      data-category={String(product.category_id || '')}
      data-price={price}
      data-store={storeName.toLowerCase()}
      data-badge={badge.toLowerCase()}
      data-rating={rating}
      data-discount={discountPercent}
    >
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

        <div className="product-card-bottom">
          <div className="price-block">
            {discountPercent > 0 && (
              <div className="original-price-row">
                <span className="original-price">Rs. {formattedOriginal}</span>
                <span className="discount-pill">-{discountPercent}%</span>
              </div>
            )}
            <strong className="product-price">Rs. {formattedPrice}</strong>
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

export const MobileBottomBar: FC<{ activeTab?: string }> = ({ activeTab = 'home' }) => (
  <div className="mobile-bottom-bar" aria-label="Mobile Navigation">
    <div className="mobile-bottom-inner">
      <a href="/" className={`mobile-bottom-item ${activeTab === 'home' ? 'active' : ''}`}>
        <span>🏠</span>
        <span>Home</span>
      </a>
      <a href="#searchInput" className="mobile-bottom-item" onClick={(e: any) => {
        const inp = document.getElementById('searchInput');
        if (inp) {
          e.preventDefault();
          inp.scrollIntoView({ behavior: 'smooth' });
          inp.focus();
        }
      }}>
        <span>🔍</span>
        <span>Search</span>
      </a>
      <a href="/category/electronics" className="mobile-bottom-item">
        <span>📱</span>
        <span>Mobiles</span>
      </a>
      <a href="/category/himalayan-local" className="mobile-bottom-item">
        <span>🏔️</span>
        <span>Local</span>
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

      {/* Global Toast Alert */}
      <div id="toastMessage" className="toast-msg">
        <span>✓</span> <span id="toastText">Action successful!</span>
      </div>
    </footer>
  );
};
