export const editorialCss = `
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


`;
