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

[data-theme="dark"] {
  --ink: #f8fafc;
  --ink-secondary: #cbd5e1;
  --muted: #94a3b8;
  --line: #334155;
  --line-subtle: #1e293b;
  --accent: #f43f5e;
  --accent-hover: #fb7185;
  --accent-soft: rgba(244, 63, 94, 0.15);
  --emerald: #10b981;
  --emerald-soft: rgba(16, 185, 129, 0.15);
  --amber: #f59e0b;
  --amber-soft: rgba(245, 158, 11, 0.15);
  --blue: #3b82f6;
  --blue-soft: rgba(59, 130, 246, 0.15);
  --bg: #0b0f19;
  --card-bg: #111827;
  --primary: #f8fafc;
  --primary-hover: #e2e8f0;
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 8px -1px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 12px 20px -3px rgba(0, 0, 0, 0.7);
  --shadow-xl: 0 24px 30px -5px rgba(0, 0, 0, 0.8);
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
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
}
[data-theme="dark"] .store-header {
  background: rgba(15, 23, 42, 0.96);
}

/* Tier 1: Main Header Row */
.store-header-main {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.store-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  min-width: max-content;
  text-decoration: none;
  flex-shrink: 0;
}
.store-logo-mark {
  width: 42px;
  height: 42px;
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
  line-height: 1.1;
}
.store-brand small {
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--muted);
  font-weight: 700;
  margin-top: 2px;
}

/* Center Quick Search */
.store-header-search {
  flex: 1;
  max-width: 480px;
  margin: 0 16px;
}
.header-search-form {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.header-search-form .search-icon {
  position: absolute;
  left: 14px;
  font-size: 14px;
  color: var(--muted);
  pointer-events: none;
}
.header-search-input {
  width: 100%;
  padding: 10px 75px 10px 38px;
  border-radius: 9999px;
  border: 1px solid var(--line);
  background: var(--bg-alt);
  font-size: 13px;
  color: var(--ink);
  transition: all 0.2s ease;
  outline: none;
}
.header-search-input:focus {
  border-color: var(--accent);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.header-search-submit {
  position: absolute;
  right: 5px;
  background: var(--accent);
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}
.header-search-submit:hover {
  opacity: 0.9;
}

/* Header Action Utilities */
.store-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.store-admin-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 8px 14px;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  white-space: nowrap;
}
.store-admin-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--line-subtle);
}
.store-menu {
  display: none;
  border: 1px solid var(--line);
  background: var(--surface);
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

/* Tier 2: Dedicated Category Navigation Strip */
.store-nav-strip {
  border-top: 1px solid var(--line);
  background: var(--surface);
  padding: 4px 0;
}
[data-theme="dark"] .store-nav-strip {
  background: #0b1120;
}
.store-nav-strip-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.store-nav-scroll-wrapper {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2px 0;
  flex: 1;
}
.store-nav-scroll-wrapper::-webkit-scrollbar {
  display: none;
}
.store-nav-pills {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-pill {
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-secondary);
  text-decoration: none;
  transition: all 0.15s ease;
  background: transparent;
}
.nav-pill:hover {
  color: var(--accent);
  background: var(--line-subtle);
}
.nav-pill.nav-pill-active {
  color: #ffffff;
  background: var(--accent);
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(225, 29, 72, 0.3);
}
.nav-pill-icon {
  font-size: 15px;
}

/* Highlights on right side of nav strip */
.store-nav-highlights {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.nav-highlight-item {
  font-size: 11px;
  font-weight: 700;
  color: var(--emerald);
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 4px 10px;
  border-radius: 9999px;
  white-space: nowrap;
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

/* Product Card: 2026 Studio Gadget Showcase */
.product-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 30px -8px rgba(15, 23, 42, 0.12);
  border-color: rgba(225, 29, 72, 0.35);
}
[data-theme="dark"] .product-card:hover {
  box-shadow: 0 20px 30px -8px rgba(0, 0, 0, 0.6);
  border-color: var(--accent);
}

/* Studio Presentation Stage */
.product-card-top-stage {
  position: relative;
  background: radial-gradient(circle at 50% 35%, #ffffff 0%, #f1f5f9 100%);
  padding: 12px 14px 6px 14px;
  border-bottom: 1px solid var(--line-subtle);
  overflow: hidden;
}
[data-theme="dark"] .product-card-top-stage {
  background: radial-gradient(circle at 50% 35%, #1e293b 0%, #0f172a 100%);
}
.product-card-tag-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 8px;
  z-index: 2;
  position: relative;
}
.product-card-brand-tag {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--line);
}
[data-theme="dark"] .product-card-brand-tag {
  background: rgba(15, 23, 42, 0.9);
}
.product-card-badge {
  font-size: 10px;
  font-weight: 800;
  color: #ffffff;
  background: linear-gradient(135deg, #e11d48, #be123c);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 6px rgba(225, 29, 72, 0.3);
}
.product-card-store {
  font-size: 10px;
  font-weight: 700;
  color: var(--ink-secondary);
  background: rgba(255, 255, 255, 0.92);
  padding: 2px 7px;
  border-radius: var(--radius-full);
  border: 1px solid var(--line);
}
[data-theme="dark"] .product-card-store {
  background: rgba(15, 23, 42, 0.92);
}

.product-stage-img-wrap {
  width: 100%;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px;
}
.product-stage-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.12));
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover .product-stage-img {
  transform: scale(1.06) translateY(-4px);
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
.product-quick-wish-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  z-index: 3;
}
[data-theme="dark"] .product-quick-wish-btn {
  background: rgba(15, 23, 42, 0.9);
}
.product-quick-wish-btn:hover {
  transform: scale(1.15);
  background: #ffe4e6;
  border-color: #f43f5e;
}

/* Card Body */
.product-card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.product-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
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
  font-size: 11px;
}
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
}
.product-card:hover .product-name {
  color: var(--accent);
}

