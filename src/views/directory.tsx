import { FC } from 'hono/jsx';
import { Brand, Category, Product, SiteSettings, Store } from '../types';
import { Layout } from './layout';
import { Header, Footer, MobileBottomBar, ProductCard } from './components';

// ============================================================================
// STORES DIRECTORY INDEX: /stores
// ============================================================================
export const StoresListPage: FC<{
  stores: Store[];
  settings: SiteSettings;
  categories: Category[];
}> = ({ stores, settings, categories }) => {
  return (
    <Layout
      title="Verified Stores & Authorized Retailers in Nepal | BuyerNepal"
      description="Directory of verified electronics retailers and official distributor showrooms across Nepal. Daraz Mall, Oliz Store, EvoStore, Samsung Plaza, and more."
      url="https://buyernepal.com/stores"
    >
      <div className="store-page directory-page">
        <Header settings={settings} categories={categories} activeSlug="stores" />

        <main className="store-shell" style={{ padding: '28px 0 60px' }}>
          {/* Header */}
          <div className="directory-header-hero">
            <div className="coupons-hero-badge">🏪 VERIFIED NEPAL RETAILERS</div>
            <h1 className="directory-hero-title">Authorized Electronics, Tech &amp; Lifestyle Retailers</h1>
            <p className="directory-hero-subtitle">
              Discover trusted retailers, authorized distributor showrooms, and top marketplace sellers across Nepal.
            </p>
          </div>

          {/* Stores Grid */}
          <div className="stores-directory-grid" style={{ marginTop: '36px' }}>
            {stores.map((store) => (
              <div key={store.id} className="store-profile-card">
                <div className="store-card-banner">
                  <div className="store-card-logo">
                    <img src={store.logo_url || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=120&auto=format&fit=crop&q=80'} alt={store.name} />
                  </div>
                  <div className="store-card-badges">
                    <span className="store-verified-pill">✓ Verified Store</span>
                    <span className="store-rating-pill">★ {store.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="store-card-body">
                  <h2 className="store-card-name">
                    <a href={`/store/${store.slug}`}>{store.name}</a>
                  </h2>
                  <p className="store-card-desc">{store.description}</p>

                  <div className="store-meta-list">
                    <div className="store-meta-row">
                      <span className="meta-icon">📍</span>
                      <span><strong>Location:</strong> {store.location}</span>
                    </div>
                    <div className="store-meta-row">
                      <span className="meta-icon">🚚</span>
                      <span><strong>Delivery:</strong> {store.delivery_coverage}</span>
                    </div>
                    <div className="store-meta-row">
                      <span className="meta-icon">🛡️</span>
                      <span><strong>Warranty:</strong> {store.warranty_support}</span>
                    </div>
                  </div>

                  <div className="store-card-cta-row">
                    <a href={`/store/${store.slug}`} className="store-browse-btn">
                      Browse Deals in {store.name.split(' ')[0]} ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};

// ============================================================================
// SINGLE STORE PROFILE & DEALS PAGE: /store/:slug
// ============================================================================
export const StoreDetailPage: FC<{
  store: Store;
  products: Product[];
  settings: SiteSettings;
  categories: Category[];
}> = ({ store, products, settings, categories }) => {
  return (
    <Layout
      title={`${store.name} — Verified Prices, Official Warranty & Deals in Nepal | BuyerNepal`}
      description={`Browse verified deals from ${store.name} in Nepal. ${store.description} Delivery: ${store.delivery_coverage}.`}
      url={`https://buyernepal.com/store/${store.slug}`}
    >
      <div className="store-page store-profile-page">
        <Header settings={settings} categories={categories} activeSlug="stores" />

        <main className="store-shell" style={{ padding: '24px 0 60px' }}>
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">🏠 Home</a>
            <span>/</span>
            <a href="/stores">Stores</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{store.name}</span>
          </div>

          {/* Store Hero Profile */}
          <div className="store-hub-banner">
            <div className="store-hub-avatar">
              <img src={store.logo_url} alt={store.name} />
            </div>
            <div className="store-hub-info">
              <div className="store-hub-badges">
                <span className="store-verified-pill">✓ Authorized Nepal Retailer</span>
                <span className="store-rating-pill">★ {store.rating.toFixed(1)} ({store.review_count} ratings)</span>
              </div>
              <h1 className="store-hub-title">{store.name}</h1>
              <p className="store-hub-desc">{store.description}</p>

              <div className="store-hub-tags">
                <span className="hub-tag">📍 {store.location}</span>
                <span className="hub-tag">🚚 {store.delivery_coverage}</span>
                <span className="hub-tag">🔄 {store.return_policy}</span>
                <span className="hub-tag">🛡️ {store.warranty_support}</span>
              </div>
            </div>

            <div className="store-hub-action">
              <a
                href={store.affiliate_url || store.website_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="primary-action"
                style={{ whiteSpace: 'nowrap' }}
              >
                Visit Official Store Website ↗
              </a>
            </div>
          </div>

          {/* Products from this store */}
          <div style={{ marginTop: '40px' }}>
            <div className="section-title-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800 }}>
                Verified Products Available at {store.name} ({products.length})
              </h2>
            </div>

            {products.length === 0 ? (
              <div className="empty-state-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <p>No products currently linked to this store in our curated directory.</p>
                <a href="/" className="primary-action" style={{ marginTop: '12px', display: 'inline-block' }}>Browse All Catalog Items</a>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};

// ============================================================================
// BRANDS DIRECTORY INDEX: /brands
// ============================================================================
export const BrandsListPage: FC<{
  brands: Brand[];
  settings: SiteSettings;
  categories: Category[];
}> = ({ brands, settings, categories }) => {
  return (
    <Layout
      title="Top Electronics & Lifestyle Brands in Nepal | BuyerNepal Brand Directory"
      description="Official distributor warranty, authorized service center locations, and price guides for Apple, Samsung, Sony, OnePlus, DJI, Roborock in Nepal."
      url="https://buyernepal.com/brands"
    >
      <div className="store-page directory-page">
        <Header settings={settings} categories={categories} activeSlug="brands" />

        <main className="store-shell" style={{ padding: '28px 0 60px' }}>
          {/* Header */}
          <div className="directory-header-hero">
            <div className="coupons-hero-badge">🏷️ OFFICIAL BRANDS IN NEPAL</div>
            <h1 className="directory-hero-title">Official Brand Directory & Authorized Service Centers</h1>
            <p className="directory-hero-subtitle">
              Verify authorized importers, country of origin, and nationwide repair service center locations before you buy in Nepal.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="brands-directory-grid" style={{ marginTop: '36px' }}>
            {brands.map((b) => (
              <a key={b.id} href={`/brand/${b.slug}`} className="brand-card-link">
                <div className="brand-card-logo-wrap">
                  <img src={b.logo_url} alt={b.name} />
                </div>
                <h3 className="brand-card-name">{b.name}</h3>
                <span className="brand-card-country">Origin: {b.origin_country}</span>
                <p className="brand-card-service-teaser">{b.description}</p>
                <span className="brand-explore-pill">Explore Nepal Catalog ➔</span>
              </a>
            ))}
          </div>
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};

// ============================================================================
// SINGLE BRAND PROFILE & PRODUCTS PAGE: /brand/:slug
// ============================================================================
export const BrandDetailPage: FC<{
  brand: Brand;
  products: Product[];
  settings: SiteSettings;
  categories: Category[];
}> = ({ brand, products, settings, categories }) => {
  return (
    <Layout
      title={`${brand.name} Price in Nepal 2026, Authorized Warranty & Products | BuyerNepal`}
      description={`Explore official ${brand.name} NPR prices, genuine stock, authorized warranty and official service centers in Nepal.`}
      url={`https://buyernepal.com/brand/${brand.slug}`}
    >
      <div className="store-page brand-profile-page">
        <Header settings={settings} categories={categories} activeSlug="brands" />

        <main className="store-shell" style={{ padding: '24px 0 60px' }}>
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">🏠 Home</a>
            <span>/</span>
            <a href="/brands">Brands</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{brand.name}</span>
          </div>

          {/* Brand Hero Header */}
          <div className="brand-hub-banner">
            <div className="brand-hub-logo">
              <img src={brand.logo_url} alt={brand.name} />
            </div>
            <div className="brand-hub-content">
              <div className="brand-hub-meta-pills">
                <span className="store-verified-pill">✓ Official Nepal Distributor / Brand</span>
                <span className="hub-tag">Country of Origin: {brand.origin_country}</span>
              </div>
              <h1 className="brand-hub-title">{brand.name} Official Nepal Price &amp; Catalog</h1>
              <p className="brand-hub-desc">{brand.description}</p>
              <div className="brand-service-alert">
                <strong>📍 Official Nepal Warranty &amp; Service Center Support:</strong>
                <div>{brand.warranty_service_center}</div>
              </div>
            </div>
          </div>

          {/* Products by this Brand */}
          <div style={{ marginTop: '40px' }}>
            <div className="section-title-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800 }}>
                {brand.name} Products Available in Nepal ({products.length})
              </h2>
            </div>

            {products.length === 0 ? (
              <div className="empty-state-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <p>No products currently tagged under {brand.name}.</p>
                <a href="/" className="primary-action" style={{ marginTop: '12px', display: 'inline-block' }}>Browse Entire Catalog</a>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};
