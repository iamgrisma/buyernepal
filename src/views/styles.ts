export const storefrontCss = `
:root {
  --ink: #0f172a;
  --ink-secondary: #334155;
  --muted: #64748b;
  --line: #e2e8f0;
  --line-subtle: #f1f5f9;
  --accent: #e11d48;
  --accent-hover: #be123c;
  --accent-soft: #ffe4e6;
  --emerald: #059669;
  --emerald-soft: #d1fae5;
  --amber: #d97706;
  --amber-soft: #fef3c7;
  --blue: #2563eb;
  --blue-soft: #dbeafe;
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --primary: #0f172a;
  --primary-hover: #1e293b;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  padding-bottom: 70px;
}

@media (min-width: 768px) {
  body { padding-bottom: 0; }
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
button { font-family: inherit; }

.store-shell {
  width: min(1200px, calc(100% - 36px));
  margin-left: auto;
  margin-right: auto;
}

/* Announcement Topbar */
.store-topbar {
  background: linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%);
  color: #e2e8f0;
  font-size: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.store-topbar-inner {
  min-height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 4px 0;
}
.store-topbar-note {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #94a3b8;
}
.topbar-badge {
  background: rgba(225, 29, 72, 0.2);
  color: #fda4af;
  border: 1px solid rgba(225, 29, 72, 0.4);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 11px;
}

/* Header */
.store-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}
.store-header-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.store-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  min-width: max-content;
}
.store-logo-mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f172a 0%, #e11d48 100%);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -1px;
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
}
.store-brand > span:last-child {
  display: flex;
  flex-direction: column;
}
.store-brand strong {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.8px;
}
.store-brand small {
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--muted);
  font-weight: 700;
}

/* Desktop Navigation */
.store-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  margin-left: 20px;
}
.store-nav a, .nav-dropdown-btn {
  font-size: 13px;
  color: var(--ink-secondary);
  font-weight: 600;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}
.store-nav a:hover, .nav-dropdown-btn:hover {
  color: var(--accent);
  background: var(--line-subtle);
}
.store-nav .store-nav-active {
  color: var(--accent);
  background: var(--accent-soft);
  font-weight: 700;
}

.nav-dropdown { position: relative; display: inline-block; }
.nav-dropdown-btn { background: transparent; border: 0; cursor: pointer; }
.nav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  padding: 8px;
  min-width: 220px;
  z-index: 50;
}
.nav-dropdown:hover .nav-dropdown-menu { display: block; }
.nav-dropdown-menu a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  font-size: 13px;
  color: var(--ink-secondary);
  border-radius: var(--radius-sm);
}
.nav-dropdown-menu a:hover {
  background: var(--line-subtle);
  color: var(--accent);
}

.store-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.store-admin-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  background: #ffffff;
  border: 1px solid var(--line);
  padding: 8px 14px;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.store-admin-link:hover {
  border-color: var(--ink);
  background: var(--line-subtle);
}
.store-menu {
  display: none;
  border: 1px solid var(--line);
  background: #ffffff;
  padding: 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.store-menu span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--ink);
  margin: 4px 0;
  border-radius: 2px;
}

/* Mobile Navigation Drawer */
.mobile-drawer-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  z-index: 90;
  backdrop-filter: blur(4px);
}
.mobile-drawer-backdrop.open { display: block; }
.mobile-drawer {
  position: fixed;
  top: 0;
  right: -340px;
  width: min(320px, 85vw);
  height: 100vh;
  background: #ffffff;
  z-index: 100;
  box-shadow: -10px 0 30px rgba(0,0,0,0.2);
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.mobile-drawer.open { right: 0; }
.mobile-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
}
.mobile-drawer-close {
  background: transparent;
  border: 0;
  font-size: 28px;
  color: var(--muted);
  cursor: pointer;
}
.mobile-drawer-content { padding: 20px; }
.mobile-drawer-label {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--muted);
  margin-bottom: 10px;
}
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-nav-links a {
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-secondary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 10px;
}
.mobile-nav-links a:hover, .mobile-nav-links a.active {
  background: var(--line-subtle);
  color: var(--accent);
  font-weight: 700;
}

/* Hero Section */
.store-hero {
  background: radial-gradient(circle at 85% 20%, rgba(225, 29, 72, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(37, 99, 235, 0.06) 0%, transparent 40%),
              #ffffff;
  border-bottom: 1px solid var(--line);
  padding: 48px 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;
}
.eyebrow, .section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--accent);
  text-transform: uppercase;
}
.hero-copy h1 {
  font-size: clamp(34px, 4.5vw, 56px);
  line-height: 1.06;
  letter-spacing: -2px;
  margin: 14px 0;
  font-weight: 900;
  color: var(--ink);
}
.hero-copy h1 em {
  font-style: normal;
  background: linear-gradient(135deg, var(--accent) 0%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-copy p {
  max-width: 540px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 26px;
}
.hero-search-wrapper {
  max-width: 560px;
  margin-bottom: 16px;
}
.hero-search {
  height: 54px;
  background: #ffffff;
  border: 2px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  transition: all 0.2s;
}
.hero-search:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.hero-search > span { font-size: 20px; color: var(--muted); }
.hero-search input {
  border: 0;
  outline: 0;
  flex: 1;
  background: transparent;
  font-size: 15px;
  color: var(--ink);
  font-weight: 500;
  width: 100%;
}
.hero-search input::placeholder { color: #94a3b8; }
.hero-search button {
  border: 0;
  background: transparent;
  font-size: 18px;
  color: var(--muted);
  cursor: pointer;
  display: none;
}
.hero-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 12px;
}
.hero-tags span { color: var(--muted); font-weight: 600; }
.quick-tag {
  background: #f1f5f9;
  color: var(--ink-secondary);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.quick-tag:hover {
  background: var(--accent);
  color: #ffffff;
}
.hero-points {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  color: var(--ink-secondary);
  font-size: 13px;
  font-weight: 600;
}
.hero-points span {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Hero Showcase Card */
.hero-card {
  background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.35);
  border: 1px solid rgba(255,255,255,0.1);
  min-height: 380px;
}
.hero-card-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  right: -50px;
  top: -50px;
  background: radial-gradient(circle, #e11d48 0%, rgba(225, 29, 72, 0) 70%);
  opacity: 0.65;
  filter: blur(25px);
  pointer-events: none;
}
.hero-card-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 2px;
  color: #93c5fd;
  font-weight: 800;
}
.hero-card-title {
  font-size: 34px;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin: 16px 0;
}
.hero-card-title strong { color: #fda4af; }
.hero-stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 24px;
}
.hero-stat-box {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 14px;
  text-align: center;
}
.hero-stat-box strong {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
}
.hero-stat-box span {
  font-size: 11px;
  color: #cbd5e1;
  font-weight: 500;
}

/* Trust Strip */
.trust-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 24px auto 0;
}
.trust-item {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
}
.trust-item:hover { transform: translateY(-2px); }
.trust-icon {
  font-size: 24px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--line-subtle);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.trust-text strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
.trust-text span {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.4;
}

/* Deals & Coupons Strip */
.coupons-section {
  margin: 32px auto 0;
}
.coupons-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.coupons-heading h3 {
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
}
.coupons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}
.coupon-card {
  background: linear-gradient(135deg, #ffffff 0%, #fff1f2 100%);
  border: 1.5px dashed #f43f5e;
  border-radius: var(--radius-md);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: var(--shadow-sm);
}
.coupon-info strong {
  display: block;
  font-size: 14px;
  color: var(--ink);
  letter-spacing: 0.5px;
}
.coupon-info span {
  font-size: 11px;
  color: var(--muted);
}
.copy-coupon-btn {
  background: #e11d48;
  color: #ffffff;
  border: 0;
  padding: 7px 14px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background 0.15s;
  white-space: nowrap;
}
.copy-coupon-btn:hover { background: #be123c; }

/* Category Navigation Row */
.category-section {
  margin-top: 40px;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}
.section-heading h2 {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--ink);
  margin-top: 4px;
}
.section-count {
  font-size: 13px;
  font-weight: 700;
  color: var(--muted);
  background: var(--line-subtle);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}
.category-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
}
.category-chip {
  background: #ffffff;
  border: 1px solid var(--line);
  color: var(--ink-secondary);
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  transition: all 0.15s ease;
}
.category-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
.category-chip.active {
  background: var(--ink);
  border-color: var(--ink);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
}

/* Quick Filter & Sort Controls */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  margin: 24px 0;
  box-shadow: var(--shadow-sm);
}
.filter-chips-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-pill {
  background: var(--line-subtle);
  border: 1px solid transparent;
  color: var(--ink-secondary);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.15s;
}
.filter-pill:hover, .filter-pill.active {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}
.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
}
.sort-select {
  border: 1px solid var(--line);
  background: #ffffff;
  color: var(--ink);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  outline: none;
  cursor: pointer;
}

/* Product Grid */
.products-section { margin-top: 36px; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* Product Card */
.product-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: #cbd5e1;
}
.product-image-link {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #f8fafc;
  overflow: hidden;
  display: block;
}
.product-image-link img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .product-image-link img {
  transform: scale(1.05);
}
.product-image-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: #f1f5f9;
  color: #94a3b8;
  font-weight: 900;
  font-size: 24px;
}
.product-badge-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(15, 23, 42, 0.9);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: var(--radius-full);
  backdrop-filter: blur(6px);
  box-shadow: var(--shadow-sm);
}
.product-store-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--ink);
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}

.product-card-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.product-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 11px;
}
.product-category-tag {
  color: var(--muted);
  font-weight: 600;
}
.product-rating {
  color: var(--amber);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 3px;
}
.product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.35;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s;
}
.product-card:hover .product-name {
  color: var(--accent);
}
.product-description {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.product-card-bottom {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price-block {
  display: flex;
  flex-direction: column;
}
.original-price-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.original-price {
  font-size: 12px;
  color: #94a3b8;
  text-decoration: line-through;
}
.discount-pill {
  font-size: 10px;
  font-weight: 800;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}
.product-price {
  font-size: 17px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.5px;
}
.product-buy {
  background: var(--ink);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.product-buy:hover {
  background: var(--accent);
}

/* Empty State */
.store-empty {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 60px 20px;
  text-align: center;
  max-width: 500px;
  margin: 40px auto;
}
.empty-icon {
  font-size: 48px;
  color: var(--muted);
  margin-bottom: 12px;
}
.store-empty h3 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 6px;
}
.store-empty p {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 20px;
}
.primary-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--ink);
  color: #ffffff;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  border: 0;
  cursor: pointer;
  transition: all 0.15s;
}
.primary-action:hover {
  background: var(--accent);
}

/* Editorial Banner */
.editorial-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  border-radius: var(--radius-lg);
  padding: 40px 48px;
  margin: 60px auto 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  color: #ffffff;
}
.editorial-banner h2 {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.15;
  margin: 8px 0 12px;
}
.editorial-banner p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  max-width: 520px;
}
.editorial-stat {
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  padding: 24px 32px;
  min-width: 180px;
}
.editorial-stat strong {
  display: block;
  font-size: 42px;
  font-weight: 900;
  color: #fda4af;
  line-height: 1;
}
.editorial-stat span {
  font-size: 12px;
  color: #cbd5e1;
  font-weight: 600;
  margin-top: 6px;
  display: block;
}

/* Footer */
.store-footer {
  background: #0b0f19;
  color: #94a3b8;
  border-top: 1px solid #1e293b;
  padding: 60px 0 24px;
  margin-top: 60px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}
.footer-grid .store-brand { color: #ffffff; margin-bottom: 14px; }
.footer-grid p { font-size: 13px; line-height: 1.6; max-width: 320px; }
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
  color: #94a3b8;
  margin-bottom: 10px;
  transition: color 0.15s;
}
.footer-grid a:hover { color: #ffffff; }
.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
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
.mobile-bottom-item span:first-child { font-size: 18px; }

@media (max-width: 768px) {
  .mobile-bottom-bar { display: block; }
  .store-menu { display: block; }
  .store-nav { display: none; }
  .hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .hero-card { order: -1; min-height: auto; padding: 24px; }
  .trust-strip { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .editorial-banner { flex-direction: column; padding: 32px 24px; text-align: center; }
  .editorial-banner p { margin: auto; }
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

/* Product Detail Page Styles */
.product-detail-page { padding: 32px 0 60px; }
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 24px;
}
.breadcrumbs a:hover { color: var(--ink); }
.product-detail-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-sm);
}
@media (max-width: 860px) {
  .product-detail-grid { grid-template-columns: 1fr; gap: 32px; padding: 20px; }
}
.product-detail-gallery {
  position: relative;
  background: #f8fafc;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--line-subtle);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-detail-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-detail-info h1 {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--ink);
  line-height: 1.2;
  margin: 10px 0 16px;
}
.detail-price-box {
  background: var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  margin: 20px 0;
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.detail-main-price {
  font-size: 32px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -1px;
}
.detail-original-price {
  font-size: 16px;
  color: #94a3b8;
  text-decoration: line-through;
}
.detail-buy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--accent);
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);
  transition: all 0.2s;
  width: 100%;
  margin-bottom: 24px;
}
.detail-buy-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

/* Multi-Store Comparison Table */
.price-comparison-card {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 24px 0;
}
.price-comparison-header {
  background: #f1f5f9;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
}
.store-compare-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
}
.store-compare-row:last-child { border-bottom: 0; }
.store-compare-name { font-weight: 700; color: var(--ink); }
.store-compare-badge {
  font-size: 10px;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 6px;
  border-radius: var(--radius-full);
  margin-left: 6px;
}
.store-compare-price { font-weight: 800; }
.store-compare-btn {
  background: var(--ink);
  color: #ffffff;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
}

/* Specs Table */
.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin: 20px 0;
}
.specs-table tr { border-bottom: 1px solid var(--line); }
.specs-table td { padding: 10px 14px; }
.specs-table td:first-child { font-weight: 700; color: var(--muted); width: 35%; }
.specs-table td:last-child { color: var(--ink); font-weight: 600; }

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

/* Admin Dashboard Suite */
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}
.admin-sidebar {
  width: 260px;
  background: #0f172a;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #1e293b;
}
.admin-sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #1e293b;
}
.admin-nav {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.admin-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  color: #94a3b8;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  text-align: left;
}
.admin-nav-item:hover, .admin-nav-item.active {
  background: #1e293b;
  color: #ffffff;
}
.admin-nav-badge {
  background: var(--accent);
  color: #ffffff;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  font-weight: 800;
}
.admin-main {
  flex: 1;
  padding: 32px 36px;
  overflow-y: auto;
}
@media (max-width: 900px) {
  .admin-shell { flex-direction: column; }
  .admin-sidebar { width: 100%; }
  .admin-main { padding: 20px 16px; }
}

/* Stat Cards */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}
.admin-stat-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.admin-stat-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--muted);
  text-transform: uppercase;
}
.admin-stat-value {
  font-size: 32px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -1px;
  margin: 6px 0;
}
.admin-stat-trend {
  font-size: 11px;
  color: var(--emerald);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Admin Table */
.admin-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.admin-table th {
  background: #f8fafc;
  padding: 12px 16px;
  text-align: left;
  font-weight: 700;
  color: var(--muted);
  border-bottom: 1px solid var(--line);
}
.admin-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
}
.admin-table tr:last-child td { border-bottom: 0; }
.admin-table tr:hover td { background: #f8fafc; }

/* Status Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
}
.badge-active { background: var(--emerald-soft); color: var(--emerald); }
.badge-inactive { background: #f1f5f9; color: var(--muted); }
.badge-pending { background: var(--amber-soft); color: var(--amber); }

/* Form Controls */
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 6px;
}
.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--ink);
  background: #ffffff;
  outline: none;
  transition: border-color 0.15s;
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  border-color: var(--accent);
}

.alert-box {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}
.alert-success { background: var(--emerald-soft); color: var(--emerald); border: 1px solid #a7f3d0; }
.alert-error { background: #ffe4e6; color: #be123c; border: 1px solid #fecdd3; }
`;
