export const featureSuiteCss = `
/* ==========================================================================
   2026 FEATURE SUITE: THEME, CURRENCY, FLASH SALE, WISHLIST, COMPARISON, EMI
   ========================================================================== */

/* Dark Mode Overrides */
[data-theme="dark"] .store-header {
  background: rgba(11, 15, 25, 0.88);
  border-bottom-color: var(--line);
}
[data-theme="dark"] .search-bar,
[data-theme="dark"] .search-bar input {
  background: #111827;
  color: var(--ink);
  border-color: var(--line);
}
[data-theme="dark"] .product-card {
  background: var(--card-bg);
  border-color: var(--line);
}
[data-theme="dark"] .product-card:hover {
  border-color: var(--accent);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.6);
}
[data-theme="dark"] .quick-tag,
[data-theme="dark"] .trust-item,
[data-theme="dark"] .cat-card,
[data-theme="dark"] .coupon-item,
[data-theme="dark"] .coupon-card,
[data-theme="dark"] .admin-card,
[data-theme="dark"] .admin-stat-card {
  background: #111827;
  border-color: #1e293b;
}
[data-theme="dark"] .trust-item:hover {
  border-color: #ef4444;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}
[data-theme="dark"] .trust-icon {
  background: #1e293b;
  color: #f87171;
}
[data-theme="dark"] .trust-text strong {
  color: #f8fafc;
}
[data-theme="dark"] .trust-text span {
  color: #cbd5e1;
}
[data-theme="dark"] .admin-sidebar {
  background: #090d16;
  border-right-color: var(--line);
}
[data-theme="dark"] .admin-table th {
  background: #1f2937;
  color: var(--muted);
  border-bottom-color: var(--line);
}
[data-theme="dark"] .admin-table td {
  border-bottom-color: var(--line);
  color: var(--ink);
}
[data-theme="dark"] .admin-table tr:hover td {
  background: #1e293b;
}
[data-theme="dark"] .form-group input,
[data-theme="dark"] .form-group textarea,
[data-theme="dark"] .form-group select {
  background: #111827;
  border-color: var(--line);
  color: var(--ink);
}
[data-theme="dark"] .bottom-nav {
  background: rgba(11, 15, 25, 0.95);
  border-top-color: var(--line);
}

/* Theme Toggle Button */
.theme-toggle-btn {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-toggle-btn:hover {
  background: var(--line-subtle);
  border-color: var(--ink-secondary);
  transform: rotate(15deg);
}

/* Multi-Currency Switcher */
.currency-selector {
  display: inline-flex;
  align-items: center;
  background: var(--line-subtle);
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  padding: 3px;
  gap: 2px;
}
.currency-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.15s ease;
}
.currency-btn.active {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(225, 29, 72, 0.35);
}

/* Wishlist Header Icon with Count */
.wishlist-btn-header {
  position: relative;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
}
.wishlist-btn-header:hover {
  background: var(--line-subtle);
  color: var(--accent);
}
.wishlist-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent);
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  border: 2px solid var(--card-bg);
}

/* Product Card Wishlist & Compare Buttons */
.card-actions-float {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 5;
}
.btn-action-circle {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid var(--line);
  color: var(--ink-secondary);
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}
[data-theme="dark"] .btn-action-circle {
  background: rgba(17, 24, 39, 0.85);
  color: #e2e8f0;
}
.btn-action-circle:hover, .btn-action-circle.active {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
  transform: scale(1.1);
}

/* Live Flash Sale Section */
.flash-sale-section {
  background: linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #1e1b4b 100%);
  border-radius: var(--radius-lg);
  padding: 28px;
  margin: 32px 0;
  border: 1px solid rgba(244, 63, 94, 0.3);
  box-shadow: 0 16px 32px -8px rgba(225, 29, 72, 0.2);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}
.flash-sale-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}
.flash-sale-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.flash-flame-icon {
  font-size: 28px;
  animation: pulseFlame 1.5s infinite ease-in-out;
}
@keyframes pulseFlame {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #fb7185); }
  50% { transform: scale(1.15); filter: drop-shadow(0 0 12px #f43f5e); }
}
.flash-timer-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.flash-timer-label {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 800;
  color: #fda4af;
  letter-spacing: 1px;
}
.flash-timer-box {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: monospace;
  font-size: 16px;
  font-weight: 900;
}
.flash-timer-unit {
  background: #f43f5e;
  color: #ffffff;
  padding: 4px 6px;
  border-radius: 4px;
  min-width: 28px;
  text-align: center;
}

/* Flash Claim Progress Meter */
.flash-meter-box {
  margin-top: 10px;
}
.flash-meter-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: #cbd5e1;
  margin-bottom: 4px;
}
.flash-meter-track {
  width: 100%;
  height: 7px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.flash-meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b 0%, #f43f5e 100%);
  border-radius: var(--radius-full);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sliding Wishlist Drawer */
.wishlist-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: none !important;
}
.wishlist-drawer-backdrop.open {
  display: block !important;
}
.wishlist-drawer {
  display: none !important;
  position: fixed;
  top: 0;
  right: 0;
  width: min(380px, 88vw);
  max-width: 380px;
  height: 100vh;
  height: 100dvh;
  background: var(--surface);
  color: var(--ink);
  z-index: 9999;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.35);
  flex-direction: column;
}
.wishlist-drawer.open {
  display: flex !important;
  animation: drawerSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.wishlist-drawer-header {
  padding: 20px;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wishlist-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.wishlist-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg);
}
.wishlist-item img {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}
.wishlist-item-info {
  flex: 1;
  min-width: 0;
}
.wishlist-item-title {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.wishlist-item-price {
  font-size: 14px;
  font-weight: 800;
  color: var(--accent);
}
.wishlist-drawer-footer {
  padding: 20px;
  border-top: 1px solid var(--line);
  background: var(--bg);
}

/* Product Comparison Floating Dock */
.compare-dock {
  display: none !important;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border-top: 2px solid var(--accent);
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.2);
  z-index: 9990;
}
.compare-dock.open {
  display: block !important;
  animation: dockSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes dockSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.compare-dock-header {
  padding: 12px 20px;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.compare-dock-body {
  padding: 16px 20px;
  overflow-x: auto;
}
.compare-dock-items {
  display: flex;
  gap: 16px;
  align-items: stretch;
}
.compare-mini-card {
  width: 220px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}
.compare-mini-card img {
  width: 100%;
  height: 90px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

/* Comparison Modal / Expanded View */
.compare-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: none;
  place-items: center;
  padding: 20px;
}
.compare-modal-backdrop.open {
  display: grid;
}
.compare-modal-content {
  background: var(--card-bg);
  color: var(--ink);
  width: min(1000px, 95vw);
  max-height: 90vh;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.compare-table th, .compare-table td {
  padding: 12px 16px;
  border: 1px solid var(--line);
  text-align: left;
}
.compare-table th {
  background: var(--line-subtle);
  width: 25%;
  font-weight: 700;
  color: var(--ink-secondary);
}

/* Rehub Full Comparison Matrix Table */
div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > table#rehubCompareTable:nth-of-type(1),
table#rehubCompareTable,
.rehub-compare-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-main);
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: -0.01em;
  background: var(--card-bg);
  table-layout: auto;
}

div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(3),
.compare-matrix-container {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-top: 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.compare-scroll-hint-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(37, 99, 235, 0.08);
  color: var(--blue);
  font-size: 12.5px;
  font-weight: 700;
  border-bottom: 1px solid var(--line);
  user-select: none;
  text-align: center;
}
.compare-scroll-hint-icon {
  font-size: 14px;
}

.compare-table-scroller {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  position: relative;
  width: 100%;
  max-width: 100%;
}

/* Feature column header (Left column - STICKY) */
.rehub-compare-table .feature-col-header {
  width: 220px;
  min-width: 200px;
  padding: 24px 20px;
  background: var(--bg);
  border-right: 2px solid var(--line);
  border-bottom: 2px solid var(--line);
  vertical-align: bottom;
  text-align: left;
  position: sticky;
  left: 0;
  z-index: 8;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
}

.rehub-compare-table .feature-col-header span {
  font-size: 12px;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
}

/* Product header columns */
.rehub-compare-table .compare-product-col-header {
  padding: 24px 20px;
  vertical-align: top;
  text-align: center;
  border-left: 1px solid var(--line);
  border-bottom: 2px solid var(--line);
  background: var(--card-bg);
}

.rehub-compare-table .compare-product-col-header .product-img-box {
  width: 130px;
  height: 130px;
  margin: 0 auto 14px;
  background: var(--bg);
  border-radius: var(--radius-md);
  padding: 10px;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rehub-compare-table .compare-product-col-header h3 {
  font-family: var(--font-display, var(--font-main));
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 8px;
  min-height: 42px;
}

.rehub-compare-table .compare-product-col-header h3 a {
  color: var(--ink);
  text-decoration: none;
  transition: color 0.15s ease;
}

.rehub-compare-table .compare-product-col-header h3 a:hover {
  color: var(--accent);
}

.rehub-compare-table .compare-price-val {
  font-family: var(--font-display, var(--font-main));
  font-size: 20px;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.rehub-compare-table .compare-orig-price {
  font-size: 12px;
  color: var(--muted);
  text-decoration: line-through;
  margin-top: 4px;
}

/* Section Header Rows */
.rehub-compare-table .compare-section-header-row td {
  background: var(--bg);
  padding: 12px 20px;
  font-family: var(--font-display, var(--font-main));
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink);
  border-top: 2px solid var(--line);
  border-bottom: 1px solid var(--line);
}

/* Feature Rows */
.rehub-compare-table .compare-row {
  border-bottom: 1px solid var(--line-subtle);
  transition: background 0.15s ease;
}

.rehub-compare-table .compare-row:hover {
  background: rgba(15, 23, 42, 0.02);
}

/* Sticky Left Feature Label */
.rehub-compare-table .compare-feature-label {
  padding: 15px 20px;
  font-weight: 600;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--ink);
  background: var(--bg-alt);
  border-right: 2px solid var(--line);
  vertical-align: middle;
  text-align: left;
  width: 220px;
  min-width: 200px;
  position: sticky;
  left: 0;
  z-index: 8;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
}

.rehub-compare-table .compare-feature-val {
  padding: 15px 20px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink);
  border-left: 1px solid var(--line-subtle);
  vertical-align: middle;
  text-align: center;
}

.rehub-compare-table .compare-score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  padding: 4px 12px;
  background: rgba(37, 99, 235, 0.08);
  color: var(--blue);
  border-radius: var(--radius-sm);
  font-weight: 800;
  font-size: 14px;
  letter-spacing: -0.01em;
}

.rehub-compare-table .store-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--line-subtle);
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
}

/* Differences Highlight */
.rehub-compare-table .row-diff-value {
  background: rgba(220, 38, 38, 0.02);
}
.rehub-compare-table .row-diff-value .compare-feature-label {
  border-left: 3px solid var(--accent);
  color: var(--accent);
  font-weight: 700;
}

/* Pros and Cons Lists in Comparison */
.compare-pros-list,
.compare-cons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.compare-pros-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: #047857;
  font-weight: 500;
}

.compare-cons-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: #b91c1c;
  font-weight: 500;
}

/* Sticky Action Row at bottom */
.rehub-compare-table .compare-action-sticky-row td {
  padding: 18px 20px;
  background: var(--bg);
  border-top: 2px solid var(--line);
}

/* Popular Showdowns Responsive Grid (Selector 2) */
div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(4),
.popular-showdowns-container {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.popular-showdowns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 20px;
  width: 100%;
}

@media (max-width: 640px) {
  .popular-showdowns-grid {
    grid-template-columns: 1fr;
  }
}

/* Responsive Table Breakpoints */
@media (max-width: 768px) {
  .compare-scroll-hint-bar {
    font-size: 11.5px;
    padding: 8px 12px;
  }
  .rehub-compare-table .feature-col-header,
  .rehub-compare-table .compare-feature-label {
    width: 125px !important;
    min-width: 115px !important;
    max-width: 130px !important;
    padding: 12px 10px !important;
    font-size: 11.5px !important;
    line-height: 1.35 !important;
  }
  .rehub-compare-table .compare-product-col-header {
    min-width: 175px !important;
    padding: 16px 10px !important;
  }
  .rehub-compare-table .compare-product-col-header .product-img-box {
    width: 80px !important;
    height: 80px !important;
    margin: 0 auto 8px !important;
    padding: 6px !important;
  }
  .rehub-compare-table .compare-product-col-header h3 {
    font-size: 13px !important;
    min-height: 34px !important;
  }
  .rehub-compare-table .compare-price-val {
    font-size: 16px !important;
  }
  .rehub-compare-table .compare-orig-price {
    font-size: 11px !important;
  }
  .rehub-compare-table .compare-feature-val {
    min-width: 175px !important;
    padding: 10px 8px !important;
    font-size: 12.5px !important;
  }
  .rehub-compare-table .compare-section-header-row td {
    padding: 10px 14px !important;
    font-size: 11.5px !important;
  }
  .rehub-compare-table .compare-action-sticky-row td {
    padding: 12px 10px !important;
  }
  .rehub-compare-table .compare-score-badge {
    min-width: 60px !important;
    padding: 3px 8px !important;
    font-size: 12.5px !important;
  }
  .compare-pros-list li,
  .compare-cons-list li {
    font-size: 11.5px !important;
  }
}

/* User Explicit Targeted Selectors */
div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > button#navMoreDropdownBtn:nth-of-type(1),
button#navMoreDropdownBtn {
  cursor: pointer;
}
div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > button#mobileMenuBtn:nth-of-type(3),
button#mobileMenuBtn {
  cursor: pointer;
}
div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > button#allDepartmentsBtn:nth-of-type(1),
button#allDepartmentsBtn {
  cursor: pointer;
}

/* Dark Mode Overrides for Comparison Matrix */
[data-theme="dark"] div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > table#rehubCompareTable:nth-of-type(1),
[data-theme="dark"] table#rehubCompareTable,
[data-theme="dark"] .rehub-compare-table {
  background: #111827;
}

[data-theme="dark"] .rehub-compare-table .feature-col-header {
  background: #0d1526;
  border-right-color: #1e293b;
  border-bottom-color: #1e293b;
  box-shadow: 4px 0 14px rgba(0, 0, 0, 0.5);
}

[data-theme="dark"] .rehub-compare-table .compare-product-col-header {
  background: #111827;
  border-left-color: #1e293b;
  border-bottom-color: #1e293b;
}

[data-theme="dark"] .rehub-compare-table .compare-section-header-row td {
  background: #090e17;
  border-top-color: #1e293b;
  border-bottom-color: #1e293b;
  color: #f8fafc;
}

[data-theme="dark"] .rehub-compare-table .compare-feature-label {
  background: #0d1526;
  border-right-color: #1e293b;
  color: #f8fafc;
  box-shadow: 4px 0 14px rgba(0, 0, 0, 0.5);
}

[data-theme="dark"] .rehub-compare-table .compare-feature-val {
  border-left-color: #1e293b;
  color: #e2e8f0;
}

[data-theme="dark"] .rehub-compare-table .compare-row {
  border-bottom-color: #1e293b;
}

[data-theme="dark"] .rehub-compare-table .compare-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

[data-theme="dark"] .compare-pros-list li {
  color: #34d399;
}

[data-theme="dark"] .compare-cons-list li {
  color: #f87171;
}

[data-theme="dark"] .rehub-compare-table .compare-score-badge {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

[data-theme="dark"] .rehub-compare-table .store-pill-badge {
  background: #1e293b;
  border-color: #334155;
  color: #f8fafc;
}

[data-theme="dark"] .rehub-compare-table .compare-action-sticky-row td {
  background: #0d1526;
  border-top-color: #1e293b;
}

/* Leaderboard Rank Table in /charts */
.rehub-rank-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-main);
  font-size: 14px;
  line-height: 1.55;
}
.rehub-rank-table th {
  background: var(--bg);
  border-bottom: 2px solid var(--line);
  font-family: var(--font-display, var(--font-main));
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  padding: 16px 20px;
}
.rehub-rank-table td {
  padding: 18px 20px;
  border-bottom: 1px solid var(--line-subtle);
  vertical-align: middle;
}
.rehub-rank-table tr.toptable-row:hover {
  background: rgba(15, 23, 42, 0.02);
}
[data-theme="dark"] .rehub-rank-table th {
  background: #0d1526;
  border-bottom-color: #1e293b;
}
[data-theme="dark"] .rehub-rank-table td {
  border-bottom-color: #1e293b;
}
[data-theme="dark"] .rehub-rank-table tr.toptable-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

/* EMI Calculator Card (Product Page) */
.emi-calculator-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-top: 20px;
}
.emi-calculator-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.emi-bank-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 14px;
}
.emi-bank-btn {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}
.emi-bank-btn.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
}
.emi-tenure-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.emi-tenure-btn {
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--bg);
  color: var(--ink);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.15s;
}
.emi-tenure-btn.active {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}
.emi-result-callout {
  background: var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid var(--accent);
}
.emi-result-amount {
  font-size: 22px;
  font-weight: 900;
  color: var(--accent);
}

/* 6-Month Price History Chart */
.price-history-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-top: 20px;
}
.price-history-svg-wrap {
  width: 100%;
  overflow-x: auto;
  margin-top: 12px;
}

/* Nepal City Delivery Estimator */
.delivery-estimator-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.delivery-city-select {
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  outline: none;
}

/* Price Drop Alert Modal */
.price-alert-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: none;
  place-items: center;
  padding: 20px;
}
.price-alert-modal-backdrop.open {
  display: grid;
}
.price-alert-modal-box {
  background: var(--card-bg);
  color: var(--ink);
  width: min(440px, 95vw);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  padding: 24px;
  box-shadow: var(--shadow-xl);
  position: relative;
}

/* Direct Express Checkout Modal */
.direct-order-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 10000;
  display: none;
  place-items: center;
  padding: 20px;
}
.direct-order-modal-backdrop.open {
  display: grid;
}
.direct-order-modal-box {
  background: var(--card-bg);
  color: var(--ink);
  width: min(560px, 95vw);
  max-height: 92vh;
  overflow-y: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  padding: 24px;
  box-shadow: var(--shadow-xl);
  position: relative;
}

/* Search Autocomplete Live Dropdown */
.header-search-wrap {
  position: relative;
  width: 100%;
}
.search-autocomplete-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  display: none;
  max-height: 440px;
  overflow-y: auto;
}
.search-autocomplete-dropdown.open {
  display: block;
}
.search-group-title {
  padding: 8px 14px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.search-result-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: var(--ink);
  transition: background 0.15s ease;
}
.search-result-row:hover {
  background: var(--bg);
}
.search-result-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--line);
  flex-shrink: 0;
}
.search-result-info {
  flex: 1;
  min-width: 0;
}
.search-result-title {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-result-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--muted);
  margin-top: 2px;
}
.search-result-price {
  font-weight: 700;
  color: var(--primary);
}
.search-autocomplete-empty {
  padding: 20px;
  text-align: center;
  color: var(--muted);
  font-size: 13px;
}

/* Nepal Shopping FAQ — 2-column layout */
.faq-section-wrap {
  margin-top: 48px;
  margin-bottom: 48px;
}
.faq-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: start;
}
@media (max-width: 900px) {
  .faq-layout { grid-template-columns: 1fr; }
  .faq-col-aside { order: -1; }
}
.faq-col-main { display: flex; flex-direction: column; gap: 0; }
.faq-item {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--card-bg);
  margin-bottom: 12px;
  overflow: hidden;
}
.faq-question {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
  color: var(--ink);
}
.faq-question:hover {
  background: var(--line-subtle);
}
.faq-answer {
  padding: 0 20px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  display: none;
}
.faq-item.active .faq-answer {
  display: block;
}
.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

/* FAQ aside trust card */
.faq-col-aside {}
.faq-trust-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  color: #f8fafc;
  position: sticky;
  top: 90px;
}
[data-theme="light"] .faq-trust-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}
.faq-trust-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.faq-trust-title {
  font-size: 17px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
}
.faq-trust-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.faq-trust-list li {
  font-size: 13px;
  color: #cbd5e1;
  line-height: 1.5;
  padding-left: 0;
}
.faq-trust-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 18px;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background 0.15s;
}
.faq-trust-link:hover {
  background: var(--accent-hover);
}

/* Specs & Pros/Cons in Product View */
.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 12px;
}
.specs-table tr:nth-child(even) td {
  background: var(--line-subtle);
}
.specs-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
}
.specs-table td:first-child {
  font-weight: 700;
  width: 35%;
  color: var(--ink-secondary);
}
.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 18px;
}
@media (max-width: 640px) {
  .pros-cons-grid { grid-template-columns: 1fr; }
}
.pros-card {
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: var(--radius-md);
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.cons-card {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: var(--radius-md);
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.pros-card-title {
  color: #15803d;
  font-size: 13.5px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.2px;
}
.cons-card-title {
  color: #be123c;
  font-size: 13.5px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.2px;
}
.pros-list, .cons-list {
  list-style: none;
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
}
.pros-list li {
  color: #14532d;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-weight: 500;
}
.pros-list li span.pro-bullet {
  color: #16a34a;
  font-weight: 800;
  flex-shrink: 0;
}
.cons-list li {
  color: #881337;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-weight: 500;
}
.cons-list li span.con-bullet {
  color: #e11d48;
  font-weight: 800;
  flex-shrink: 0;
}

[data-theme="dark"] .pros-card {
  background: #06261c;
  border-color: #059669;
}
[data-theme="dark"] .cons-card {
  background: #2a0e14;
  border-color: #9f1239;
}
[data-theme="dark"] .pros-card-title {
  color: #34d399;
}
[data-theme="dark"] .cons-card-title {
  color: #fb7185;
}
[data-theme="dark"] .pros-list li {
  color: #a7f3d0;
}
[data-theme="dark"] .cons-list li {
  color: #fecdd3;
}
[data-theme="dark"] .pros-list li span.pro-bullet {
  color: #34d399;
}
[data-theme="dark"] .cons-list li span.con-bullet {
  color: #f43f5e;
}

#detailCityResult {
  background: var(--card-subtle, #f1f5f9);
  color: var(--ink, #0f172a);
  border: 1px solid var(--line, #cbd5e1);
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
}
#detailCityResult strong {
  color: var(--ink, #0f172a);
}
#detailCourierFee {
  color: #047857;
  font-weight: 700;
}
[data-theme="dark"] #detailCityResult {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #334155;
}
[data-theme="dark"] #detailCityResult strong {
  color: #f8fafc;
}
[data-theme="dark"] #detailCourierFee {
  color: #34d399;
}

/* Admin Feature Flags Grid */
.admin-flags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.admin-flag-item {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-flag-info strong {
  display: block;
  font-size: 14px;
  color: var(--ink);
  margin-bottom: 2px;
}
.admin-flag-info small {
  font-size: 12px;
  color: var(--muted);
}
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #cbd5e1;
  transition: 0.3s;
  border-radius: 24px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}
input:checked + .slider { background-color: var(--accent); }
input:checked + .slider:before { transform: translateX(20px); }

/* Regional Geo Traffic Distribution */
.geo-distribution-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
.geo-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.geo-label-bar {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
}
.geo-track {
  width: 100%;
  height: 8px;
  background: var(--line);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.geo-fill {
  height: 100%;
  border-radius: var(--radius-full);
}


`;
