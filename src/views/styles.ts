export const storefrontCss = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --ink: #0f172a;
  --ink-secondary: #334155;
  --muted: #64748b;
  --line: #e2e8f0;
  --line-subtle: #f1f5f9;
  --bg-alt: #f1f5f9;
  --surface: #ffffff;
  --accent: #dc2626;
  --accent-hover: #b91c1c;
  --accent-soft: rgba(220, 38, 38, 0.08);
  --emerald: #059669;
  --emerald-soft: #d1fae5;
  --amber: #d97706;
  --amber-soft: #fef3c7;
  --blue: #2563eb;
  --blue-soft: #dbeafe;
  --bg: #f4f6f9;
  --card-bg: #ffffff;
  --primary: #0f172a;
  --primary-hover: #1e293b;
  --btn-primary-bg: #0f172a;
  --btn-primary-color: #ffffff;
  --btn-secondary-bg: #ffffff;
  --btn-secondary-color: #0f172a;
  --btn-secondary-border: #cbd5e1;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px -2px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 24px -4px rgba(0,0,0,0.08), 0 4px 8px -4px rgba(0,0,0,0.04);
  --shadow-xl: 0 24px 40px -8px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06);
  --shadow-card: 0 2px 8px 0 rgba(15,23,42,0.06);
  --font-main: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

[data-theme="dark"] {
  --ink: #f8fafc;
  --ink-secondary: #cbd5e1;
  --muted: #94a3b8;
  --line: #1e293b;
  --line-subtle: #131d31;
  --bg-alt: #0d1526;
  --surface: #111827;
  --accent: #ef4444;
  --accent-hover: #f87171;
  --accent-soft: rgba(239, 68, 68, 0.15);
  --emerald: #10b981;
  --emerald-soft: rgba(16, 185, 129, 0.15);
  --amber: #f59e0b;
  --amber-soft: rgba(245, 158, 11, 0.15);
  --blue: #3b82f6;
  --blue-soft: rgba(59, 130, 246, 0.15);
  --bg: #090e17;
  --card-bg: #111827;
  --primary: #f8fafc;
  --primary-hover: #e2e8f0;
  --btn-primary-bg: #2563eb;
  --btn-primary-color: #ffffff;
  --btn-secondary-bg: #1e293b;
  --btn-secondary-color: #f8fafc;
  --btn-secondary-border: #334155;
  --shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.4);
  --shadow-md: 0 4px 12px -2px rgba(0,0,0,0.5);
  --shadow-lg: 0 12px 24px -4px rgba(0,0,0,0.6);
  --shadow-xl: 0 24px 40px -8px rgba(0,0,0,0.7);
  --shadow-card: 0 2px 8px 0 rgba(0,0,0,0.4);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html {
  overflow-x: clip;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
  box-sizing: border-box;
}

body {
  overflow-x: clip;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-main, 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  padding-bottom: 70px;
}

.store-page {
  overflow-x: clip;
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
  position: relative;
}

@media (min-width: 768px) {
  body { padding-bottom: 0; }
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
button { font-family: inherit; cursor: pointer; }

.store-shell {
  width: min(1200px, calc(100% - 32px));
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 640px) {
  .store-shell {
    width: calc(100% - 20px);
  }
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
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 1px 0 0 rgba(15, 23, 42, 0.04), 0 4px 16px -4px rgba(15, 23, 42, 0.04);
}
[data-theme="dark"] .store-header {
  background: rgba(8, 13, 23, 0.97);
  border-bottom-color: rgba(255,255,255,0.06);
}

/* Tier 1: Main Header Row */
.store-header-main {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.store-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  min-width: max-content;
  text-decoration: none;
  flex-shrink: 0;
}
.store-logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0f172a 0%, #dc2626 100%);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: -1px;
  flex-shrink: 0;
}
.store-brand > span:last-child {
  display: flex;
  flex-direction: column;
}
.store-brand strong {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.1;
}
.store-brand small {
  font-size: 8.5px;
  letter-spacing: 2px;
  color: var(--muted);
  font-weight: 700;
  margin-top: 2px;
  text-transform: uppercase;
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
  gap: 6px;
  flex-shrink: 0;
}
.store-admin-link {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-secondary);
  background: var(--line-subtle);
  border: 1px solid var(--line);
  padding: 7px 12px;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: -0.2px;
}
.store-admin-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}
.store-menu {
  display: none;
  border: 1px solid var(--line);
  background: var(--surface);
  padding: 7px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.store-menu span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--ink);
  margin: 4px 0;
  border-radius: 2px;
  transition: transform 0.2s;
}

