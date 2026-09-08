export const baseCss = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap');

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
  --bg: #f8fafc;
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
  --radius-lg: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px -2px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 24px -4px rgba(0,0,0,0.08), 0 4px 8px -4px rgba(0,0,0,0.04);
  --shadow-xl: 0 24px 40px -8px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06);
  --shadow-card: 0 2px 8px 0 rgba(15,23,42,0.06);
  --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
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
  font-family: var(--font-main, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  font-size: 15.5px;
  line-height: 1.65;
  letter-spacing: -0.012em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  padding-bottom: 70px;
}

/* Universal Typography Inheritance for Form Controls & Data Grids */
input, select, textarea, button, optgroup, table, th, td {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

p {
  line-height: 1.65;
  color: var(--ink-secondary);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display, var(--font-main));
  color: var(--ink);
  line-height: 1.3;
  letter-spacing: -0.022em;
  font-weight: 700;
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

/* Focused UI Element & Rigid Container System */
div.store-page > main,
div:nth-of-type(1) > main:nth-of-type(1) {
  display: block;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.store-shell,
main.store-shell {
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px !important;
  padding-right: 24px !important;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .store-shell,
  main.store-shell {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}

main.store-shell {
  padding-top: 28px;
  padding-bottom: 64px;
  min-height: calc(100vh - 360px);
}

@media (max-width: 768px) {
  main.store-shell {
    padding-top: 18px;
    padding-bottom: 80px;
  }
}

/* Announcement Topbar */
.store-topbar {
  background: #0f172a;
  color: #ffffff;
  font-size: 12.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
[data-theme="dark"] .store-topbar {
  background: #020617;
  border-bottom-color: #1e293b;
}
.store-topbar-inner {
  min-height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 6px;
  padding-bottom: 6px;
}
.store-topbar-inner > span {
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.2px;
}
.store-topbar-note {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #e2e8f0;
  font-weight: 600;
}
.topbar-badge {
  background: #dc2626;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px 9px;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.5px;
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
  position: relative;
}

/* Navigation Master Hubs */
.nav-strip-left-hubs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-categories-dropdown-wrap,
.nav-more-dropdown-wrap {
  position: relative;
}

.nav-smart-hub-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 15px;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  user-select: none;
}

.nav-hub-icon {
  font-size: 15px;
  line-height: 1;
}

.nav-hub-arrow {
  font-size: 11px;
  opacity: 0.7;
  transition: transform 0.2s ease;
}

.nav-categories-dropdown-wrap.open .nav-hub-arrow,
.nav-categories-dropdown-wrap:hover .nav-hub-arrow,
.nav-more-dropdown-wrap.open .nav-hub-arrow,
.nav-more-dropdown-wrap:hover .nav-hub-arrow {
  transform: rotate(180deg);
}

/* Category Hub Button (Solid High-Contrast) */
.nav-categories-hub-btn {
  background: var(--ink);
  color: var(--surface);
  border: 1px solid var(--ink);
}
.nav-categories-hub-btn:hover,
.nav-categories-dropdown-wrap.open .nav-categories-hub-btn {
  background: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
}
[data-theme="dark"] .nav-categories-hub-btn {
  background: #1e293b;
  color: #f8fafc;
  border-color: #334155;
}
[data-theme="dark"] .nav-categories-hub-btn:hover,
[data-theme="dark"] .nav-categories-dropdown-wrap.open .nav-categories-hub-btn {
  background: var(--accent);
  border-color: var(--accent);
}

/* Menu Hub Button (Subtle Outlined) */
.nav-menu-hub-btn {
  background: var(--line-subtle);
  color: var(--ink);
  border: 1px solid var(--line);
}
.nav-menu-hub-btn:hover,
.nav-more-dropdown-wrap.open .nav-menu-hub-btn {
  background: var(--ink);
  color: var(--surface);
  border-color: var(--ink);
}
[data-theme="dark"] .nav-menu-hub-btn {
  background: #1e293b;
  color: #cbd5e1;
  border-color: #334155;
}
[data-theme="dark"] .nav-menu-hub-btn:hover,
[data-theme="dark"] .nav-more-dropdown-wrap.open .nav-menu-hub-btn {
  background: #334155;
  color: #ffffff;
}

/* Hub 1: Categories Mega-Dropdown Menu */
.nav-categories-dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
  width: 380px;
  padding: 12px;
  display: none;
  z-index: 100;
  max-height: 460px;
  overflow-y: auto;
}
[data-theme="dark"] .nav-categories-dropdown-menu {
  background: #0f172a;
  border-color: #1e293b;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
}
.nav-categories-dropdown-wrap:hover .nav-categories-dropdown-menu,
.nav-categories-dropdown-wrap.open .nav-categories-dropdown-menu {
  display: block;
}

.nav-dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--muted);
  text-transform: uppercase;
  padding: 4px 8px 10px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 8px;
}
.nav-dropdown-badge {
  background: rgba(37, 99, 235, 0.1);
  color: var(--blue);
  padding: 2px 7px;
  border-radius: var(--radius-sm);
  font-size: 10.5px;
}

