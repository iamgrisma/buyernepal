export const subpageBannerCss = `
/* ========================================================
   UNIFIED SUBPAGE HEADER BANNER SYSTEM
   Used consistently across Category, Compare, Charts,
   Coupons, Stores, Brands, Orders, and Search
   ======================================================== */
.page-hero-banner {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  margin-bottom: 28px;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
.page-hero-banner-content {
  flex: 1;
  min-width: 280px;
}
.page-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid rgba(220, 38, 38, 0.18);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 10px;
}
.page-hero-title {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin: 0 0 8px 0;
}
.page-hero-subtitle {
  font-size: 14.5px;
  color: var(--ink-secondary);
  line-height: 1.6;
  max-width: 680px;
  margin: 0;
}
.page-hero-stat-badge {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 16px 24px;
  text-align: center;
  flex-shrink: 0;
}
.page-hero-stat-val {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.page-hero-stat-lbl {
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
@media (max-width: 768px) {
  .page-hero-banner {
    padding: 20px 18px;
    margin-bottom: 20px;
  }
  .page-hero-stat-badge {
    width: 100%;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-hero-stat-val {
    font-size: 22px;
  }
}
.footer-grid .store-brand { color: #ffffff; margin-bottom: 14px; }
.footer-grid p { font-size: 13px; line-height: 1.6; max-width: 320px; color: #94a3b8; }
.footer-grid h3 {
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}
.footer-grid a {
  display: block;
  font-size: 13px;
  color: #cbd5e1;
  margin-bottom: 10px;
  transition: color 0.15s;
}
.footer-grid a:hover { color: #ffffff; }
.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: #94a3b8;
  flex-wrap: wrap;
  gap: 12px;
}

/* Mobile Bottom Sticky Navigation */
.mobile-bottom-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  border-top: 1px solid var(--line);
  z-index: 80;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}
[data-theme="dark"] .mobile-bottom-bar {
  background: #0b1120;
  border-top-color: #1e293b;
}
.mobile-bottom-inner {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
}
.mobile-bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--muted);
  font-size: 10px;
  font-weight: 600;
  text-decoration: none;
}
.mobile-bottom-item.active, .mobile-bottom-item:active {
  color: var(--accent);
}
[data-theme="dark"] .mobile-bottom-item {
  color: #94a3b8;
}
[data-theme="dark"] .mobile-bottom-item.active {
  color: #f43f5e;
}
.mobile-bottom-item span:first-child { font-size: 18px; }

@media (max-width: 992px) {
  .store-header-search { display: none; }
  .store-nav-highlights { display: none; }
}

@media (max-width: 768px) {
  /* Announcement topbar on mobile */
  .store-topbar {
    font-size: 11px;
  }
  .store-topbar-inner {
    min-height: 28px;
    padding: 3px 0;
    justify-content: center;
    gap: 6px;
  }
  .store-topbar-note {
    font-size: 11px;
    gap: 8px;
  }
  .store-topbar-inner > div:last-child {
    display: none;
  }

  /* Header Main Bar */
  .store-header-main {
    min-height: 52px;
    gap: 8px;
  }
  .store-brand {
    gap: 8px;
    min-width: 0;
    flex-shrink: 1;
  }
  .store-logo-mark {
    width: 32px;
    height: 32px;
    font-size: 15px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .store-brand strong {
    font-size: 15px;
    letter-spacing: -0.3px;
    white-space: nowrap;
  }
  .store-brand small {
    display: none !important;
  }

  /* Header Actions on mobile: ensure dark mode button and menu are PROMINENT */
  .store-header-actions {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    flex-shrink: 0 !important;
  }
  .store-admin-link {
    display: none !important;
  }
  .wishlist-btn-header {
    display: none !important;
  }
  .currency-dropdown-wrap {
    display: flex !important;
    align-items: center !important;
  }
  .currency-dropdown {
    height: 32px !important;
    font-size: 11px !important;
    padding: 2px 18px 2px 6px !important;
    border-radius: 8px !important;
  }
  .theme-toggle-btn {
    display: flex !important;
    width: 34px !important;
    height: 34px !important;
    font-size: 15px !important;
    flex-shrink: 0 !important;
    border-radius: 50% !important;
    align-items: center !important;
    justify-content: center !important;
    border: 1px solid var(--line) !important;
    background: var(--surface) !important;
    color: var(--ink) !important;
    cursor: pointer !important;
  }
  .store-menu {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    width: 34px !important;
    height: 34px !important;
    padding: 6px !important;
    flex-shrink: 0 !important;
    border-radius: 8px !important;
    border: 1px solid var(--line) !important;
    background: var(--surface) !important;
    cursor: pointer !important;
  }
  .store-menu span {
    display: block !important;
    width: 18px !important;
    height: 2px !important;
    background: var(--ink) !important;
    margin: 2px 0 !important;
    border-radius: 2px !important;
  }

  /* Category pills */
  .store-nav-strip {
    padding: 4px 0;
  }
  .nav-pill {
    padding: 5px 10px;
    font-size: 12px;
    gap: 4px;
  }

  /* Hero Section: Remove hero-card taking over the screen */
  .store-hero {
    padding: 20px 0 16px;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .hero-copy {
    order: 1;
  }
  .hero-copy h1 {
    font-size: 22px;
    letter-spacing: -0.8px;
    margin: 6px 0 8px;
    line-height: 1.18;
  }
  .hero-copy p {
    font-size: 13px;
    line-height: 1.45;
    margin-bottom: 12px;
  }
  .hero-search-wrapper {
    margin-bottom: 10px;
  }
  .hero-search {
    height: 46px;
    padding: 0 12px;
    gap: 8px;
  }
  .hero-search input {
    font-size: 13.5px;
  }
  .hero-tags {
    margin-bottom: 10px;
    gap: 6px;
  }
  .quick-tag {
    padding: 2px 8px;
    font-size: 11px;
  }
  .hero-points {
    display: none;
  }
  /* Hide decorative hero card on mobile so product items are immediately visible */
  .hero-card {
    display: none !important;
  }

  /* Trust Strip on mobile */
  .trust-strip {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 14px 0;
  }
  .trust-item {
    padding: 10px;
    gap: 8px;
  }
  .trust-icon {
    font-size: 18px;
  }
  .trust-item strong {
    font-size: 11.5px;
  }
  .trust-item p {
    font-size: 10px;
  }

  /* Products Section & Grid on mobile */
  .products-section {
    margin-top: 20px;
  }
  .section-heading h2 {
    font-size: 18px;
  }
  .product-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .product-card-top-stage {
    height: 200px;
    padding: 14px;
  }

  /* Bottom bar and footer */
  .mobile-bottom-bar {
    display: block !important;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .editorial-banner {
    flex-direction: column;
    padding: 28px 18px;
    text-align: center;
  }
  .editorial-banner p {
    margin: auto;
  }
}

/* Toast Notification */
.toast-msg {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #0f172a;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-msg.show {
  transform: translateY(0);
  opacity: 1;
}

/* Product Stage Image & Box for Product Detail */
.product-hero-stage {
  display: grid;
  grid-template-columns: minmax(320px, 460px) minmax(0, 1fr);
  gap: 36px;
  margin-bottom: 36px;
  align-items: start;
  width: 100%;
  position: relative;
}
@media (max-width: 1024px) {
  .product-hero-stage {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.product-hero-media {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  position: static;
  box-sizing: border-box;
}
@media (min-width: 1025px) {
  .product-hero-media {
    position: sticky;
    top: 88px;
    z-index: 10;
  }
}
@media (max-width: 1024px) {
  .product-hero-media {
    position: static !important;
    top: auto !important;
    width: 100% !important;
  }
}
.product-stage-box {
  position: relative;
  background: radial-gradient(circle at 50% 40%, #ffffff 0%, #f1f5f9 100%);
  border: 1px solid var(--line);
  border-radius: 20px;
  height: 420px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
}
[data-theme="dark"] .product-stage-box {
  background: radial-gradient(circle at 50% 40%, #1e293b 0%, #0f172a 100%);
}
.product-stage-box img,
.product-stage-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.12));
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-stage-box:hover img,
.product-stage-box:hover .product-stage-image {
  transform: scale(1.05);
}
.stage-wishlist-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 18px;
  z-index: 5;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.stage-wishlist-btn:hover {
  transform: scale(1.15);
  background: #ffe4e6;
  border-color: #f43f5e;
}
[data-theme="dark"] .stage-wishlist-btn {
  background: rgba(15, 23, 42, 0.95);
  border-color: var(--line);
}
.stage-badges-wrap {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 5;
  pointer-events: none;
}
.stage-badge-deal {
  background: linear-gradient(135deg, #e11d48, #be123c);
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.35);
  align-self: flex-start;
}
.stage-badge-store {
  background: rgba(255, 255, 255, 0.94);
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--line);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  align-self: flex-start;
}
[data-theme="dark"] .stage-badge-store {
  background: rgba(15, 23, 42, 0.94);
  color: #ffffff;
}
.product-media-actions {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
}
.media-action-pill {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-secondary);
  cursor: pointer;
  transition: all 0.2s;
}
.media-action-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--line-subtle);
}
.media-action-pill.price-alert-trigger {
  border-color: rgba(225, 29, 72, 0.3);
  color: var(--accent);
}
.media-action-pill.price-alert-trigger:hover {
  background: rgba(225, 29, 72, 0.05);
}

/* Editorial Verdict Card */
.editorial-verdict-card {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.04) 0%, rgba(37, 99, 235, 0.04) 100%);
  border: 1px solid rgba(225, 29, 72, 0.2);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  margin: 20px 0;
}
.verdict-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.verdict-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 6px;
}
.verdict-score-pill {
  font-size: 12px;
  font-weight: 800;
  background: var(--card-bg);
  border: 1px solid var(--line);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  color: var(--ink);
}
.verdict-body {
  font-size: 13.5px;
  color: var(--ink);
  line-height: 1.65;
  margin-bottom: 14px;
}
.verdict-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.verdict-highlight-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: var(--radius-full);
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink-secondary);
}

/* Affiliate Deal Outbound Box */
.affiliate-deal-box {
  margin-bottom: 24px;
}
.affiliate-deal-box .detail-buy-btn {
  margin-bottom: 8px;
}
.affiliate-redirect-notice {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.4;
}

/* Rating Summary & Breakdown */
.rating-summary-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  background: var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-bottom: 24px;
  align-items: center;
}
@media (max-width: 640px) {
  .rating-summary-card {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
.rating-big-score {
  text-align: center;
  padding: 10px;
  background: var(--card-bg);
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
}
.rating-big-number {
  font-size: 38px;
  font-weight: 900;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 4px;
}
.rating-big-stars {
  color: var(--amber);
  font-size: 16px;
  margin-bottom: 4px;
}
.rating-big-count {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
}
.rating-breakdown-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rating-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--ink-secondary);
}
.rating-bar-row span:first-child {
  width: 45px;
  text-align: right;
  font-weight: 600;
}
.rating-bar-track {
  flex: 1;
  height: 8px;
  background: var(--line);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.rating-bar-fill {
  height: 100%;
  background: var(--amber);
  border-radius: var(--radius-full);
}
.rating-bar-row span:last-child {
  width: 35px;
  font-size: 11px;
  color: var(--muted);
}

/* Reviews Section */
.reviews-section {
  margin-top: 48px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-sm);
}
.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.review-form-card {
  background: var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-bottom: 32px;
}
.review-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 12px;
}
@media (max-width: 600px) {
  .review-form-grid { grid-template-columns: 1fr; }
}
.review-card {
  border-bottom: 1px solid var(--line);
  padding: 16px 0;
}
.review-card:last-child { border-bottom: 0; }
.review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.review-author { font-weight: 700; color: var(--ink); font-size: 14px; }


`;