/* Currency dropdown (compact, NPR default) */
.currency-dropdown-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.currency-dropdown {
  appearance: none;
  -webkit-appearance: none;
  background: var(--line-subtle);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-main);
  padding: 5px 24px 5px 10px;
  height: 34px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
}
.currency-dropdown:focus {
  border-color: var(--accent);
}
[data-theme="dark"] .currency-dropdown {
  background-color: var(--line-subtle);
  color: var(--ink);
  border-color: var(--line);
}

/* Theme & Wishlist buttons */
.theme-toggle-btn, .wishlist-btn-header {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  border: 1px solid var(--line);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}
.theme-toggle-btn:hover, .wishlist-btn-header:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.wishlist-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--surface);
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
  gap: 4px;
}
.nav-pill {
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  transition: all 0.15s ease;
  background: transparent;
  border: 1px solid transparent;
}
.nav-pill:hover {
  color: var(--ink);
  background: var(--line-subtle);
  border-color: var(--line);
}
.nav-pill.nav-pill-active {
  color: #ffffff;
  background: var(--ink);
  border-color: var(--ink);
  font-weight: 700;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.15);
}
[data-theme="dark"] .nav-pill {
  color: #f1f5f9;
}
[data-theme="dark"] .nav-pill:hover {
  color: #ffffff;
  background: #1e293b;
  border-color: #334155;
}
[data-theme="dark"] .nav-pill.nav-pill-active {
  color: #ffffff;
  background: #2563eb;
  border-color: #2563eb;
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
  font-size: 11.5px;
  font-weight: 700;
  color: #065f46;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}
[data-theme="dark"] .nav-highlight-item {
  color: #34d399;
  background: rgba(16, 185, 129, 0.18);
  border-color: rgba(52, 211, 153, 0.35);
}

/* Mobile Navigation Drawer */
.mobile-drawer-backdrop {
  display: none !important;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  z-index: 9998;
  backdrop-filter: blur(4px);
}
.mobile-drawer-backdrop.open { 
  display: block !important; 
}
.mobile-drawer {
  display: none !important;
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  max-width: 320px;
  height: 100vh;
  height: 100dvh;
  background: var(--surface);
  color: var(--ink);
  z-index: 9999;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.35);
  flex-direction: column;
  overflow-y: auto;
}
.mobile-drawer.open {
  display: flex !important;
  animation: drawerSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes drawerSlideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@media (min-width: 769px) {
  .mobile-drawer,
  .mobile-drawer-backdrop {
    display: none !important;
  }
}
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
  color: var(--ink);
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
}
.mobile-drawer-close:hover {
  background: var(--line-subtle);
}
.mobile-drawer-content { padding: 20px; }
.mobile-drawer-label {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--ink-secondary);
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
  font-weight: 600;
  color: var(--ink);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.15s ease;
}
.mobile-nav-links a:hover {
  background: var(--line-subtle);
  color: var(--ink);
}
.mobile-nav-links a.active {
  background: var(--ink);
  color: #ffffff;
  font-weight: 700;
}
[data-theme="dark"] .mobile-nav-links a.active {
  background: #2563eb;
  color: #ffffff;
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
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  background: var(--line-subtle);
  border: 1px solid var(--line);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
}
.category-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.category-row::-webkit-scrollbar {
  display: none;
}
.category-chip {
  background: var(--surface);
  border: 1.5px solid var(--line);
  color: var(--ink);
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  transition: all 0.15s ease;
  text-decoration: none;
}
.category-chip:hover {
  border-color: var(--ink);
  color: var(--ink);
  background: var(--bg-alt);
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);
}
.category-chip.active {
  background: var(--ink);
  border-color: var(--ink);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.18);
}
[data-theme="dark"] .category-chip {
  background: #111827;
  border-color: #334155;
  color: #f8fafc;
}
[data-theme="dark"] .category-chip:hover {
  border-color: #64748b;
  background: #1e293b;
  color: #ffffff;
}
[data-theme="dark"] .category-chip.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