/* Micro Spec Pills */
.product-specs-chips {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.spec-pill-mini {
  font-size: 10px;
  font-weight: 600;
  background: var(--line-subtle);
  color: var(--ink-secondary);
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid var(--line);
}
.nepal-trust-strip-mini {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.nepal-compliance-tag {
  font-size: 10px;
  font-weight: 700;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

/* 0% EMI strip */
.product-card-emi-strip {
  margin-bottom: 12px;
}
.product-card-emi-tag {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.2);
  padding: 3px 8px;
  border-radius: 6px;
}

.product-card-bottom {
  margin-top: auto;
  padding-top: 12px;
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
  margin-bottom: 2px;
}
.original-price {
  font-size: 11px;
  color: var(--muted);
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
  font-size: 16px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.5px;
}
.product-buy {
  background: var(--ink);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}
.product-buy:hover {
  background: var(--accent);
  transform: translateY(-1px);
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

@media (max-width: 992px) {
  .store-header-search { display: none; }
  .store-nav-highlights { display: none; }
}

@media (max-width: 768px) {
  .store-admin-link span { display: none; }
  .store-admin-link { padding: 8px 10px; }
  .mobile-bottom-bar { display: block; }
  .store-menu { display: block; }
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

/* Card Quick Action Floating Circles (Positioned absolute so they NEVER shift the image) */
.card-actions-float {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 10;
  pointer-events: auto;
}
.btn-action-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(6px);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 0;
  color: var(--ink);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-action-circle:hover {
  transform: scale(1.15);
  background: #ffe4e6;
  border-color: #f43f5e;
}
[data-theme="dark"] .btn-action-circle {
  background: rgba(15, 23, 42, 0.9);
  border-color: var(--line);
  color: #ffffff;
}

/* Product Stage Image & Box for Product Detail */
.product-hero-stage {
  display: grid;
  grid-template-columns: minmax(320px, 460px) 1fr;
  gap: 36px;
  margin-bottom: 32px;
  align-items: start;
}
@media (max-width: 960px) {
  .product-hero-stage {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.product-hero-media {
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
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
  transition: all 0.2s;
}
.stage-wishlist-btn:hover {
  transform: scale(1.12);
  background: #ffe4e6;
  border-color: #f43f5e;
}
[data-theme="dark"] .stage-wishlist-btn {
  background: rgba(15, 23, 42, 0.95);
}
.stage-badges-wrap {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 5;
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

/* ==========================================================================
   2026 Executive Management Portal Suite
   ========================================================================== */
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
[data-theme="dark"] .admin-shell {
  background: #080c14;
}

/* Sidebar */
.admin-sidebar {
  width: 270px;
  background: #090d16;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #1e293b;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.admin-sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #1e293b;
  background: rgba(15, 23, 42, 0.6);
}
.admin-telemetry-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  margin-top: 10px;
}
.admin-telemetry-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulseDot 2s infinite;
}
@keyframes pulseDot {
  0% { opacity: 0.6; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.6; transform: scale(0.9); }
}

.admin-nav {
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}
.admin-nav-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.admin-nav-section-title {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #64748b;
  text-transform: uppercase;
  padding: 4px 12px;
  margin-bottom: 4px;
}
.admin-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  width: 100%;
  text-align: left;
  text-decoration: none;
}
.admin-nav-item:hover {
  background: rgba(30, 41, 59, 0.7);
  color: #f8fafc;
  transform: translateX(2px);
}
.admin-nav-item.active {
  background: linear-gradient(90deg, rgba(225, 29, 72, 0.15) 0%, rgba(225, 29, 72, 0.05) 100%);
  color: #ffffff;
  border-color: rgba(225, 29, 72, 0.3);
  font-weight: 700;
}
.admin-nav-badge {
  background: var(--accent);
  color: #ffffff;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.admin-main {
  flex: 1;
  padding: 32px 40px;
  overflow-y: auto;
  max-width: 1600px;
}
@media (max-width: 900px) {
  .admin-shell { flex-direction: column; }
  .admin-sidebar { width: 100%; height: auto; position: static; }
  .admin-main { padding: 20px 16px; }
}

/* 2026 Executive Top Telemetry Bar */
.admin-topbar-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
[data-theme="dark"] .admin-topbar-card {
  background: #111827;
  border-color: var(--line);
}

/* Stat Cards: 2026 Mesh Glass */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}
.admin-stat-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
}
.admin-stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.1);
}
[data-theme="dark"] .admin-stat-card {
  background: #111827;
  border-color: #1e293b;
}
.admin-stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.admin-stat-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--muted);
  text-transform: uppercase;
}
.admin-stat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.admin-stat-value {
  font-size: 34px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -1.5px;
  line-height: 1;
  margin-bottom: 10px;
}
.admin-stat-trend {
  font-size: 11px;
  color: var(--emerald);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 2026 Admin Toolbar */
.admin-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.admin-search-box {
  position: relative;
  flex: 1;
  max-width: 420px;
  min-width: 240px;
}
.admin-search-box input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1px solid var(--line);
  border-radius: 10px;
  font-size: 13px;
  background: #ffffff;
  color: var(--ink);
  outline: none;
  transition: all 0.2s;
}
[data-theme="dark"] .admin-search-box input {
  background: #111827;
}
.admin-search-box input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--muted);
  pointer-events: none;
}
.admin-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.admin-filter-select {
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #ffffff;
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}
[data-theme="dark"] .admin-filter-select {
  background: #111827;
}

