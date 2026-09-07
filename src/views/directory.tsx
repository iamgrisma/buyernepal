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
      settings={settings}
    >
      <div className="store-page directory-page">
        <Header settings={settings} categories={categories} activeSlug="stores" />

        <main className="store-shell">
          {/* Header */}
          <div className="directory-header-hero">
            <div className="directory-hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>Verified Nepal Retailers</span>
            </div>
            <h1 className="directory-hero-title">Verified Stores &amp; Authorized Retailers</h1>
            <p className="directory-hero-subtitle">
              Shop with 100% peace of mind from vetted retailers offering genuine VAT bills, official warranties, and reliable delivery across Nepal.
            </p>
          </div>

          {/* Stores Grid */}
          <div className="stores-directory-grid">
            {stores.map((s) => (
              <a key={s.id} href={`/store/${s.slug}`} className="store-card-link">
                <div className="store-card-header">
                  <div className="store-card-logo-wrap">
                    {s.logo_url ? <img src={s.logo_url} alt={s.name} /> : <div className="store-logo-fallback">{s.name[0]}</div>}
                  </div>
                  <div className="store-card-header-meta">
                    <h3 className="store-card-name">{s.name}</h3>
                    <div className="store-card-rating">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      <span>{s.rating.toFixed(1)}</span>
                      <small>({s.review_count} ratings)</small>
                    </div>
                  </div>
                  {s.is_verified === 1 && (
                    <span className="store-verified-pill" title="Verified Genuine Retailer">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p className="store-card-desc">{s.description}</p>

                <div className="store-card-badges">
                  <span className="store-badge-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{s.location}</span>
                  </span>
                  <span className="store-badge-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    <span>{s.delivery_coverage}</span>
                  </span>
                  <span className="store-badge-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <span>{s.warranty_support}</span>
                  </span>
                </div>

                <div className="store-card-footer">
                  <span className="store-card-cta">
                    <span>Browse Products</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </span>
                </div>
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
// SINGLE STORE PROFILE & PRODUCTS PAGE: /store/:slug
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
      settings={settings}
    >
      <div className="store-page store-profile-page">
        <Header settings={settings} categories={categories} activeSlug="stores" />

        <main className="store-shell">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/stores">Stores</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{store.name}</span>
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
      settings={settings}
    >
      <div className="store-page directory-page">
        <Header settings={settings} categories={categories} activeSlug="brands" />

        <main className="store-shell">
          {/* Header */}
          <div className="directory-header-hero">
            <div className="directory-hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <span>Official Brands in Nepal</span>
            </div>
            <h1 className="directory-hero-title">Official Brand Directory &amp; Authorized Service Centers</h1>
            <p className="directory-hero-subtitle">
              Verify authorized importers, country of origin, and nationwide repair service center locations before you buy in Nepal.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="brands-directory-grid">
            {brands.map((b) => (
              <a key={b.id} href={`/brand/${b.slug}`} className="brand-card-link">
                <div className="brand-card-logo-wrap">
                  <img src={b.logo_url} alt={b.name} />
                </div>
                <h3 className="brand-card-name">{b.name}</h3>
                <span className="brand-card-country">Origin: {b.origin_country}</span>
                <p className="brand-card-service-teaser">{b.description}</p>
                <span className="brand-explore-pill">
                  <span>Explore Catalog</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
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
      settings={settings}
    >
      <div className="store-page brand-profile-page">
        <Header settings={settings} categories={categories} activeSlug="brands" />

        <main className="store-shell">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/brands">Brands</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{brand.name}</span>
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
