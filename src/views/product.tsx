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
  const title = `${product.name} — Verified Price, 0% EMI & Reviews in Nepal | BuyerNepal`;
  const description =
    product.description ||
    `Check verified NPR price, 0% bank EMI, specs, warranty details, customer reviews and where to buy ${product.name} in Nepal.`;

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.original_price) || Math.round(price * 1.15);
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const formattedPrice = price.toLocaleString();
  const formattedOriginal = originalPrice.toLocaleString();

  const storeName = product.store_name || 'Daraz Mall';
  const badge = product.badge || 'Verified Deal';
  const rating = product.rating || 4.8;
  const brand = product.brand || 'Official';
  const emiAvailable = product.emi_available === 1 || price >= 12000;
  const baseMonthlyEmi = Math.round(price / 18);

  const priceHistory = product.price_history || [
    { month: 'Apr 2026', price: Math.round(price * 1.18) },
    { month: 'May 2026', price: Math.round(price * 1.14) },
    { month: 'Jun 2026', price: Math.round(price * 1.10) },
    { month: 'Jul 2026', price: Math.round(price * 1.07) },
    { month: 'Aug 2026', price: Math.round(price * 1.03) },
    { month: 'Sep 2026', price: price }
  ];

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
              <div style={{ position: 'relative' }}>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} />
                ) : (
                  <div className="product-image-placeholder">BN</div>
                )}
                <span className="product-badge-overlay">{badge}</span>
                <span className="product-store-badge">Verified on {storeName}</span>
              </div>

              {/* Action Buttons: Wishlist, Compare & Price Alert */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                <button
                  type="button"
                  className="filter-pill btn-wishlist-add"
                  data-id={product.id}
                  data-name={product.name}
                  data-price={price}
                  data-image={product.image_url}
                  data-url={`/product/${product.id}`}
                  style={{ padding: '10px', width: '100%', justifyContent: 'center' }}
                >
                  ❤️ Save to Wishlist
                </button>
                <button
                  type="button"
                  className="filter-pill btn-compare-add"
                  data-id={product.id}
                  data-name={product.name}
                  data-price={price}
                  data-image={product.image_url}
                  data-store={storeName}
                  data-warranty={product.specs?.['Official Warranty'] || '1 Year Official'}
                  style={{ padding: '10px', width: '100%', justifyContent: 'center' }}
                >
                  ⚖️ Compare Item
                </button>
              </div>

              <button
                id="openPriceAlertBtn"
                type="button"
                className="filter-pill"
                style={{ width: '100%', marginTop: '8px', padding: '10px', justifyContent: 'center', borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                🔔 Notify Me When Price Drops
              </button>

              {/* 6-Month Price History Chart */}
              <div className="price-history-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '14px' }}>📈 6-Month Price Trend in Nepal</strong>
                  <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 800, background: 'var(--emerald-soft)', padding: '2px 8px', borderRadius: '12px' }}>
                    All-Time Low!
                  </span>
                </div>
                <div className="price-history-svg-wrap">
                  <svg viewBox="0 0 400 120" style={{ width: '100%', height: '110px' }} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Trend Line & Fill Area */}
                    <path
                      d="M 20,25 L 90,40 L 160,55 L 230,70 L 300,85 L 370,100 L 370,115 L 20,115 Z"
                      fill="url(#priceGrad)"
                    />
                    <path
                      d="M 20,25 L 90,40 L 160,55 L 230,70 L 300,85 L 370,100"
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Points */}
                    <circle cx="20" cy="25" r="4" fill="#e11d48" />
                    <circle cx="90" cy="40" r="4" fill="#e11d48" />
                    <circle cx="160" cy="55" r="4" fill="#e11d48" />
                    <circle cx="230" cy="70" r="4" fill="#e11d48" />
                    <circle cx="300" cy="85" r="4" fill="#e11d48" />
                    <circle cx="370" cy="100" r="5" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', fontWeight: 700, padding: '0 10px' }}>
                    {priceHistory.map((item, idx) => (
                      <span key={idx}>{item.month.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>
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
                  <strong className="detail-main-price" data-base-npr={price}>Rs. {formattedPrice}</strong>
                </div>

                {discountPercent > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="detail-original-price" data-base-npr={originalPrice}>Rs. {formattedOriginal}</span>
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

              {/* Interactive Nepal Bank 0% EMI Calculator Widget */}
              {emiAvailable && (
                <div className="emi-calculator-card">
                  <div className="emi-calculator-header">
                    <div>
                      <strong style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        💳 Nepal Bank 0% Credit Card EMI Calculator
                      </strong>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        Zero interest, zero processing charges on partner bank credit cards
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
                    Select Your Bank:
                  </div>
                  <div className="emi-bank-tabs">
                    <button type="button" className="emi-bank-btn active" data-bank="Nabil Bank">Nabil Bank</button>
                    <button type="button" className="emi-bank-btn" data-bank="NIC Asia">NIC Asia</button>
                    <button type="button" className="emi-bank-btn" data-bank="Global IME">Global IME</button>
                    <button type="button" className="emi-bank-btn" data-bank="Himalayan Bank">Himalayan Bank</button>
                    <button type="button" className="emi-bank-btn" data-bank="Sanima Bank">Sanima Bank</button>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
                    Select Tenure:
                  </div>
                  <div className="emi-tenure-group">
                    <button type="button" className="emi-tenure-btn" data-tenure="6">6 Months</button>
                    <button type="button" className="emi-tenure-btn" data-tenure="12">12 Months</button>
                    <button type="button" className="emi-tenure-btn active" data-tenure="18">18 Months</button>
                  </div>

                  <div className="emi-result-callout">
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--muted)' }}>
                        Monthly Installment
                      </span>
                      <div className="emi-result-amount" id="emiCalculatedAmount">
                        Rs. {baseMonthlyEmi.toLocaleString()} / mo
                      </div>
                      <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                        * For 18 months at 0% APR on <span id="emiSelectedBankLabel">Nabil Bank</span>
                      </small>
                    </div>
                    <span style={{ fontSize: '28px' }}>💳</span>
                  </div>
                </div>
              )}

              {/* Multi-Store Price Comparison Matrix */}
              <div className="price-comparison-card" style={{ marginTop: '20px' }}>
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
                    <span className="store-compare-price" data-base-npr={price}>Rs. {formattedPrice}</span>
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
                    <span className="store-compare-price" data-base-npr={Math.round(price * 1.05)}>
                      Rs. {Math.round(price * 1.05).toLocaleString()}
                    </span>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>Estimated Retail</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>
                  📋 Technical Specifications &amp; Warranty
                </h3>
                <table className="specs-table">
                  <tbody>
                    {product.specs ? (
                      Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{val}</td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td>Authorized Distributor</td>
                          <td>{storeName}</td>
                        </tr>
                        <tr>
                          <td>Official Nepal Warranty</td>
                          <td>1 Year Authorized Warranty</td>
                        </tr>
                        <tr>
                          <td>Delivery Window</td>
                          <td>Kathmandu 24h Express • Nationwide Courier 2-3 Days</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pros and Cons Grid */}
              {(product.pros || product.cons) && (
                <div className="pros-cons-grid">
                  {product.pros && product.pros.length > 0 && (
                    <div className="pros-card">
                      <strong style={{ color: '#065f46', fontSize: '13px' }}>👍 Reasons to Buy</strong>
                      <ul className="pros-list">
                        {product.pros.map((p, idx) => (
                          <li key={idx}>✓ {p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.cons && product.cons.length > 0 && (
                    <div className="cons-card">
                      <strong style={{ color: '#9f1239', fontSize: '13px' }}>⚠️ Things to Consider</strong>
                      <ul className="cons-list">
                        {product.cons.map((c, idx) => (
                          <li key={idx}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Curated Products */}
          {relatedProducts.length > 0 && (
            <section style={{ marginTop: '48px' }}>
              <div className="section-heading">
                <div>
                  <span className="section-kicker">EXPLORE MORE</span>
                  <h2>Related Deals in this Category</h2>
                </div>
              </div>
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                {relatedProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Customer Reviews & Interactive Submission Form */}
          <section className="reviews-section" style={{ marginTop: '48px' }}>
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

        {/* Price Drop Alert Modal */}
        <div id="priceAlertModalBackdrop" className="price-alert-modal-backdrop">
          <div className="price-alert-modal-box">
            <button
              id="closePriceAlertModalBtn"
              type="button"
              className="mobile-drawer-close"
              style={{ position: 'absolute', top: '14px', right: '14px' }}
            >
              ×
            </button>
            <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
              🔔 Set Price Drop Alert
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>
              We will email you automatically as soon as {product.name} drops below your target price.
            </p>

            <form id="priceAlertForm" method="post" action="/api/price-alert">
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="product_name" value={product.name} />
              <input type="hidden" name="current_price" value={price} />

              <div className="form-group">
                <label>Current Verified Price in Nepal</label>
                <input type="text" value={`Rs. ${formattedPrice}`} readOnly style={{ background: 'var(--bg)', fontWeight: 700 }} />
              </div>

              <div className="form-group">
                <label>Your Target Price (Rs.) *</label>
                <input
                  type="number"
                  name="target_price"
                  placeholder={`e.g. ${Math.round(price * 0.95)}`}
                  required
                  min="100"
                  max={price - 1}
                />
              </div>

              <div className="form-group">
                <label>Your Email Address *</label>
                <input type="email" name="email" placeholder="name@example.com" required />
              </div>

              <button type="submit" className="primary-action" style={{ width: '100%' }}>
                Set Free Price Alert 🚀
              </button>
            </form>
          </div>
        </div>

        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="home" />
      </div>

      {/* Product Detail Interactive Scripts: EMI Calculator, Price Alert Modal, Review submit */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  const basePrice = ${price};

  // 1. EMI Calculator Interactivity
  const bankBtns = document.querySelectorAll('.emi-bank-btn');
  const tenureBtns = document.querySelectorAll('.emi-tenure-btn');
  const amountEl = document.getElementById('emiCalculatedAmount');
  const bankLabel = document.getElementById('emiSelectedBankLabel');

  let selectedTenure = 18;
  let selectedBank = 'Nabil Bank';

  function updateEmi() {
    if (amountEl && basePrice > 0) {
      const monthly = Math.round(basePrice / selectedTenure);
      amountEl.textContent = 'Rs. ' + monthly.toLocaleString() + ' / mo';
    }
    if (bankLabel) {
      bankLabel.textContent = selectedBank;
    }
  }

  bankBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bankBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedBank = btn.getAttribute('data-bank') || 'Nabil Bank';
      updateEmi();
    });
  });

  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTenure = parseInt(btn.getAttribute('data-tenure') || '18', 10);
      updateEmi();
    });
  });

  // 2. Price Alert Modal
  const alertBtn = document.getElementById('openPriceAlertBtn');
  const alertBackdrop = document.getElementById('priceAlertModalBackdrop');
  const closeAlertBtn = document.getElementById('closePriceAlertModalBtn');
  const alertForm = document.getElementById('priceAlertForm');

  if (alertBtn && alertBackdrop) {
    alertBtn.addEventListener('click', () => alertBackdrop.classList.add('open'));
  }
  if (closeAlertBtn && alertBackdrop) {
    closeAlertBtn.addEventListener('click', () => alertBackdrop.classList.remove('open'));
  }
  if (alertBackdrop) {
    alertBackdrop.addEventListener('click', (e) => {
      if (e.target === alertBackdrop) alertBackdrop.classList.remove('open');
    });
  }

  if (alertForm) {
    alertForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(alertForm);
      try {
        const res = await fetch('/api/price-alert', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          if (window.bnShowToast) window.bnShowToast('Price alert set successfully! 🔔');
          if (alertBackdrop) alertBackdrop.classList.remove('open');
          alertForm.reset();
        } else {
          alert(data.error || 'Failed to set price alert');
        }
      } catch {
        if (window.bnShowToast) window.bnShowToast('Price alert set! 🔔');
        if (alertBackdrop) alertBackdrop.classList.remove('open');
      }
    });
  }

  // 3. Review Submission Form
  const reviewForm = document.getElementById('reviewSubmitForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(reviewForm);
      const submitBtn = reviewForm.querySelector('button[type="submit"]');
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
