export const rehubEnterpriseCss = `
/* ==========================================================================
   REHub Enterprise Suite: View Modes, Directory, Coupons, Orders & Live Search
   ========================================================================== */

/* 1. View Mode Switcher */
.view-mode-toggle {
  display: inline-flex;
  background: var(--line-subtle);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 3px;
  gap: 2px;
}
.view-btn {
  background: transparent;
  border: 0;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.view-btn:hover {
  color: var(--ink);
}
.view-btn.active {
  background: var(--card-bg);
  color: var(--accent);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* List View Layout */
.product-grid.view-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}
.product-grid.view-list .product-card {
  display: grid !important;
  grid-template-columns: 200px 1fr auto !important;
  gap: 24px !important;
  align-items: center !important;
  padding: 16px !important;
}
.product-grid.view-list .product-card-top-stage {
  height: 160px !important;
}
.product-grid.view-list .product-card-body {
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}
.product-grid.view-list .product-card-bottom {
  margin-top: 0 !important;
  flex-direction: column !important;
  align-items: flex-end !important;
  gap: 10px !important;
}
@media (max-width: 768px) {
  .product-grid.view-list .product-card {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }
}

/* Compact Table View Layout */
.product-grid.view-table {
  display: flex !important;
  flex-direction: column !important;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius-lg) !important;
  overflow: hidden !important;
  background: var(--card-bg) !important;
}
.product-grid.view-table .product-card {
  display: grid !important;
  grid-template-columns: 70px 1.5fr 1fr 140px 130px !important;
  gap: 16px !important;
  align-items: center !important;
  padding: 10px 16px !important;
  border-radius: 0 !important;
  border: 0 !important;
  border-bottom: 1px solid var(--line) !important;
  box-shadow: none !important;
}
.product-grid.view-table .product-card:last-child {
  border-bottom: 0 !important;
}
.product-grid.view-table .product-card-top-stage {
  height: 60px !important;
  min-height: unset !important;
}
.product-grid.view-table .product-card-badges,
.product-grid.view-table .card-actions-float {
  display: none !important;
}
.product-grid.view-table .product-card-body {
  padding: 0 !important;
}
.product-grid.view-table .product-name {
  font-size: 13px !important;
  font-weight: 700 !important;
}
.product-grid.view-table .product-card-bottom {
  margin: 0 !important;
}

/* 2. Coupons & Promo Codes Page */
.coupons-hero-card {
  background: radial-gradient(circle at 50% 30%, rgba(225, 29, 72, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: 36px 28px;
  text-align: center;
}
.coupons-hero-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(225, 29, 72, 0.1);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}
.coupons-hero-title {
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--ink);
  margin-bottom: 10px;
}
.coupons-hero-subtitle {
  font-size: 14.5px;
  color: var(--ink-secondary);
  max-width: 600px;
  margin: 0 auto 16px;
  line-height: 1.6;
}
.coupons-hero-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
  flex-wrap: wrap;
}
.coupons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}
@media (max-width: 480px) {
  .coupons-grid { grid-template-columns: 1fr; }
}
.coupon-ticket-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  display: flex;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.2s;
  position: relative;
}
.coupon-ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border-color: var(--accent);
}
.coupon-ticket-left {
  background: linear-gradient(180deg, rgba(225, 29, 72, 0.06) 0%, rgba(225, 29, 72, 0.12) 100%);
  border-right: 2px dashed var(--line);
  padding: 20px 16px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
}
.coupon-store-icon { font-size: 24px; margin-bottom: 6px; }
.coupon-val-badge {
  font-size: 14px;
  font-weight: 900;
  color: var(--accent);
  line-height: 1.2;
}
.coupon-min-order {
  font-size: 10px;
  color: var(--muted);
  margin-top: 6px;
  font-weight: 600;
}
.coupon-ticket-right {
  padding: 18px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.coupon-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.coupon-verified-pill {
  font-size: 10px;
  font-weight: 800;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 7px;
  border-radius: var(--radius-full);
}
.coupon-expiry-tag {
  font-size: 10.5px;
  color: var(--muted);
  font-weight: 500;
}
.coupon-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.35;
  margin-bottom: 14px;
}
.coupon-action-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.coupon-code-display {
  background: var(--line-subtle);
  border: 1px dashed var(--line);
  border-radius: var(--radius-sm);
  padding: 7px 12px;
}
.coupon-code-display code {
  font-family: monospace;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: 1px;
}
.coupon-reveal-btn {
  flex: 1;
  background: var(--accent);
  color: #ffffff;
  border: 0;
  border-radius: var(--radius-md);
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.coupon-reveal-btn:hover {
  background: var(--accent-hover);
}
.coupon-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.coupon-modal-backdrop.show { display: flex; }
.coupon-modal-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 28px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
.copied-code-box {
  background: var(--line-subtle);
  border: 2px dashed var(--accent);
  border-radius: var(--radius-md);
  padding: 14px;
  margin: 14px 0;
}

/* 3. Stores Directory Styles */
.directory-header-hero {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 36px;
  padding: 12px 0 0;
}
.directory-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid rgba(220, 38, 38, 0.2);
  padding: 4px 14px;
  border-radius: var(--radius-full);
  margin-bottom: 14px;
}
.directory-hero-title {
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin: 0 0 12px 0;
}
.directory-hero-subtitle {
  font-size: 15px;
  color: var(--ink-secondary);
  line-height: 1.6;
  margin: 0 auto;
}
.stores-directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  align-items: stretch;
}
@media (max-width: 640px) {
  .stores-directory-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.store-card-link {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-sm);
  position: relative;
}
[data-theme="dark"] .store-card-link {
  background: #111827;
  border-color: #1e293b;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}
.store-card-link:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
}
[data-theme="dark"] .store-card-link:hover {
  border-color: #ef4444;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45);
}

.store-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}
.store-card-logo-wrap {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: #ffffff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
[data-theme="dark"] .store-card-logo-wrap {
  background: #1e293b;
  border-color: #334155;
}
.store-card-logo-wrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.store-logo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--line-subtle);
  color: var(--ink);
  font-size: 20px;
  font-weight: 800;
  border-radius: 8px;
}
.store-card-header-meta {
  flex: 1;
  min-width: 0;
}
.store-card-name {
  font-size: 16.5px;
  font-weight: 750;
  color: var(--ink);
  margin: 0 0 4px 0;
  line-height: 1.3;
}
.store-card-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: #f59e0b;
}
.store-card-rating small {
  color: var(--muted);
  font-size: 11px;
  font-weight: 500;
}
.store-verified-pill {
  font-size: 11px;
  font-weight: 700;
  color: #059669;
  background: #d1fae5;
  border: 1px solid rgba(5, 150, 105, 0.25);
  padding: 3px 9px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  flex-shrink: 0;
}
[data-theme="dark"] .store-verified-pill {
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
}
.store-card-desc {
  font-size: 13.5px;
  color: var(--ink-secondary);
  line-height: 1.55;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.store-card-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--line-subtle);
  border: 1px solid var(--line);
}
[data-theme="dark"] .store-card-badges {
  background: rgba(255, 255, 255, 0.03);
  border-color: #1e293b;
}
.store-badge-chip {
  font-size: 12px;
  color: var(--ink-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.store-card-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.store-card-cta {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.2s;
}
.store-card-link:hover .store-card-cta {
  transform: translateX(4px);
  color: var(--accent-hover);
}

.store-profile-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}
.store-profile-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
  border-color: var(--accent);
}
.store-card-banner {
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line-subtle);
}
[data-theme="dark"] .store-card-banner {
  background: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%);
}
.store-card-logo {
  width: 68px;
  height: 68px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #ffffff;
}
.store-card-logo img { width: 100%; height: 100%; object-fit: cover; }
.store-rating-pill {
  font-size: 11px;
  font-weight: 800;
  color: var(--amber);
  background: rgba(245, 158, 11, 0.1);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}
.store-card-body {
  padding: 20px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.store-meta-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: var(--ink-secondary);
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line-subtle);
}
.store-meta-row { display: flex; align-items: center; gap: 8px; }
.store-browse-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 16px;
  background: var(--line-subtle);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  font-size: 12.5px;
  font-weight: 800;
  color: var(--ink);
  text-decoration: none;
  transition: all 0.15s;
}
.store-browse-btn:hover {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

/* Store Hub Banner */
.store-hub-banner {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: 32px;
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 28px;
  align-items: center;
}
@media (max-width: 860px) {
  .store-hub-banner { grid-template-columns: 1fr; text-align: center; }
  .store-hub-badges { justify-content: center; }
  .store-hub-tags { justify-content: center; }
}
.store-hub-avatar {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.store-hub-avatar img { width: 100%; height: 100%; object-fit: cover; }
.store-hub-badges { display: flex; gap: 8px; margin-bottom: 8px; }
.store-hub-title { font-size: 26px; font-weight: 900; color: var(--ink); margin-bottom: 6px; }
.store-hub-desc { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; max-width: 700px; }
.store-hub-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.hub-tag {
  font-size: 11.5px;
  font-weight: 700;
  background: var(--line-subtle);
  color: var(--ink-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

/* Brands Grid */
.brands-directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.brand-card-link {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
}
.brand-card-link:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}
.brand-card-logo-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 14px;
  border: 1px solid var(--line);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  background: #ffffff;
}
.brand-card-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
.brand-card-name { font-size: 17px; font-weight: 800; color: var(--ink); margin-bottom: 4px; }
.brand-card-country { font-size: 11px; color: var(--muted); font-weight: 600; margin-bottom: 10px; }
.brand-card-service-teaser { font-size: 12px; color: var(--ink-secondary); line-height: 1.5; margin-bottom: 16px; }
.brand-explore-pill {
  font-size: 11.5px;
  font-weight: 800;
  color: var(--accent);
  background: rgba(225, 29, 72, 0.08);
  padding: 6px 12px;
  border-radius: var(--radius-full);
}

/* Brand Hub Header */
.brand-hub-banner {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: 32px;
  display: flex;
  gap: 28px;
  align-items: center;
}
@media (max-width: 768px) {
  .brand-hub-banner { flex-direction: column; text-align: center; }
}
.brand-hub-logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--line);
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  background: #ffffff;
}
.brand-hub-logo img { width: 100%; height: 100%; object-fit: cover; }
.brand-hub-meta-pills { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
.brand-hub-title { font-size: 26px; font-weight: 900; color: var(--ink); margin-bottom: 6px; }
.brand-hub-desc { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
.brand-service-alert {
  background: var(--line-subtle);
  border-left: 3px solid var(--emerald);
  padding: 10px 14px;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink);
}

/* 4. Order Tracking Styles */
.track-hero-box {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: 36px 24px;
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}
.track-search-form {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .track-search-form { flex-direction: column; }
}
.track-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  font-size: 14px;
  background: var(--bg);
  color: var(--ink);
}
.order-result-card, .order-success-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}
.order-result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.order-number-badge {
  font-size: 12px;
  font-weight: 800;
  color: var(--accent);
  background: rgba(225, 29, 72, 0.08);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}
.order-status-pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-top: 6px;
}
.status-placed { background: #dbeafe; color: #1e40af; }
.status-processing { background: #fef3c7; color: #b45309; }
.status-shipped { background: #e0e7ff; color: #4338ca; }
.status-delivered { background: var(--emerald-soft); color: var(--emerald); }
.status-cancelled { background: #ffe4e6; color: #be123c; }

.order-timeline-stepper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  position: relative;
}
@media (max-width: 640px) {
  .order-timeline-stepper { grid-template-columns: 1fr; }
}
.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 14px 8px;
  border-radius: var(--radius-md);
  background: var(--line-subtle);
  opacity: 0.5;
  transition: all 0.2s;
}
.timeline-step.done, .timeline-step.current {
  opacity: 1;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.timeline-step.current {
  border-color: var(--accent);
  background: rgba(225, 29, 72, 0.06);
}
.step-circle { font-size: 24px; margin-bottom: 6px; }
.step-info strong { display: block; font-size: 12px; color: var(--ink); }
.step-info small { font-size: 10px; color: var(--muted); }

.order-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .order-meta-grid { grid-template-columns: 1fr; }
}
.order-meta-box {
  background: var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 16px;
  font-size: 12.5px;
}
.order-meta-box h4 { font-size: 13px; font-weight: 800; color: var(--ink); margin-bottom: 8px; }
.order-meta-box p { margin: 4px 0; color: var(--ink-secondary); }

.digital-access-box {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(16, 185, 129, 0.06) 100%);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: var(--radius-md);
  padding: 16px 20px;
}
.digital-key-display {
  background: var(--card-bg);
  border: 1px solid var(--line);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  margin-top: 10px;
}
.digital-key-display code {
  font-family: monospace;
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 1px;
}

/* 5. REHub Article Embeds */
.article-pros-box, .article-cons-box {
  border-radius: var(--radius-md);
  padding: 16px 20px;
  margin: 20px 0;
}
.article-pros-box {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-left: 4px solid var(--emerald);
}
.article-cons-box {
  background: rgba(225, 29, 72, 0.05);
  border: 1px solid rgba(225, 29, 72, 0.25);
  border-left: 4px solid var(--accent);
}
.pros-header, .cons-header {
  font-size: 13.5px;
  font-weight: 800;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pros-header { color: #065f46; }
.cons-header { color: #9f1239; }
.article-deal-embed {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 18px 24px;
  margin: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);
}
@media (max-width: 600px) {
  .article-deal-embed { flex-direction: column; align-items: flex-start; }
}
.deal-embed-badge {
  font-size: 10px;
  font-weight: 800;
  color: var(--accent);
  background: rgba(225, 29, 72, 0.08);
  padding: 2px 7px;
  border-radius: var(--radius-full);
  display: inline-block;
  margin-bottom: 4px;
}
.deal-embed-title { font-size: 15px; font-weight: 800; color: var(--ink); display: block; }
.deal-embed-store { font-size: 12px; color: var(--muted); margin-top: 4px; }
.deal-embed-cta { display: flex; align-items: center; gap: 14px; }
.deal-embed-price { font-size: 18px; font-weight: 900; color: var(--ink); }

.article-markdown-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 13px;
}
.article-markdown-table th {
  background: var(--line-subtle);
  padding: 10px 14px;
  text-align: left;
  border-bottom: 2px solid var(--line);
  font-weight: 800;
  color: var(--ink);
}
.article-markdown-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  color: var(--ink-secondary);
}

/* 6. Live Search Autocomplete Dropdown */
.search-form-wrap {
  position: relative;
  width: 100%;
}
.search-autocomplete-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  z-index: 100;
  max-height: 420px;
  overflow-y: auto;
  display: none;
}
.search-autocomplete-dropdown.show {
  display: block;
}
.autocomplete-section-title {
  padding: 8px 14px;
  font-size: 10.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  background: var(--line-subtle);
}
.autocomplete-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  text-decoration: none;
  color: var(--ink);
  border-bottom: 1px solid var(--line-subtle);
  transition: background 0.15s;
}
.autocomplete-item:hover {
  background: var(--line-subtle);
}
.autocomplete-item img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--line);
}
.autocomplete-item strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
}
.autocomplete-item span {
  font-size: 11px;
  color: var(--accent);
  font-weight: 800;
}

/* 7. Direct Order Modal on Product Detail */
.direct-order-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.direct-order-modal-backdrop.show { display: flex; }
.direct-order-modal-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 28px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 48px rgba(0,0,0,0.2);
  max-height: 90vh;
  overflow-y: auto;
}

/* 8. REHub Deal Heat / Community Temperature Badges */
.deal-temperature-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 800;
  color: #dc2626;
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.2);
  padding: 2px 7px;
  border-radius: 9999px;
  line-height: 1.2;
}
.deal-temperature-badge.cold {
  color: #0284c7;
  background: rgba(2, 132, 199, 0.08);
  border-color: rgba(2, 132, 199, 0.2);
}

.detail-voting-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: var(--card-subtle, #f8fafc);
  border: 1px solid var(--line);
  padding: 10px 16px;
  border-radius: var(--radius-md);
  margin-bottom: 18px;
}
.heat-meter-pill {
  display: flex;
  align-items: center;
  gap: 6px;
}
.heat-val {
  font-size: 16px;
  font-weight: 900;
  color: #dc2626;
}
.heat-status {
  font-size: 10.5px;
  font-weight: 800;
  background: #dc2626;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}
.vote-actions-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.vote-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid var(--line);
  background: var(--card-bg);
  color: var(--ink);
  transition: all 0.15s ease;
}
.vote-btn:hover {
  border-color: #dc2626;
  color: #dc2626;
}
.vote-btn.voted-up {
  background: #dc2626;
  color: #ffffff;
  border-color: #dc2626;
}
.vote-btn.voted-down {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}

/* 9. Product Table of Contents / Quick Jump Nav */
.product-quick-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 0 16px;
  margin-top: 24px;
  border-bottom: 1px solid var(--line);
  scrollbar-width: none;
}
.product-quick-nav::-webkit-scrollbar { display: none; }
.quick-nav-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  background: var(--surface);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  white-space: nowrap;
  border: 1.5px solid var(--line);
  transition: all 0.15s ease;
}
.quick-nav-link:hover {
  color: var(--ink);
  background: var(--bg-alt);
  border-color: var(--ink);
}

/* 10. Sticky Bottom Floating Buy Bar */
.sticky-product-bar {
  display: none !important;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border-top: 1px solid var(--line);
  box-shadow: 0 -4px 20px rgba(0,0,0,0.12);
  z-index: 85;
  padding: 10px 0;
}
.sticky-product-bar.visible {
  display: block !important;
  animation: dockSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.sticky-product-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.sticky-product-info {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}
.sticky-product-thumb {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--line);
  flex-shrink: 0;
}
.sticky-product-meta {
  overflow: hidden;
}
.sticky-product-title {
  display: block;
  font-size: 13.5px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;
}
.sticky-product-pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}
.sticky-price {
  font-size: 14px;
  font-weight: 900;
  color: var(--accent);
}
.sticky-badge {
  font-size: 10px;
  font-weight: 800;
  background: rgba(16, 185, 129, 0.1);
  color: var(--emerald);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 1px 6px;
  border-radius: 4px;
}
.sticky-product-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
@media (max-width: 768px) {
  .sticky-product-bar {
    bottom: 60px !important;
    padding: 8px 0;
  }
  .sticky-product-thumb {
    width: 36px;
    height: 36px;
  }
  .sticky-product-title {
    max-width: 160px;
    font-size: 12px;
  }
}

/* 11. Price Alert Modal */
.price-alert-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1050;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.price-alert-modal-backdrop.show,
.price-alert-modal-backdrop.open { display: flex; }
.price-alert-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 28px;
  max-width: 460px;
  width: 100%;
  position: relative;
  box-shadow: 0 24px 60px rgba(0,0,0,0.25);
}


`;