/* Quick Filter & Sort Controls */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
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
  background: var(--surface);
  border: 1.5px solid var(--line);
  color: var(--ink);
  font-size: 12.5px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.filter-pill:hover {
  border-color: var(--ink);
  color: var(--ink);
  background: var(--bg-alt);
}
.filter-pill.active {
  background: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
  font-weight: 700;
}
[data-theme="dark"] .filter-pill {
  background: #111827;
  border-color: #334155;
  color: #f8fafc;
}
[data-theme="dark"] .filter-pill:hover {
  border-color: #64748b;
  background: #1e293b;
}
[data-theme="dark"] .filter-pill.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}
@media (max-width: 540px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

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

/* Empty State */
.store-empty {
  background: var(--card-bg);
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
  background: var(--btn-primary-bg);
  color: var(--btn-primary-color);
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
  color: #ffffff;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--btn-secondary-bg) !important;
  color: var(--btn-secondary-color) !important;
  border: 1px solid var(--btn-secondary-border) !important;
  padding: 9px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}
.btn-secondary:hover {
  background: var(--line) !important;
  color: var(--ink) !important;
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
  grid-template-columns: minmax(320px, 460px) 1fr;
  gap: 36px;
  margin-bottom: 36px;
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

/* ==========================================================================
   2026 Executive Management Portal Suite
   ========================================================================== */
.admin-shell {
  display: flex; overflow-x: hidden;
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
  overflow-y: auto; overflow-x: hidden;
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
  flex: 1; min-width: 0;
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
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}

/* Stat Cards: 2026 Mesh Glass */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}
.admin-stat-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
  border-radius: 18px;
  padding: 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
}
.admin-stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
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
  background: var(--card-bg);
  color: var(--ink);
  outline: none;
  transition: all 0.2s;
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
  background: var(--card-bg);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}

/* Admin Card & Table */
.admin-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}
.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;
}
.admin-table th {
  background: var(--line-subtle);
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
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  vertical-align: middle;
}
.admin-table tr:hover td {
  background: var(--line-subtle);
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
.badge-inactive { background: var(--line-subtle); color: var(--muted); }
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
  background: var(--card-bg);
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
  margin: 48px 0;
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
  background: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  border-color: var(--btn-primary-bg);
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
  background: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  padding: 9px 16px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}
.widget-cta-btn:hover {
  background: var(--accent);
  color: #ffffff;
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
  max-width: 700px;
  margin: 0 auto;
}
.directory-hero-title {
  font-size: clamp(24px, 3.2vw, 34px);
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -1px;
  margin: 10px 0;
}
.directory-hero-subtitle {
  font-size: 14.5px;
  color: var(--ink-secondary);
  line-height: 1.6;
}
.stores-directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
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
.store-card-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.store-verified-pill {
  font-size: 10.5px;
  font-weight: 800;
  color: var(--emerald);
  background: var(--emerald-soft);
  padding: 3px 8px;
  border-radius: var(--radius-full);
}
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
.store-card-name {
  font-size: 18px;
  font-weight: 900;
  color: var(--ink);
  margin-bottom: 8px;
}
.store-card-name a { color: inherit; text-decoration: none; }
.store-card-name a:hover { color: var(--accent); }
.store-card-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 18px;
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

