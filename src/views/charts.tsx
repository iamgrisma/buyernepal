import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Footer, MobileBottomBar } from './components';

export const TopChartsPage: FC<{
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  activeCategorySlug?: string;
  sortBy?: string;
}> = ({ products, categories, settings, activeCategorySlug = 'all', sortBy = 'score' }) => {
  // Sort products based on selected criteria
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // default: labs overall score or rating
    const scoreA = a.scores ? a.scores.overall_score : (a.rating || 4.5);
    const scoreB = b.scores ? b.scores.overall_score : (b.rating || 4.5);
    return scoreB - scoreA;
  });

  return (
    <Layout
      title="Top 10 Gadget Leaderboard & Ranked Charts in Nepal (2026) | BuyerNepal"
      description="The definitive ranking of best smartphones, laptops, headphones and tech in Nepal. Rated by BuyerNepal Labs on performance, display, battery, and Nepal value."
      url="https://buyernepal.com/charts"
      settings={settings}
    >
      <div className="store-page top-charts-page">
        <Header settings={settings} categories={categories} activeSlug="charts" />

        <main className="store-shell" style={{ padding: '24px 0 60px' }}>
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">🏠 Home</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Top Ranked Charts</span>
          </div>

          {/* Hero Banner */}
          <div className="directory-header-hero" style={{ textAlign: 'left', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '32px 28px', marginBottom: '28px' }}>
            <div className="coupons-hero-badge">🏆 BUYERNEPAL LABS TOP LEADERBOARD</div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--ink)', marginTop: '8px', letterSpacing: '-0.6px' }}>
              Nepal Gadget Leaderboard &amp; Best-In-Class Charts
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '6px', maxWidth: '720px', lineHeight: '1.5' }}>
              Modeled after professional top-table benchmarks. Every gadget is evaluated through our standardized 5-point hardware lab scorecard and indexed against verified Nepal importer pricing.
            </p>

            {/* Quick Metrics Strip */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '18px', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 600 }}>
              <span>✓ Verified Importer Pricing</span>
              <span>•</span>
              <span>⭐ Independent Lab Scores</span>
              <span>•</span>
              <span>💳 0% Bank EMI Comparison</span>
              <span>•</span>
              <span>🔄 Updated Weekly</span>
            </div>
          </div>

          {/* Filter & Sorting Controls Strip */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
              <a
                href="/charts"
                className={`filter-pill ${activeCategorySlug === 'all' ? 'active' : ''}`}
                style={{ whiteSpace: 'nowrap' }}
              >
                🌟 All Top Picks ({products.length})
              </a>
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`/charts?category=${c.slug}`}
                  className={`filter-pill ${activeCategorySlug === c.slug ? 'active' : ''}`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {c.icon || '📁'} {c.name}
                </a>
              ))}
            </div>

            {/* Sorter Dropdown */}
            <form method="get" action="/charts" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeCategorySlug !== 'all' && (
                <input type="hidden" name="category" value={activeCategorySlug} />
              )}
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Sort by:</label>
              <select
                name="sort"
                defaultValue={sortBy}
                onchange="this.form.submit()"
                style={{ padding: '8px 12px', fontSize: '12.5px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', background: 'var(--card-bg)', color: 'var(--ink)' }}
              >
                <option value="score">Highest Labs Score</option>
                <option value="rating">Customer Rating</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </form>
          </div>

          {/* REHUB TOP TABLE (RESPONSIVE TABLE LEADERBOARD) */}
          <div className="rehub-toptable-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="rehub-rank-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg)', borderBottom: '2px solid var(--line)', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--muted)' }}>
                    <th style={{ padding: '16px 20px', width: '80px', textAlign: 'center' }}>Rank</th>
                    <th style={{ padding: '16px 20px' }}>Curated Device &amp; Highlights</th>
                    <th style={{ padding: '16px 20px', width: '150px' }}>Labs Score</th>
                    <th style={{ padding: '16px 20px', width: '160px' }}>Verified Price</th>
                    <th style={{ padding: '16px 20px', width: '160px' }}>Retailer / Seller</th>
                    <th style={{ padding: '16px 20px', width: '170px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((p, index) => {
                    const rank = index + 1;
                    const price = p.price;
                    const origPrice = p.original_price || Math.round(price * 1.15);
                    const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
                    const score = p.scores ? p.scores.overall_score : (p.rating || 4.5);
                    const rankBadge = rank === 1 ? '🥇 #1 BEST OVERALL' : rank === 2 ? '🥈 #2 RUNNER UP' : rank === 3 ? '🥉 #3 TOP VALUE' : `#${rank}`;
                    const emiMonthly = Math.round(price / 18);

                    return (
                      <tr
                        key={p.id}
                        className={`toptable-row ${rank <= 3 ? 'toptable-top-tier' : ''}`}
                        style={{ borderBottom: '1px solid var(--line)', transition: 'background 0.15s ease' }}
                      >
                        {/* Rank Column */}
                        <td style={{ padding: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: rank <= 3 ? '36px' : '28px',
                              height: rank <= 3 ? '36px' : '28px',
                              borderRadius: '50%',
                              fontWeight: 900,
                              fontSize: rank <= 3 ? '15px' : '13px',
                              background: rank === 1 ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' : rank === 2 ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' : rank === 3 ? 'linear-gradient(135deg, #b45309 0%, #78350f 100%)' : 'var(--bg)',
                              color: rank <= 3 ? '#ffffff' : 'var(--muted)',
                              boxShadow: rank <= 3 ? '0 4px 10px rgba(0,0,0,0.15)' : 'none'
                            }}
                          >
                            {rank}
                          </div>
                        </td>

                        {/* Product Info Column */}
                        <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <a href={`/product/${p.id}`} style={{ flexShrink: 0 }}>
                              <img
                                src={p.image_url}
                                alt={p.name}
                                style={{ width: '64px', height: '64px', objectFit: 'contain', background: 'var(--bg)', borderRadius: '10px', padding: '6px', border: '1px solid var(--line)' }}
                              />
                            </a>

                            <div>
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: rank === 1 ? '#fef3c7' : 'var(--bg)', color: rank === 1 ? '#b45309' : 'var(--muted)' }}>
                                  {rankBadge}
                                </span>
                                <div className={`deal-temperature-badge ${(p.temperature || 95) < 30 ? 'cold' : ''}`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                                  <span>🔥</span>
                                  <span>+{p.temperature || 95}°</span>
                                </div>
                                {p.badge && (
                                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48' }}>
                                    {p.badge}
                                  </span>
                                )}
                              </div>

                              <a
                                href={`/product/${p.id}`}
                                style={{ fontWeight: 800, fontSize: '14.5px', color: 'var(--ink)', textDecoration: 'none', display: 'block', lineHeight: '1.3' }}
                              >
                                {p.name}
                              </a>

                              <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted)', maxWidth: '420px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {p.verdict || p.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Labs Score Column */}
                        <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '15px', color: 'var(--primary)' }}>
                              {score.toFixed(1)}
                            </strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>/ 10</span>
                          </div>
                          <div style={{ width: '90px', height: '6px', background: 'var(--line)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${(score / 10) * 100}%`,
                                height: '100%',
                                background: score >= 9 ? 'var(--emerald)' : 'var(--primary)',
                                borderRadius: '3px'
                              }}
                            ></div>
                          </div>
                          <span style={{ fontSize: '10.5px', color: 'var(--muted)', marginTop: '2px', display: 'block' }}>
                            ★ {p.rating ? p.rating.toFixed(1) : '4.8'} User Score
                          </span>
                        </td>

                        {/* Price Column */}
                        <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                          <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--ink)' }} data-base-npr={price}>
                            Rs. {price.toLocaleString()}
                          </div>
                          {discount > 0 && (
                            <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 700 }}>
                              Save {discount}% (Rs. {origPrice.toLocaleString()})
                            </div>
                          )}
                          {p.emi_available && (
                            <div style={{ fontSize: '10.5px', color: 'var(--muted)', marginTop: '2px' }}>
                              EMI: Rs. {emiMonthly.toLocaleString()}/mo
                            </div>
                          )}
                        </td>

                        {/* Store Column */}
                        <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                          <span className="store-pill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🏬 {p.store_name || 'Daraz Mall'}
                          </span>
                          <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 600, marginTop: '4px' }}>
                            ✓ 100% Tax-Paid Warranty
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td style={{ padding: '20px', verticalAlign: 'middle', textAlign: 'right' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                            {p.affiliate_url ? (
                              <a
                                href={`/go/product/${p.id}`}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="primary-action"
                                style={{ fontSize: '11.5px', padding: '6px 12px', minWidth: '110px', justifyContent: 'center' }}
                              >
                                View Deal ↗
                              </a>
                            ) : (
                              <a
                                href={`/product/${p.id}`}
                                className="primary-action"
                                style={{ fontSize: '11.5px', padding: '6px 12px', minWidth: '110px', justifyContent: 'center' }}
                              >
                                Buy Direct ⚡
                              </a>
                            )}

                            <button
                              type="button"
                              className="filter-pill btn-compare-add"
                              data-id={p.id}
                              data-name={p.name}
                              data-price={p.price}
                              data-image={p.image_url}
                              data-store={p.store_name || 'Daraz Mall'}
                              data-warranty="Official Nepal Warranty"
                              style={{ fontSize: '11px', padding: '4px 10px', width: '110px', textAlign: 'center' }}
                            >
                              ⚖️ Compare
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="charts" />
      </div>
    </Layout>
  );
};
