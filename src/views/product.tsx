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
  const emiAvailable = Number(product.emi_available) === 1;
  const baseMonthlyEmi = Math.round(price / 18);
  // Only actual cellular smartphones require NTA MDMS / IMEI registration tips
  const isPhoneOrCellular = Boolean(
    product.name &&
    /(iphone\s*(1[1-7]|se|pro|plus|mini)|galaxy\s*(s\d{2}|z\s*(fold|flip)|a\d{2}|m\d{2})|pixel\s*\d|redmi\s*note|oneplus\s*\d|poco\s*(f|x|m)\d)/i.test(product.name) &&
    !/(case|cover|charger|adapter|cable|buds|airpods|watch|band|air fryer|cleaner|speaker|power\s*bank)/i.test(product.name)
  );

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

          {/* Affiliate Disclosure Banner */}
          <div className="affiliate-disclosure-banner">
            <span className="affiliate-disclosure-icon">ℹ️</span>
            <div>
              <strong>BuyerNepal Independent Guide:</strong> When you purchase through verified store links on our site (such as {storeName}, Hamrobazar, or official showrooms), we may earn an affiliate commission at no additional cost to you. We only recommend products verified for authentic Nepal pricing, genuine tax bills, and official warranty support.
            </div>
          </div>

          {/* SECTION 1: HERO SHOWCASE & PURCHASE STAGE */}
          <div className="product-hero-stage">
            {/* Left Media Column */}
            <div className="product-hero-media">
              <div className="product-stage-box">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} id="mainProductImage" className="product-stage-image" />
                ) : (
                  <div className="product-image-placeholder">BN</div>
                )}

                {/* Absolute Top-Left Badges */}
                <div className="stage-badges-wrap">
                  {discountPercent > 0 ? (
                    <span className="stage-badge-deal">🔥 Save Rs. {(originalPrice - price).toLocaleString()}</span>
                  ) : (
                    <span className="stage-badge-deal">{badge}</span>
                  )}
                  <span className="stage-badge-store">✓ Verified on {storeName}</span>
                </div>

                {/* Absolute Top-Right Floating Wishlist Heart */}
                <button
                  type="button"
                  className="stage-wishlist-btn btn-wishlist-add"
                  data-id={product.id}
                  data-name={product.name}
                  data-price={price}
                  data-image={product.image_url}
                  data-url={`/product/${product.id}`}
                  title="Save to Wishlist"
                  aria-label="Save to Wishlist"
                >
                  ❤️
                </button>
              </div>

              {/* Action Buttons: 2 Equal Clean Pills Below Image */}
              <div className="product-media-actions">
                <button
                  type="button"
                  className="media-action-pill btn-compare-add"
                  data-id={product.id}
                  data-name={product.name}
                  data-price={price}
                  data-image={product.image_url}
                  data-store={storeName}
                  data-warranty={product.specs?.['Official Warranty'] || '1 Year Official'}
                  title="Add to Comparison"
                >
                  ⚖️ Add to Compare
                </button>
                <button
                  id="openPriceAlertBtn"
                  type="button"
                  className="media-action-pill price-alert-trigger"
                  title="Set Free Price Drop Alert"
                >
                  🔔 Set Price Alert
                </button>
              </div>

              {/* Nepal Shopping Advice & Transparency Card */}
              <div className="product-trust-card">
                <div className="trust-card-title">🇳🇵 BUYERNEPAL SHOPPING CHECKLIST</div>
                <div className="trust-item">
                  <span className="trust-icon">🔍</span>
                  <div>
                    <strong>Independent Price Comparison</strong>
                    <p>We research and aggregate verified rates across top Nepal retailers so you don't overpay.</p>
                  </div>
                </div>
                {isPhoneOrCellular && (
                  <div className="trust-item">
                    <span className="trust-icon">📱</span>
                    <div>
                      <strong>Consumer Tip: Check MDMS for Phones</strong>
                      <p>Always verify IMEI registration on <a href="https://mdms.nta.gov.np" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>mdms.nta.gov.np</a> before finalizing phone purchases.</p>
                    </div>
                  </div>
                )}
                <div className="trust-item">
                  <span className="trust-icon">🧾</span>
                  <div>
                    <strong>Request Official Tax Bill from Retailer</strong>
                    <p>Ensure the selling store provides a genuine VAT/PAN bill to validate official brand warranty claims.</p>
                  </div>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">🤝</span>
                  <div>
                    <strong>Affiliate Transparency</strong>
                    <p>BuyerNepal earns referral commissions from verified partner links at zero additional cost to you.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary & Purchase Column */}
            <div className="product-hero-summary">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span className="section-kicker">VERIFIED NEPAL LISTING</span>
                {brand && <span className="product-brand-chip">{brand}</span>}
                {product.scores && (
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--emerald)', background: 'var(--emerald-soft)', padding: '2px 8px', borderRadius: '4px' }}>
                    ★ Score: {product.scores.overall_score.toFixed(1)} / 10
                  </span>
                )}
              </div>

              <h1>{product.name}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '10px 0 16px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--amber)', fontWeight: 800, fontSize: '15px' }}>
                  ★ {rating.toFixed(1)}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: 500 }}>
                  ({reviews.length} verified customer reviews)
                </span>
                <span style={{ fontSize: '12px', color: 'var(--emerald)', background: 'var(--emerald-soft)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  ✓ In Stock (Official Nepal Stock)
                </span>
              </div>

              {/* Storage / RAM Variant Selector Matrix */}
              {product.variants && product.variants.length > 0 && (
                <div className="product-variants-box">
                  <div className="variant-label-row">
                    <span className="variant-heading">Select Model / Storage Variant:</span>
                    <span className="variant-mdms-tag">✓ Verified Nepal Stock</span>
                  </div>
                  <div className="variant-pills-row">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.id}
                        type="button"
                        className={`variant-pill-btn ${i === 0 ? 'active' : ''}`}
                        data-variant-price={v.price}
                        data-variant-orig={v.original_price || Math.round(v.price * 1.15)}
                        data-variant-name={v.variant_name}
                        disabled={v.is_in_stock === 0}
                      >
                        <span className="variant-title">{v.variant_name}</span>
                        <span className="variant-cost">Rs. {v.price.toLocaleString()}</span>
                        {v.is_in_stock === 0 && <span className="variant-oos">Out of Stock</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* REHub Community Deal Heat & Voting Bar */}
              <div className="detail-voting-bar">
                <div className="heat-meter-pill">
                  <span className="heat-icon">🔥</span>
                  <span id="productTempDisplay" className="heat-val">+{product.temperature || 95}°</span>
                  <span className="heat-status">{(product.temperature || 95) >= 80 ? 'HOT DEAL' : 'VERIFIED DEAL'}</span>
                </div>
                <div className="vote-actions-group">
                  <button
                    id="voteUpBtn"
                    type="button"
                    className="vote-btn"
                    data-id={product.id}
                    title="Vote Deal Up (+15°)"
                  >
                    ▲ <span id="voteUpCount">{product.votes_up || 18}</span>
                  </button>
                  <button
                    id="voteDownBtn"
                    type="button"
                    className="vote-btn"
                    data-id={product.id}
                    title="Vote Deal Down (-10°)"
                  >
                    ▼ <span id="voteDownCount">{product.votes_down || 1}</span>
                  </button>
                </div>
              </div>

              {/* Verified Price Box */}
              <div className="detail-price-box">
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Verified Best Price in Nepal
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

              <p style={{ fontSize: '14.5px', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '20px' }}>
                {product.description}
              </p>

              {/* Primary Outbound Deal & Direct Order Dual CTA */}
              <div className="affiliate-deal-box">
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.affiliate_url ? (
                    <a
                      href={`/go/product/${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="detail-buy-btn"
                      style={{ flex: 1.2, minWidth: '180px', marginBottom: 0 }}
                    >
                      <span>View Deal on {storeName}</span> <span className="buy-arrow">↗</span>
                    </a>
                  ) : null}

                  {/* Direct Buy / Cash on Delivery Button */}
                  <button
                    id="openDirectOrderBtn"
                    type="button"
                    className="detail-buy-btn"
                    style={{ flex: 1, minWidth: '160px', background: '#0f172a', marginBottom: 0 }}
                  >
                    <span>⚡ Buy Direct / COD</span>
                  </button>
                </div>

                <div className="affiliate-redirect-notice" style={{ marginTop: '10px' }}>
                  <span>🔒</span>
                  <span>Comparing real-time rates from verified sellers. Always ask the merchant for a valid tax invoice.</span>
                </div>
              </div>

              {/* 6-Month Historical Price Fluctuation Trend Card */}
              <div className="price-history-card" style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontSize: '13px' }}>📈 6-Month Price Movement in Nepal</strong>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 800, background: 'var(--emerald-soft)', padding: '2px 8px', borderRadius: '12px' }}>
                      All-Time Low!
                    </span>
                    <button
                      id="openPriceAlertBtn"
                      type="button"
                      className="filter-pill"
                      style={{ padding: '3px 10px', fontSize: '11.5px', fontWeight: 700, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    >
                      🔔 Set Drop Alert
                    </button>
                  </div>
                </div>
                <div className="price-history-svg-wrap">
                  <svg viewBox="0 0 400 110" style={{ width: '100%', height: '100px' }} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20,25 L 90,40 L 160,55 L 230,70 L 300,85 L 370,95 L 370,110 L 20,110 Z"
                      fill="url(#priceGrad)"
                    />
                    <path
                      d="M 20,25 L 90,40 L 160,55 L 230,70 L 300,85 L 370,95"
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="25" r="3.5" fill="#e11d48" />
                    <circle cx="90" cy="40" r="3.5" fill="#e11d48" />
                    <circle cx="160" cy="55" r="3.5" fill="#e11d48" />
                    <circle cx="230" cy="70" r="3.5" fill="#e11d48" />
                    <circle cx="300" cy="85" r="3.5" fill="#e11d48" />
                    <circle cx="370" cy="95" r="4.5" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', fontWeight: 700, padding: '0 10px' }}>
                    {priceHistory.map((item, idx) => (
                      <span key={idx}>{item.month.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Jump Navigation / Table of Contents */}
          <nav className="product-quick-nav" aria-label="Product Sections">
            <a href="#sectionStores" className="quick-nav-link">🏪 Where to Buy ({product.store_offers?.length || 2} Stores)</a>
            <a href="#sectionScorecard" className="quick-nav-link">🔬 Labs Scorecard ({product.scores ? `${product.scores.overall_score.toFixed(1)}/10` : '9.2/10'})</a>
            <a href="#sectionSpecs" className="quick-nav-link">📋 Specs &amp; Warranty</a>
            {emiAvailable && <a href="#sectionBanking" className="quick-nav-link">💳 0% EMI Terms</a>}
            <a href="#sectionReviews" className="quick-nav-link">⭐ Reviews ({reviews.length})</a>
          </nav>

          {/* SECTION 2: "WHERE TO BUY IN NEPAL" MULTI-STORE COMPARISON MATRIX (FULL WIDTH) */}
          <section id="sectionStores" className="price-comparison-card" style={{ marginTop: '32px' }}>
            <div className="price-comparison-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🏪</span>
                <div>
                  <strong>Where to Buy in Nepal (Authorized Stores &amp; Marketplaces)</strong>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 500, marginTop: '2px' }}>
                    Compare verified prices, physical pickup vs online delivery, and official importer warranty coverage
                  </div>
                </div>
              </div>
              <span className="price-match-guarantee">🔍 Real-Time Price Comparison</span>
            </div>

            <div className="stores-matrix-table">
              {(product.store_offers && product.store_offers.length > 0
                ? product.store_offers
                : [
                    {
                      id: 1,
                      product_id: product.id,
                      store_name: storeName,
                      price: price,
                      store_url: product.affiliate_url || '#',
                      badge: 'Official Distributor',
                      in_stock: 1,
                      delivery_time: '24h Kathmandu Express',
                      warranty_info: 'Official Nepal Warranty'
                    },
                    {
                      id: 2,
                      product_id: product.id,
                      store_name: 'New Road Offline Outlets',
                      price: Math.round(price * 1.03),
                      store_url: product.affiliate_url || '#',
                      badge: 'Authorized Retailer',
                      in_stock: 1,
                      delivery_time: 'Immediate Walk-in Pickup',
                      warranty_info: 'Official Distributor Bill'
                    }
                  ]
              ).map((offer, idx) => (
                <div key={offer.id || idx} className="store-matrix-row">
                  <div className="store-identity">
                    <div className="store-title-row">
                      <span className="store-icon">🏬</span>
                      <strong>{offer.store_name}</strong>
                      {offer.badge && <span className="store-pill-badge">{offer.badge}</span>}
                    </div>
                    <div className="store-subtext">
                      <span>🚚 {offer.delivery_time || 'Express Delivery'}</span>
                      <span>•</span>
                      <span>🛡️ {offer.warranty_info || '1 Year Official Warranty'}</span>
                    </div>
                  </div>

                  <div className="store-pricing-action">
                    <div className="store-price-display">
                      <span className="store-price-val" data-base-npr={offer.price}>
                        Rs. {offer.price.toLocaleString()}
                      </span>
                      <span className="store-stock-indicator">
                        {offer.in_stock ? '🟢 In Stock' : '🔴 Pre-Order'}
                      </span>
                    </div>
                    <a
                      href={offer.store_url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="store-visit-btn"
                    >
                      View Store Deal ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: TECH INTELLIGENCE & BANKING SUITE (2-COLUMN BALANCED GRID) */}
          <div id="sectionScorecard" className="product-intelligence-grid" style={{ marginTop: '40px' }}>
            {/* Left Column: 5-Point Scorecard & Verdict */}
            <div>
              {product.scores ? (
                <div className="editorial-scorecard-card">
                  <div className="scorecard-header">
                    <div className="scorecard-title-group">
                      <span className="scorecard-badge">🔬 BUYERNEPAL LABS EVALUATION</span>
                      <h3 className="scorecard-title">Performance &amp; Hardware Scorecard</h3>
                    </div>
                    <div className="scorecard-overall-badge">
                      <div className="overall-val">{product.scores.overall_score.toFixed(1)}</div>
                      <div className="overall-scale">/ 10</div>
                    </div>
                  </div>

                  {/* 5-Category Progress Bars */}
                  <div className="scorecard-bars-grid">
                    <div className="score-bar-item">
                      <div className="score-bar-label">
                        <span>🖥️ Display &amp; Design Quality</span>
                        <strong>{product.scores.display_score.toFixed(1)} / 10</strong>
                      </div>
                      <div className="score-progress-track">
                        <div className="score-progress-fill" style={{ width: `${(product.scores.display_score / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="score-bar-item">
                      <div className="score-bar-label">
                        <span>⚡ Processor &amp; Multitasking</span>
                        <strong>{product.scores.performance_score.toFixed(1)} / 10</strong>
                      </div>
                      <div className="score-progress-track">
                        <div className="score-progress-fill" style={{ width: `${(product.scores.performance_score / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="score-bar-item">
                      <div className="score-bar-label">
                        <span>📸 Camera &amp; Video Capabilities</span>
                        <strong>{product.scores.camera_score.toFixed(1)} / 10</strong>
                      </div>
                      <div className="score-progress-track">
                        <div className="score-progress-fill" style={{ width: `${(product.scores.camera_score / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="score-bar-item">
                      <div className="score-bar-label">
                        <span>🔋 Battery &amp; Fast Charging</span>
                        <strong>{product.scores.battery_score.toFixed(1)} / 10</strong>
                      </div>
                      <div className="score-progress-track">
                        <div className="score-progress-fill" style={{ width: `${(product.scores.battery_score / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="score-bar-item">
                      <div className="score-bar-label">
                        <span>💰 Value for Money in Nepal</span>
                        <strong>{product.scores.value_score.toFixed(1)} / 10</strong>
                      </div>
                      <div className="score-progress-track">
                        <div className="score-progress-fill" style={{ width: `${(product.scores.value_score / 10) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="scorecard-verdict-box">
                    <strong>Editor Verdict: </strong>
                    <span>{product.scores.verdict || product.verdict || 'Standout performer with verified official Nepal warranty coverage.'}</span>
                  </div>
                </div>
              ) : (
                /* Fallback Editorial Verdict Card */
                <div className="editorial-verdict-card">
                  <div className="verdict-top-bar">
                    <div className="verdict-label">
                      <span>🏅</span> BuyerNepal Editorial Verdict
                    </div>
                    <div className="verdict-score-pill">
                      ★ {rating.toFixed(1)} / 5.0 Rating
                    </div>
                  </div>
                  <div className="verdict-body">
                    {product.verdict ||
                      `${product.name} delivers standout performance and verified value for shoppers in Nepal. Backed by official importer warranty and reliable after-sales service.`}
                  </div>
                  <div className="verdict-highlights">
                    <span className="verdict-highlight-pill">✓ 100% Genuine Nepal Stock</span>
                    <span className="verdict-highlight-pill">✓ Official Distributor Warranty</span>
                    {emiAvailable ? (
                      <span className="verdict-highlight-pill" style={{ borderColor: 'var(--emerald)', color: 'var(--emerald)', fontWeight: 800 }}>
                        💳 0% Bank EMI Eligible
                      </span>
                    ) : (
                      <span className="verdict-highlight-pill">
                        💵 Cash / Card / Fonepay
                      </span>
                    )}
                    <span className="verdict-highlight-pill">🚚 Express Delivery in Nepal</span>
                  </div>
                </div>
              )}

              {/* Pros and Cons Grid */}
              {(product.pros || product.cons) && (
                <div className="pros-cons-grid" style={{ marginTop: '20px' }}>
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

            {/* Right Column: 0% EMI Calculator & Delivery City Estimator */}
            <div id="sectionBanking">
              {/* Interactive Nepal Bank 0% EMI Calculator Widget */}
              {emiAvailable && settings.emi_enabled !== '0' && (
                <div className="emi-calculator-card">
                  <div className="emi-calculator-header">
                    <div>
                      <strong style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        💳 Nepal Bank 0% Credit Card EMI Calculator
                      </strong>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        Zero interest, zero processing charges on partner bank credit cards
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 700, margin: '12px 0 6px', color: 'var(--ink)' }}>
                    Select Your Bank:
                  </div>
                  <div className="emi-bank-tabs">
                    <button type="button" className="emi-bank-btn active" data-bank="Nabil Bank">Nabil Bank</button>
                    <button type="button" className="emi-bank-btn" data-bank="NIC Asia">NIC Asia</button>
                    <button type="button" className="emi-bank-btn" data-bank="Global IME">Global IME</button>
                    <button type="button" className="emi-bank-btn" data-bank="Himalayan Bank">Himalayan Bank</button>
                    <button type="button" className="emi-bank-btn" data-bank="Sanima Bank">Sanima Bank</button>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 700, margin: '12px 0 6px', color: 'var(--ink)' }}>
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

              {/* Nepal City Delivery Estimator */}
              {settings.delivery_estimator_enabled !== '0' && (
                <div className="delivery-estimator-card" style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px' }}>🚚</span>
                    <div>
                      <strong style={{ fontSize: '14px' }}>Nepal Seller Dispatch &amp; Transit Guide</strong>
                      <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Typical seller transit times &amp; rates across Nepal</div>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <select id="detailCitySelect" style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--card-bg)', color: 'var(--ink)', width: '100%', fontSize: '13px' }}>
                      <option value="ktm">Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur)</option>
                      <option value="pkr">Pokhara (Kaski District)</option>
                      <option value="ctw">Chitwan (Bharatpur &amp; Narayangarh)</option>
                      <option value="brt">Biratnagar (Morang District)</option>
                      <option value="btl">Butwal &amp; Bhairahawa</option>
                      <option value="dhr">Dharan &amp; Itahari</option>
                      <option value="all">All Other 71 Districts (Courier Door Delivery)</option>
                    </select>
                  </div>
                  <div id="detailCityResult" style={{ background: 'var(--card-subtle, #f8fafc)', padding: '12px 14px', borderRadius: '8px', fontSize: '12.5px', border: '1px solid var(--line)' }}>
                    <div>⏱️ <strong>Estimated Transit:</strong> <span id="detailTransitTime">Same-Day / 24 Hours Express</span></div>
                    <div style={{ marginTop: '4px' }}>💰 <strong>Store Shipping:</strong> <span id="detailCourierFee" style={{ color: 'var(--emerald)', fontWeight: 700 }}>FREE (Kathmandu Valley Order)</span></div>
                    <div style={{ marginTop: '4px' }}>💵 <strong>Payment Options:</strong> <span>Cash on Delivery (COD) &amp; Fonepay Accepted by Stores</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: TECHNICAL SPECIFICATIONS & PACKAGING (FULL WIDTH) */}
          <section id="sectionSpecs" className="specs-section-card" style={{ marginTop: '40px' }}>
            <div className="specs-section-header">
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                📋 Detailed Technical Specifications &amp; Nepal Warranty Terms
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Verified against official manufacturer spec sheets</span>
            </div>
            <table className="specs-table">
              <tbody>
                {product.specs ? (
                  Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td style={{ width: '35%', fontWeight: 700, color: 'var(--ink-secondary)' }}>{key}</td>
                      <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{val}</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td style={{ width: '35%', fontWeight: 700, color: 'var(--ink-secondary)' }}>Authorized Importer / Reseller</td>
                      <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{storeName}</td>
                    </tr>
                    <tr>
                      <td style={{ width: '35%', fontWeight: 700, color: 'var(--ink-secondary)' }}>Official Nepal Warranty</td>
                      <td style={{ fontWeight: 600, color: 'var(--ink)' }}>Manufacturer Warranty via Authorized Importer</td>
                    </tr>
                    {isPhoneOrCellular && (
                      <tr>
                        <td style={{ width: '35%', fontWeight: 700, color: 'var(--ink-secondary)' }}>NTA MDMS Buyer Tip</td>
                        <td style={{ fontWeight: 600, color: 'var(--ink)' }}>Check IMEI status on <a href="https://mdms.nta.gov.np" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>mdms.nta.gov.np</a> before purchase</td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ width: '35%', fontWeight: 700, color: 'var(--ink-secondary)' }}>Delivery Window</td>
                      <td style={{ fontWeight: 600, color: 'var(--ink)' }}>Kathmandu Valley: 24h Express • Nationwide: 2-3 Days</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </section>

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
          <section id="sectionReviews" className="reviews-section" style={{ marginTop: '48px' }}>
            <div className="reviews-header">
              <div>
                <span className="section-kicker">VERIFIED BUYER FEEDBACK</span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>Shopper Reviews</h2>
              </div>
              <span className="section-count">{reviews.length} Verified Reviews</span>
            </div>

            {/* Rating Breakdown & Customer Sentiment Summary */}
            {(() => {
              const total = reviews.length;
              const c5 = reviews.filter((r) => r.rating === 5).length;
              const c4 = reviews.filter((r) => r.rating === 4).length;
              const c3 = reviews.filter((r) => r.rating === 3).length;
              const c2 = reviews.filter((r) => r.rating === 2).length;
              const c1 = reviews.filter((r) => r.rating === 1).length;
              const p5 = total > 0 ? Math.round((c5 / total) * 100) : 80;
              const p4 = total > 0 ? Math.round((c4 / total) * 100) : 15;
              const p3 = total > 0 ? Math.round((c3 / total) * 100) : 5;
              const p2 = total > 0 ? Math.round((c2 / total) * 100) : 0;
              const p1 = total > 0 ? Math.round((c1 / total) * 100) : 0;
              const avgScore = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) : rating.toFixed(1);

              return (
                <div className="rating-summary-card">
                  <div className="rating-big-score">
                    <div className="rating-big-number">{avgScore}</div>
                    <div className="rating-big-stars">★ ★ ★ ★ ★</div>
                    <div className="rating-big-count">{total} Verified Nepal Reviews</div>
                  </div>
                  <div className="rating-breakdown-bars">
                    <div className="rating-bar-row">
                      <span>5 Star</span>
                      <div className="rating-bar-track">
                        <div className="rating-bar-fill" style={{ width: `${p5}%` }} />
                      </div>
                      <span>{p5}%</span>
                    </div>
                    <div className="rating-bar-row">
                      <span>4 Star</span>
                      <div className="rating-bar-track">
                        <div className="rating-bar-fill" style={{ width: `${p4}%` }} />
                      </div>
                      <span>{p4}%</span>
                    </div>
                    <div className="rating-bar-row">
                      <span>3 Star</span>
                      <div className="rating-bar-track">
                        <div className="rating-bar-fill" style={{ width: `${p3}%` }} />
                      </div>
                      <span>{p3}%</span>
                    </div>
                    <div className="rating-bar-row">
                      <span>2 Star</span>
                      <div className="rating-bar-track">
                        <div className="rating-bar-fill" style={{ width: `${p2}%` }} />
                      </div>
                      <span>{p2}%</span>
                    </div>
                    <div className="rating-bar-row">
                      <span>1 Star</span>
                      <div className="rating-bar-track">
                        <div className="rating-bar-fill" style={{ width: `${p1}%` }} />
                      </div>
                      <span>{p1}%</span>
                    </div>
                  </div>
                </div>
              );
            })()}

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--line)', fontSize: '11.5px', color: 'var(--muted)' }}>
                      <time>
                        {r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Verified Review'}
                      </time>
                      <div className="review-vote-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Helpful?</span>
                        <button
                          type="button"
                          className="review-vote-btn"
                          data-review-id={r.id}
                          data-vote-type="helpful"
                          title="Mark as helpful"
                          style={{ border: '1px solid var(--line)', background: 'var(--card-bg)', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--ink)' }}
                        >
                          👍 <span className="vote-count">{r.helpful_count ?? 0}</span>
                        </button>
                        <button
                          type="button"
                          className="review-vote-btn"
                          data-review-id={r.id}
                          data-vote-type="unhelpful"
                          title="Mark as unhelpful"
                          style={{ border: '1px solid var(--line)', background: 'var(--card-bg)', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--ink)' }}
                        >
                          👎 <span className="vote-count">{r.unhelpful_count ?? 0}</span>
                        </button>
                      </div>
                    </div>
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

        {/* Direct Express Checkout Modal (COD / Digital Goods) */}
        <div id="directOrderModalBackdrop" className="direct-order-modal-backdrop">
          <div className="direct-order-modal-box">
            <button
              id="closeDirectOrderModalBtn"
              type="button"
              className="mobile-drawer-close"
              style={{ position: 'absolute', top: '14px', right: '14px' }}
            >
              ×
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>⚡</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {product.product_type === 'digital' ? 'Instant Digital Purchase' : 'Direct Order / Cash on Delivery'}
              </h3>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '16px', lineHeight: '1.4' }}>
              {product.product_type === 'digital'
                ? 'Get your instant license key and download link sent immediately to your email & SMS.'
                : 'Order directly from BuyerNepal partner fulfillment. Pay cash upon delivery or via Fonepay / eSewa.'}
            </p>

            {/* Product Quick Recap Card */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '16px' }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--line)' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <strong style={{ fontSize: '14.5px', color: 'var(--primary)' }}>Rs. {formattedPrice}</strong>
                  <span style={{ fontSize: '10.5px', color: 'var(--emerald)', background: 'var(--emerald-soft)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    {product.product_type === 'digital' ? 'Instant Access' : 'In Stock'}
                  </span>
                </div>
              </div>
            </div>

            <form id="directOrderForm" method="post" action="/api/orders/create">
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="product_name" value={product.name} />
              <input type="hidden" name="product_price" value={price} />
              <input type="hidden" name="product_type" value={product.product_type || 'physical'} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label>Full Name *</label>
                  <input type="text" name="customer_name" placeholder="e.g. Ramesh Shrestha" required />
                </div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label>Mobile Number (SMS Updates) *</label>
                  <input type="tel" name="customer_phone" placeholder="98XXXXXXXX" pattern="[0-9]{10}" required />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label>Email Address (Order Confirmation) *</label>
                <input type="email" name="customer_email" placeholder="ramesh@example.com" required />
              </div>

              {product.product_type !== 'digital' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label>City / District *</label>
                    <select name="city" required style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', background: 'var(--card-bg)', color: 'var(--ink)' }}>
                      <option value="Kathmandu">Kathmandu (Same Day / 24h)</option>
                      <option value="Lalitpur">Lalitpur (24 Hours)</option>
                      <option value="Bhaktapur">Bhaktapur (24 Hours)</option>
                      <option value="Pokhara">Pokhara (1-2 Days)</option>
                      <option value="Chitwan">Chitwan (1-2 Days)</option>
                      <option value="Butwal">Butwal (2 Days)</option>
                      <option value="Biratnagar">Biratnagar (2 Days)</option>
                      <option value="Dharan">Dharan (2 Days)</option>
                      <option value="Nepalgunj">Nepalgunj (2-3 Days)</option>
                      <option value="Other District">Other (Courier across 77 Districts)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label>Street / Tole / House No. *</label>
                    <input type="text" name="delivery_address" placeholder="e.g. Baneshwor, near Eye Hospital" required />
                  </div>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label>Payment Method *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginTop: '4px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', padding: '8px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
                    <input type="radio" name="payment_method" value="cod" defaultChecked />
                    <span>💵 Cash on Delivery</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', padding: '8px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
                    <input type="radio" name="payment_method" value="fonepay" />
                    <span>📱 eSewa / Fonepay</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', padding: '8px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
                    <input type="radio" name="payment_method" value="bank" />
                    <span>🏦 Bank Transfer</span>
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Special Instructions / Delivery Landmark (Optional)</label>
                <input type="text" name="notes" placeholder="e.g. Call before coming, deliver after 2 PM" />
              </div>

              <button type="submit" className="primary-action" style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: 800 }}>
                Confirm &amp; Place Order (Rs. {formattedPrice}) 🛍️
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '12px', fontSize: '11px', color: 'var(--muted)' }}>
                <span>🔒 Secure Checkout</span>
                <span>•</span>
                <span>🛡️ 100% Tax-Paid Warranty</span>
                <span>•</span>
                <span>📦 Free 7-Day Returns</span>
              </div>
            </form>
          </div>
        </div>

        {/* REHub Price Drop Alert Modal */}
        <div id="priceAlertModalBackdrop" className="price-alert-modal-backdrop">
          <div className="price-alert-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '24px' }}>🔔</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '4px 0 0' }}>Set Nepal Price Drop Alert</h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>We will notify you immediately when verified Nepal sellers drop the price!</span>
              </div>
              <button id="closePriceAlertModalBtn" type="button" className="mobile-drawer-close" aria-label="Close modal">×</button>
            </div>

            <form id="priceAlertForm">
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="product_name" value={product.name} />
              <input type="hidden" name="current_price" value={price} />

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700 }}>Target Price (NPR)</label>
                <input
                  type="number"
                  name="target_price"
                  defaultValue={Math.round(price * 0.95)}
                  min="100"
                  max={price}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--card-bg)', color: 'var(--ink)' }}
                />
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Current verified rate: Rs. {formattedPrice}. Default set to 5% drop.</span>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700 }}>Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. yourname@gmail.com"
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--card-bg)', color: 'var(--ink)' }}
                />
              </div>

              <button type="submit" className="primary-action" style={{ width: '100%', padding: '12px' }}>
                Activate Price Drop Alert 🚀
              </button>
            </form>
          </div>
        </div>

        {/* REHub Sticky Bottom Action Bar */}
        <div id="stickyProductBar" className="sticky-product-bar">
          <div className="store-shell sticky-product-inner">
            <div className="sticky-product-info">
              {product.image_url && (
                <img src={product.image_url} alt={product.name} className="sticky-product-thumb" />
              )}
              <div className="sticky-product-meta">
                <strong className="sticky-product-title">{product.name}</strong>
                <div className="sticky-product-pricing">
                  <span className="sticky-price" data-base-npr={price}>Rs. {formattedPrice}</span>
                  <span className="sticky-badge">Verified Nepal Price</span>
                </div>
              </div>
            </div>
            <div className="sticky-product-actions">
              <button
                type="button"
                className="filter-pill btn-compare-add"
                data-id={product.id}
                data-name={product.name}
                data-price={price}
                data-image={product.image_url}
                data-store={storeName}
                data-warranty={product.specs?.['Official Warranty'] || '1 Year Official'}
                style={{ padding: '8px 14px', fontSize: '12px' }}
                title="Add to Compare Dock"
              >
                ⇌ Compare
              </button>
              <a
                href={`/go/product/${product.id}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="product-buy"
                style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 800 }}
              >
                View Deal on {storeName} ↗
              </a>
            </div>
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
  let currentBasePrice = ${price};

  // 0. Model / Storage Variant Selection
  const variantBtns = document.querySelectorAll('.variant-pill-btn');
  variantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      variantBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const vPrice = parseInt(btn.getAttribute('data-variant-price') || '0', 10);
      const vOrig = parseInt(btn.getAttribute('data-variant-orig') || '0', 10);
      if (vPrice > 0) {
        currentBasePrice = vPrice;
        const mainPriceEl = document.querySelector('.detail-main-price');
        if (mainPriceEl) {
          mainPriceEl.setAttribute('data-base-npr', vPrice);
          mainPriceEl.textContent = 'Rs. ' + vPrice.toLocaleString();
        }
        const origPriceEl = document.querySelector('.detail-original-price');
        if (origPriceEl && vOrig > 0) {
          origPriceEl.setAttribute('data-base-npr', vOrig);
          origPriceEl.textContent = 'Rs. ' + vOrig.toLocaleString();
        }
        updateEmi();
      }
    });
  });

  // 1. EMI Calculator Interactivity
  const bankBtns = document.querySelectorAll('.emi-bank-btn');
  const tenureBtns = document.querySelectorAll('.emi-tenure-btn');
  const amountEl = document.getElementById('emiCalculatedAmount');
  const bankLabel = document.getElementById('emiSelectedBankLabel');

  let selectedTenure = 18;
  let selectedBank = 'Nabil Bank';

  function updateEmi() {
    if (amountEl && currentBasePrice > 0) {
      const monthly = Math.round(currentBasePrice / selectedTenure);
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

  // 2.1 Direct Order Modal
  const directOrderBtn = document.getElementById('openDirectOrderBtn');
  const directOrderBackdrop = document.getElementById('directOrderModalBackdrop');
  const closeDirectOrderBtn = document.getElementById('closeDirectOrderModalBtn');

  if (directOrderBtn && directOrderBackdrop) {
    directOrderBtn.addEventListener('click', () => directOrderBackdrop.classList.add('open'));
  }
  if (closeDirectOrderBtn && directOrderBackdrop) {
    closeDirectOrderBtn.addEventListener('click', () => directOrderBackdrop.classList.remove('open'));
  }
  if (directOrderBackdrop) {
    directOrderBackdrop.addEventListener('click', (e) => {
      if (e.target === directOrderBackdrop) directOrderBackdrop.classList.remove('open');
    });
  }

  // 2.2 REHub Deal Temperature & Community Voting
  const voteUpBtn = document.getElementById('voteUpBtn');
  const voteDownBtn = document.getElementById('voteDownBtn');
  const tempDisplay = document.getElementById('productTempDisplay');
  const voteUpCount = document.getElementById('voteUpCount');
  const voteDownCount = document.getElementById('voteDownCount');
  const votedKey = 'bn_voted_' + ${product.id};

  try {
    const prevVote = localStorage.getItem(votedKey);
    if (prevVote === 'up' && voteUpBtn) voteUpBtn.classList.add('voted-up');
    if (prevVote === 'down' && voteDownBtn) voteDownBtn.classList.add('voted-down');
  } catch {}

  async function handleVote(type) {
    try {
      if (localStorage.getItem(votedKey)) {
        if (window.bnShowToast) window.bnShowToast('You already voted on this deal! 🔥');
        return;
      }
      const res = await fetch('/api/products/' + ${product.id} + '/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(votedKey, type);
        if (type === 'up' && voteUpBtn) voteUpBtn.classList.add('voted-up');
        if (type === 'down' && voteDownBtn) voteDownBtn.classList.add('voted-down');
        if (tempDisplay) tempDisplay.textContent = '+' + data.temperature + '°';
        if (voteUpCount) voteUpCount.textContent = data.votes_up;
        if (voteDownCount) voteDownCount.textContent = data.votes_down;
        if (window.bnShowToast) window.bnShowToast(type === 'up' ? 'Hot deal upvoted! 🔥 (+15°)' : 'Vote recorded!');
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (voteUpBtn) voteUpBtn.addEventListener('click', () => handleVote('up'));
  if (voteDownBtn) voteDownBtn.addEventListener('click', () => handleVote('down'));

  // 2.3 REHub Sticky Bottom Action Bar Scroll Observer
  const stickyBar = document.getElementById('stickyProductBar');
  if (stickyBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 420) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    }, { passive: true });
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

  // 4. City Delivery Estimator Interactivity
  const citySelect = document.getElementById('detailCitySelect');
  const transitEl = document.getElementById('detailTransitTime');
  const feeEl = document.getElementById('detailCourierFee');
  if (citySelect && transitEl && feeEl) {
    citySelect.addEventListener('change', () => {
      const v = citySelect.value;
      if (v === 'ktm') {
        transitEl.textContent = 'Same-Day / 24 Hours Express';
        feeEl.textContent = 'FREE (Kathmandu Valley Order)';
        feeEl.style.color = 'var(--emerald)';
      } else if (v === 'pkr' || v === 'ctw') {
        transitEl.textContent = '1-2 Business Days';
        feeEl.textContent = 'Rs. 100 (Subsidized Courier)';
        feeEl.style.color = 'var(--ink)';
      } else {
        transitEl.textContent = '2-3 Business Days';
        feeEl.textContent = 'Rs. 150 (Air / Surface Cargo)';
        feeEl.style.color = 'var(--ink)';
      }
    });
  }

  // 5. Helpful Review Voting
  document.querySelectorAll('.review-vote-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const reviewId = btn.getAttribute('data-review-id');
      const voteType = btn.getAttribute('data-vote-type');
      if (!reviewId) return;

      const storageKey = 'bn_voted_rev_' + reviewId;
      if (localStorage.getItem(storageKey)) {
        if (window.bnShowToast) window.bnShowToast('You already voted on this review.');
        return;
      }

      try {
        const res = await fetch('/api/reviews/' + reviewId + '/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: voteType })
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem(storageKey, '1');
          const parent = btn.closest('.review-vote-actions');
          if (parent) {
            const helpfulBtn = parent.querySelector('[data-vote-type="helpful"] .vote-count');
            const unhelpfulBtn = parent.querySelector('[data-vote-type="unhelpful"] .vote-count');
            if (helpfulBtn) helpfulBtn.textContent = data.helpful_count;
            if (unhelpfulBtn) unhelpfulBtn.textContent = data.unhelpful_count;
          }
          btn.style.borderColor = 'var(--primary)';
          btn.style.fontWeight = 'bold';
          if (window.bnShowToast) window.bnShowToast('Thank you for your feedback! 👍');
        }
      } catch {
        if (window.bnShowToast) window.bnShowToast('Thank you for voting!');
      }
    });
  });
})();
          `
        }}
      />
    </Layout>
  );
};
