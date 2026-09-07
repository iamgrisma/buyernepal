import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Hero, TrustStrip, ProductCard, EditorialBanner, Footer } from './components';

export const HomePage: FC<{
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
}> = ({ settings, categories, products }) => {
  const title = settings.site_title || 'BuyerNepal — Shop Smarter';
  const description =
    settings.site_description ||
    'Discover products worth buying in Nepal — curated, compared and easy to shop.';

  // Schema.org ItemList for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Products in Nepal',
    description: description,
    itemListElement: products.slice(0, 10).map((p, idx) => ({
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
          price: p.price,
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <Layout
      title={title}
      description={description}
      jsonLd={jsonLd}
    >
      <div className="store-page">
        <Header settings={settings} categories={categories} />
        <Hero settings={settings} />
        <TrustStrip />

        {settings.homepage_html && (
          <section
            className="store-shell"
            style={{ marginTop: '30px' }}
            dangerouslySetInnerHTML={{ __html: settings.homepage_html }}
          />
        )}

        {/* Categories Section */}
        <section className="store-shell category-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPLORE</span>
              <h2>Shop by category</h2>
            </div>
            <span className="section-count">{categories.length} categories</span>
          </div>
          <div className="category-row">
            <a href="/" className="category-chip active">
              All products
            </a>
            {categories.map((cat) => (
              <a key={cat.id} href={`/category/${cat.slug}`} className="category-chip">
                {cat.name}
              </a>
            ))}
          </div>
        </section>

        {/* Products Shortlist */}
        <section className="store-shell products-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE SHORTLIST</span>
              <h2>Featured products</h2>
            </div>
            <span id="searchCount" className="section-count">
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
              <h3>No products available yet</h3>
              <p>Check back soon or visit our admin panel to list curated products.</p>
              <a href="/admin/login" className="primary-action">
                Go to Admin
              </a>
            </div>
          )}
        </section>

        <EditorialBanner count={products.length} />
        <Footer settings={settings} categories={categories} />
      </div>
    </Layout>
  );
};
