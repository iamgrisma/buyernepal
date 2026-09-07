import { FC } from 'hono/jsx';
import { Category, Coupon, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Footer, MobileBottomBar } from './components';

export const CouponsPage: FC<{
  coupons: Coupon[];
  settings: SiteSettings;
  categories: Category[];
  activeStore?: string;
}> = ({ coupons, settings, categories, activeStore = 'all' }) => {
  const activeCoupons = coupons.filter(c => c.is_active === 1);

  return (
    <Layout
      title="Verified Promo Codes, Discount Coupons & Deals in Nepal | BuyerNepal"
      description="Exclusive Daraz vouchers, Nepal bank card discounts, festive promo codes, and verified store deals in Nepal. Verified daily by BuyerNepal editors."
      url="https://buyernepal.com/coupons"
      settings={settings}
    >
      <div className="store-page coupons-page">
        <Header settings={settings} categories={categories} activeSlug="coupons" />

        <main className="store-shell">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Deals &amp; Promo Codes</span>
          </div>

          {/* Hero Banner */}
          <div className="page-hero-banner">
            <div className="page-hero-banner-content">
              <div className="page-hero-badge">VERIFIED SAVINGS DIRECTORY</div>
              <h1 className="page-hero-title">Verified Nepal Coupons &amp; Store Deals</h1>
              <p className="page-hero-subtitle">
                Never pay full retail price. Discover hand-tested voucher codes for Daraz Mall, partner tech stores, and Nepali bank debit/credit card offers.
              </p>
            </div>

            <div className="page-hero-stat-badge">
              <span className="page-hero-stat-val">{activeCoupons.length}</span>
              <span className="page-hero-stat-lbl">Active Vouchers</span>
            </div>
          </div>

          {/* Coupon Cards Grid */}
          <div className="coupons-grid" style={{ marginTop: '32px' }}>
            {activeCoupons.length === 0 ? (
              <div className="empty-state-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>🎟️</span>
                <h3>No active coupons right now</h3>
                <p style={{ color: 'var(--muted)', marginTop: '6px' }}>New discount codes are published every Friday and during festival campaigns.</p>
              </div>
            ) : (
              activeCoupons.map((coupon) => {
                const isExpired = coupon.expires_at ? new Date(coupon.expires_at) < new Date() : false;
                const formattedDiscount =
                  coupon.discount_type === 'percentage'
                    ? `${coupon.discount_value}% OFF`
                    : `Rs. ${coupon.discount_value.toLocaleString()} FLAT OFF`;

                return (
                  <div key={coupon.id} className="coupon-ticket-card">
                    <div className="coupon-ticket-left">
                      <span className="coupon-store-icon">🏷️</span>
                      <div className="coupon-val-badge">{formattedDiscount}</div>
                      <span className="coupon-min-order">
                        {coupon.min_purchase > 0 ? `Min. Order: Rs. ${coupon.min_purchase.toLocaleString()}` : 'No Min. Purchase'}
                      </span>
                    </div>

                    <div className="coupon-ticket-right">
                      <div className="coupon-header-row">
                        <span className="coupon-verified-pill">✓ Verified Working</span>
                        {coupon.expires_at && (
                          <span className="coupon-expiry-tag">
                            Expires: {new Date(coupon.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>

                      <h3 className="coupon-title">{coupon.description || `Special Promo Discount for Nepal Shoppers`}</h3>

                      <div className="coupon-action-row">
                        <div className="coupon-code-display">
                          <code>{coupon.code}</code>
                        </div>
                        <button
                          type="button"
                          className="coupon-reveal-btn"
                          data-code={coupon.code}
                          data-store={coupon.description || 'Partner Store'}
                          data-id={coupon.id}
                        >
                          Copy Code & Open Store ↗
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Coupon Transparency Box */}
          <div className="coupons-guide-box" style={{ marginTop: '48px' }}>
            <h3>💡 How BuyerNepal Verifies Discount Codes</h3>
            <p>
              Our Kathmandu-based deal editors test promo codes directly at store checkouts on platforms like Daraz Mall, SastoDeal, and authorized partner portals. When you click <em>Copy Code & Open Store</em>, we may receive a referral fee from the retailer at zero extra cost to you.
            </p>
          </div>
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />

        {/* Modal: Coupon Copied & Store Redirection */}
        <div id="couponModal" className="coupon-modal-backdrop">
          <div className="coupon-modal-card">
            <button id="closeCouponModal" type="button" className="mobile-drawer-close" style={{ position: 'absolute', top: '14px', right: '14px' }}>×</button>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '8px' }}>🎉</span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Voucher Code Copied to Clipboard!</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
              Paste this coupon during checkout on the partner store to claim your discount:
            </p>
            <div className="copied-code-box">
              <strong id="modalCouponCode" style={{ fontSize: '20px', letterSpacing: '2px', color: 'var(--accent)' }}>CODE</strong>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.5 }}>
              Opening the authorized store in a new tab... If it did not open automatically, click below:
            </p>
            <a
              id="modalStoreLink"
              href="https://www.daraz.com.np"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="primary-action"
              style={{ width: '100%', marginTop: '14px', textAlign: 'center', display: 'block' }}
            >
              Go to Store Now 🚀
            </a>
          </div>
        </div>

        {/* Coupon Action Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const modal = document.getElementById('couponModal');
                const closeBtn = document.getElementById('closeCouponModal');
                const codeEl = document.getElementById('modalCouponCode');
                const linkEl = document.getElementById('modalStoreLink');

                document.querySelectorAll('.coupon-reveal-btn').forEach(btn => {
                  btn.addEventListener('click', (e) => {
                    const code = btn.getAttribute('data-code');
                    const cid = btn.getAttribute('data-id');
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(code).then(() => {
                      if (codeEl) codeEl.innerText = code;
                      if (linkEl) linkEl.href = '/go/coupon/' + cid;
                      if (modal) modal.classList.add('show');
                      
                      // Auto open in background or popup
                      window.open('/go/coupon/' + cid, '_blank');
                    });
                  });
                });

                if (closeBtn && modal) {
                  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
                  modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.classList.remove('show');
                  });
                }
              });
            `
          }}
        />
      </div>
    </Layout>
  );
};
