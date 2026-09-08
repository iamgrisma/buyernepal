export const homepageWidgetsCss = `
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