/* ============================================================
   FULL-PAGE ARTICLE EDITOR
   ============================================================ */
.editor-shell { min-height: 100vh; background: var(--bg); }
.editor-topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  background: var(--card-bg); border-bottom: 1px solid var(--line);
  padding: 10px 24px; box-shadow: var(--shadow-sm);
}
.editor-topbar-left { display: flex; align-items: center; gap: 16px; }
.editor-back-btn {
  font-size: 13px; font-weight: 700; color: var(--accent);
  text-decoration: none; padding: 6px 12px; border-radius: 6px;
  border: 1px solid var(--line); background: var(--card-bg);
  transition: all 0.15s;
}
.editor-back-btn:hover { background: var(--accent-soft); }
.editor-topbar-title { font-size: 16px; font-weight: 800; color: var(--ink); margin: 0; }
.editor-topbar-right { display: flex; align-items: center; gap: 10px; }
.editor-preview-link {
  font-size: 12px; font-weight: 700; color: var(--muted);
  text-decoration: none; padding: 6px 12px; border-radius: 6px;
  border: 1px solid var(--line); transition: all 0.15s;
}
.editor-preview-link:hover { color: var(--ink); border-color: var(--ink); }
.editor-save-btn {
  background: var(--accent); color: #fff; border: none;
  padding: 8px 20px; border-radius: 8px; font-weight: 800;
  font-size: 13px; cursor: pointer; transition: all 0.15s;
}
.editor-save-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

.editor-meta-row { padding: 20px 24px 0; }
.editor-meta-full { margin-bottom: 16px; }
.editor-title-input {
  width: 100%; padding: 12px 16px; font-size: 22px; font-weight: 800;
  border: 2px solid var(--line); border-radius: 10px; color: var(--ink);
  background: var(--card-bg); transition: border-color 0.2s;
  font-family: inherit;
}
.editor-title-input:focus { border-color: var(--accent); outline: none; }
.editor-meta-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px;
}
.editor-label {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11px; font-weight: 800; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
}
.editor-input, .editor-select, .editor-slug-input {
  width: 100%; padding: 8px 12px; font-size: 13px; border: 1px solid var(--line);
  border-radius: 8px; color: var(--ink); background: var(--card-bg);
  font-family: inherit; transition: border-color 0.2s;
}
.editor-input:focus, .editor-select:focus, .editor-slug-input:focus,
.editor-seo-textarea:focus { border-color: var(--accent); outline: none; }
.editor-slug-wrap {
  display: flex; align-items: center; border: 1px solid var(--line);
  border-radius: 8px; overflow: hidden; background: var(--card-bg);
}
.editor-slug-prefix {
  padding: 8px 10px; font-size: 12px; font-weight: 700;
  color: var(--muted); background: var(--line-subtle);
  border-right: 1px solid var(--line); white-space: nowrap;
}
.editor-slug-wrap .editor-slug-input { border: none; border-radius: 0; }