.nav-categories-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
}
.nav-category-card-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--ink);
  transition: all 0.15s ease;
}
.nav-category-card-item:hover,
.nav-category-card-item.active {
  background: var(--line-subtle);
  transform: translateX(3px);
}
.nav-cat-card-icon {
  font-size: 20px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.nav-cat-card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-cat-card-name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}
.nav-cat-card-desc {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.3;
}

/* Hub 2: Explore & Tools Menu Dropdown */
.nav-more-dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
  width: 320px;
  padding: 12px;
  display: none;
  z-index: 100;
  max-height: 460px;
  overflow-y: auto;
}
[data-theme="dark"] .nav-more-dropdown-menu {
  background: #0f172a;
  border-color: #1e293b;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
}
.nav-more-dropdown-wrap:hover .nav-more-dropdown-menu,
.nav-more-dropdown-wrap.open .nav-more-dropdown-menu {
  display: block;
}

.nav-menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-menu-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--ink);
  transition: all 0.15s ease;
}
.nav-menu-list-item:hover,
.nav-menu-list-item.active {
  background: var(--line-subtle);
  transform: translateX(3px);
}
.nav-menu-item-icon {
  font-size: 18px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.nav-menu-item-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.nav-menu-item-text strong {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
.nav-menu-item-text small {
  font-size: 11px;
  color: var(--muted);
}

/* Quick-Access Highlight Links */
.nav-strip-quick-links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}
.nav-quick-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-secondary);
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.nav-quick-link:hover,
.nav-quick-link.active {
  background: var(--line-subtle);
  color: var(--ink);
}
.nav-quick-link-highlight {
  background: rgba(220, 38, 38, 0.08);
  color: var(--accent);
  border: 1px solid rgba(220, 38, 38, 0.2);
  font-weight: 700;
}
.nav-quick-link-highlight:hover {
  background: rgba(220, 38, 38, 0.14);
  color: var(--accent);
}
[data-theme="dark"] .nav-quick-link-highlight {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border-color: rgba(239, 68, 68, 0.3);
}

