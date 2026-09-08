import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../../types';
import { WishlistDrawer, ComparisonDock } from './modals';

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
            {/* Multi-Currency Switcher — compact dropdown, NPR default */}
            {settings.currency_converter_enabled !== '0' && (
              <div className="currency-dropdown-wrap" title="Switch Display Currency">
                <select id="currencyDropdown" className="currency-dropdown" aria-label="Currency">
                  <option value="NPR">🇳🇵 NPR</option>
                  <option value="USD">🇺🇸 USD</option>
                  <option value="INR">🇮🇳 INR</option>
                </select>
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

        {/* Tier 2: Smart Streamlined Navigation Strip (Two Master Hubs: Categories & Menu) */}
        <div className="store-nav-strip">
          <div className="store-shell store-nav-strip-inner">
            <div className="nav-strip-left-hubs">
              {/* SMART HUB 1: All Categories Dropdown */}
              <div className="nav-categories-dropdown-wrap">
                <button
                  id="allDepartmentsBtn"
                  type="button"
                  className="nav-smart-hub-btn nav-categories-hub-btn"
                  title="Browse all product categories in Nepal"
                  aria-label="Browse all categories"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="nav-hub-icon">🏷️</span>
                  <span className="nav-hub-label">All Categories</span>
                  <span className="nav-hub-arrow">▾</span>
                </button>
                <div id="allCategoriesDropdownMenu" className="nav-categories-dropdown-menu">
                  <div className="nav-dropdown-header">
                    <span>🛍️ SHOP BY CATEGORY</span>
                    <span className="nav-dropdown-badge">{categories.length} Categories</span>
                  </div>
                  <div className="nav-categories-grid">
                    {categories.map((cat) => (
                      <a
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className={`nav-category-card-item ${activeSlug === cat.slug ? 'active' : ''}`}
                      >
                        <span className="nav-cat-card-icon">{cat.icon || '🛍️'}</span>
                        <div className="nav-cat-card-info">
                          <strong className="nav-cat-card-name">{cat.name}</strong>
                          <small className="nav-cat-card-desc">{cat.description || 'Verified Nepal specs & prices'}</small>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* SMART HUB 2: Explore & Tools Menu Dropdown */}
              <div className="nav-more-dropdown-wrap">
                <button
                  id="navMoreDropdownBtn"
                  type="button"
                  className="nav-smart-hub-btn nav-menu-hub-btn"
                  aria-label="Explore tools, charts, and guides"
                  title="Explore tools & directory"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="nav-hub-icon">🧭</span>
                  <span className="nav-hub-label">Explore &amp; Tools</span>
                  <span className="nav-hub-arrow">▾</span>
                </button>
                <div id="navMoreDropdownMenu" className="nav-more-dropdown-menu">
                  <div className="nav-dropdown-header">
                    <span>⚡ TOOLS, GUIDES &amp; DIRECTORY</span>
                  </div>
                  <div className="nav-menu-list">
                    <a href="/vehicles" className={`nav-menu-list-item ${activeSlug === 'vehicles' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">🚗</span>
                      <div className="nav-menu-item-text">
                        <strong>Vehicles &amp; Electric Cars</strong>
                        <small>Nepal EV prices, WLTP range &amp; loan EMI</small>
                      </div>
                    </a>
                    <a href="/compare" className={`nav-menu-list-item ${activeSlug === 'compare' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">⚖️</span>
                      <div className="nav-menu-item-text">
                        <strong>Side-by-Side Compare</strong>
                        <small>Head-to-head spec &amp; price matrix</small>
                      </div>
                    </a>
                    <a href="/charts" className={`nav-menu-list-item ${activeSlug === 'charts' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">🏆</span>
                      <div className="nav-menu-item-text">
                        <strong>Top 10 Ranked Charts</strong>
                        <small>Lab-evaluated Nepali buyer leaderboards</small>
                      </div>
                    </a>
                    <a href="/coupons" className={`nav-menu-list-item ${activeSlug === 'coupons' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">🎟️</span>
                      <div className="nav-menu-item-text">
                        <strong>Coupons &amp; Promo Codes</strong>
                        <small>Verified discount codes for Nepal stores</small>
                      </div>
                    </a>
                    <a href="/stores" className={`nav-menu-list-item ${activeSlug === 'stores' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">🏪</span>
                      <div className="nav-menu-item-text">
                        <strong>Stores Directory</strong>
                        <small>Daraz, Oliz Store, Hamrobazar &amp; more</small>
                      </div>
                    </a>
                    <a href="/brands" className={`nav-menu-list-item ${activeSlug === 'brands' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">🏷️</span>
                      <div className="nav-menu-item-text">
                        <strong>Official Brand Hubs</strong>
                        <small>Apple, Samsung, Xiaomi, Dell, Sony</small>
                      </div>
                    </a>
                    <a href="/blog" className={`nav-menu-list-item ${activeSlug === 'blog' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">📰</span>
                      <div className="nav-menu-item-text">
                        <strong>Tech Guides &amp; Blog</strong>
                        <small>Editorial reviews &amp; buying advice</small>
                      </div>
                    </a>
                    <a href="/track-order" className={`nav-menu-list-item ${activeSlug === 'orders' ? 'active' : ''}`}>
                      <span className="nav-menu-item-icon">📦</span>
                      <div className="nav-menu-item-text">
                        <strong>Track My Order Live</strong>
                        <small>Real-time delivery progress &amp; courier</small>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-Access Highlight Links */}
            <div className="nav-strip-quick-links">
              <a href="/" className={`nav-quick-link ${!activeSlug ? 'active' : ''}`}>
                <span>🏠</span>
                <span>Today's Deals</span>
              </a>
              <a href="/vehicles" className={`nav-quick-link nav-quick-link-highlight ${activeSlug === 'vehicles' ? 'active' : ''}`} style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669', borderColor: '#059669' }}>
                <span>⚡</span>
                <span>EV &amp; Cars</span>
              </a>
              <a href="/compare" className={`nav-quick-link nav-quick-link-highlight ${activeSlug === 'compare' ? 'active' : ''}`}>
                <span>⚖️</span>
                <span>Compare Matrix</span>
              </a>
              <a href="/charts" className={`nav-quick-link ${activeSlug === 'charts' ? 'active' : ''}`}>
                <span>🏆</span>
                <span>Rankings</span>
              </a>
            </div>
          </div>
        </div>
      </header>

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
          {/* Quick Theme Switcher in Drawer */}
          <div style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--line)' }}>
            <button
              id="drawerThemeToggleBtn"
              type="button"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: 'var(--line-subtle)',
                color: 'var(--ink)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span id="drawerThemeIcon">🌙</span>
              <span id="drawerThemeLabel">Toggle Dark / Light Mode</span>
            </button>
          </div>

          {/* TWO SMART SECTIONS IN MOBILE DRAWER */}
          <div className="mobile-drawer-section">
            <span className="mobile-drawer-label">🛍️ SHOP BY CATEGORY</span>
            <div className="mobile-nav-categories-grid">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`mobile-cat-pill ${activeSlug === cat.slug ? 'active' : ''}`}
                >
                  <span className="mobile-cat-pill-icon">{cat.icon || '📁'}</span>
                  <span>{cat.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mobile-drawer-section" style={{ marginTop: '22px' }}>
            <span className="mobile-drawer-label">🧭 EXPLORE &amp; TOOLS MENU</span>
            <nav className="mobile-nav-links">
              <a href="/" className={!activeSlug ? 'active' : ''}>
                <span>🏠</span> All Deals &amp; Price Cuts
              </a>
              <a href="/vehicles" className={activeSlug === 'vehicles' ? 'active' : ''}>
                <span>🚗</span> Vehicles &amp; Electric Cars (EV)
              </a>
              <a href="/compare" className={activeSlug === 'compare' ? 'active' : ''}>
                <span>⚖️</span> Head-to-Head Compare Matrix
              </a>
              <a href="/charts" className={activeSlug === 'charts' ? 'active' : ''}>
                <span>🏆</span> Top 10 Ranked Gadget Charts
              </a>
              <a href="/coupons" className={activeSlug === 'coupons' ? 'active' : ''}>
                <span>🎟️</span> Verified Promo Codes
              </a>
              <a href="/stores" className={activeSlug === 'stores' ? 'active' : ''}>
                <span>🏪</span> Verified Nepal Stores
              </a>
              <a href="/brands" className={activeSlug === 'brands' ? 'active' : ''}>
                <span>🏷️</span> Official Brands
              </a>
              <a href="/blog" className={activeSlug === 'blog' ? 'active' : ''}>
                <span>📰</span> Tech Blog &amp; Buying Guides
              </a>
              <a href="/track-order" className={activeSlug === 'orders' ? 'active' : ''}>
                <span>📦</span> Track My Order Live
              </a>
            </nav>
          </div>

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
    </>
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
        </div>
      </div>

      <div className="store-shell" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', paddingBottom: '16px', fontSize: '11.5px', color: '#94a3b8', lineHeight: '1.6' }}>
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