.editor-body {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  margin: 16px 24px; border: 1px solid var(--line); border-radius: 12px;
  overflow: hidden; background: var(--card-bg); min-height: 500px;
}
.editor-pane-left {
  display: flex; flex-direction: column;
  border-right: 1px solid var(--line);
}
.editor-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 3px;
  padding: 8px 12px; background: var(--line-subtle);
  border-bottom: 1px solid var(--line);
}
.editor-toolbar-label {
  font-size: 9px; font-weight: 800; color: var(--muted);
  letter-spacing: 0.5px; margin-right: 6px;
}
.editor-tb-btn {
  padding: 4px 8px; font-size: 11px; font-weight: 700;
  border: 1px solid var(--line); border-radius: 5px;
  background: var(--card-bg); color: var(--ink); cursor: pointer;
  transition: all 0.15s; white-space: nowrap;
}
.editor-tb-btn:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
.editor-tb-accent { color: var(--accent); border-color: var(--accent-soft); }
.editor-tb-accent:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
.editor-tb-sep { width: 1px; height: 20px; background: var(--line); margin: 0 4px; }
.editor-textarea {
  flex: 1; width: 100%; padding: 16px; font-size: 13.5px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  line-height: 1.65; border: none; resize: none; color: var(--ink);
  background: var(--card-bg); min-height: 400px;
}
.editor-textarea:focus { outline: none; }
.editor-textarea::placeholder { color: var(--muted); opacity: 0.6; }
.editor-content-stats {
  display: flex; gap: 16px; padding: 8px 16px;
  border-top: 1px solid var(--line); background: var(--line-subtle);
  font-size: 11px; font-weight: 700; color: var(--muted);
}
.editor-pane-right { display: flex; flex-direction: column; overflow: hidden; }
.editor-preview-header {
  padding: 8px 16px; background: var(--line-subtle);
  border-bottom: 1px solid var(--line);
  font-size: 10px; font-weight: 800; color: var(--accent);
  letter-spacing: 0.8px; text-transform: uppercase;
}
.editor-preview-body {
  flex: 1; padding: 20px; overflow-y: auto;
  max-height: 600px; font-family: inherit;
}

.editor-seo-panel {
  margin: 0 24px 16px; border: 1px solid var(--line);
  border-radius: 12px; overflow: hidden; background: var(--card-bg);
}
.editor-seo-header {
  padding: 10px 16px; background: var(--line-subtle);
  border-bottom: 1px solid var(--line);
  font-size: 12px; font-weight: 800; color: var(--ink);
}
.editor-seo-body { padding: 16px; }
.editor-seo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.editor-seo-inputs { display: flex; flex-direction: column; gap: 12px; }
.editor-field { display: flex; flex-direction: column; }
.editor-seo-textarea { resize: vertical; }
.editor-char-count { font-size: 10px; font-weight: 700; color: var(--muted); }
.editor-char-count.good { color: var(--emerald); }
.editor-char-count.over { color: #dc2626; }

.editor-serp-preview { padding-top: 8px; }
.editor-serp-header {
  font-size: 10px; font-weight: 800; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
}
.editor-serp-card {
  border: 1px solid var(--line); border-radius: 10px;
  padding: 16px 18px; background: #fff;
}
.serp-url {
  font-size: 12px; color: #202124; display: flex;
  align-items: center; gap: 6px; margin-bottom: 4px;
}
.serp-favicon { font-size: 10px; }
.serp-title {
  font-size: 18px; font-weight: 400; color: #1a0dab;
  line-height: 1.3; margin-bottom: 4px; cursor: pointer;
}
.serp-title:hover { text-decoration: underline; }
.serp-description {
  font-size: 13px; color: #4d5156; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; overflow: hidden;
}

.editor-excerpt-panel {
  margin: 0 24px 16px; background: var(--card-bg);
  border: 1px solid var(--line); border-radius: 12px; padding: 16px;
}
.editor-publish-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px 24px; flex-wrap: wrap; gap: 12px;
}
.editor-publish-options { display: flex; gap: 20px; }
.editor-checkbox-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700; color: var(--ink); cursor: pointer;
}
.editor-checkbox-label input { width: 16px; height: 16px; cursor: pointer; }
.editor-publish-actions { display: flex; gap: 10px; }
.editor-cancel-btn {
  padding: 8px 20px; font-size: 13px; font-weight: 700;
  border: 1px solid var(--line); border-radius: 8px;
  color: var(--muted); text-decoration: none; background: var(--card-bg);
  cursor: pointer; transition: all 0.15s;
}
.editor-cancel-btn:hover { color: var(--ink); border-color: var(--ink); }

