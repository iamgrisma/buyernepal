export const productMatrixCss = `
/* ==========================================================================
   Product Page: Variant Matrix, Scorecard, and Stores Table
   ========================================================================== */
.product-variants-box {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 14px;
  margin-bottom: 16px;
}
.variant-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.variant-heading {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
}
.variant-stock-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}
.variant-pills-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.variant-pill-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--background);
  cursor: pointer;
  transition: all 0.15s;
}
.variant-pill-btn:hover:not(:disabled) {
  border-color: var(--accent);
}
.variant-pill-btn.active {
  border-color: var(--accent);
  background: rgba(225, 29, 72, 0.05);
  box-shadow: 0 0 0 2px rgba(225, 29, 72, 0.2);
}
.variant-pill-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.variant-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
}
.variant-cost {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
}
.variant-oos {
  font-size: 9px;
  font-weight: 700;
  color: #be123c;
  text-transform: uppercase;
}

/* In-Depth Review Scorecard Breakdown */
.editorial-scorecard-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 22px;
  margin: 24px 0;
  box-shadow: var(--shadow-sm);
}
.scorecard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--line-subtle);
  padding-bottom: 14px;
}
.scorecard-badge {
  font-size: 11px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 4px;
}
.scorecard-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
}
.scorecard-overall-badge {
  display: flex;
  align-items: baseline;
  gap: 2px;
  background: linear-gradient(135deg, #e11d48, #be123c);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
}
.overall-val {
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
}
.overall-scale {
  font-size: 12px;
  font-weight: 700;
  opacity: 0.85;
}
.scorecard-bars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}
.score-bar-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.score-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
}
.score-progress-track {
  width: 100%;
  height: 8px;
  background: var(--line);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.score-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #e11d48);
  border-radius: var(--radius-full);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.scorecard-verdict-box {
  background: var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink);
}
.scorecard-verdict-box strong {
  color: var(--accent);
}

/* "Where to Buy in Nepal" Multi-Store Table */
.price-comparison-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
  color: var(--ink);
}
.price-match-guarantee {
  font-size: 11px;
  font-weight: 700;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}
.stores-matrix-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}
.store-matrix-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  background: var(--background);
  border: 1px solid var(--line-subtle);
  border-radius: var(--radius-md);
  transition: all 0.15s;
}
.store-matrix-row:hover {
  border-color: var(--accent);
  background: var(--card-bg);
}
.store-identity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.store-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
}
.store-pill-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  background: rgba(225, 29, 72, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
}
.store-subtext {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--muted);
}
.store-pricing-action {
  display: flex;
  align-items: center;
  gap: 14px;
}
.store-price-display {
  text-align: right;
}
.store-price-val {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
}
.store-stock-indicator {
  font-size: 10px;
  font-weight: 700;
  color: var(--emerald);
}
.store-visit-btn {
  background: var(--accent);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s, transform 0.15s;
}
.store-visit-btn:hover {
  background: #be123c;
  transform: translateY(-1px);
}


`;