/* Admin Card & Table */
.admin-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
[data-theme="dark"] .admin-card {
  background: #111827;
  border-color: #1e293b;
}
.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;
}
.admin-table th {
  background: var(--line-subtle, #f8fafc);
  padding: 14px 18px;
  text-align: left;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: var(--muted);
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.admin-table th:first-child {
  border-top-left-radius: 10px;
}
.admin-table th:last-child {
  border-top-right-radius: 10px;
}
.admin-table td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--line-subtle);
  color: var(--ink);
  vertical-align: middle;
}
.admin-table tr:hover td {
  background: rgba(241, 245, 249, 0.6);
}
[data-theme="dark"] .admin-table tr:hover td {
  background: rgba(30, 41, 59, 0.5);
}

/* Status Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
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

/* Admin Edit Modals */
.admin-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: none;
  place-items: center;
  z-index: 9999;
  padding: 20px;
  overflow-y: auto;
}
.admin-modal-backdrop.open {
  display: grid;
}
.admin-modal-content {
  background: var(--card-bg, #ffffff);
  color: var(--ink, #0f172a);
  border-radius: var(--radius-lg, 16px);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid var(--line);
  animation: adminModalIn 0.2s ease-out;
}
@keyframes adminModalIn {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.admin-modal-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.admin-modal-body {
  padding: 24px;
  overflow-y: auto;
}
.admin-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: var(--line-subtle, #f8fafc);
  border-radius: 0 0 var(--radius-lg, 16px) var(--radius-lg, 16px);
}

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
[data-theme="dark"] .trust-strip,
[data-theme="dark"] .cat-card,
[data-theme="dark"] .coupon-item,
[data-theme="dark"] .admin-card,
[data-theme="dark"] .admin-stat-card {
  background: var(--card-bg);
  border-color: var(--line);
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.wishlist-drawer-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}
.wishlist-drawer {
  position: fixed;
  top: 0;
  right: -420px;
  width: min(400px, 100vw);
  height: 100vh;
  background: var(--card-bg);
  color: var(--ink);
  z-index: 9999;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.wishlist-drawer.open {
  right: 0;
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border-top: 2px solid var(--accent);
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.2);
  z-index: 9990;
  transform: translateY(105%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.compare-dock.open {
  transform: translateY(0);
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

/* Nepal Shopping FAQ Accordion */
.faq-container {
  margin: 48px 0;
}
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
  margin-top: 16px;
}
@media (max-width: 640px) {
  .pros-cons-grid { grid-template-columns: 1fr; }
}
.pros-card {
  background: var(--emerald-soft);
  border: 1px solid #a7f3d0;
  border-radius: var(--radius-md);
  padding: 16px;
}
.cons-card {
  background: var(--accent-soft);
  border: 1px solid #fecdd3;
  border-radius: var(--radius-md);
  padding: 16px;
}
.pros-list, .cons-list {
  list-style: none;
  margin-top: 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pros-list li { color: #065f46; display: flex; gap: 6px; }
.cons-list li { color: #9f1239; display: flex; gap: 6px; }

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

/* ==========================================================================
   Editorial Tech Magazine & Buyer Guides Styles
   ========================================================================== */
.blog-index-wrapper {
  padding-top: 28px;
  padding-bottom: 60px;
}
.magazine-hero-header {
  text-align: center;
  max-width: 860px;
  margin: 0 auto 36px;
}
.magazine-hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(225, 29, 72, 0.08);
  color: var(--accent);
  border: 1px solid rgba(225, 29, 72, 0.2);
  padding: 4px 14px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
}
.magazine-hero-title {
  font-size: clamp(24px, 4vw, 38px);
  font-weight: 900;
  line-height: 1.22;
  color: var(--ink);
  letter-spacing: -0.025em;
  margin-bottom: 14px;
}
.magazine-hero-subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-secondary);
  margin-bottom: 24px;
}
.blog-category-nav {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.blog-cat-pill {
  padding: 7px 18px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 700;
  border: 1px solid var(--line);
  background: var(--card-bg);
  color: var(--ink-secondary);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.blog-cat-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
.blog-cat-pill-active {
  background: var(--accent);
  color: #ffffff !important;
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
}

/* Featured Story Card */
.magazine-featured-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 48px;
  transition: transform 0.25s, box-shadow 0.25s;
}
.magazine-featured-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
@media (max-width: 860px) {
  .magazine-featured-card {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
.featured-card-media {
  position: relative;
  overflow: hidden;
  min-height: 320px;
}
.featured-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  display: block;
}
.magazine-featured-card:hover .featured-card-img {
  transform: scale(1.03);
}
.featured-tag-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #e11d48, #be123c);
  color: #ffffff;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
.featured-card-content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.featured-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 12px;
}
.article-category-badge {
  color: var(--accent);
  background: rgba(225, 29, 72, 0.08);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: 11px;
  text-transform: uppercase;
}
.featured-card-title {
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 800;
  line-height: 1.28;
  margin-bottom: 14px;
}
.featured-card-title a {
  color: var(--ink);
  text-decoration: none;
  transition: color 0.15s;
}
.featured-card-title a:hover {
  color: var(--accent);
}
.featured-card-excerpt {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink-secondary);
  margin-bottom: 24px;
}
.featured-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--line-subtle);
  padding-top: 18px;
}
.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--line);
  display: grid;
  place-items: center;
  font-size: 18px;
}
.author-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
.author-role {
  font-size: 11px;
  color: var(--muted);
}
.read-featured-btn {
  background: var(--accent);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}
.read-featured-btn:hover {
  background: #be123c;
  transform: translateY(-1px);
}

/* Magazine Grid & Cards */
.magazine-section-header {
  margin-bottom: 24px;
}
.section-title-clean {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
}
.section-count {
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}
.magazine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}
.magazine-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}
.magazine-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.magazine-card-media {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.magazine-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
  display: block;
}
.magazine-card:hover .magazine-card-img {
  transform: scale(1.05);
}
.magazine-card-cat {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  backdrop-filter: blur(4px);
}
.magazine-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.magazine-card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 10px;
}
.magazine-card-title {
  font-size: 17px;
  font-weight: 800;
  line-height: 1.35;
  margin-bottom: 10px;
}
.magazine-card-title a {
  color: var(--ink);
  text-decoration: none;
  transition: color 0.15s;
}
.magazine-card-title a:hover {
  color: var(--accent);
}
.magazine-card-excerpt {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-secondary);
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.magazine-card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--line-subtle);
  padding-top: 14px;
}
.magazine-card-author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--ink-secondary);
  font-weight: 600;
}
.magazine-card-link {
  font-size: 12px;
  font-weight: 800;
  color: var(--accent);
  text-decoration: none;
}
.magazine-card-link:hover {
  text-decoration: underline;
}

