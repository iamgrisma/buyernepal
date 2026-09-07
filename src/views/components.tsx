import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';

export const Header: FC<{
  settings: SiteSettings;
  categories: Category[];
  activeSlug?: string;
}> = ({ settings, categories, activeSlug }) => {
  const title = settings.site_title || 'BuyerNepal';
  const logo = settings.site_logo;
  const primaryCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  return (
    <>
      <div className="store-topbar">
        <div className="store-shell store-topbar-inner">
          <span>🇳🇵 Nepal's Curated Shopping &amp; Price Comparison Platform</span>
          <span className="store-topbar-note">Verified Prices • Local Deals • Smart Shopping</span>
        </div>
      </div>

      <header className="store-header">
        <div className="store-shell store-header-inner">
          <a href="/" className="store-brand" aria-label={`${title} Home`}>
            {logo ? (
              <img src={logo} alt={title} className="store-logo" />
            ) : (
              <span className="store-logo-mark">B</span>
            )}
            <span>
              <strong>{title}</strong>
              <small>SHOP SMARTER</small>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="store-nav" aria-label="Primary navigation">
            <a href="/" className={!activeSlug ? 'store-nav-active' : ''}>
              Home
            </a>
            {primaryCategories.map((cat) => (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={activeSlug === cat.slug ? 'store-nav-active' : ''}
              >
                {cat.name}
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
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>

          <div className="store-header-actions">
            <a href="/admin/login" className="store-admin-link">
              Admin Portal
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

        {/* Mobile Navigation Drawer with Overlay Backdrop */}
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
            <span className="mobile-drawer-label">CATEGORIES</span>
            <nav className="mobile-nav-links">
              <a href="/" className={!activeSlug ? 'active' : ''}>
                🏠 All Products (Home)
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={activeSlug === cat.slug ? 'active' : ''}
                >
                  📁 {cat.name}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
              <span className="mobile-drawer-label">ADMINISTRATION</span>
              <nav className="mobile-nav-links">
                <a href="/admin/login">🔐 Admin Portal Login</a>
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
    'Discover products worth buying in Nepal — curated, compared and easy to shop.';

  return (
    <section className="store-hero">
      <div className="store-shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">SMART SHOPPING, MADE SIMPLE</span>
          <h1>
            Find better products.
            <br />
            <em>Buy with confidence.</em>
          </h1>
          <p>{description}</p>
          <div className="hero-search">
            <span aria-hidden="true">⌕</span>
            <input
              id="searchInput"
              type="text"
              placeholder="Search products, brands or categories…"
              aria-label="Search products"
            />
            <button id="clearSearchBtn" type="button" aria-label="Clear search">
              ×
            </button>
          </div>
          <div className="hero-points">
            <span>✓ Verified NPR pricing</span>
            <span>✓ Curated recommendations</span>
            <span>✓ Direct store links</span>
          </div>
        </div>

        <div className="hero-card" aria-hidden="true">
          <div className="hero-card-glow" />
          <div className="hero-card-label">BUYERNEPAL</div>
          <div className="hero-card-title">
            Less scrolling.
            <br />
            <strong>More buying.</strong>
          </div>
          <div className="hero-mini-grid">
            <span>
              01
              <br />
              <b>Discover</b>
            </span>
            <span>
              02
              <br />
              <b>Compare</b>
            </span>
            <span>
              03
              <br />
              <b>Shop</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustStrip: FC = () => (
  <section className="store-shell trust-strip">
    <div>
      <strong>Built for Nepal 🇳🇵</strong>
      <span>Prices and shopping links verified for Nepali shoppers.</span>
    </div>
    <div>
      <strong>Curated, not crowded</strong>
      <span>Useful products without endless marketplace noise and spam.</span>
    </div>
    <div>
      <strong>Shop on the source</strong>
      <span>Direct links send you straight to the verified seller or store.</span>
    </div>
  </section>
);

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const price = Number(product.price) || 0;
  let formattedPrice = String(price);
  try {
    formattedPrice = price.toLocaleString('en-NP');
  } catch {
    formattedPrice = price.toLocaleString();
  }

  return (
    <article
      className="product-card"
      data-name={product.name}
      data-desc={product.description}
      data-category={String(product.category_id || '')}
    >
      <a
        href={`/product/${product.id}`}
        className="product-image-link"
        aria-label={`View ${product.name}`}
      >
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} loading="lazy" decoding="async" />
        ) : (
          <div className="product-image-placeholder" aria-hidden="true">
            <span>BN</span>
          </div>
        )}
        <span className="product-badge">Curated</span>
      </a>

      <div className="product-card-body">
        <a href={`/product/${product.id}`} className="product-name">
          {product.name}
        </a>
        <p className="product-description">{product.description || 'Explore details and availability.'}</p>
        <div className="product-card-bottom">
          <div>
            <span className="price-label">Price</span>
            <strong className="product-price">Rs. {formattedPrice}</strong>
          </div>
          {product.affiliate_url ? (
            <a
              className="product-buy"
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Shop now <span>↗</span>
            </a>
          ) : (
            <a className="product-buy product-buy-secondary" href={`/product/${product.id}`}>
              View <span>→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const EditorialBanner: FC<{ count: number }> = ({ count }) => (
  <section className="store-shell editorial-banner">
    <div>
      <span className="section-kicker">A BETTER WAY TO SHOP</span>
      <h2>
        Discover first.
        <br />
        Decide faster.
      </h2>
      <p>
        BuyerNepal is designed to help you find useful products quickly, understand what they cost
        in Nepal, and jump directly to the verified store that sells them.
      </p>
    </div>
    <div className="editorial-stat">
      <strong>{count || '—'}</strong>
      <span>curated products</span>
    </div>
  </section>
);

export const Footer: FC<{ settings: SiteSettings; categories: Category[] }> = ({
  settings,
  categories
}) => {
  const title = settings.site_title || 'BuyerNepal';
  const description =
    settings.site_description ||
    'Discover products worth buying in Nepal — curated, compared and easy to shop.';

  return (
    <footer className="store-footer">
      <div className="store-shell footer-grid">
        <div>
          <a href="/" className="store-brand">
            <span className="store-logo-mark">B</span>
            <span>
              <strong>{title}</strong>
              <small>SHOP SMARTER</small>
            </span>
          </a>
          <p>{description}</p>
        </div>

        <div>
          <h3>Menu &amp; Categories</h3>
          <a href="/">All Products</a>
          {categories.map((cat) => (
            <a key={cat.id} href={`/category/${cat.slug}`}>
              {cat.name}
            </a>
          ))}
        </div>

        <div>
          <h3>Administration</h3>
          <a href="/admin/login">Admin Portal Login</a>
          <span className="footer-note">
            Manage products, categories, reviews, coupons and site configurations.
          </span>
        </div>
      </div>

      <div className="store-shell footer-bottom">
        <span>© {new Date().getFullYear()} {title}. All rights reserved.</span>
        <span>Made with ❤️ for shoppers in Nepal 🇳🇵</span>
      </div>
    </footer>
  );
};
