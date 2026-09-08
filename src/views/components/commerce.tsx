import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../../types';

export const FlashSaleSection: FC<{ products: Product[]; settings?: SiteSettings }> = ({ products, settings }) => {
  const flashProducts = products.filter((p) => p.flash_deal === 1 || (p.price > 40000 && p.original_price));
  const displayItems = flashProducts.slice(0, 4);

  if (displayItems.length === 0) return null;

  const title = settings?.flash_sale_title || '⚡ 2026 Mega Flash Sale • Limited Nepal Inventory';
  const subtitle = settings?.flash_sale_subtitle || 'Exclusive discounts with verified authorized warranty. Prices end at countdown!';

  return (
    <section className="store-shell">
      <div className="flash-sale-section">
        <div className="flash-sale-header">
          <div className="flash-sale-title-group">
            <span className="flash-flame-icon">🔥</span>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                {title}
              </h2>
              <p style={{ fontSize: '13px', color: '#fda4af', marginTop: '2px' }}>
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flash-timer-wrapper">
            <span className="flash-timer-label">ENDS IN</span>
            <div className="flash-timer-box" id="flashTimer">
              <span className="flash-timer-unit" id="timerHours">05</span>:
              <span className="flash-timer-unit" id="timerMinutes">43</span>:
              <span className="flash-timer-unit" id="timerSeconds">21</span>
            </div>
          </div>
        </div>

        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {displayItems.map((p) => {
            const price = Number(p.price) || 0;
            const originalPrice = Number(p.original_price) || Math.round(price * 1.15);
            const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
            const claimed = p.claimed_percentage || 78;
            const storeName = p.store_name || 'Daraz Mall';

            return (
              <article
                key={p.id}
                className="product-card"
                style={{ border: '1px solid rgba(220, 38, 38, 0.25)' }}
              >
                <div className="product-card-top-stage">
                  <a href={`/product/${p.id}`} className="product-image-link" aria-label={`View deal for ${p.name}`}>
                    <img src={p.image_url} alt={p.name} loading="lazy" decoding="async" />
                  </a>

                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="product-card-badges">
                      <span className="product-badge-overlay deal-accent">-{discountPercent}%</span>
                    </div>
                  )}

                  {/* Quick Action Circles */}
                  <div className="card-actions-float">
                    <button
                      type="button"
                      className="btn-action-circle btn-wishlist-add"
                      data-id={p.id}
                      data-name={p.name}
                      data-price={price}
                      data-image={p.image_url}
                      data-url={`/product/${p.id}`}
                      title="Save to Wishlist"
                      aria-label="Save to Wishlist"
                    >
                      ♡
                    </button>
                    <button
                      type="button"
                      className="btn-action-circle btn-compare-add"
                      data-id={p.id}
                      data-name={p.name}
                      data-price={price}
                      data-image={p.image_url}
                      data-store={storeName}
                      data-warranty={p.specs?.['Official Warranty'] || '1 Year Official'}
                      title="Add to Comparison"
                      aria-label="Add to Comparison"
                    >
                      ⇌
                    </button>
                  </div>
                </div>

                <div className="product-card-body">
                  <div className="pc-meta">
                    <span className="pc-cat">{p.category_name || 'Flash Deal'}</span>
                    <span className="pc-rating">★ {(p.rating || 4.8).toFixed(1)}</span>
                  </div>

                  <a href={`/product/${p.id}`} className="product-name" title={p.name}>
                    {p.name}
                  </a>

                  <div className="pc-store-row">
                    <span className="pc-store-chip">✓ {storeName}</span>
                    <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 700, marginLeft: 'auto' }}>
                      🔥 {claimed}% Claimed
                    </span>
                  </div>

                  <div className="flash-meter-box" style={{ margin: '0 0 10px 0' }}>
                    <div className="flash-meter-track" style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div className="flash-meter-fill" style={{ width: `${claimed}%`, height: '100%', background: 'linear-gradient(90deg, #dc2626, #f97316)', borderRadius: '2px' }} />
                    </div>
                  </div>

                  <div className="product-card-bottom">
                    <div className="price-block">
                      <span className="original-price" data-base-npr={originalPrice}>
                        Rs. {originalPrice.toLocaleString()}
                      </span>
                      <strong className="product-price" data-base-npr={price}>
                        Rs. {price.toLocaleString()}
                      </strong>
                    </div>

                    <a
                      className="product-buy"
                      href={p.affiliate_url || `/product/${p.id}`}
                      target={p.affiliate_url ? '_blank' : '_self'}
                      rel="noopener noreferrer nofollow"
                      style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
                    >
                      Grab Deal ⚡
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export const CouponsStrip: FC<{ coupons: Coupon[] }> = ({ coupons }) => {
  if (!coupons || coupons.length === 0) return null;

  return (
    <section className="store-shell coupons-section">
      <div className="coupons-heading">
        <h3>
          <span>🏷️</span> Exclusive Nepali Promo Codes &amp; Vouchers
        </h3>
        <span className="coupons-hint">Click code to copy</span>
      </div>
      <div className="coupons-grid">
        {coupons.map((c) => (
          <div key={c.id} className="coupon-card">
            <div className="coupon-info">
              <strong>{c.code}</strong>
              <span>{c.description}</span>
            </div>
            <button
              type="button"
              className="copy-coupon-btn"
              data-code={c.code}
            >
              Copy Code
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};


export const NepalCityDeliveryEstimator: FC = () => (
  <div className="delivery-estimator-card">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '24px' }}>🚚</span>
      <div>
        <strong style={{ fontSize: '14px', display: 'block' }}>Nepal Merchant Shipping &amp; Transit Guide</strong>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Average seller dispatch speed and courier availability across Nepal</span>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <select id="deliveryCitySelect" className="delivery-city-select" aria-label="Select delivery city">
        <option value="ktm">Kathmandu / Lalitpur / Bhaktapur</option>
        <option value="pkr">Pokhara Valley</option>
        <option value="chw">Chitwan (Bharatpur / Narayangarh)</option>
        <option value="brt">Biratnagar / Itahari</option>
        <option value="btw">Butwal / Bhairahawa</option>
        <option value="dhn">Dharan</option>
        <option value="oth">Other Districts</option>
      </select>

      <div id="deliveryOutput" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--emerald)' }}>
        ⚡ 24h KTM Valley Delivery • 2-3 Days Nationwide Courier (COD supported by most stores)
      </div>
    </div>
  </div>
);


export const NepalShoppingFaq: FC<{ settings?: SiteSettings }> = ({ settings }) => {
  const kicker = settings?.faq_kicker || 'BUYER GUIDE & HELP';
  const title = settings?.faq_title || 'Frequently Asked Questions in Nepal';

  return (
    <section className="store-shell faq-section-wrap">
      {/* Section Header */}
      <div className="section-heading" style={{ marginBottom: '28px' }}>
        <div>
          <span className="section-kicker">{kicker}</span>
          <h2>{title}</h2>
        </div>
      </div>

      {/* 2-column: FAQ accordion left, trust summary right */}
      <div className="faq-layout">
        <div className="faq-col-main">
          <div className="faq-item">
            <div className="faq-question">
              <span>Are all featured products 100% genuine with official Nepal warranty?</span>
              <span className="faq-icon">▾</span>
            </div>
            <div className="faq-answer">
              Yes, 100%. All products featured on BuyerNepal are sourced exclusively through authorized national distributors and verified retailers, complete with official brand warranty and genuine VAT invoices.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How does 0% Bank Credit Card EMI work in Nepal?</span>
              <span className="faq-icon">▾</span>
            </div>
            <div className="faq-answer">
              Cardholders of partner Nepali commercial banks (including Nabil Bank, NIC Asia, Global IME, Himalayan Bank, and Sanima Bank) can convert purchases of Rs. 10,000 or above into 6, 12, or 18 equal monthly installments at 0% markup without any hidden processing charges.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Is Cash on Delivery (COD) available outside Kathmandu Valley?</span>
              <span className="faq-icon">▾</span>
            </div>
            <div className="faq-answer">
              Yes! Most verified sellers and courier partners (Nepal Can Move, Sundar Courier, Daraz Express) support Cash on Delivery across major cities including Pokhara, Chitwan, Biratnagar, Butwal, and Dharan.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How do I claim authorized warranty on products bought through BuyerNepal links?</span>
              <span className="faq-icon">▾</span>
            </div>
            <div className="faq-answer">
              Every purchase made through our verified store links includes an official VAT bill and manufacturer warranty card. Present these at any official brand service center in Kathmandu, Pokhara, or provincial branch hubs for warranty repairs.
            </div>
          </div>
        </div>

        {/* Right: Quick Trust Summary */}
        <aside className="faq-col-aside">
          <div className="faq-trust-card">
            <div className="faq-trust-icon">🏆</div>
            <h3 className="faq-trust-title">Why Trust BuyerNepal?</h3>
            <ul className="faq-trust-list">
              <li>✅ 100% Genuine Nepal warranty on all listings</li>
              <li>🔍 Independent editorial reviews — no paid bias</li>
              <li>⚖️ Live price comparison across 12+ verified stores</li>
              <li>🇳🇵 Prices in NPR — no hidden conversion markups</li>
              <li>🎟️ Verified promo codes updated weekly</li>
            </ul>
            <a href="/stores" className="faq-trust-link">View Verified Stores →</a>
          </div>
        </aside>
      </div>
    </section>
  );
};