/* Nepal Tech Intelligence Banner */
.nepal-tech-banner {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: var(--radius-lg);
  padding: 32px 36px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: var(--shadow-md);
  margin-top: 24px;
}
@media (max-width: 768px) {
  .nepal-tech-banner {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
}
.banner-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  color: #f59e0b;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.banner-content h3 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #ffffff;
}
.banner-content p {
  font-size: 13px;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 680px;
}
.banner-btn {
  background: #f59e0b;
  color: #0f172a;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s;
}
.banner-btn:hover {
  background: #fbbf24;
  transform: translateY(-2px);
}

/* ==========================================================================
   Article Detail View Styles
   ========================================================================== */
.article-reader-wrapper {
  padding-top: 24px;
  padding-bottom: 60px;
  max-width: 1100px;
  margin: 0 auto;
}
.article-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.article-breadcrumbs a {
  color: var(--muted);
  text-decoration: none;
}
.article-breadcrumbs a:hover {
  color: var(--accent);
}
.article-breadcrumbs .sep {
  color: var(--line);
}
.article-breadcrumbs .current {
  color: var(--ink);
  font-weight: 600;
}
.article-header {
  margin-bottom: 24px;
}
.article-header-cat {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.article-read-badge {
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
}
.article-verified-badge {
  font-size: 11px;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-weight: 700;
}
.article-headline {
  font-size: clamp(26px, 4vw, 40px);
  font-weight: 900;
  line-height: 1.22;
  color: var(--ink);
  letter-spacing: -0.025em;
  margin-bottom: 14px;
}
.article-deck {
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-secondary);
  margin-bottom: 20px;
}
.article-byline-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
  flex-wrap: wrap;
}
.author-block {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-avatar-large {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--line-subtle);
  display: grid;
  place-items: center;
  font-size: 20px;
}
.author-name-bold {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
}
.author-timestamp {
  font-size: 12px;
  color: var(--muted);
}
.article-share-strip {
  display: flex;
  align-items: center;
  gap: 8px;
}
.share-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}
.share-btn {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid var(--line);
  background: var(--card-bg);
  color: var(--ink);
  cursor: pointer;
  transition: all 0.15s;
}
.share-btn.whatsapp:hover {
  background: #25d366;
  color: #ffffff;
  border-color: #25d366;
}
.share-btn.facebook:hover {
  background: #1877f2;
  color: #ffffff;
  border-color: #1877f2;
}
.share-btn.copy:hover {
  background: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
}

