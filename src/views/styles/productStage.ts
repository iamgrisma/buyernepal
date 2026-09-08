export const productStageCss = `
/* ==========================================================================
   2026 Product Detail Page: Balanced Multi-Stage Layout
   ========================================================================== */
.product-detail-page {
  padding-bottom: 60px;
}

/* Breadcrumbs */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0 12px 0;
  font-size: 13px;
  color: var(--muted);
  flex-wrap: wrap;
}
.breadcrumbs a {
  color: var(--ink-secondary);
  font-weight: 500;
  transition: color 0.15s;
}
.breadcrumbs a:hover {
  color: var(--accent);
}

/* Affiliate Disclosure Banner */
.affiliate-disclosure-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.15);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  margin-bottom: 24px;
  font-size: 12px;
  line-height: 1.55;
  color: var(--ink-secondary);
}
.affiliate-disclosure-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}
.affiliate-disclosure-banner strong {
  color: var(--ink);
}

/* Hero Showcase & Purchase Stage (Clean 2-Column Desktop, 1-Column Mobile) */
.product-hero-stage {
  display: grid;
  grid-template-columns: minmax(320px, 460px) minmax(0, 1fr);
  gap: 36px;
  margin-bottom: 32px;
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

/* Left Showcase Gallery Stage */
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
  padding: 32px 24px;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
}
[data-theme="dark"] .product-stage-box {
  background: radial-gradient(circle at 50% 40%, #1e293b 0%, #0f172a 100%);
}
.product-stage-img-large {
  max-width: 100%;
  max-height: 340px;
  object-fit: contain;
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.14));
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-stage-box:hover .product-stage-img-large {
  transform: scale(1.05);
}
.product-stage-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
  max-width: calc(100% - 70px);
}
.product-stage-badge-deal {
  background: linear-gradient(135deg, #e11d48, #be123c);
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.35);
}
.product-stage-badge-stock {
  background: var(--emerald-soft);
  color: var(--emerald);
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Media Quick Utility Actions */
.product-media-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
.media-action-btn {
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
.media-action-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--line-subtle);
}

/* Nepal Trust Card - Focus Mode Selector & Base Style */
div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(3),
.product-trust-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  position: relative;
  width: 100%;
  box-sizing: border-box;
  clear: both;
}
.trust-card-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--muted);
  text-transform: uppercase;
}
.trust-item,
.trust-card-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.trust-icon,
.trust-card-item-icon {
  font-size: 16px;
  line-height: 1.3;
  flex-shrink: 0;
}
.trust-item strong,
.trust-card-item-text strong {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 2px;
}
.trust-item p,
.trust-card-item-text span {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
  margin: 0;
}

/* Right Detail & Pricing Information */
.product-hero-summary,
.product-hero-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  width: 100%;
  position: relative;
  z-index: 1;
}

div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > h1:nth-of-type(1),
.product-hero-summary h1,
.product-hero-header h1 {
  font-size: clamp(22px, 3.2vw, 34px);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--ink);
  line-height: 1.25;
  margin: 6px 0 10px 0;
  word-break: break-word;
  position: relative;
  clear: both;
}
.product-meta-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Pricing Card */
.product-pricing-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04);
}
.product-main-price-row {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}
.product-main-price {
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -1.5px;
  color: var(--ink);
  line-height: 1;
}
.product-main-original {
  font-size: 18px;
  color: var(--muted);
  text-decoration: line-through;
  font-weight: 600;
}
.product-save-badge {
  font-size: 12px;
  font-weight: 800;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}
.product-vat-pill {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Action CTA Bar */
.product-action-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.direct-buy-cta {
  flex: 2;
  min-width: 200px;
  background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
  color: #ffffff;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35);
  transition: all 0.2s;
  text-decoration: none;
}
.direct-buy-cta:hover {
  background: linear-gradient(135deg, #be123c 0%, #9f1239 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(225, 29, 72, 0.45);
}
.store-direct-cta {
  flex: 1;
  min-width: 150px;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  padding: 14px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  text-decoration: none;
}
.store-direct-cta:hover {
  background: var(--accent);
  color: #ffffff;
  transform: translateY(-1px);
}
.product-compare-toggle-btn {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 14px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.product-compare-toggle-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* 0% EMI Teaser */
.product-hero-emi-teaser {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.18);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 700;
  color: #1e40af;
}
[data-theme="dark"] .product-hero-emi-teaser {
  background: rgba(37, 99, 235, 0.1);
  color: #93c5fd;
}
.hero-emi-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hero-emi-link {
  font-size: 11px;
  font-weight: 800;
  color: #2563eb;
  text-decoration: underline;
}

/* 6-Month Price Trend SVG Chart */
.price-movement-chart-box {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
}
.price-chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.price-chart-header strong {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
}
.price-chart-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

/* SECTION 2: Full-Width Price Comparison */
.price-comparison-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin: 32px 0;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04);
}

/* SECTION 3: 2-Column Product Intelligence Grid */
.product-intelligence-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin: 32px 0;
  align-items: start;
}
@media (max-width: 860px) {
  .product-intelligence-grid {
    grid-template-columns: 1fr;
  }
}

/* SECTION 4: Specs & Warranty Section Card */
.specs-section-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 28px;
  margin: 32px 0;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04);
}
.specs-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 13px;
}
.specs-table th {
  text-align: left;
  padding: 12px 16px;
  background: var(--line-subtle);
  color: var(--muted);
  font-weight: 700;
  border-bottom: 1px solid var(--line);
  width: 32%;
}
.specs-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-weight: 500;
}
.specs-table tr:last-child th,
.specs-table tr:last-child td {
  border-bottom: 0;
}


`;
