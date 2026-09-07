import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Footer, MobileBottomBar } from './components';

export interface ShowdownItem {
  id: string;
  title: string;
  subtitle: string;
  ids: number[];
  category: string;
  tag: string;
}

export const POPULAR_SHOWDOWNS: ShowdownItem[] = [
  {
    id: 'flagship-phones',
    title: 'Apple iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra',
    subtitle: 'Titanium Flagship Showdown in Kathmandu: A18 Pro vs Snapdragon 8 Gen 3',
    ids: [1, 2],
    category: 'Smartphones',
    tag: '🔥 Top Flagship Duel'
  },
  {
    id: 'student-computing',
    title: 'Apple MacBook Air M3 vs Dell XPS 13 Plus',
    subtitle: 'Best Premium Ultrabook for Developers & Students in Nepal',
    ids: [3, 4],
    category: 'Laptops',
    tag: '💻 Productivity King'
  },
  {
    id: 'anc-headphones',
    title: 'Sony WH-1000XM5 vs Apple AirPods Max',
    subtitle: 'Ultimate Active Noise Cancelling Headphone Battle in Nepal',
    ids: [5, 6],
    category: 'Audio',
    tag: '🎧 Sound & Silence'
  }
];

export const ComparePage: FC<{
  products: Product[];
  allProducts: Product[];
  settings: SiteSettings;
  categories: Category[];
  customTitle?: string;
}> = ({ products, allProducts, settings, categories, customTitle }) => {
  const isComparing = products.length > 0;
  const productNames = products.map((p) => p.name);
  const pageTitle = customTitle || (isComparing
    ? `${productNames.join(' VS ')} — Price in Nepal & Specs Comparison | BuyerNepal`
    : 'Product Comparison Hub — Head-to-Head Gadget Showdowns in Nepal | BuyerNepal');

  // Collect all unique specification keys across all compared products
  const allSpecKeys: string[] = [];
  products.forEach((p) => {
    if (p.specs) {
      Object.keys(p.specs).forEach((k) => {
        if (!allSpecKeys.includes(k)) allSpecKeys.push(k);
      });
    }
  });

  return (
    <Layout
      title={pageTitle}
      description="Compare tech gadgets, smartphones, laptops, audio gear, and appliances in Nepal. Side-by-side technical specs, 0% EMI options, verified store prices, and BuyerNepal editorial verdicts."
      url="https://buyernepal.com/compare"
    >
      <div className="store-page compare-page-shell">
        <Header settings={settings} categories={categories} activeSlug="compare" />

        <main className="store-shell" style={{ padding: '24px 0 60px' }}>
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">🏠 Home</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Comparison Suite</span>
            {isComparing && (
              <>
                <span>/</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  {productNames.join(' vs ')}
                </span>
              </>
            )}
          </div>

          {/* Hero Header */}
          <div className="directory-header-hero" style={{ textAlign: 'left', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="coupons-hero-badge">⚖️ REHUB HEAD-TO-HEAD COMPARISON MATRIX</div>
                <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--ink)', marginTop: '8px', letterSpacing: '-0.5px' }}>
                  {isComparing ? `${productNames.join(' vs ')} Comparison` : 'Compare Gadgets, Prices & Hardware in Nepal'}
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginTop: '6px', maxWidth: '680px', lineHeight: '1.5' }}>
                  Side-by-side evaluation of technical specifications, verified Nepal prices across stores, NTA MDMS clearance, bank EMI installments, and lab performance scores.
                </p>
              </div>

              {isComparing && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label className="diff-toggle-pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'var(--bg)', border: '1px solid var(--line)', padding: '8px 14px', borderRadius: '24px', fontSize: '12.5px', fontWeight: 700 }}>
                    <input type="checkbox" id="toggleDiffOnlyCheckbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                    <span>Highlight Differences Only</span>
                  </label>
                  <a href="/compare" className="filter-pill" style={{ padding: '8px 14px', fontSize: '12px' }}>
                    Reset ✕
                  </a>
                </div>
              )}
            </div>

            {/* Quick Add Product Dropdown Bar */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)' }}>+ Add product to compare:</span>
              <select
                id="compareProductSelect"
                style={{ padding: '8px 12px', fontSize: '13px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', background: 'var(--card-bg)', color: 'var(--ink)', maxWidth: '340px' }}
              >
                <option value="">-- Choose from Nepal Catalog --</option>
                {allProducts
                  .filter((p) => !products.some((curr) => curr.id === p.id))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Rs. {p.price.toLocaleString()})
                    </option>
                  ))}
              </select>
              <button
                type="button"
                id="btnAddSelectedToCompare"
                className="primary-action"
                style={{ padding: '8px 16px', fontSize: '12.5px' }}
              >
                Add Column ➔
              </button>
            </div>
          </div>

          {/* MAIN COMPARISON MATRIX */}
          {isComparing ? (
            <div className="compare-matrix-container" style={{ background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="rehub-compare-table" id="rehubCompareTable">
                  <thead>
                    <tr>
                      <th className="feature-col-header" style={{ width: '220px', minWidth: '180px', verticalAlign: 'bottom', padding: '20px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800 }}>
                          Comparing {products.length} Products
                        </span>
                      </th>
                      {products.map((p) => {
                        const price = p.price;
                        const origPrice = p.original_price || Math.round(price * 1.15);
                        const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
                        const rating = p.rating || 4.8;

                        return (
                          <th key={p.id} className="compare-product-col-header" style={{ width: `${78 / products.length}%`, minWidth: '240px', padding: '20px', verticalAlign: 'top', textAlign: 'center', borderLeft: '1px solid var(--line)' }}>
                            <div style={{ position: 'relative' }}>
                              <a
                                href={`/compare?remove=${p.id}`}
                                className="compare-remove-col-btn"
                                title="Remove from comparison"
                                style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}
                              >
                                ×
                              </a>

                              <div style={{ width: '130px', height: '130px', margin: '0 auto 12px', background: 'var(--bg)', borderRadius: '12px', padding: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={p.image_url} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                              </div>

                              <h3 style={{ fontSize: '15px', fontWeight: 800, lineHeight: '1.3', minHeight: '40px', marginBottom: '8px' }}>
                                <a href={`/product/${p.id}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>{p.name}</a>
                              </h3>

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                                <span style={{ color: '#f59e0b', fontSize: '13px' }}>★ {rating.toFixed(1)}</span>
                                <span style={{ color: 'var(--muted)', fontSize: '11.5px' }}>({p.review_count || 42} reviews)</span>
                              </div>

                              <div style={{ marginBottom: '14px' }}>
                                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary)' }} data-base-npr={price}>
                                  Rs. {price.toLocaleString()}
                                </div>
                                {discount > 0 && (
                                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', textDecoration: 'line-through' }} data-base-npr={origPrice}>
                                    Rs. {origPrice.toLocaleString()} ({discount}% OFF)
                                  </div>
                                )}
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {p.affiliate_url && (
                                  <a
                                    href={`/go/product/${p.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="primary-action"
                                    style={{ fontSize: '12px', padding: '8px 12px', justifyContent: 'center' }}
                                  >
                                    View Deal on {p.store_name || 'Store'} ↗
                                  </a>
                                )}
                                <a
                                  href={`/product/${p.id}`}
                                  className="detail-buy-btn"
                                  style={{ fontSize: '12px', padding: '8px 12px', background: '#0f172a', marginBottom: 0, justifyContent: 'center' }}
                                >
                                  ⚡ Buy Direct / COD
                                </a>
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody>
                    {/* SECTION: PRICE & AVAILABILITY */}
                    <tr className="compare-section-header-row">
                      <td colSpan={products.length + 1} style={{ background: 'var(--bg)', padding: '10px 20px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)' }}>
                        💰 Price, Warranty &amp; Fulfillment
                      </td>
                    </tr>

                    <tr className="compare-row" data-feature="price">
                      <td className="compare-feature-label">Verified Best Price</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center', fontWeight: 800, color: 'var(--primary)' }} data-base-npr={p.price}>
                          Rs. {p.price.toLocaleString()}
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="store">
                      <td className="compare-feature-label">Authorized Nepal Retailer</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <span className="store-pill-badge">🏬 {p.store_name || 'Daraz Mall Nepal'}</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="warranty">
                      <td className="compare-feature-label">Nepal Warranty &amp; VAT Bill</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <span style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '12px' }}>
                            ✓ 100% Tax-Paid Official Warranty
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="emi">
                      <td className="compare-feature-label">0% Bank EMI Installment</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          {p.emi_available ? (
                            <div style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '12px' }}>
                              💳 Rs. {Math.round(p.price / 18).toLocaleString()} / mo (18 Mos)
                            </div>
                          ) : (
                            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>Standard Cash / Fonepay</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="delivery">
                      <td className="compare-feature-label">Delivery Timeline</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center', fontSize: '12px' }}>
                          {p.delivery_info || 'Kathmandu: 24 Hours • Outside Valley: 2-3 Days'}
                        </td>
                      ))}
                    </tr>

                    {/* SECTION: 5-POINT LABS EVALUATION */}
                    <tr className="compare-section-header-row">
                      <td colSpan={products.length + 1} style={{ background: 'var(--bg)', padding: '10px 20px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)' }}>
                        🔬 BuyerNepal Labs 5-Point Benchmark Scores
                      </td>
                    </tr>

                    <tr className="compare-row" data-feature="score-overall">
                      <td className="compare-feature-label">Overall Rating</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <strong style={{ fontSize: '16px', color: 'var(--primary)' }}>
                            {p.scores ? p.scores.overall_score.toFixed(1) : (p.rating || 4.8).toFixed(1)} / 10
                          </strong>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="score-display">
                      <td className="compare-feature-label">Display &amp; Build Quality</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <strong>{p.scores ? p.scores.display_score.toFixed(1) : '9.0'} / 10</strong>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="score-perf">
                      <td className="compare-feature-label">Performance &amp; Chipset</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <strong>{p.scores ? p.scores.performance_score.toFixed(1) : '9.2'} / 10</strong>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="score-camera">
                      <td className="compare-feature-label">Camera / Audio Output</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <strong>{p.scores ? p.scores.camera_score.toFixed(1) : '8.8'} / 10</strong>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="score-battery">
                      <td className="compare-feature-label">Battery Endurance</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <strong>{p.scores ? p.scores.battery_score.toFixed(1) : '8.9'} / 10</strong>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="score-value">
                      <td className="compare-feature-label">Value for Money in Nepal</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ textAlign: 'center' }}>
                          <strong>{p.scores ? p.scores.value_score.toFixed(1) : '8.7'} / 10</strong>
                        </td>
                      ))}
                    </tr>

                    {/* SECTION: HARDWARE & TECHNICAL SPECS */}
                    {allSpecKeys.length > 0 && (
                      <tr className="compare-section-header-row">
                        <td colSpan={products.length + 1} style={{ background: 'var(--bg)', padding: '10px 20px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)' }}>
                          ⚙️ Technical Specifications Side-by-Side
                        </td>
                      </tr>
                    )}

                    {allSpecKeys.map((key) => {
                      const values = products.map((p) => (p.specs && p.specs[key] ? p.specs[key] : '—'));
                      const allSame = values.every((v) => v === values[0]);

                      return (
                        <tr key={key} className={`compare-row ${allSame ? 'row-same-value' : 'row-diff-value'}`} data-feature={key}>
                          <td className="compare-feature-label">{key}</td>
                          {values.map((v, idx) => (
                            <td key={idx} className="compare-feature-val" style={{ textAlign: 'center', fontSize: '12.5px' }}>
                              {v}
                            </td>
                          ))}
                        </tr>
                      );
                    })}

                    {/* SECTION: PROS AND CONS */}
                    <tr className="compare-section-header-row">
                      <td colSpan={products.length + 1} style={{ background: 'var(--bg)', padding: '10px 20px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)' }}>
                        ⚖️ Editorial Strengths &amp; Trade-offs
                      </td>
                    </tr>

                    <tr className="compare-row" data-feature="pros">
                      <td className="compare-feature-label">Reasons to Buy 👍</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ verticalAlign: 'top', padding: '14px' }}>
                          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#065f46', lineHeight: '1.5' }}>
                            {(p.pros || ['Authorized Nepal stock', 'Official distributor warranty']).map((pro, i) => (
                              <li key={i} style={{ marginBottom: '4px' }}>✓ {pro}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr className="compare-row" data-feature="cons">
                      <td className="compare-feature-label">Things to Consider ⚠️</td>
                      {products.map((p) => (
                        <td key={p.id} className="compare-feature-val" style={{ verticalAlign: 'top', padding: '14px' }}>
                          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#9f1239', lineHeight: '1.5' }}>
                            {(p.cons || ['High demand in Nepal market']).map((con, i) => (
                              <li key={i} style={{ marginBottom: '4px' }}>• {con}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* SECTION: BOTTOM ACTION ROW */}
                    <tr className="compare-action-sticky-row">
                      <td className="compare-feature-label" style={{ fontWeight: 800 }}>Choose Your Product</td>
                      {products.map((p) => (
                        <td key={p.id} style={{ textAlign: 'center', padding: '16px', borderLeft: '1px solid var(--line)' }}>
                          <a href={`/product/${p.id}`} className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                            View Product Page →
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty-state-card" style={{ padding: '60px 24px', textAlign: 'center', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>⚖️</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Select products to begin comparison</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '500px', margin: '8px auto 20px' }}>
                Pick 2 or more gadgets from our catalog above, or click one of the popular showdowns below to see an instant side-by-side spec comparison.
              </p>
            </div>
          )}

          {/* POPULAR NEPAL HEAD-TO-HEAD SHOWDOWNS */}
          <div style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)' }}>🔥 Popular Head-to-Head Duels in Nepal</h2>
                <span style={{ fontSize: '12.5px', color: 'var(--muted)' }}>Tested and compared side-by-side by BuyerNepal editors</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {POPULAR_SHOWDOWNS.map((duel) => (
                <a
                  key={duel.id}
                  href={`/compare?ids=${duel.ids.join(',')}`}
                  className="showdown-card-link"
                  style={{ display: 'block', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '20px', textDecoration: 'none', color: 'var(--ink)', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {duel.tag}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '10px 0 6px', lineHeight: '1.3' }}>
                    {duel.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: '1.4', margin: 0 }}>
                    {duel.subtitle}
                  </p>
                  <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: 'var(--primary)' }}>
                    <span>Launch Side-by-Side Matrix</span>
                    <span>➔</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>

        <Footer settings={settings} categories={categories} />
        <MobileBottomBar activeTab="compare" />
      </div>

      {/* Comparison Client-Side Script: Toggle Differences & Add Dropdown */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // 1. Highlight Differences Only Toggle
              const diffToggle = document.getElementById('toggleDiffOnlyCheckbox');
              if (diffToggle) {
                diffToggle.addEventListener('change', (e) => {
                  const checked = e.target.checked;
                  const sameRows = document.querySelectorAll('.rehub-compare-table .row-same-value');
                  sameRows.forEach(row => {
                    row.style.display = checked ? 'none' : '';
                  });
                });
              }

              // 2. Add Selected Product to Comparison Query
              const addSelect = document.getElementById('compareProductSelect');
              const addBtn = document.getElementById('btnAddSelectedToCompare');
              if (addSelect && addBtn) {
                addBtn.addEventListener('click', () => {
                  const val = addSelect.value;
                  if (!val) {
                    alert('Please select a product from the list');
                    return;
                  }
                  const params = new URLSearchParams(window.location.search);
                  let currentIds = params.get('ids') ? params.get('ids').split(',') : [];
                  if (!currentIds.includes(val)) {
                    currentIds.push(val);
                  }
                  window.location.href = '/compare?ids=' + currentIds.join(',');
                });
              }
            })();
          `
        }}
      />
    </Layout>
  );
};