.article-featured-media {
  margin-bottom: 36px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--line);
}
.article-hero-img {
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  display: block;
}
.article-media-caption {
  padding: 8px 16px;
  background: var(--card-bg);
  font-size: 12px;
  color: var(--muted);
  border-top: 1px solid var(--line-subtle);
}

/* 2-Column Article Reader Layout */
.article-columns-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 40px;
}
@media (max-width: 900px) {
  .article-columns-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
.article-main-content {
  min-width: 0;
}

/* Takeaways Callout */
.article-takeaways-box {
  background: rgba(245, 158, 11, 0.08);
  border-left: 4px solid var(--amber);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  padding: 18px 20px;
  margin-bottom: 28px;
}
.takeaways-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ink);
  margin-bottom: 10px;
}
.takeaways-list {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--ink-secondary);
}
.takeaways-list li {
  margin-bottom: 6px;
}

/* Rendered HTML Typography */
.article-rendered-body {
  font-size: 16px;
  line-height: 1.75;
  color: var(--ink);
}
.article-rendered-body p {
  margin-bottom: 20px;
}
.article-section-title {
  font-size: 24px;
  font-weight: 800;
  margin: 36px 0 16px;
  color: var(--ink);
  border-bottom: 2px solid var(--line-subtle);
  padding-bottom: 8px;
}
.article-subheading {
  font-size: 19px;
  font-weight: 800;
  margin: 28px 0 12px;
  color: var(--ink);
}
.article-bullet-list {
  padding-left: 22px;
  margin-bottom: 20px;
}
.article-bullet-list li {
  margin-bottom: 8px;
  line-height: 1.65;
}
.article-num-item {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  line-height: 1.65;
}
.num-bullet {
  color: var(--accent);
  font-size: 18px;
  line-height: 1.2;
}
.article-callout {
  margin: 24px 0;
  padding: 16px 20px;
  background: var(--line-subtle);
  border-left: 4px solid var(--accent);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
}

