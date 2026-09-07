import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, ProductCard, MobileBottomBar, Footer } from './components';

export const CategoryPage: FC<{
  settings: SiteSettings;
  categories: Category[];
  category: Category;
  products: Product[];
}> = ({ settings, categories, category, products }) => {
  const icon = category.icon || '🛍️';
  const title = `${category.name} in Nepal — Verified Prices & Curated Deals | BuyerNepal`;
  const description =
    category.description ||
    `Browse the best ${category.name} available in Nepal with verified prices, distributor warranties, and direct store links.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    itemListElement: products.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: p.image_url,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'NPR',
          price: p.price
        }
      }
    }))
  };

  return (
    <Layout title={title} description={description} jsonLd={jsonLd}>
      <div className="store-page">
        <Header settings={settings} categories={categories} activeSlug={category.slug} />

        <main className="store-shell" style={{ padding: '32px 0 60px' }}>
          <div className="breadcrumbs">
            <a href="/">🏠 Home</a>
            <span>/</span>
            <span>Departments</span>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{category.name}</span>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: '#fda4af' }}>VERIFIED DEPARTMENT</span>
              <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1.5px', margin: '8px 0 12px' }}>
                <span style={{ marginRight: '10px' }}>{icon}</span> {category.name}
              </h1>
              <p style={{ maxWidth: '560px', color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>
                {description}
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 28px',
                textAlign: 'center'
              }}
            >
              <strong style={{ display: 'block', fontSize: '32px', fontWeight: 900, color: '#fda4af' }}>
                {products.length}
              </strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>Products Curated</span>
            </div>
          </div>

          {/* Quick Category Switcher */}
          <div className="category-row" style={{ marginBottom: '32px' }}>
            <a href="/" className="category-chip">
              <span>🛍️</span> All Departments
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`category-chip ${cat.slug === category.slug ? 'active' : ''}`}
              >
                <span>{cat.icon || '📁'}</span>
                <span>{cat.name}</span>
              </a>
            ))}
          </div>

          {/* Products Section */}
          <section className="products-section">
            <div className="section-heading">
              <div>
                <span className="section-kicker">AVAILABLE IN NEPAL</span>
                <h2>Curated {category.name}</h2>
              </div>
              <span className="section-count">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {products.length > 0 ? (
              <div className="product-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="store-empty">
                <div className="empty-icon">🔍</div>
                <h3>No products listed in {category.name} yet</h3>
                <p>We are actively researching and verifying authentic Nepal sellers for this department.</p>
                <a href="/" className="primary-action">
                  Explore other categories
                </a>
              </div>
            )}
          </section>
        </main>

        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="category" />
      </div>
    </Layout>
  );
};