@media (max-width: 900px) {
  .editor-body { grid-template-columns: 1fr; }
  .editor-pane-left { border-right: none; border-bottom: 1px solid var(--line); }
  .editor-meta-grid { grid-template-columns: 1fr 1fr; }
  .editor-seo-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .editor-meta-grid { grid-template-columns: 1fr; }
  .editor-topbar { flex-direction: column; gap: 8px; padding: 10px 16px; }
  .editor-topbar-left, .editor-topbar-right { width: 100%; justify-content: center; }
  .editor-body, .editor-seo-panel, .editor-excerpt-panel { margin-left: 12px; margin-right: 12px; }
}

/* ============================================================
   HOMEPAGE: TRENDING PRODUCTS SECTION
   ============================================================ */
.trending-section { padding: 36px 0 20px; }
.trending-section .section-heading { margin-bottom: 20px; }
.trending-scroll {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.trending-card {
  background: var(--card-bg); border: 1px solid var(--line);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: all 0.2s; position: relative;
}
.trending-card:hover { border-color: var(--accent); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.trending-card-image {
  width: 100%; height: 180px; object-fit: contain;
  background: var(--line-subtle); padding: 12px;
}
.trending-card-body { padding: 14px 16px; }
.trending-card-badge {
  position: absolute; top: 10px; left: 10px;
  font-size: 10px; font-weight: 800; background: var(--accent);
  color: #fff; padding: 3px 8px; border-radius: 6px;
}
.trending-card-title {
  font-size: 14px; font-weight: 800; color: var(--ink);
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
  margin-bottom: 6px; line-height: 1.3;
}
.trending-card-meta {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 8px;
}
.trending-card-price { font-size: 16px; font-weight: 900; color: var(--accent); }
.trending-card-store {
  font-size: 10px; font-weight: 700; color: var(--muted);
  background: var(--line-subtle); padding: 2px 8px; border-radius: 4px;
}
.trending-card-rating {
  font-size: 12px; font-weight: 700; color: var(--amber);
  margin-bottom: 10px;
}
.trending-card-cta {
  display: block; width: 100%; text-align: center;
  background: var(--accent); color: #fff; padding: 8px;
  border-radius: 8px; font-size: 12px; font-weight: 800;
  text-decoration: none; transition: all 0.15s;
}
.trending-card-cta:hover { background: var(--accent-hover); }

@media (max-width: 900px) { .trending-scroll { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .trending-scroll { grid-template-columns: 1fr; } }

/* ============================================================
   HOMEPAGE: RECENT BLOG POSTS STRIP
   ============================================================ */
.blog-strip-section { padding: 36px 0; }
.blog-strip-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
.blog-strip-card {
  background: var(--card-bg); border: 1px solid var(--line);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: all 0.2s; text-decoration: none; color: inherit;
}
.blog-strip-card:hover { border-color: var(--accent); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.blog-strip-cover {
  width: 100%; height: 160px; object-fit: cover;
  border-bottom: 1px solid var(--line);
}
.blog-strip-body { padding: 14px 16px; }
.blog-strip-cat {
  font-size: 10px; font-weight: 800; color: var(--accent);
  text-transform: uppercase; letter-spacing: 0.5px;
  background: var(--accent-soft); padding: 2px 8px;
  border-radius: 4px; display: inline-block; margin-bottom: 6px;
}
.blog-strip-title {
  font-size: 15px; font-weight: 800; color: var(--ink);
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
  margin-bottom: 6px; line-height: 1.35;
}
.blog-strip-meta {
  font-size: 11px; color: var(--muted); font-weight: 600;
  margin-bottom: 8px;
}
.blog-strip-excerpt {
  font-size: 12.5px; color: var(--ink-secondary); line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; overflow: hidden;
  margin-bottom: 10px;
}
.blog-strip-link {
  font-size: 12px; font-weight: 800; color: var(--accent);
  text-decoration: none;
}
.blog-strip-link:hover { text-decoration: underline; }

@media (max-width: 768px) { .blog-strip-grid { grid-template-columns: 1fr; } }

/* ============================================================
   HOMEPAGE: POPULAR BRANDS STRIP
   ============================================================ */
.brands-strip-section { padding: 24px 0 36px; }
.brands-strip-scroll {
  display: flex; gap: 16px; overflow-x: auto;
  padding-bottom: 8px; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.brands-strip-scroll::-webkit-scrollbar { height: 4px; }
.brands-strip-scroll::-webkit-scrollbar-thumb { background: var(--line); border-radius: 2px; }
.brand-strip-item {
  flex: 0 0 auto; min-width: 140px;
  background: var(--card-bg); border: 1px solid var(--line);
  border-radius: var(--radius-lg); padding: 16px 20px;
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; text-decoration: none; color: var(--ink);
  transition: all 0.2s; scroll-snap-align: start;
}
.brand-strip-item:hover { border-color: var(--accent); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
.brand-strip-logo {
  width: 48px; height: 48px; border-radius: 10px;
  object-fit: contain; border: 1px solid var(--line);
  padding: 4px; background: #fff;
}
.brand-strip-placeholder {
  width: 48px; height: 48px; border-radius: 10px;
  background: var(--line-subtle); display: grid; place-items: center;
  font-weight: 900; font-size: 16px; color: var(--ink);
}
.brand-strip-name {
  font-size: 12px; font-weight: 800; color: var(--ink);
  text-align: center; white-space: nowrap;
}
.brand-strip-origin {
  font-size: 10px; font-weight: 600; color: var(--muted);
}

/* ============================================================
   HOMEPAGE: NEWSLETTER SIGNUP
   ============================================================ */
.newsletter-section {
  margin: 24px 0 32px;
  background: linear-gradient(135deg, var(--accent), #7c3aed);
  border-radius: var(--radius-xl); padding: 40px 32px;
  text-align: center; color: #fff; position: relative;
  overflow: hidden;
}
.newsletter-section::before {
  content: ''; position: absolute; top: -40px; right: -40px;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
}
.newsletter-section::after {
  content: ''; position: absolute; bottom: -60px; left: -20px;
  width: 160px; height: 160px; border-radius: 50%;
  background: rgba(255,255,255,0.05);
}
.newsletter-title {
  font-size: 26px; font-weight: 900; margin-bottom: 8px;
  position: relative; z-index: 1;
}
.newsletter-subtitle {
  font-size: 14px; font-weight: 500; opacity: 0.9;
  margin-bottom: 24px; max-width: 500px; margin-left: auto;
  margin-right: auto; line-height: 1.5; position: relative; z-index: 1;
}
.newsletter-form {
  display: flex; gap: 10px; justify-content: center;
  max-width: 480px; margin: 0 auto; position: relative; z-index: 1;
}
.newsletter-email {
  flex: 1; padding: 12px 16px; font-size: 14px;
  border: 2px solid rgba(255,255,255,0.3); border-radius: 10px;
  background: rgba(255,255,255,0.15); color: #fff;
  font-family: inherit; backdrop-filter: blur(4px);
}
.newsletter-email::placeholder { color: rgba(255,255,255,0.7); }
.newsletter-email:focus { outline: none; border-color: #fff; background: rgba(255,255,255,0.2); }
.newsletter-submit {
  padding: 12px 24px; font-size: 14px; font-weight: 800;
  background: #fff; color: var(--accent); border: none;
  border-radius: 10px; cursor: pointer; transition: all 0.15s;
  white-space: nowrap;
}
.newsletter-submit:hover { background: #f1f5f9; transform: translateY(-1px); }
.newsletter-privacy {
  font-size: 11px; opacity: 0.7; margin-top: 14px;
  position: relative; z-index: 1;
}

@media (max-width: 500px) {
  .newsletter-section { padding: 28px 20px; }
  .newsletter-title { font-size: 20px; }
  .newsletter-form { flex-direction: column; }
}

`;
