import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../../types';

export const Hero: FC<{ settings: SiteSettings }> = ({ settings }) => {
  const eyebrow = settings.hero_eyebrow || "🇳🇵 NEPAL'S PREMIER SHOPPING INTELLIGENCE";
  const headlineLine1 = settings.hero_headline_line1 || 'Shop smarter.';
  const headlineLine2 = settings.hero_headline_line2 || 'Never overpay in Nepal.';
  const subtitle =
    settings.hero_subtitle ||
    settings.site_description ||
    'Discover products worth buying in Nepal — verified NPR prices, authorized store links, and zero marketplace markups.';

  const tags = (settings.hero_tags || 'iPhone 16, Galaxy S25, MacBook M3, Sony WH-1000XM5, Xiaomi Air Fryer, Goldstar Shoes, Chyangra Pashmina')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const trustPoints = [
    settings.hero_point_1 || '✓ Verified NPR Pricing',
    settings.hero_point_2 || '✓ Official Nepal Warranties',
    settings.hero_point_3 || '✓ 0% Bank Credit Card EMI',
    settings.hero_point_4 || '✓ Direct Seller Links'
  ].filter(Boolean);

  const stat1Num = settings.hero_stat1_num || '500+';
  const stat1Lbl = settings.hero_stat1_lbl || 'Curated Products';
  const stat2Num = settings.hero_stat2_num || '15+';
  const stat2Lbl = settings.hero_stat2_lbl || 'Nepal Stores';
  const stat3Num = settings.hero_stat3_num || '100%';
  const stat3Lbl = settings.hero_stat3_lbl || 'Unbiased Testing';

  return (
    <section className="store-hero">
      <div className="store-shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>
            {headlineLine1}
            <br />
            <em>{headlineLine2}</em>
          </h1>
          <p>{subtitle}</p>

          <div className="hero-search-wrapper">
            <div className="hero-search">
              <span aria-hidden="true" className="hero-search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input
                id="searchInput"
                type="text"
                placeholder="Search iPhone, MacBook, Air Fryer, Goldstar, Pashmina…"
                aria-label="Search curated products"
              />
              <button id="clearSearchBtn" type="button" aria-label="Clear search">
                ×
              </button>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="hero-tags">
              <span>Popular:</span>
              {tags.map((tag) => (
                <button key={tag} type="button" className="quick-tag" data-search={tag}>
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="hero-points">
            {trustPoints.map((pt, i) => (
              <span key={i}>
                <svg className="hero-point-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{pt.replace(/^[✓✔]\s*/, '')}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-card" aria-hidden="true">
          <div className="hero-card-glow" />
          <div className="hero-card-label">
            <span>⚡ BUYERNEPAL CURATION ENGINE</span>
          </div>
          <div className="hero-card-title">
            Less scrolling.
            <br />
            <strong>Best deals in Nepal.</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
            We monitor authorized sellers across Kathmandu, Lalitpur, and major verified online platforms daily so you buy with 100% confidence.
          </p>
          <div className="hero-stat-row">
            <div className="hero-stat-box">
              <strong>{stat1Num}</strong>
              <span>{stat1Lbl}</span>
            </div>
            <div className="hero-stat-box">
              <strong>{stat2Num}</strong>
              <span>{stat2Lbl}</span>
            </div>
            <div className="hero-stat-box">
              <strong>{stat3Num}</strong>
              <span>{stat3Lbl}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export const TrustStrip: FC<{ settings?: SiteSettings }> = ({ settings }) => {
  const item1Title = settings?.trust_item1_title || 'Curated for Nepal';
  const item1Desc = settings?.trust_item1_desc || 'Prices, models and distributor warranties verified for Nepali buyers.';

  const item2Title = settings?.trust_item2_title || 'Zero Price Markups';
  const item2Desc = settings?.trust_item2_desc || 'Compare authentic prices across Daraz, Oliz Store, EvoStore & more.';

  const item3Title = settings?.trust_item3_title || 'Independent Testing';
  const item3Desc = settings?.trust_item3_desc || 'In-depth benchmarks, real-world testing, pros & cons from Nepal editors.';

  const item4Title = settings?.trust_item4_title || 'Multi-Store Comparison';
  const item4Desc = settings?.trust_item4_desc || 'Live price tracking & stock verification across verified Nepal retailers.';

  return (
    <section className="store-shell">
      <div className="trust-strip">
        <div className="trust-item">
          <div className="trust-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div className="trust-text">
            <strong>{item1Title}</strong>
            <span>{item1Desc}</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          </div>
          <div className="trust-text">
            <strong>{item2Title}</strong>
            <span>{item2Desc}</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
          <div className="trust-text">
            <strong>{item3Title}</strong>
            <span>{item3Desc}</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
          </div>
          <div className="trust-text">
            <strong>{item4Title}</strong>
            <span>{item4Desc}</span>
          </div>
        </div>
      </div>
    </section>
  );
};


export const EditorialBanner: FC<{ count: number; settings?: SiteSettings }> = ({ count, settings }) => {
  const kicker = settings?.editorial_banner_kicker || 'A BETTER SHOPPING EXPERIENCE';
  const title = settings?.editorial_banner_title || 'Verified Nepal prices.\nNo marketplace confusion.';
  const text =
    settings?.editorial_banner_text ||
    'BuyerNepal cuts through endless copycat listings, fake discounts, and unverified sellers. Every product listed here is inspected for authentic Nepal pricing, manufacturer warranty, and buyer satisfaction.';

  return (
    <section className="store-shell">
      <div className="editorial-banner">
        <div>
          <span className="section-kicker" style={{ color: '#fda4af' }}>{kicker}</span>
          <h2 style={{ whiteSpace: 'pre-line' }}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="editorial-stat">
          <strong>{count || '22+'}</strong>
          <span>Hand-Curated Items</span>
        </div>
      </div>
    </section>
  );
};