/* Embedded Deals Section inside Article */
.embedded-products-section {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin: 36px 0;
}
.embedded-products-title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--ink);
}
.embedded-products-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.embedded-product-card {
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--line-subtle);
  border-radius: var(--radius-md);
  padding: 12px;
  background: var(--background);
  transition: border-color 0.15s;
}
.embedded-product-card:hover {
  border-color: var(--accent);
}
.embedded-product-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  background: #ffffff;
}
.embedded-product-info {
  flex: 1;
  min-width: 0;
}
.embedded-product-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--emerald);
  text-transform: uppercase;
}
.embedded-product-name {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
  margin: 2px 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.embedded-product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  color: var(--accent);
}
.embedded-view-btn {
  background: var(--accent);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}

/* Author Signature & Nav Footer */
.author-signature-box {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin: 36px 0;
}
.sig-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--line);
  display: grid;
  place-items: center;
  font-size: 26px;
}
.sig-info h4 {
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 4px;
}
.sig-info p {
  font-size: 13px;
  color: var(--ink-secondary);
  line-height: 1.55;
  margin: 0;
}
.article-nav-footer {
  margin-top: 32px;
}
.back-to-blog-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  border: 1px solid var(--line);
  padding: 8px 18px;
  border-radius: var(--radius-full);
  background: var(--card-bg);
  transition: all 0.15s;
}
.back-to-blog-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Sidebar Widgets */
.article-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.sidebar-widget {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 20px;
}
.widget-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 14px;
}
.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toc-link {
  font-size: 13px;
  color: var(--ink-secondary);
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.15s;
}
.toc-link:hover {
  color: var(--accent);
}
.advisory-widget {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(225, 29, 72, 0.08));
  border-color: rgba(245, 158, 11, 0.3);
}
.advisory-badge {
  font-size: 10px;
  font-weight: 800;
  color: var(--amber);
  margin-bottom: 6px;
}
.advisory-widget h4 {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.advisory-widget p {
  font-size: 12px;
  line-height: 1.55;
  color: var(--ink-secondary);
  margin-bottom: 14px;
}
.advisory-widget code {
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}
.widget-cta-btn {
  display: block;
  text-align: center;
  background: var(--ink);
  color: #ffffff;
  padding: 9px 16px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}
.widget-cta-btn:hover {
  background: var(--accent);
}
.trending-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.trending-item {
  display: flex;
  gap: 12px;
  text-decoration: none;
  align-items: center;
}
.trending-img {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}
.trending-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.trending-item:hover .trending-title {
  color: var(--accent);
}
.trending-meta {
  font-size: 11px;
  color: var(--muted);
  margin-top: 4px;
}

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
.variant-mdms-tag {
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
  grid-template-columns: minmax(320px, 460px) 1fr;
  gap: 36px;
  margin-bottom: 32px;
  align-items: start;
}
@media (max-width: 960px) {
  .product-hero-stage {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* Left Showcase Gallery Stage */
.product-hero-media {
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

/* Nepal Trust Card */
.product-trust-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}
.trust-card-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.trust-card-item-icon {
  font-size: 20px;
  line-height: 1;
}
.trust-card-item-text strong {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: var(--ink);
}
.trust-card-item-text span {
  font-size: 11px;
  color: var(--muted);
}

/* Right Detail & Pricing Information */
.product-hero-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.product-hero-header h1 {
  font-size: clamp(24px, 3.2vw, 36px);
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--ink);
  line-height: 1.15;
  margin: 8px 0;
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
  background: var(--ink);
  color: #ffffff;
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
  background: var(--primary-hover);
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
