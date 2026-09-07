export const storefrontCss = `
:root {
  --ink: #111827;
  --muted: #667085;
  --line: #e7e9ee;
  --accent: #e11d48;
  --accent-hover: #be123c;
  --bg: #fafafa;
  --card-bg: #ffffff;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
.store-shell { width: min(1180px, calc(100% - 40px)); margin: auto; }

/* Topbar */
.store-topbar { background: #111827; color: #d1d5db; font-size: 12px; }
.store-topbar-inner { min-height: 34px; display: flex; justify-content: space-between; align-items: center; }
.store-topbar-note { color: #9ca3af; }

/* Header */
.store-header { position: sticky; top: 0; z-index: 40; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(14px); border-bottom: 1px solid #e5e7eb; }
.store-header-inner { min-height: 76px; display: flex; align-items: center; gap: 34px; }
.store-brand { display: flex; align-items: center; gap: 10px; min-width: max-content; color: #111827; }
.store-brand > span:last-child { display: flex; flex-direction: column; line-height: 1; }
.store-brand strong { font-size: 19px; letter-spacing: -0.5px; }
.store-brand small { font-size: 8px; letter-spacing: 1.6px; color: #98a2b3; margin-top: 5px; font-weight: 700; }
.store-logo, .store-logo-mark { width: 38px; height: 38px; border-radius: 11px; object-fit: cover; }
.store-logo-mark { display: grid; place-items: center; background: #111827; color: #fff; font-weight: 800; font-size: 18px; }
.store-nav { display: flex; align-items: center; gap: 24px; flex: 1; }
.store-nav a, .store-admin-link { font-size: 13px; color: #667085; font-weight: 500; }
.store-nav a:hover, .store-nav .store-nav-active, .store-admin-link:hover { color: #111827; }
.store-admin-link { padding: 8px 14px; border: 1px solid var(--line); border-radius: 9px; }
.store-menu { display: none; border: 0; padding: 7px; background: transparent; cursor: pointer; }
.store-menu span { display: block; width: 22px; height: 2px; background: #111827; margin: 4px 0; border-radius: 2px; }
.store-mobile-nav { display: none; flex-direction: column; padding: 12px 0; border-top: 1px solid var(--line); }
.store-mobile-nav a { padding: 10px 0; font-size: 14px; color: #4b5563; font-weight: 500; }
.store-mobile-nav.open { display: flex; }

/* Hero */
.store-hero { background: #f1f2f4; border-bottom: 1px solid #e5e7eb; }
.hero-grid { min-height: 480px; display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; gap: 40px; }
.hero-copy { padding: 60px 0; }
.eyebrow, .section-kicker { display: inline-block; font-size: 10px; line-height: 1; font-weight: 800; letter-spacing: 1.8px; color: #8b95a5; text-transform: uppercase; }
.hero-copy h1 { font-size: clamp(38px, 5.5vw, 64px); line-height: 1.02; letter-spacing: -3px; margin: 16px 0; font-weight: 800; }
.hero-copy h1 em { font-style: normal; color: var(--accent); }
.hero-copy p { max-width: 560px; color: #667085; font-size: 16px; line-height: 1.65; margin-bottom: 26px; }
.hero-search { height: 56px; max-width: 580px; background: #fff; border: 1px solid #dfe3e8; border-radius: 13px; box-shadow: 0 12px 30px rgba(16,24,40,.07); display: flex; align-items: center; padding: 0 16px; gap: 12px; }
.hero-search > span { font-size: 22px; color: #98a2b3; }
.hero-search input { border: 0; outline: 0; flex: 1; background: transparent; font-size: 15px; color: #111827; width: 100%; }
.hero-search button { border: 0; background: transparent; font-size: 20px; color: #98a2b3; cursor: pointer; display: none; }
.hero-points { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 18px; color: #667085; font-size: 12px; font-weight: 500; }
.hero-card { height: 380px; max-width: 440px; width: 100%; margin-left: auto; background: #111827; border-radius: 24px; padding: 32px; position: relative; overflow: hidden; color: #fff; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 24px 50px rgba(17,24,39,.18); }
.hero-card-glow { position: absolute; width: 280px; height: 280px; border-radius: 50%; right: -80px; top: -90px; background: #e11d48; opacity: 0.8; filter: blur(30px); }
.hero-card-label { position: relative; font-size: 11px; letter-spacing: 2px; color: #d1d5db; font-weight: 700; }
.hero-card-title { position: relative; font-size: 38px; line-height: 1.05; letter-spacing: -2px; }
.hero-card-title strong { color: #fb7185; }
.hero-mini-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #374151; border-radius: 12px; overflow: hidden; }
.hero-mini-grid span { background: #1f2937; padding: 14px; font-size: 11px; color: #9ca3af; }
.hero-mini-grid b { color: #fff; font-size: 13px; display: block; margin-top: 2px; }

/* Trust Strip */
.trust-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-top: 0; }
.trust-strip > div { background: #fff; padding: 22px 25px; display: flex; flex-direction: column; gap: 4px; }
.trust-strip strong { font-size: 14px; color: #111827; }
.trust-strip span { font-size: 12px; color: #7b8493; }

/* Categories */
.category-section, .products-section { padding-top: 60px; }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
.section-heading h2 { font-size: 28px; letter-spacing: -1px; margin-top: 6px; font-weight: 800; }
.section-count { font-size: 12px; color: #98a2b3; font-weight: 600; }
.category-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
.category-row::-webkit-scrollbar { display: none; }
.category-chip { white-space: nowrap; border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 10px 18px; font-size: 13px; font-weight: 500; color: #4b5563; cursor: pointer; transition: all .15s; }
.category-chip:hover { border-color: #9ca3af; color: #111827; }
.category-chip.active { background: #111827; border-color: #111827; color: #fff; }

/* Products Grid */
.products-section { padding-bottom: 80px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.product-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; transition: transform .2s, box-shadow .2s; min-width: 0; display: flex; flex-direction: column; }
.product-card:hover { transform: translateY(-3px); box-shadow: 0 16px 35px rgba(16,24,40,.08); }
.product-image-link { height: 220px; background: #f1f3f5; display: block; position: relative; overflow: hidden; }
.product-image-link > img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.product-card:hover .product-image-link > img { transform: scale(1.04); }
.product-image-placeholder { width: 100%; height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #e9ecf1, #f8f9fb); color: #b4bbc6; font-size: 28px; font-weight: 900; }
.product-badge { position: absolute; top: 12px; left: 12px; background: rgba(255, 255, 255, 0.95); color: #344054; padding: 5px 9px; border-radius: 6px; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; box-shadow: 0 2px 4px rgba(0,0,0,.06); }
.product-card-body { padding: 18px; display: flex; flex-direction: column; flex: 1; }
.product-name { font-size: 15px; font-weight: 700; line-height: 1.35; display: block; min-height: 40px; color: #111827; }
.product-name:hover { color: var(--accent); }
.product-description { font-size: 12px; line-height: 1.55; color: #7b8493; margin: 8px 0 16px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; min-height: 36px; }
.product-card-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; margin-top: auto; }
.price-label { display: block; color: #98a2b3; font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px; font-weight: 600; }
.product-price { font-size: 17px; font-weight: 800; color: #111827; }
.product-buy { display: inline-flex; align-items: center; gap: 5px; background: #111827; color: #fff; border-radius: 8px; padding: 9px 13px; font-size: 11px; font-weight: 700; white-space: nowrap; transition: background .15s; }
.product-buy:hover { background: var(--accent); }
.product-buy-secondary { background: #f2f4f7; color: #344054; }

/* Product Detail */
.product-detail { padding-top: 36px; padding-bottom: 90px; }
.breadcrumbs { display: flex; gap: 8px; align-items: center; font-size: 12px; color: #98a2b3; margin-bottom: 28px; }
.breadcrumbs a:hover { color: #111827; }
.product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.product-detail-media { background: #f1f3f5; border-radius: 20px; overflow: hidden; aspect-ratio: 1/1; display: grid; place-items: center; border: 1px solid var(--line); }
.product-detail-media img { width: 100%; height: 100%; object-fit: cover; }
.product-detail-placeholder { font-size: 72px; font-weight: 900; color: #b8bec8; }
.product-detail-copy { padding: 10px 0; }
.product-detail-copy h1 { font-size: clamp(30px, 4vw, 46px); line-height: 1.08; letter-spacing: -2px; margin: 12px 0 16px; font-weight: 800; }
.detail-price { display: block; font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 20px; }
.detail-description { color: #4b5563; font-size: 15px; line-height: 1.8; margin-bottom: 28px; }
.detail-buy { display: inline-flex; background: #111827; color: #fff; padding: 14px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; gap: 10px; align-items: center; transition: background .15s; }
.detail-buy:hover { background: var(--accent); }
.reviews-section { margin-top: 70px; border-top: 1px solid var(--line); padding-top: 50px; }
.review-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 20px; }
.review-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 20px; }
.review-top { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.review-card p { font-size: 13px; color: #667085; line-height: 1.6; }

/* Editorial Banner */
.editorial-banner { margin-bottom: 80px; background: #111827; color: #fff; border-radius: 22px; padding: 48px 52px; display: grid; grid-template-columns: 1fr 240px; gap: 40px; align-items: center; }
.editorial-banner .section-kicker { color: #9ca3af; }
.editorial-banner h2 { font-size: 40px; line-height: 1.05; letter-spacing: -2px; margin: 9px 0 13px; font-weight: 800; }
.editorial-banner p { max-width: 580px; color: #aeb6c2; font-size: 14px; line-height: 1.7; }
.editorial-stat { border-left: 1px solid #374151; padding-left: 28px; }
.editorial-stat strong { display: block; font-size: 44px; font-weight: 800; }
.editorial-stat span { font-size: 12px; color: #9ca3af; }

/* Empty / Error */
.store-empty { text-align: center; padding: 70px 20px; background: #fff; border: 1px dashed #d8dce3; border-radius: 16px; margin: 20px 0; }
.empty-icon { width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; background: #f2f4f7; color: #667085; font-weight: 800; font-size: 20px; margin: 0 auto 16px; }
.store-empty h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
.store-empty p { font-size: 13px; color: #7b8493; max-width: 440px; margin: 0 auto 20px; line-height: 1.6; }
.primary-action { display: inline-flex; border: 0; border-radius: 9px; padding: 11px 18px; background: #111827; color: #fff; font-size: 12px; font-weight: 700; cursor: pointer; }

/* Footer */
.store-footer { background: #fff; border-top: 1px solid var(--line); }
.footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr; gap: 70px; padding: 55px 0; }
.footer-grid > div { display: flex; flex-direction: column; gap: 10px; }
.footer-grid p { max-width: 380px; color: #7b8493; font-size: 13px; line-height: 1.7; }
.footer-grid h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #98a2b3; font-weight: 700; margin-bottom: 4px; }
.footer-grid a { font-size: 13px; color: #667085; }
.footer-grid a:hover { color: #111827; }
.footer-note { font-size: 12px; color: #98a2b3; line-height: 1.6; }
.footer-bottom { border-top: 1px solid var(--line); min-height: 55px; display: flex; align-items: center; justify-content: space-between; color: #98a2b3; font-size: 11px; }

/* Admin */
.admin-login-box { max-width: 400px; margin: 80px auto; background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,.04); }
.admin-login-box h1 { font-size: 24px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
.admin-login-box p { font-size: 13px; color: #667085; margin-bottom: 24px; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.form-group input, .form-group select, .form-group textarea { width: 100%; border: 1px solid #d1d5db; border-radius: 8px; padding: 10px 14px; font-size: 14px; outline: none; transition: border-color .15s; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #111827; }
.form-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }

/* Responsive */
@media (max-width: 980px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .hero-grid { gap: 30px; }
}
@media (max-width: 768px) {
  .store-shell { width: min(100% - 28px, 640px); }
  .store-topbar-note, .store-nav, .store-admin-link { display: none; }
  .store-menu { display: block; }
  .hero-grid { grid-template-columns: 1fr; gap: 0; min-height: 0; }
  .hero-copy { padding: 40px 0 20px; }
  .hero-card { display: none; }
  .trust-strip { grid-template-columns: 1fr; }
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .editorial-banner { grid-template-columns: 1fr; padding: 36px 28px; }
  .editorial-stat { border-left: 0; border-top: 1px solid #374151; padding-left: 0; padding-top: 20px; }
  .product-detail-grid { grid-template-columns: 1fr; gap: 30px; }
  .footer-grid { grid-template-columns: 1fr; gap: 35px; }
}
@media (max-width: 480px) {
  .product-grid { grid-template-columns: 1fr; }
}
`;
