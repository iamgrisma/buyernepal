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
    <Layout title={title} description={description} jsonLd={jsonLd} settings={settings}>
      <div className="store-page">
        <Header settings={settings} categories={categories} activeSlug={category.slug} />

        <main className="store-shell">
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <span>Departments</span>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{category.name}</span>
          </div>

          <div className="page-hero-banner">
            <div className="page-hero-banner-content">
              <div className="page-hero-badge">VERIFIED DEPARTMENT</div>
              <h1 className="page-hero-title">
                {category.name}
              </h1>
              <p className="page-hero-subtitle">
                {description}
              </p>
            </div>
            <div className="page-hero-stat-badge">
              <span className="page-hero-stat-val">
                {products.length}
              </span>
              <span className="page-hero-stat-lbl">Products Curated</span>
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
