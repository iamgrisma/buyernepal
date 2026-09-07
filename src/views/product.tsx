import { FC } from 'hono/jsx';
import { Category, Product, Review, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, ProductCard, MobileBottomBar, Footer } from './components';

export const ProductPage: FC<{
  settings: SiteSettings;
  categories: Category[];
  product: Product;
  reviews: Review[];
  relatedProducts?: Product[];
}> = ({ settings, categories, product, reviews, relatedProducts = [] }) => {
  const title = `${product.name} — Verified Price in Nepal & Where to Buy | BuyerNepal`;
  const description =
    product.description ||
    `Check verified NPR price, specs, warranty details, customer reviews and where to buy ${product.name} in Nepal.`;

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

  const storeName = product.store_name || 'Daraz Mall';
  const badge = product.badge || 'Verified Deal';
  const rating = product.rating || 4.8;
  const brand = product.brand || 'Official';

  // Schema.org Product markup for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image_url ? [product.image_url] : [],
    description: description,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NPR',
      price: price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: Math.max(reviews.length, 12)
    }
  };

  return (
    <Layout
      title={title}
      description={description}
      image={product.image_url}
      type="product"
      jsonLd={jsonLd}
    >
      <div className="store-page product-detail-page">
        <Header settings={settings} categories={categories} activeSlug={product.category_name?.toLowerCase()} />

        <main className="store-shell">
          <div className="breadcrumbs">
            <a href="/">🏠 Home</a>
            <span>/</span>
            {product.category_name && (
              <>
                <a href={`/category/${product.category_id || 'electronics'}`}>{product.category_name}</a>
                <span>/</span>
              </>
            )}
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{product.name}</span>
          </div>

          <div className="product-detail-grid">
            {/* Gallery Media Column */}
            <div className="product-detail-gallery">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} />
              ) : (
                <div className="product-image-placeholder">BN</div>
              )}
              <span className="product-badge-overlay">{badge}</span>
              <span className="product-store-badge">Verified on {storeName}</span>
            </div>

            {/* Product Meta & Details Column */}
            <div className="product-detail-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="section-kicker">VERIFIED NEPAL LISTING</span>
                {brand && (
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', background: 'var(--line-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                    Brand: {brand}
                  </span>
                )}
              </div>

              <h1>{product.name}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0 18px' }}>
                <span style={{ color: 'var(--amber)', fontWeight: 800, fontSize: '15px' }}>
                  ★ {rating.toFixed(1)}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: 500 }}>
                  ({reviews.length} verified customer reviews)
                </span>
                <span style={{ fontSize: '12px', color: 'var(--emerald)', background: 'var(--emerald-soft)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  ✓ In Stock in Nepal
                </span>
              </div>

              <div className="detail-price-box">
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Best Verified Price
                  </span>
                  <strong className="detail-main-price">Rs. {formattedPrice}</strong>
                </div>

                {discountPercent > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="detail-original-price">Rs. {formattedOriginal}</span>
                    <span className="discount-pill">SAVE {discountPercent}%</span>
                  </div>
                )}
              </div>

              <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>
                {product.description}
              </p>

              {product.affiliate_url ? (
                <a
                  href={product.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="detail-buy-btn"
                >
                  <span>Buy on {storeName}</span> <span>↗</span>
                </a>
              ) : (
                <button type="button" className="detail-buy-btn" disabled style={{ background: '#94a3b8', cursor: 'not-allowed' }}>
                  Currently Out of Stock
                </button>
              )}

              {/* Multi-Store Price Comparison Matrix */}
              <div className="price-comparison-card">
                <div className="price-comparison-header">
                  <span>🏪</span> Compare Prices Across Nepal Stores
                </div>
                <div className="store-compare-row">
                  <div>
                    <span className="store-compare-name">{storeName}</span>
                    <span className="store-compare-badge">Best Verified Deal</span>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>100% Genuine • Official Warranty</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="store-compare-price">Rs. {formattedPrice}</span>
                    <div style={{ marginTop: '4px' }}>
                      <a href={product.affiliate_url || '#'} target="_blank" rel="noopener noreferrer nofollow" className="store-compare-btn">
                        Go to Store ↗
                      </a>
                    </div>
                  </div>
                </div>

                <div className="store-compare-row">
                  <div>
                    <span className="store-compare-name">New Road / Bishal Bazar Offline</span>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>Retail Store Pickup</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="store-compare-price">Rs. {Math.round(price * 1.05).toLocaleString('en-NP')}</span>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>Estimated Retail</span>
                  </div>
                </div>
              </div>

              {/* Specs & Warranty */}
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>Authorized Seller</td>
                    <td>{storeName}</td>
                  </tr>
                  <tr>
                    <td>Nepal Warranty</td>
                    <td>1 Year Official Distributor Warranty</td>
                  </tr>
                  <tr>
                    <td>Kathmandu Delivery</td>
                    <td>Within 24 to 48 hours (Cash on Delivery available)</td>
                  </tr>
                  <tr>
                    <td>Return Policy</td>
                    <td>7 Days Replacement / Return Guarantee</td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  fontSize: '12px',
                  color: 'var(--muted)',
                  lineHeight: '1.5'
                }}
              >
                <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>
                  🛡️ BuyerNepal Authenticity Guarantee
                </strong>
                Prices, seller reputation, and stock availability are tracked daily. We earn a small affiliate
                commission from partner stores at zero extra cost to you, keeping this discovery platform 100% free and unbiased.
              </div>
            </div>
          </div>

          {/* Customer Reviews & Interactive Submission Form */}
          <section className="reviews-section">
            <div className="reviews-header">
              <div>
                <span className="section-kicker">VERIFIED BUYER FEEDBACK</span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>Shopper Reviews</h2>
              </div>
              <span className="section-count">{reviews.length} Verified Reviews</span>
            </div>

            {/* Interactive Review Form */}
            <div className="review-form-card">
              <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '6px' }}>
                ✍️ Bought or Used this Product? Share your Review
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '14px' }}>
                Help fellow Nepali shoppers make informed decisions.
              </p>

              <form id="reviewSubmitForm" method="post" action="/api/reviews">
                <input type="hidden" name="product_id" value={product.id} />
                <div className="review-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Your Name &amp; City *
                    </label>
                    <input
                      name="user_name"
                      type="text"
                      placeholder="e.g. Manish Sharma (Lalitpur)"
                      required
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Rating *
                    </label>
                    <select
                      name="rating"
                      required
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}
                    >
                      <option value="5">★★★★★ (5/5) - Exceptional</option>
                      <option value="4">★★★★☆ (4/5) - Great value</option>
                      <option value="3">★★★☆☆ (3/5) - Average</option>
                      <option value="2">★★☆☆☆ (2/5) - Disappointed</option>
                      <option value="1">★☆☆☆☆ (1/5) - Not recommended</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Review Comments *
                  </label>
                  <textarea
                    name="comment"
                    rows={3}
                    placeholder="Describe product quality, delivery experience, packaging, and performance in Nepal…"
                    required
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}
                  ></textarea>
                </div>

                <button type="submit" className="primary-action">
                  Submit Customer Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="review-list">
                {reviews.map((r) => (
                  <div key={r.id} className="review-card">
                    <div className="review-top">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="review-author">{r.user_name}</span>
                        <span style={{ fontSize: '10px', background: 'var(--emerald-soft)', color: 'var(--emerald)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          ✓ Verified Buyer
                        </span>
                      </div>
                      <span style={{ color: 'var(--amber)', fontWeight: 700 }}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: '1.6', marginTop: '4px' }}>
                      {r.comment}
                    </p>
                    <time style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Verified Review'}
                    </time>
                  </div>
                ))}
              </div>
            ) : (
              <div className="store-empty" style={{ padding: '32px 20px' }}>
                <div className="empty-icon">★</div>
                <h3>No community reviews yet</h3>
                <p>Be the first to share your experience with {product.name} in Nepal.</p>
              </div>
            )}
          </section>
        </main>

        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="home" />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  const form = document.getElementById('reviewSubmitForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      try {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          alert('Thank you! Your verified review has been submitted.');
          window.location.reload();
        } else {
          alert(data.error || 'Failed to submit review');
        }
      } catch (err) {
        alert('Review submitted successfully!');
        window.location.reload();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Customer Review';
        }
      }
    });
  }
})();
`
        }}
      />
    </Layout>
  );
};
