export const productCardCss = `
/* ========================================================
   PRODUCT CARD — 2026 Premium Design
   Clean 4-row body: meta → name → store → price+cta
   ======================================================== */
.product-card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-card);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  position: relative;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.12), 0 4px 8px -4px rgba(15, 23, 42, 0.06);
  border-color: rgba(220, 38, 38, 0.25);
}
[data-theme="dark"] .product-card:hover {
  box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.5);
  border-color: rgba(239, 68, 68, 0.35);
}

/* Image Stage */
.product-card-top-stage {
  position: relative;
  background: linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%);
  height: 240px;
  width: 100%;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-shrink: 0;
}
[data-theme="dark"] .product-card-top-stage {
  background: linear-gradient(160deg, #111827 0%, #0d1526 100%);
}
.product-image-link {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.product-image-link img,
.product-card-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: auto;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover .product-image-link img,
.product-card:hover .product-card-img {
  transform: scale(1.06) translateY(-3px);
}
.product-image-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: #f1f5f9;
  color: #94a3b8;
  font-weight: 900;
  font-size: 28px;
}
[data-theme="dark"] .product-image-placeholder {
  background: #1e293b;
  color: #475569;
}

/* Discount Badge — minimal, top-left */
.product-card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  pointer-events: none;
}
.product-badge-overlay {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  color: #ffffff;
  background: var(--accent);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.3px;
  line-height: 1.3;
}
.product-badge-overlay.deal-accent {
  background: var(--accent);
}

/* Quick Action Circles — top-right */
.card-actions-float {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 10;
}
.btn-action-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(15, 23, 42, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  color: var(--ink-secondary);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.btn-action-circle:hover {
  transform: scale(1.15);
  background: #ffffff;
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}
[data-theme="dark"] .btn-action-circle {
  background: rgba(13, 21, 38, 0.92);
  border-color: rgba(255,255,255,0.1);
  color: #cbd5e1;
}

/* Card Body */
.product-card-body {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0;
}

/* Row 1: Category · Brand  |  Rating */
.pc-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.pc-cat {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}
.pc-rating {
  font-size: 11px;
  font-weight: 700;
  color: #d97706;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Row 2: Product Name */
.product-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.35;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s;
  text-decoration: none;
}
.product-card:hover .product-name,
.product-name:hover {
  color: var(--accent);
}

/* Row 3: Store + EMI */
.pc-store-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.pc-store-chip {
  font-size: 10px;
  font-weight: 700;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
}
[data-theme="dark"] .pc-store-chip {
  background: rgba(16, 185, 129, 0.12);
}
.pc-emi-chip {
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
}
[data-theme="dark"] .pc-emi-chip {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
}

/* Row 4: Price + CTA */
.product-card-bottom {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--line);
}
.price-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.original-price {
  font-size: 11px;
  color: var(--muted);
  text-decoration: line-through;
  font-weight: 500;
}
.product-price {
  font-size: 17px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.5px;
  line-height: 1.1;
}
.product-buy {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: -0.2px;
}
.product-buy:hover {
  background: var(--accent);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
}

/* Deprecated helpers kept for compat */
.product-meta-row, .product-category-tag, .product-brand-chip,
.product-spec-pills, .spec-pill-mini, .product-card-emi-strip,
.product-description, .original-price-row, .discount-pill,
.buy-arrow, .product-store-badge {
  display: none;
}


`;
