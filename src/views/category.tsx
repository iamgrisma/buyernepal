import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, ProductCard, Footer } from './components';

export const CategoryPage: FC<{
  settings: SiteSettings;
  categories: Category[];
  category: Category;
  products: Product[];
}> = ({ settings, categories, category, products }) => {
  const title = `${category.name} in Nepal — BuyerNepal`;
  const description =
    category.description ||
    `Browse the best ${category.name} available in Nepal with verified prices and direct store links.`;

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

        <main className="store-shell category-page-main">
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <span>{category.name}</span>
          </div>

          <section className="category-hero">
            <div>
              <span className="eyebrow">CATEGORY</span>
              <h1>{category.name}</h1>
              <p>{description}</p>
            </div>
            <div className="category-total">
              <strong>{products.length}</strong>
              <span>products listed</span>
            </div>
          </section>

          {/* Quick Category Switcher */}
          <div className="category-row" style={{ marginBottom: '30px' }}>
            <a href="/" className="category-chip">
              All products
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`category-chip ${cat.slug === category.slug ? 'active' : ''}`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          <section className="products-section">
            <div className="section-heading">
              <div>
                <span className="section-kicker">CURATED LISTINGS</span>
                <h2>Products in {category.name}</h2>
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
                <div className="empty-icon">⌕</div>
                <h3>No products in this category yet</h3>
                <p>We are actively curating recommendations for {category.name}.</p>
                <a href="/" className="primary-action">
                  Explore other categories
                </a>
              </div>
            )}
          </section>
        </main>

        <Footer settings={settings} categories={categories} />
      </div>
    </Layout>
  );
};
