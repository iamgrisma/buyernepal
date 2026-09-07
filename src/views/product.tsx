import { FC } from 'hono/jsx';
import { Category, Product, Review, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Footer } from './components';

export const ProductPage: FC<{
  settings: SiteSettings;
  categories: Category[];
  product: Product;
  reviews: Review[];
}> = ({ settings, categories, product, reviews }) => {
  const title = `${product.name} — Price in Nepal | BuyerNepal`;
  const description =
    product.description ||
    `Check price, specs, reviews and where to buy ${product.name} in Nepal.`;

  const price = Number(product.price) || 0;
  let formattedPrice = String(price);
  try {
    formattedPrice = price.toLocaleString('en-NP');
  } catch {
    formattedPrice = price.toLocaleString();
  }

  // Schema.org Product markup for Google search rich snippets
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image_url ? [product.image_url] : [],
    description: description,
    offers: {
      '@type': 'Offer',
      url: `https://buyernepal.pages.dev/product/${product.id}`,
      priceCurrency: 'NPR',
      price: price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    ...(reviews.length > 0 && {
      review: reviews.map((r) => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: r.user_name
        },
        reviewBody: r.comment
      }))
    })
  };

  return (
    <Layout
      title={title}
      description={description}
      image={product.image_url}
      type="product"
      jsonLd={jsonLd}
    >
      <div className="store-page">
        <Header settings={settings} categories={categories} />

        <main className="store-shell product-detail">
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            {product.category_name && (
              <>
                <a href={`/category/${product.category_id}`}>{product.category_name}</a>
                <span>/</span>
              </>
            )}
            <span>{product.name}</span>
          </div>

          <div className="product-detail-grid">
            <div className="product-detail-media">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} />
              ) : (
                <div className="product-detail-placeholder">BN</div>
              )}
            </div>

            <div className="product-detail-copy">
              <span className="eyebrow">VERIFIED LISTING</span>
              <h1>{product.name}</h1>

              <div className="rating-row" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '18px', color: '#f59e0b' }}>
                <span>★ ★ ★ ★ ★</span>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>
                  {reviews.length > 0 ? `(${reviews.length} reviews)` : '(Curated recommendation)'}
                </span>
              </div>

              <strong className="detail-price">Rs. {formattedPrice}</strong>
              <p className="detail-description">{product.description}</p>

              <div>
                {product.affiliate_url ? (
                  <a
                    href={product.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="detail-buy"
                  >
                    Buy from Verified Store <span>↗</span>
                  </a>
                ) : (
                  <span className="detail-buy" style={{ background: '#9ca3af', cursor: 'not-allowed' }}>
                    Currently Unavailable
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: '32px',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid var(--line)',
                  fontSize: '12px',
                  color: '#6b7280'
                }}
              >
                <strong style={{ color: '#111827', display: 'block', marginBottom: '4px' }}>
                  BuyerNepal Guarantee
                </strong>
                Prices and availability are verified periodically. We may earn a commission when you
                purchase through our links at no extra cost to you.
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="reviews-section">
            <div className="section-heading">
              <div>
                <span className="section-kicker">COMMUNITY REVIEWS</span>
                <h2>What shoppers say</h2>
              </div>
              <span className="section-count">{reviews.length} verified reviews</span>
            </div>

            {reviews.length > 0 ? (
              <div className="review-list">
                {reviews.map((r) => (
                  <div key={r.id} className="review-card">
                    <div className="review-top">
                      <strong>{r.user_name}</strong>
                      <span style={{ color: '#f59e0b' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p>{r.comment}</p>
                    <time style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginTop: '8px' }}>
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
                    </time>
                  </div>
                ))}
              </div>
            ) : (
              <div className="store-empty">
                <div className="empty-icon">★</div>
                <h3>No reviews yet</h3>
                <p>Be the first to share your experience with {product.name}.</p>
              </div>
            )}
          </section>
        </main>

        <Footer settings={settings} categories={categories} />
      </div>
    </Layout>
  );
};