/* Mobile Drawer Structured Sections */
.mobile-drawer-section {
  display: flex;
  flex-direction: column;
}
.mobile-nav-categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;
}
.mobile-cat-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--line-subtle);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  transition: background 0.15s ease;
}
.mobile-cat-pill:hover,
.mobile-cat-pill.active {
  background: var(--ink);
  color: var(--surface);
  border-color: var(--ink);
}
.mobile-cat-pill-icon {
  font-size: 16px;
  flex-shrink: 0;
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
  background: radial-gradient(circle at 85% 20%, rgba(220, 38, 38, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 40%),
              var(--surface);
  border-bottom: 1px solid var(--line);
  padding: 48px 0;
}
[data-theme="dark"] .store-hero {
  background: radial-gradient(circle at 85% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(37, 99, 235, 0.08) 0%, transparent 40%),
              #090e17;
  border-bottom-color: #1e293b;
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
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--accent);
  text-transform: uppercase;
}
.hero-copy h1 {
  font-size: clamp(34px, 4.5vw, 56px);
  line-height: 1.08;
  letter-spacing: -1.5px;
  margin: 14px 0;
  font-weight: 900;
  color: var(--ink);
}
[data-theme="dark"] .hero-copy h1 {
  color: #f8fafc;
}
.hero-copy h1 em {
  font-style: normal;
  background: linear-gradient(135deg, var(--accent) 0%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-copy p {
  max-width: 560px;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 26px;
  font-weight: 450;
}
[data-theme="dark"] .hero-copy p {
  color: #cbd5e1;
}
.hero-search-wrapper {
  max-width: 560px;
  margin-bottom: 16px;
}
.hero-search {
  height: 54px;
  background: var(--surface);
  border: 2px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  transition: all 0.2s;
}
[data-theme="dark"] .hero-search {
  background: #111827;
  border-color: #334155;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
.hero-search:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.hero-search > span,
.hero-search-icon {
  font-size: 18px;
  color: var(--ink-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-theme="dark"] .hero-search-icon {
  color: #94a3b8;
}
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
[data-theme="dark"] .hero-search input {
  color: #f8fafc;
}
.hero-search input::placeholder {
  color: var(--muted);
}
[data-theme="dark"] .hero-search input::placeholder {
  color: #64748b;
}
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
.hero-tags span {
  color: var(--ink);
  font-weight: 700;
}
[data-theme="dark"] .hero-tags span {
  color: #cbd5e1;
}
.quick-tag {
  background: var(--line-subtle);
  color: var(--ink);
  border: 1px solid var(--line);
  padding: 4px 11px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
[data-theme="dark"] .quick-tag {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #334155;
}
.quick-tag:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
}
.hero-points {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  color: var(--ink);
  font-size: 13.5px;
  font-weight: 700;
  margin-top: 4px;
}
.hero-points span {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--ink);
}
.hero-point-icon {
  color: var(--emerald);
  flex-shrink: 0;
}
[data-theme="dark"] .hero-points,
[data-theme="dark"] .hero-points span {
  color: #f8fafc;
}
[data-theme="dark"] .hero-point-icon {
  color: #34d399;
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
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}
.trust-item:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
}
.trust-icon {
  font-size: 22px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--line-subtle);
  color: var(--accent);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.trust-text strong {
  display: block;
  font-size: 13.5px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 3px;
}
.trust-text span {
  font-size: 12px;
  color: var(--ink-secondary);
  line-height: 1.45;
  display: block;
}

/* Deals & Coupons Strip */
.coupons-section,
div:nth-of-type(1) > main#mainContent:nth-of-type(1) > section:nth-of-type(4) {
  margin: 36px auto 0;
  width: 100%;
}
.coupons-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}
.coupons-heading h3 {
  font-family: var(--font-display, var(--font-main));
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.01em;
}
.coupons-heading .coupons-hint {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--muted);
}
.coupons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.coupon-card {
  background: var(--card-bg);
  border: 1.5px dashed rgba(220, 38, 38, 0.35);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}
.coupon-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.coupon-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.coupon-info strong {
  display: block;
  font-family: var(--font-display, var(--font-main));
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: 0.04em;
  line-height: 1.3;
  word-break: break-all;
}
.coupon-info span {
  font-size: 12.5px;
  color: var(--ink-secondary);
  line-height: 1.45;
  display: block;
}
.copy-coupon-btn {
  background: var(--accent);
  color: #ffffff !important;
  border: 0;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.2);
}
.copy-coupon-btn:hover {
  background: var(--accent-hover);
  transform: scale(1.03);
  box-shadow: 0 3px 8px rgba(220, 38, 38, 0.3);
}
.copy-coupon-btn:active {
  transform: scale(0.97);
}

[data-theme="dark"] .coupon-card {
  background: #111827 !important;
  border: 1.5px dashed rgba(239, 68, 68, 0.45) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}
[data-theme="dark"] .coupon-card:hover {
  border-color: #ef4444 !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6) !important;
}
[data-theme="dark"] .coupon-info strong {
  color: #f8fafc !important;
}
[data-theme="dark"] .coupon-info span {
  color: #94a3b8 !important;
}
[data-theme="dark"] .copy-coupon-btn {
  background: #dc2626 !important;
  color: #ffffff !important;
}
[data-theme="dark"] .copy-coupon-btn:hover {
  background: #ef4444 !important;
}

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
  font-size: 13px;
  color: var(--ink);
  font-weight: 700;
}
.sort-controls label {
  color: var(--ink);
  font-weight: 700;
  font-size: 13px;
}
.sort-select {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: var(--radius-sm);
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.sort-select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
[data-theme="dark"] .sort-select {
  background: #1e293b;
  color: #f8fafc;
  border-color: #334155;
}
[data-theme="dark"] .sort-select option {
  background: #0f172a;
  color: #f8fafc;
}
[data-theme="dark"] .sort-controls label {
  color: #f8fafc;
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


`;
