import { FC } from 'hono/jsx';
import { Category, Product, Review, SiteSettings, User, Coupon, Article, Order } from '../types';
import { Layout } from './layout';

export const AdminLoginView: FC<{ error?: string; success?: string }> = ({ error, success }) => {
  return (
    <Layout title="Admin Portal Login — BuyerNepal">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: '20px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '40px 36px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="store-logo-mark" style={{ margin: '0 auto 16px', width: '48px', height: '48px', fontSize: '24px' }}>
              B
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.8px' }}>
              BuyerNepal Portal
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
              Management suite for verified Nepal products, deals and stores.
            </p>
          </div>

          {error && <div className="alert-box alert-error">{error}</div>}
          {success && <div className="alert-box alert-success">{success}</div>}

          <form method="post" action="/admin/login">
            <div className="form-group">
              <label htmlFor="username">Administrator Username or Email</label>
              <input id="username" name="username" type="text" placeholder="Enter administrator username or email" required autoFocus />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter password" required />
            </div>

            <button
              type="submit"
              className="primary-action"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px', marginTop: '8px' }}
            >
              Sign In to Management Portal
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px' }}>
            <a href="/" style={{ color: '#64748b', fontWeight: 600 }}>← Return to Public Storefront</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const AdminDashboardView: FC<{
  currentUser: { id: number | string; username: string; email: string; role: string };
  stats: { products: number; categories: number; users: number; pendingReviews: number; activeCoupons: number; articles?: number; orders?: number };
  products: Product[];
  categories: Category[];
  users: User[];
  reviews: Review[];
  coupons: Coupon[];
  articles?: Article[];
  orders?: Order[];
  outboundClicks?: any[];
  settings: SiteSettings;
  activeTab?: string;
  notice?: { type: 'success' | 'error'; message: string };
}> = ({
  currentUser,
  stats,
  products,
  categories,
  users,
  reviews,
  coupons,
  articles = [],
  orders = [],
  outboundClicks = [],
  settings,
  activeTab = 'overview',
  notice
}) => {
  const pendingReviews = reviews.filter((r) => r.status === 'pending');
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  return (
    <Layout title="Executive Management Portal — BuyerNepal">
      <div className="admin-shell">
        {/* Left Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <a href="/" className="store-brand" style={{ color: '#ffffff' }}>
              <span className="store-logo-mark">B</span>
              <span>
                <strong>BuyerNepal</strong>
                <small style={{ color: '#94a3b8' }}>MANAGEMENT SUITE</small>
              </span>
            </a>
            <div className="admin-telemetry-badge">
              <span className="admin-telemetry-dot"></span>
              <span>Cloudflare D1 (APAC)</span>
            </div>
          </div>

          <nav className="admin-nav">
            <div className="admin-nav-group">
              <span className="admin-nav-section-title">Core Workspace</span>
              <a
                href="/admin?tab=overview"
                className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              >
                <span>📊 Executive Overview</span>
              </a>
              <a
                href="/admin?tab=products"
                className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              >
                <span>🛍️ Products Catalog</span>
                <span className="admin-nav-badge" style={{ background: '#3b82f6' }}>{products.length}</span>
              </a>
              <a
                href="/admin?tab=categories"
                className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              >
                <span>📂 Departments &amp; Menu</span>
                <span className="admin-nav-badge" style={{ background: '#6366f1' }}>{categories.length}</span>
              </a>
            </div>

            <div className="admin-nav-group">
              <span className="admin-nav-section-title">Editorial &amp; Deals</span>
              <a
                href="/admin?tab=blog"
                className={`admin-nav-item ${activeTab === 'blog' ? 'active' : ''}`}
              >
                <span>📰 Tech Guides CMS</span>
                <span className="admin-nav-badge" style={{ background: '#f59e0b' }}>{articles.length}</span>
              </a>
              <a
                href="/admin?tab=reviews"
                className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
              >
                <span>⭐ Review Moderation</span>
                {pendingReviews.length > 0 && (
                  <span className="admin-nav-badge">{pendingReviews.length} new</span>
                )}
              </a>
              <a
                href="/admin?tab=coupons"
                className={`admin-nav-item ${activeTab === 'coupons' ? 'active' : ''}`}
              >
                <span>🏷️ Promo Vouchers</span>
                <span className="admin-nav-badge" style={{ background: '#10b981' }}>{coupons.length}</span>
              </a>
            </div>

            <div className="admin-nav-group">
              <span className="admin-nav-section-title">E-Commerce &amp; Affiliates</span>
              <a
                href="/admin?tab=orders"
                className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              >
                <span>📦 Orders &amp; Direct COD</span>
                <span className="admin-nav-badge" style={{ background: '#059669' }}>{orders.length}</span>
              </a>
              <a
                href="/admin?tab=clicks"
                className={`admin-nav-item ${activeTab === 'clicks' ? 'active' : ''}`}
              >
                <span>🔗 Affiliate Clicks</span>
                <span className="admin-nav-badge" style={{ background: '#8b5cf6' }}>{outboundClicks.length}</span>
              </a>
            </div>

            <div className="admin-nav-group">
              <span className="admin-nav-section-title">Store &amp; System</span>
              <a
                href="/admin?tab=customizer"
                className={`admin-nav-item ${activeTab === 'customizer' ? 'active' : ''}`}
              >
                <span>🎨 Store Customizer</span>
                <span className="admin-nav-badge" style={{ background: '#f43f5e' }}>2026</span>
              </a>
              <a
                href="/admin?tab=settings"
                className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              >
                <span>⚙️ Store Settings</span>
              </a>
              <a
                href="/admin?tab=users"
                className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
              >
                <span>👥 User Access</span>
                <span className="admin-nav-badge" style={{ background: '#64748b' }}>{users.length}</span>
              </a>
            </div>
          </nav>

          <div style={{ padding: '20px', borderTop: '1px solid #1e293b', fontSize: '12px', color: '#64748b', background: 'rgba(15, 23, 42, 0.4)' }}>
            <span style={{ display: 'block', color: '#cbd5e1', fontWeight: 700 }}>
              👤 {currentUser.username}
            </span>
            <span style={{ display: 'block', marginTop: '2px', color: '#94a3b8' }}>Role: {currentUser.role}</span>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <a href="/" target="_blank" style={{ color: '#60a5fa', fontWeight: 600 }}>Live Store ↗</a>
              <span>•</span>
              <a href="/admin/logout" style={{ color: '#f87171', fontWeight: 600 }}>Sign Out</a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          {/* Top Info Bar */}
          <div className="admin-topbar-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                <span>BuyerNepal Suite</span>
                <span>/</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  {activeTab === 'overview' && 'Executive Overview'}
                  {activeTab === 'products' && 'Curated Products Catalog'}
                  {activeTab === 'categories' && 'Departments & Menu'}
                  {activeTab === 'reviews' && 'Review Moderation'}
                  {activeTab === 'coupons' && 'Promo Coupons'}
                  {activeTab === 'blog' && 'Tech Guides CMS'}
                  {activeTab === 'users' && 'Staff & Access'}
                  {activeTab === 'orders' && 'Orders & Fulfillment'}
                  {activeTab === 'clicks' && 'Affiliate Outbound Clicks'}
                  {activeTab === 'customizer' && 'Store Customizer'}
                  {activeTab === 'settings' && 'Global Settings'}
                </span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.8px', margin: 0 }}>
                {activeTab === 'overview' && 'Executive Overview & Analytics'}
                {activeTab === 'products' && 'Curated Products Catalog'}
                {activeTab === 'categories' && 'Departments & Menu Hierarchy'}
                {activeTab === 'reviews' && 'Customer Review Moderation'}
                {activeTab === 'coupons' && 'Promo Coupons & Discount Codes'}
                {activeTab === 'blog' && 'Tech Guides & Editorial CMS'}
                {activeTab === 'users' && 'Staff & User Access Control'}
                {activeTab === 'orders' && 'Direct Purchase Orders & Nepal COD Fulfillment'}
                {activeTab === 'clicks' && 'Outbound Affiliate Click Tracking & Referrals'}
                {activeTab === 'customizer' && 'Store Customizer & Feature Flags'}
                {activeTab === 'settings' && 'Store Branding & Global Settings'}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                id="btnOpenAddProduct"
                className="primary-action"
                style={{ background: 'var(--accent)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                + Add Curated Product
              </button>
              <a href="/" target="_blank" className="primary-action" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid var(--line)' }}>
                View Storefront ↗
              </a>
              <form method="post" action="/admin/seed" style={{ display: 'inline' }}>
                <button
                  type="submit"
                  className="primary-action"
                  title="Populate or refresh D1 database with curated Nepali products"
                  style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
                >
                  🌱 Seed D1
                </button>
              </form>
              <form
                method="post"
                action="/admin/catalog/clear"
                onsubmit="return confirm('⚠️ ARE YOU SURE? This will permanently wipe products, categories, coupons, and reviews from D1. Admin accounts stay safe.');"
                style={{ display: 'inline' }}
              >
                <button
                  type="submit"
                  className="primary-action"
                  title="Wipe catalog from D1"
                  style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
                >
                  🗑️ Clear D1
                </button>
              </form>
            </div>
          </div>

          {notice && (
            <div className={`alert-box alert-${notice.type}`}>
              {notice.message}
            </div>
          )}

          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* 2026 Executive Stat Cards with Mesh Gradients & Sparklines */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-label">CURATED PRODUCTS</span>
                    <span className="admin-stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>🛍️</span>
                  </div>
                  <strong className="admin-stat-value">{stats.products}</strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="admin-stat-trend">↑ Active in {categories.length} depts</span>
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                      <path d="M2 18 L15 14 L28 16 L42 8 L58 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-label">DEPARTMENTS &amp; MENU</span>
                    <span className="admin-stat-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}>📂</span>
                  </div>
                  <strong className="admin-stat-value">{stats.categories}</strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="admin-stat-trend">↑ Synced with Top Strip</span>
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                      <path d="M2 20 L18 15 L32 17 L46 9 L58 5" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-label">CUSTOMER REVIEWS</span>
                    <span className="admin-stat-icon-wrap" style={{ background: pendingReviews.length > 0 ? 'rgba(225, 29, 72, 0.12)' : 'rgba(16, 185, 129, 0.12)', color: pendingReviews.length > 0 ? '#e11d48' : '#10b981' }}>⭐</span>
                  </div>
                  <strong className="admin-stat-value" style={{ color: pendingReviews.length > 0 ? '#e11d48' : 'inherit' }}>
                    {pendingReviews.length}
                  </strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="admin-stat-trend" style={{ color: pendingReviews.length > 0 ? '#e11d48' : '#10b981' }}>
                      {pendingReviews.length > 0 ? '⚠️ Moderation required' : `✓ ${reviews.length} approved`}
                    </span>
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                      <path d="M2 12 L16 12 L30 10 L44 14 L58 8" stroke={pendingReviews.length > 0 ? '#e11d48' : '#10b981'} strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-label">ACTIVE PROMOS</span>
                    <span className="admin-stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>🏷️</span>
                  </div>
                  <strong className="admin-stat-value">{stats.activeCoupons}</strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="admin-stat-trend">↑ Daraz &amp; Oliz vouchers</span>
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                      <path d="M2 16 L15 14 L28 10 L42 12 L58 4" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Visual Analytics Charts Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* SVG Shopping Clicks Trend Chart */}
                <div className="admin-card" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h2 style={{ fontSize: '16px', fontWeight: 800 }}>Weekly Shopping Clicks &amp; Discovery</h2>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Estimated referral traffic generated to Nepal stores</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--emerald)', background: 'var(--emerald-soft)', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
                      +18.4% this week
                    </span>
                  </div>

                  <svg viewBox="0 0 500 180" style={{ width: '100%', height: '180px', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="20" y1="30" x2="480" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="20" y1="80" x2="480" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="20" y1="130" x2="480" y2="130" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Area fill */}
                    <path
                      d="M 20 120 Q 90 90, 160 110 T 300 60 T 400 40 T 480 25 L 480 150 L 20 150 Z"
                      fill="url(#areaGrad)"
                    />
                    {/* Line curve */}
                    <path
                      d="M 20 120 Q 90 90, 160 110 T 300 60 T 400 40 T 480 25"
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Nodes */}
                    <circle cx="20" cy="120" r="4" fill="#0f172a" />
                    <circle cx="160" cy="110" r="4" fill="#0f172a" />
                    <circle cx="300" cy="60" r="4" fill="#0f172a" />
                    <circle cx="400" cy="40" r="4" fill="#0f172a" />
                    <circle cx="480" cy="25" r="5" fill="#e11d48" />

                    {/* Labels */}
                    <text x="20" y="170" fontSize="11" fill="#94a3b8" textAnchor="middle">Sun</text>
                    <text x="100" y="170" fontSize="11" fill="#94a3b8" textAnchor="middle">Mon</text>
                    <text x="180" y="170" fontSize="11" fill="#94a3b8" textAnchor="middle">Tue</text>
                    <text x="260" y="170" fontSize="11" fill="#94a3b8" textAnchor="middle">Wed</text>
                    <text x="340" y="170" fontSize="11" fill="#94a3b8" textAnchor="middle">Thu</text>
                    <text x="420" y="170" fontSize="11" fill="#94a3b8" textAnchor="middle">Fri</text>
                    <text x="480" y="170" fontSize="11" fill="#e11d48" fontWeight="bold" textAnchor="middle">Sat</text>
                  </svg>
                </div>

                {/* Category Popularity Bar Breakdown */}
                <div className="admin-card" style={{ marginBottom: 0 }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Top Departments Share</h2>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '16px' }}>Catalog coverage in Nepal</span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                        <span>📱 Smartphones &amp; Tech</span>
                        <span>42%</span>
                      </div>
                      <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#e11d48', height: '100%', width: '42%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                        <span>🍳 Smart Living &amp; Home</span>
                        <span>24%</span>
                      </div>
                      <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#3b82f6', height: '100%', width: '24%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                        <span>🏔️ Himalayan &amp; Local Crafts</span>
                        <span>18%</span>
                      </div>
                      <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#10b981', height: '100%', width: '18%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                        <span>👟 Footwear &amp; Fashion</span>
                        <span>16%</span>
                      </div>
                      <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#f59e0b', height: '100%', width: '16%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Recent Products */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 800 }}>Featured Catalog Items</h2>
                  <a href="/admin?tab=products" style={{ fontSize: '13px', color: '#e11d48', fontWeight: 700 }}>
                    Manage all {products.length} products →
                  </a>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Store Source</th>
                        <th>Price (NPR)</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 6).map((p) => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 700 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {p.image_url ? (
                                <img src={p.image_url} alt="" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                              ) : (
                                <span style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#f1f5f9', display: 'grid', placeItems: 'center' }}>🛍️</span>
                              )}
                              <span>{p.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge badge-active">{p.store_name || 'Daraz Mall'}</span>
                          </td>
                          <td style={{ fontWeight: 800 }}>Rs. {Number(p.price).toLocaleString('en-NP')}</td>
                          <td>
                            <span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>
                              {p.is_active ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <a href={`/product/${p.id}`} target="_blank" className="primary-action" style={{ padding: '4px 10px', fontSize: '11px', background: '#0f172a' }}>
                              View ↗
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG (2026 Full-Width Executive Suite) */}
          {activeTab === 'products' && (
            <div>
              {/* 2026 Admin Toolbar */}
              <div className="admin-toolbar">
                <div className="admin-search-box">
                  <span className="admin-search-icon">🔍</span>
                  <input
                    type="text"
                    id="adminProductSearch"
                    placeholder="Live search by gadget title, brand, or store..."
                  />
                </div>

                <div className="admin-toolbar-actions">
                  <select id="adminCategoryFilter" className="admin-filter-select">
                    <option value="">All Departments ({categories.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name.toLowerCase()}>{c.name}</option>
                    ))}
                  </select>

                  <select id="adminStatusFilter" className="admin-filter-select">
                    <option value="">All Statuses</option>
                    <option value="active">Active (Published)</option>
                    <option value="draft">Draft Only</option>
                    <option value="emi">0% EMI Available</option>
                  </select>

                  <button
                    type="button"
                    className="primary-action btn-trigger-add-product"
                    style={{ background: 'var(--accent)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    + Add Curated Product
                  </button>
                </div>
              </div>

              {/* Full-Width Product Catalog Table */}
              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Verified Product Catalog</h2>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Showing curated Nepali tech and lifestyle products
                    </span>
                  </div>
                  <span id="filteredCountBadge" className="badge badge-active" style={{ background: 'var(--line-subtle)', color: 'var(--ink)' }}>
                    {products.length} Items
                  </span>
                </div>

                <div style={{ overflowX: 'auto', maxHeight: '800px' }}>
                  <table className="admin-table" id="adminProductsTable">
                    <thead>
                      <tr>
                        <th style={{ width: '42%' }}>Gadget Item &amp; Specs</th>
                        <th>Store Source</th>
                        <th>Verified Price</th>
                        <th>0% EMI</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr
                          key={p.id}
                          className="admin-product-row"
                          data-name={p.name.toLowerCase()}
                          data-brand={(p.brand || '').toLowerCase()}
                          data-category={(p.category_name || '').toLowerCase()}
                          data-store={(p.store_name || '').toLowerCase()}
                          data-status={p.is_active ? 'active' : 'draft'}
                          data-emi={p.emi_available === 1 ? 'emi' : ''}
                        >
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '10px',
                                  background: 'radial-gradient(circle, #ffffff 0%, #f1f5f9 100%)',
                                  border: '1px solid var(--line)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: '4px',
                                  flexShrink: 0
                                }}
                              >
                                {p.image_url ? (
                                  <img src={p.image_url} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                ) : (
                                  <span style={{ fontSize: '22px' }}>🛍️</span>
                                )}
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                  {p.brand && (
                                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--line-subtle)', padding: '1px 6px', borderRadius: '4px' }}>
                                      {p.brand}
                                    </span>
                                  )}
                                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                                    {p.category_name || 'General'}
                                  </span>
                                  {p.badge && (
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#e11d48' }}>
                                      {p.badge}
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '14px', display: 'block' }}>
                                  {p.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-secondary)', background: 'var(--line-subtle)', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                              {p.store_name || 'Daraz Mall'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <strong style={{ fontWeight: 900, fontSize: '14px', color: 'var(--ink)' }}>
                                Rs. {Number(p.price).toLocaleString('en-NP')}
                              </strong>
                              {p.original_price && Number(p.original_price) > Number(p.price) && (
                                <span style={{ fontSize: '11px', color: 'var(--muted)', textDecoration: 'line-through' }}>
                                  Rs. {Number(p.original_price).toLocaleString('en-NP')}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            {p.emi_available === 1 ? (
                              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '3px 8px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                💳 0% EMI
                              </span>
                            ) : (
                              <span style={{ fontSize: '11px', color: '#94a3b8', background: '#f1f5f9', padding: '3px 8px', borderRadius: '12px' }}>
                                None
                              </span>
                            )}
                          </td>
                          <td>
                            <form method="post" action={`/admin/products/${p.id}/toggle`} style={{ display: 'inline' }}>
                              <input type="hidden" name="is_active" value={p.is_active ? '0' : '1'} />
                              <button
                                type="submit"
                                className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}
                                style={{ border: 0, cursor: 'pointer' }}
                                title="Click to toggle Active / Draft state"
                              >
                                {p.is_active ? '● Active' : '○ Draft'}
                              </button>
                            </form>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              <a href={`/product/${p.id}`} target="_blank" className="primary-action" style={{ padding: '5px 10px', fontSize: '11px', background: '#0f172a' }}>
                                View ↗
                              </a>
                              <button
                                type="button"
                                className="btn-scores-product primary-action"
                                style={{ padding: '5px 10px', fontSize: '11px', background: '#d97706', border: 0, cursor: 'pointer' }}
                                data-id={p.id}
                                data-name={p.name}
                                data-display={p.scores?.display_score ?? 8.5}
                                data-performance={p.scores?.performance_score ?? 8.5}
                                data-camera={p.scores?.camera_score ?? 8.5}
                                data-battery={p.scores?.battery_score ?? 8.5}
                                data-value={p.scores?.value_score ?? 8.5}
                                data-overall={p.scores?.overall_score ?? 8.5}
                                data-verdict={p.scores?.verdict || p.verdict || ''}
                                title="Edit Evaluation Scores"
                              >
                                🔬 Scores
                              </button>
                              <button
                                type="button"
                                className="btn-edit-product primary-action"
                                style={{ padding: '5px 10px', fontSize: '11px', background: '#2563eb', border: 0, cursor: 'pointer' }}
                                data-id={p.id}
                                data-name={p.name}
                                data-price={p.price}
                                data-original-price={p.original_price || ''}
                                data-category-id={p.category_id || ''}
                                data-store={p.store_name || 'Daraz Mall'}
                                data-badge={p.badge || ''}
                                data-brand={p.brand || ''}
                                data-emi={p.emi_available === 1 ? '1' : '0'}
                                data-verdict={p.verdict || ''}
                                data-affiliate={p.affiliate_url || ''}
                                data-image={p.image_url || ''}
                                data-desc={p.description || ''}
                                data-active={p.is_active ? '1' : '0'}
                              >
                                ✏️ Edit
                              </button>
                              <form method="post" action={`/admin/products/${p.id}/delete`} onsubmit="return confirm('Delete this product permanently from catalog?');" style={{ display: 'inline' }}>
                                <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
                                  Delete
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES (Full-Width Suite) */}
          {activeTab === 'categories' && (
            <div>
              {/* Toolbar */}
              <div className="admin-toolbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Store Departments &amp; Categories</h2>
                  <span className="badge badge-active" style={{ background: 'var(--line-subtle)', color: 'var(--ink)' }}>
                    {categories.length} Departments
                  </span>
                </div>

                <div className="admin-toolbar-actions">
                  <button
                    type="button"
                    className="primary-action btn-trigger-add-category"
                    style={{ background: 'var(--accent)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    + Add Department
                  </button>
                </div>
              </div>

              {/* Full-Width Table Card */}
              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto', maxHeight: '800px' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '28%' }}>Department &amp; Icon</th>
                        <th style={{ width: '22%' }}>URL Slug</th>
                        <th>Description &amp; Highlights</th>
                        <th style={{ textAlign: 'right', width: '18%' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c) => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 800, color: 'var(--ink)' }}>
                            <span style={{ marginRight: '10px', fontSize: '18px' }}>{c.icon || '📁'}</span>
                            {c.name}
                          </td>
                          <td>
                            <span style={{ color: 'var(--muted)', background: 'var(--line-subtle)', padding: '2px 8px', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'monospace' }}>
                              /category/{c.slug}
                            </span>
                          </td>
                          <td style={{ fontSize: '12.5px', color: 'var(--ink-secondary)' }}>
                            {c.description || 'Curated departmental showcase'}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              <button
                                type="button"
                                className="btn-edit-category primary-action"
                                style={{ padding: '5px 10px', fontSize: '11.5px', background: '#2563eb', border: 0, cursor: 'pointer' }}
                                data-id={c.id}
                                data-name={c.name}
                                data-slug={c.slug}
                                data-icon={c.icon || '📁'}
                                data-desc={c.description || ''}
                                data-active={c.is_active ? '1' : '0'}
                              >
                                ✏️ Edit
                              </button>
                              <form method="post" action={`/admin/categories/${c.id}/delete`} onsubmit="return confirm('Delete this category?');" style={{ display: 'inline' }}>
                                <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '5px 9px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 700 }}>
                                  Delete
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div>
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
                  Pending Reviews ({pendingReviews.length})
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Review submissions from shoppers awaiting verification before appearing on live product pages.
                </p>

                {pendingReviews.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Reviewer</th>
                        <th>Product</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingReviews.map((r) => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 700 }}>{r.user_name}</td>
                          <td>{r.product_name || `Product #${r.product_id}`}</td>
                          <td style={{ color: 'var(--amber)', fontWeight: 800 }}>{'★'.repeat(r.rating)}</td>
                          <td style={{ maxWidth: '300px', fontSize: '13px' }}>{r.comment}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <form method="post" action={`/admin/reviews/${r.id}/approve`} style={{ display: 'inline' }}>
                                <button type="submit" className="primary-action" style={{ padding: '5px 10px', fontSize: '11px', background: '#059669' }}>
                                  Approve ✓
                                </button>
                              </form>
                              <form method="post" action={`/admin/reviews/${r.id}/reject`} style={{ display: 'inline' }}>
                                <button type="submit" style={{ background: '#fee2e2', color: '#b91c1c', border: 0, padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                                  Reject ✗
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                    All reviews are currently moderated!
                  </div>
                )}
              </div>

              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
                  Approved Reviews ({approvedReviews.length})
                </h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Reviewer</th>
                      <th>Rating</th>
                      <th>Comment</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedReviews.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 700 }}>{r.user_name}</td>
                        <td style={{ color: 'var(--amber)', fontWeight: 800 }}>{'★'.repeat(r.rating)}</td>
                        <td style={{ maxWidth: '400px' }}>{r.comment}</td>
                        <td style={{ textAlign: 'right' }}>
                          <form method="post" action={`/admin/reviews/${r.id}/delete`} onsubmit="return confirm('Delete review?');" style={{ display: 'inline' }}>
                            <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
                              Delete
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: COUPONS (Full-Width Suite) */}
          {activeTab === 'coupons' && (
            <div>
              {/* Toolbar */}
              <div className="admin-toolbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Verified Promo Codes &amp; Vouchers</h2>
                  <span className="badge badge-active" style={{ background: 'var(--line-subtle)', color: 'var(--ink)' }}>
                    {coupons.length} Vouchers
                  </span>
                </div>

                <div className="admin-toolbar-actions">
                  <button
                    type="button"
                    className="primary-action btn-trigger-add-coupon"
                    style={{ background: 'var(--accent)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    + Create Promo Voucher
                  </button>
                </div>
              </div>

              {/* Full-Width Table Card */}
              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto', maxHeight: '800px' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '22%' }}>Voucher Code</th>
                        <th style={{ width: '18%' }}>Discount Value</th>
                        <th style={{ width: '20%' }}>Min Order Value</th>
                        <th>Terms / Description</th>
                        <th style={{ textAlign: 'right', width: '15%' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((c) => (
                        <tr key={c.id}>
                          <td>
                            <strong style={{ color: 'var(--accent)', letterSpacing: '1px', background: 'var(--accent-soft)', padding: '3px 8px', borderRadius: '6px', fontSize: '12.5px' }}>
                              {c.code}
                            </strong>
                          </td>
                          <td style={{ fontWeight: 800, color: 'var(--emerald)' }}>
                            {c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `Rs. ${c.discount_value.toLocaleString()} OFF`}
                          </td>
                          <td style={{ fontSize: '12.5px', color: 'var(--ink-secondary)', fontWeight: 600 }}>
                            {c.min_purchase > 0 ? `Rs. ${c.min_purchase.toLocaleString('en-NP')}` : 'No Minimum'}
                          </td>
                          <td style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
                            {c.description || 'Verified promo discount'}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              <button
                                type="button"
                                className="btn-edit-coupon primary-action"
                                style={{ padding: '5px 10px', fontSize: '11.5px', background: '#2563eb', border: 0, cursor: 'pointer' }}
                                data-id={c.id}
                                data-code={c.code}
                                data-type={c.discount_type}
                                data-value={c.discount_value}
                                data-min={c.min_purchase}
                                data-desc={c.description || ''}
                                data-active={c.is_active ? '1' : '0'}
                              >
                                ✏️ Edit
                              </button>
                              <form method="post" action={`/admin/coupons/${c.id}/delete`} onsubmit="return confirm('Delete coupon?');" style={{ display: 'inline' }}>
                                <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '5px 9px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 700 }}>
                                  Delete
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: USERS */}
          {activeTab === 'users' && (
            <div className="admin-card">
              <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Registered Staff &amp; Administrators ({users.length})</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: 700 }}>{u.username}</td>
                      <td style={{ color: '#64748b' }}>{u.email}</td>
                      <td>
                        <span className="badge badge-active">{u.role}</span>
                      </td>
                      <td>
                        <span className={`badge ${u.is_active ? 'badge-active' : 'badge-inactive'}`}>
                          {u.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {u.username !== 'admin' && (
                          <form method="post" action={`/admin/users/${u.id}/delete`} onsubmit="return confirm('Remove user?');" style={{ display: 'inline' }}>
                            <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
                              Remove
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: TECH GUIDES & BLOG CMS (Full-Width Suite) */}
          {activeTab === 'blog' && (
            <div>
              {/* Toolbar */}
              <div className="admin-toolbar">
                <div className="admin-search-box">
                  <span className="admin-search-icon">🔍</span>
                  <input
                    type="text"
                    id="adminArticleSearch"
                    placeholder="Live search guides by title, category, or author..."
                  />
                </div>

                <div className="admin-toolbar-actions">
                  <select id="adminArticleCategoryFilter" className="admin-filter-select">
                    <option value="">All Editorial Categories</option>
                    <option value="buying guides">Buying Guides</option>
                    <option value="smartphone reviews">Smartphone Reviews</option>
                    <option value="laptop guides">Laptop Guides</option>
                    <option value="nepal tech">Nepal Tech</option>
                  </select>

                  <a
                    href="/blog"
                    target="_blank"
                    className="primary-action"
                    style={{ background: 'var(--ink)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    View Magazine ↗
                  </a>

                  <button
                    type="button"
                    className="primary-action btn-trigger-add-article"
                    style={{ background: 'var(--accent)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    + Write New Guide
                  </button>
                </div>
              </div>

              {/* Full-Width Table Card */}
              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Editorial Articles &amp; Buying Guides</h2>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Publish, moderate, or edit tech journalism and consumer recommendations</span>
                  </div>
                  <span id="filteredArticleCount" className="badge badge-active" style={{ background: 'var(--line-subtle)', color: 'var(--ink)' }}>
                    {articles.length} Articles
                  </span>
                </div>

                <div style={{ overflowX: 'auto', maxHeight: '800px' }}>
                  <table className="admin-table" id="adminArticlesTable">
                    <thead>
                      <tr>
                        <th style={{ width: '42%' }}>Guide Title &amp; Slug</th>
                        <th>Category</th>
                        <th>Author Byline</th>
                        <th>Readership</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((art) => (
                        <tr
                          key={art.id}
                          className="admin-article-row"
                          data-title={art.title.toLowerCase()}
                          data-category={art.category.toLowerCase()}
                          data-author={art.author_name.toLowerCase()}
                        >
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <img
                                src={art.cover_image}
                                alt=""
                                style={{ width: '56px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--line)' }}
                              />
                              <div>
                                <span style={{ fontWeight: 800, display: 'block', fontSize: '13.5px', color: 'var(--ink)', lineHeight: '1.3' }}>
                                  {art.title}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', fontSize: '11px', color: 'var(--muted)' }}>
                                  <span>/{art.slug}</span>
                                  {art.is_featured === 1 && (
                                    <span style={{ color: '#d97706', fontWeight: 800, background: '#fef3c7', padding: '1px 6px', borderRadius: '4px' }}>
                                      ⭐ Hero Story
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: 'var(--line-subtle)', color: 'var(--ink)', padding: '3px 9px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                              {art.category}
                            </span>
                          </td>
                          <td style={{ fontSize: '12.5px', color: 'var(--ink-secondary)', fontWeight: 600 }}>
                            {art.author_name}
                          </td>
                          <td style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)' }}>
                            👁️ {(art.views_count || 0).toLocaleString()}
                          </td>
                          <td>
                            <form method="post" action={`/admin/articles/${art.id}/toggle`} style={{ display: 'inline' }}>
                              <input type="hidden" name="is_published" value={art.is_published ? '0' : '1'} />
                              <button
                                type="submit"
                                className={`badge ${art.is_published ? 'badge-active' : 'badge-inactive'}`}
                                style={{ border: 0, cursor: 'pointer', padding: '4px 10px', fontSize: '11px' }}
                                title="Click to toggle status"
                              >
                                {art.is_published ? '✓ Published' : 'Draft'}
                              </button>
                            </form>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              <a
                                href={`/blog/${art.slug}`}
                                target="_blank"
                                className="primary-action"
                                style={{ padding: '5px 10px', fontSize: '11.5px', background: 'var(--ink)' }}
                              >
                                View ↗
                              </a>
                              <button
                                type="button"
                                className="btn-edit-article primary-action"
                                style={{ padding: '5px 10px', fontSize: '11.5px', background: '#2563eb', border: 0, cursor: 'pointer' }}
                                data-id={art.id}
                                data-title={art.title}
                                data-slug={art.slug}
                                data-category={art.category}
                                data-author={art.author_name}
                                data-cover={art.cover_image}
                                data-readtime={art.read_time_minutes || 5}
                                data-featured={art.is_featured ? '1' : '0'}
                                data-published={art.is_published ? '1' : '0'}
                                data-tags={art.tags || ''}
                                data-excerpt={art.excerpt}
                                data-content={art.content}
                              >
                                ✏️ Edit
                              </button>
                              <form
                                method="post"
                                action={`/admin/articles/${art.id}/delete`}
                                onsubmit="return confirm('Delete this article permanently?');"
                                style={{ display: 'inline' }}
                              >
                                <button
                                  type="submit"
                                  style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '5px 9px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 700 }}
                                >
                                  Delete
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: STORE CUSTOMIZER & FEATURE FLAGS */}
          {activeTab === 'customizer' && (
            <div>
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
                  🎨 2026 Store Customizer &amp; Feature Flags
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
                  Toggle cutting-edge discovery features on the public storefront with real-time effect.
                </p>

                <form method="post" action="/admin/settings">
                  <input type="hidden" name="_return_tab" value="customizer" />

                  <div className="admin-flags-grid">
                    {/* Feature 1: Flash Sale */}
                    <div className="admin-flag-item">
                      <div className="admin-flag-info">
                        <strong>⚡ Live Flash Sale with Ticking Timer</strong>
                        <small>Display countdown banner &amp; claimed progress meter</small>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="flash_sale_enabled"
                          value="1"
                          defaultChecked={settings.flash_sale_enabled !== '0'}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {/* Feature 2: Bank 0% EMI Calculator */}
                    <div className="admin-flag-item">
                      <div className="admin-flag-info">
                        <strong>💳 Nepal Bank 0% EMI Calculator</strong>
                        <small>Interactive installment estimator on products &gt; Rs. 10,000</small>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="emi_enabled"
                          value="1"
                          defaultChecked={settings.emi_enabled !== '0'}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {/* Feature 3: Multi-Currency Switcher */}
                    <div className="admin-flag-item">
                      <div className="admin-flag-info">
                        <strong>💱 Multi-Currency Converter</strong>
                        <small>Allow shoppers to convert prices between NPR, USD, INR</small>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="currency_converter_enabled"
                          value="1"
                          defaultChecked={settings.currency_converter_enabled !== '0'}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {/* Feature 4: Nepal City Delivery Fee Estimator */}
                    <div className="admin-flag-item">
                      <div className="admin-flag-info">
                        <strong>🚚 Nepal City Delivery Estimator</strong>
                        <small>Show shipping charges &amp; times across Kathmandu &amp; 77 districts</small>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="delivery_estimator_enabled"
                          value="1"
                          defaultChecked={settings.delivery_estimator_enabled !== '0'}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {/* Feature 5: Comparison Floating Dock */}
                    <div className="admin-flag-item">
                      <div className="admin-flag-info">
                        <strong>⚖️ Product Comparison Dock</strong>
                        <small>Enable side-by-side spec &amp; price comparisons (up to 3 items)</small>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="comparison_enabled"
                          value="1"
                          defaultChecked={settings.comparison_enabled !== '0'}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {/* Feature 6: Top Announcement Banner */}
                    <div className="admin-flag-item">
                      <div className="admin-flag-info">
                        <strong>📢 Top Notification Banner</strong>
                        <small>Display top urgent deal strip across the site</small>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="announcement_active"
                          value="1"
                          defaultChecked={settings.announcement_active !== '0'}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                    <div className="form-group">
                      <label>Flash Sale Banner Title</label>
                      <input
                        name="flash_sale_title"
                        type="text"
                        defaultValue={settings.flash_sale_title || '⚡ 2026 Mega Flash Sale • Limited Nepal Inventory'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Top Announcement Banner Text</label>
                      <input
                        name="announcement_text"
                        type="text"
                        defaultValue={settings.announcement_text || '⚡ Grand 2026 Festive Deals in Nepal • Verified NPR Prices • 0% Bank EMI • Same-Day Kathmandu Delivery'}
                      />
                    </div>
                  </div>

                  <button type="submit" className="primary-action" style={{ marginTop: '8px' }}>
                    Save Customizer Settings 🚀
                  </button>
                </form>
              </div>

              {/* Regional Traffic Analytics Visualizer */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800 }}>
                      🇳🇵 Nepal Regional Shopper Distribution
                    </h2>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      Estimated weekly click &amp; referral traffic volume across Nepal provinces
                    </span>
                  </div>
                  <span className="badge badge-active">Live Geo Analytics</span>
                </div>

                <div className="geo-distribution-wrap">
                  <div className="geo-row">
                    <div className="geo-label-bar">
                      <span>Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur)</span>
                      <strong>62% (14,880 visits)</strong>
                    </div>
                    <div className="geo-track">
                      <div className="geo-fill" style={{ width: '62%', background: 'linear-gradient(90deg, #e11d48 0%, #f43f5e 100%)' }}></div>
                    </div>
                  </div>

                  <div className="geo-row">
                    <div className="geo-label-bar">
                      <span>Pokhara Valley (Gandaki Province)</span>
                      <strong>18% (4,320 visits)</strong>
                    </div>
                    <div className="geo-track">
                      <div className="geo-fill" style={{ width: '18%', background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)' }}></div>
                    </div>
                  </div>

                  <div className="geo-row">
                    <div className="geo-label-bar">
                      <span>Chitwan Valley &amp; Central Terai</span>
                      <strong>9% (2,160 visits)</strong>
                    </div>
                    <div className="geo-track">
                      <div className="geo-fill" style={{ width: '9%', background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)' }}></div>
                    </div>
                  </div>

                  <div className="geo-row">
                    <div className="geo-label-bar">
                      <span>Butwal / Bhairahawa / Lumbini</span>
                      <strong>6% (1,440 visits)</strong>
                    </div>
                    <div className="geo-track">
                      <div className="geo-fill" style={{ width: '6%', background: 'linear-gradient(90deg, #d97706 0%, #f59e0b 100%)' }}></div>
                    </div>
                  </div>

                  <div className="geo-row">
                    <div className="geo-label-bar">
                      <span>Eastern Nepal (Biratnagar, Dharan, Itahari) &amp; Others</span>
                      <strong>5% (1,200 visits)</strong>
                    </div>
                    <div className="geo-track">
                      <div className="geo-fill" style={{ width: '5%', background: '#64748b' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-card" style={{ maxWidth: '680px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Site Branding &amp; Localization</h2>
              <form method="post" action="/admin/settings">
                <div className="form-group">
                  <label>Store Title</label>
                  <input name="site_title" type="text" defaultValue={settings.site_title || 'BuyerNepal'} required />
                </div>

                <div className="form-group">
                  <label>Store Tagline / Description</label>
                  <textarea name="site_description" rows={2} defaultValue={settings.site_description || ''}></textarea>
                </div>

                <div className="form-group">
                  <label>Top Announcement Bar Text</label>
                  <input
                    name="announcement_text"
                    type="text"
                    defaultValue={settings.announcement_text || '🔥 Grand Festive Deals in Nepal • Verified NPR Prices • Direct Store Links'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label>Contact Phone (Kathmandu)</label>
                    <input name="contact_phone" type="text" defaultValue={settings.contact_phone || '+977-1-4521098'} />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp Support Number</label>
                    <input name="whatsapp_number" type="text" defaultValue={settings.whatsapp_number || '+977-9801234567'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label>Facebook Page URL</label>
                    <input name="social_facebook" type="url" defaultValue={settings.social_facebook || ''} />
                  </div>
                  <div className="form-group">
                    <label>Instagram Page URL</label>
                    <input name="social_instagram" type="url" defaultValue={settings.social_instagram || ''} />
                  </div>
                </div>

                <button type="submit" className="primary-action">
                  Save Store Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB: ORDERS & FULFILLMENT */}
          {activeTab === 'orders' && (
            <div>
              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Customer Orders &amp; Fulfillment</h2>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Cash on Delivery across 77 districts in Nepal and Instant Digital Key dispatch
                    </span>
                  </div>
                  <span className="badge badge-active" style={{ background: '#059669', color: '#ffffff' }}>
                    {orders.length} Total Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>📦</span>
                    <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>No orders placed yet.</strong>
                    <p style={{ fontSize: '13px', marginTop: '6px' }}>Orders from the storefront "⚡ Buy Direct / COD" modal will appear here in real-time.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order # &amp; Date</th>
                          <th>Customer Details</th>
                          <th>Location</th>
                          <th>Product &amp; Amount</th>
                          <th>Payment</th>
                          <th>Fulfillment Status</th>
                          <th style={{ textAlign: 'right' }}>Update Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id}>
                            <td>
                              <strong style={{ color: 'var(--accent)', fontSize: '13px' }}>{o.order_number}</strong>
                              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                                {o.created_at ? new Date(o.created_at).toLocaleDateString() : 'Recent'}
                              </div>
                              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: o.delivery_type === 'digital' ? '#ede9fe' : '#e0f2fe', color: o.delivery_type === 'digital' ? '#6d28d9' : '#0369a1', fontWeight: 700 }}>
                                {o.delivery_type === 'digital' ? '⚡ DIGITAL' : '🚚 PHYSICAL'}
                              </span>
                            </td>
                            <td>
                              <strong style={{ fontSize: '13px' }}>{o.customer_name}</strong>
                              <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>📞 {o.customer_phone}</div>
                              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>✉️ {o.customer_email}</div>
                            </td>
                            <td>
                              <strong style={{ fontSize: '12.5px' }}>{o.city || 'Kathmandu'}</strong>
                              <div style={{ fontSize: '11px', color: 'var(--muted)', maxWidth: '160px' }}>
                                {o.shipping_address || 'Not specified'}
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, fontSize: '13px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {o.product_name}
                              </div>
                              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ink)' }}>
                                Rs. {o.total_amount.toLocaleString()} <span style={{ fontWeight: 400, color: 'var(--muted)' }}>({o.quantity}x)</span>
                              </div>
                              {o.digital_download_code && (
                                <div style={{ fontSize: '10.5px', color: '#6d28d9', marginTop: '2px' }}>
                                  Key: <code>{o.digital_download_code}</code>
                                </div>
                              )}
                            </td>
                            <td>
                              <span style={{ textTransform: 'uppercase', fontSize: '11.5px', fontWeight: 700 }}>
                                {o.payment_method}
                              </span>
                              <div style={{ fontSize: '10.5px', color: o.payment_status === 'paid' ? '#059669' : '#d97706', fontWeight: 700 }}>
                                {o.payment_status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                              </div>
                            </td>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  background:
                                    o.order_status === 'delivered'
                                      ? 'rgba(16, 185, 129, 0.15)'
                                      : o.order_status === 'shipped'
                                      ? 'rgba(59, 130, 246, 0.15)'
                                      : o.order_status === 'cancelled'
                                      ? 'rgba(239, 68, 68, 0.15)'
                                      : 'rgba(245, 158, 11, 0.15)',
                                  color:
                                    o.order_status === 'delivered'
                                      ? '#059669'
                                      : o.order_status === 'shipped'
                                      ? '#2563eb'
                                      : o.order_status === 'cancelled'
                                      ? '#dc2626'
                                      : '#d97706'
                                }}
                              >
                                {o.order_status}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <form method="post" action={`/admin/orders/${o.id}/status`} style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                                <select
                                  name="status"
                                  defaultValue={o.order_status}
                                  style={{ padding: '4px 6px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--line)' }}
                                >
                                  <option value="placed">placed</option>
                                  <option value="processing">processing</option>
                                  <option value="shipped">shipped</option>
                                  <option value="delivered">delivered</option>
                                  <option value="cancelled">cancelled</option>
                                </select>
                                <button
                                  type="submit"
                                  className="primary-action"
                                  style={{ padding: '4px 8px', fontSize: '11px' }}
                                >
                                  Save
                                </button>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: OUTBOUND CLICKS ANALYTICS */}
          {activeTab === 'clicks' && (
            <div>
              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Affiliate Outbound Clicks</h2>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Cloaked link redirects (/go/:type/:id) tracked across Daraz, partner stores and vouchers
                    </span>
                  </div>
                  <span className="badge badge-active" style={{ background: '#8b5cf6', color: '#ffffff' }}>
                    {outboundClicks.length} Clicks Tracked
                  </span>
                </div>

                {outboundClicks.length === 0 ? (
                  <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>🔗</span>
                    <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>No outbound clicks logged yet.</strong>
                    <p style={{ fontSize: '13px', marginTop: '6px' }}>When visitors click "View Deal" on any product, their outbound transition is logged here.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>Target Type</th>
                          <th>Store Name</th>
                          <th>Destination URL</th>
                          <th>Visitor Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outboundClicks.map((c: any, idx: number) => (
                          <tr key={c.id || idx}>
                            <td style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {c.created_at ? new Date(c.created_at).toLocaleString() : 'Recent'}
                            </td>
                            <td>
                              <span style={{ fontSize: '11px', textTransform: 'uppercase', padding: '2px 6px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '4px', fontWeight: 700 }}>
                                {c.target_type}
                              </span>
                            </td>
                            <td>
                              <strong>{c.store_name}</strong>
                            </td>
                            <td>
                              <a
                                href={c.target_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '12px', color: '#3b82f6', maxWidth: '320px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                              >
                                {c.target_url}
                              </a>
                            </td>
                            <td>
                              <span style={{ fontSize: '12px', fontWeight: 700 }}>🇳🇵 {c.ip_country || 'NP'}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add New Curated Product */}
      <div id="addProductModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '680px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✨ Add Curated Product to Nepal Catalog</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/products/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Product Title *</label>
                <input name="name" type="text" placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Deal Price (NPR) *</label>
                  <input name="price" type="number" placeholder="44999" required />
                </div>
                <div className="form-group">
                  <label>Original MRP (NPR)</label>
                  <input name="original_price" type="number" placeholder="49999" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Department / Category</label>
                  <select name="category_id">
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Verified Store Name</label>
                  <input name="store_name" type="text" placeholder="e.g. Oliz Store Nepal" defaultValue="Daraz Mall" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Badge Tag</label>
                  <input name="badge" type="text" placeholder="e.g. 🔥 Hot Deal" defaultValue="🔥 Hot Deal" />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input name="brand" type="text" placeholder="e.g. Sony" />
                </div>
              </div>

              <div className="form-group">
                <label>Store / Affiliate URL</label>
                <input name="affiliate_url" type="url" placeholder="https://www.daraz.com.np/products/..." />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input name="image_url" type="url" placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-subtle, #f8fafc)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line, #e2e8f0)' }}>
                <input type="checkbox" id="modalAddProdEmi" name="emi_available" value="1" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="modalAddProdEmi" style={{ margin: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>
                  💳 0% Bank EMI Available in Nepal (Nabil, NIC Asia, Global IME, etc.)
                </label>
              </div>

              <div className="form-group">
                <label>Editorial Verdict &amp; Nepal Buying Advice</label>
                <textarea name="verdict" rows={2} placeholder="Our bottom-line recommendation for Nepali shoppers…"></textarea>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Description &amp; Specs Highlights</label>
                <textarea name="description" rows={3} placeholder="Key specs, dimensions and warranty details…"></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Publish Product to Nepal Catalog
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Edit Curated Product */}
      <div id="editProductModal" className="admin-modal-backdrop">
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Curated Product</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editProductForm" method="post" action="/admin/products/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editProdId" name="id" />
              
              <div className="form-group">
                <label>Product Title *</label>
                <input id="editProdName" name="name" type="text" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Deal Price (NPR) *</label>
                  <input id="editProdPrice" name="price" type="number" required />
                </div>
                <div className="form-group">
                  <label>Original MRP (NPR)</label>
                  <input id="editProdOriginalPrice" name="original_price" type="number" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Department / Category</label>
                  <select id="editProdCategory" name="category_id">
                    <option value="">-- Select Department --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Store Name</label>
                  <input id="editProdStore" name="store_name" type="text" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Badge Tag</label>
                  <input id="editProdBadge" name="badge" type="text" placeholder="e.g. 🔥 Hot Deal" />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input id="editProdBrand" name="brand" type="text" placeholder="e.g. Apple" />
                </div>
                <div className="form-group">
                  <label>Catalog Status</label>
                  <select id="editProdActive" name="is_active">
                    <option value="1">Active (Published)</option>
                    <option value="0">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Store / Affiliate URL</label>
                <input id="editProdAffiliate" name="affiliate_url" type="url" />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input id="editProdImage" name="image_url" type="url" />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-subtle, #f8fafc)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line, #e2e8f0)' }}>
                <input type="checkbox" id="editProdEmiAvailable" name="emi_available" value="1" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="editProdEmiAvailable" style={{ margin: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>
                  💳 0% Bank EMI Available in Nepal (Nabil, NIC Asia, Global IME, etc.)
                </label>
              </div>

              <div className="form-group">
                <label>Editorial Verdict &amp; Nepal Buying Advice</label>
                <textarea id="editProdVerdict" name="verdict" rows={2} placeholder="Our bottom-line recommendation for Nepali shoppers…"></textarea>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Description &amp; Specs Highlights</label>
                <textarea id="editProdDesc" name="description" rows={3}></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Save Product Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Edit Department */}
      <div id="editCategoryModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '520px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Department</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editCategoryForm" method="post" action="/admin/categories/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editCatId" name="id" />
              <div className="form-group">
                <label>Department Name *</label>
                <input id="editCatName" name="name" type="text" required />
              </div>
              <div className="form-group">
                <label>URL Slug *</label>
                <input id="editCatSlug" name="slug" type="text" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Icon Emoji</label>
                  <input id="editCatIcon" name="icon" type="text" />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select id="editCatActive" name="is_active">
                    <option value="1">Active (In Menu)</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Description</label>
                <textarea id="editCatDesc" name="description" rows={3}></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Update Department
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Edit Promo Voucher */}
      <div id="editCouponModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '520px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Promo Voucher</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editCouponForm" method="post" action="/admin/coupons/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editCouponId" name="id" />
              <div className="form-group">
                <label>Voucher Code *</label>
                <input id="editCouponCode" name="code" type="text" required style={{ textTransform: 'uppercase' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Discount Type</label>
                  <select id="editCouponType" name="discount_type">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed NPR (Rs.)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount Value *</label>
                  <input id="editCouponValue" name="discount_value" type="number" required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Min Purchase (NPR)</label>
                  <input id="editCouponMin" name="min_purchase" type="number" />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select id="editCouponActive" name="is_active">
                    <option value="1">Active</option>
                    <option value="0">Expired / Disabled</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Description</label>
                <input id="editCouponDesc" name="description" type="text" />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Update Voucher
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Edit Product Evaluation Scores */}
      <div id="editProductScoresModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '600px' }}>
          <div className="admin-modal-header">
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                🔬 Evaluation Scores &amp; Ratings
              </h3>
              <small id="scoresProductName" style={{ color: 'var(--muted)' }}>Product</small>
            </div>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editProductScoresForm" method="post" action="/admin/products/0/scores">
            <div className="admin-modal-body">
              <input type="hidden" id="scoresProductId" name="productId" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>🖥️ Display Score (0 - 10)</label>
                  <input id="scoreDisplay" name="displayScore" type="number" step="0.1" min="0" max="10" required />
                </div>
                <div className="form-group">
                  <label>⚡ Performance &amp; Chipset (0 - 10)</label>
                  <input id="scorePerformance" name="performanceScore" type="number" step="0.1" min="0" max="10" required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>📸 Camera &amp; Video (0 - 10)</label>
                  <input id="scoreCamera" name="cameraScore" type="number" step="0.1" min="0" max="10" required />
                </div>
                <div className="form-group">
                  <label>🔋 Battery Endurance (0 - 10)</label>
                  <input id="scoreBattery" name="batteryScore" type="number" step="0.1" min="0" max="10" required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>💰 Nepal Value for Money (0 - 10)</label>
                  <input id="scoreValue" name="valueScore" type="number" step="0.1" min="0" max="10" required />
                </div>
                <div className="form-group">
                  <label>⭐ Overall Score (0 - 10)</label>
                  <input id="scoreOverall" name="overallScore" type="number" step="0.1" min="0" max="10" required />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Editorial Bottom-Line Verdict</label>
                <textarea id="scoreVerdict" name="verdict" rows={3} placeholder="Key buying verdict for Nepali consumers..."></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: '#d97706' }}>
                Save Scorecard
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Edit Tech Guide Article */}
      <div id="editArticleModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '720px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Tech Guide</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editArticleForm" method="post" action="/admin/articles/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editArticleId" name="id" />

              <div className="form-group">
                <label>Article Title *</label>
                <input id="editArticleTitle" name="title" type="text" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>URL Slug *</label>
                  <input id="editArticleSlug" name="slug" type="text" required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select id="editArticleCat" name="category" required>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Smartphone Reviews">Smartphone Reviews</option>
                    <option value="Laptop Guides">Laptop Guides</option>
                    <option value="Nepal Tech">Nepal Tech</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Author Byline *</label>
                  <input id="editArticleAuthor" name="author_name" type="text" required />
                </div>
                <div className="form-group">
                  <label>Reading Time (Minutes)</label>
                  <input id="editArticleReadTime" name="read_time_minutes" type="number" />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image URL *</label>
                <input id="editArticleCover" name="cover_image" type="url" required />
              </div>

              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input id="editArticleTags" name="tags" type="text" />
              </div>

              <div className="form-group">
                <label>Executive Excerpt *</label>
                <textarea id="editArticleExcerpt" name="excerpt" rows={2} required></textarea>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Content (Markdown &amp; REHub Review Blocks) *</label>
                  <div className="article-formatting-toolbar" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-insert-tag" data-tag="h2">H2</button>
                    <button type="button" className="btn-insert-tag" data-tag="h3">H3</button>
                    <button type="button" className="btn-insert-tag" data-tag="pros">👍 Pros</button>
                    <button type="button" className="btn-insert-tag" data-tag="cons">⚠️ Cons</button>
                    <button type="button" className="btn-insert-tag" data-tag="deal">⚡ Deal</button>
                    <button type="button" className="btn-insert-tag" data-tag="table">📊 Table</button>
                  </div>
                </div>
                <textarea id="editArticleContent" name="content" rows={8} required></textarea>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                  <input id="editArticleFeatured" type="checkbox" name="is_featured" value="1" />
                  ⭐ Feature as Hero Story
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                  <input id="editArticlePublished" type="checkbox" name="is_published" value="1" />
                  🚀 Published
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Update Article
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Write New Tech Guide / Review */}
      <div id="addArticleModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '780px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✍️ Write New Tech Guide / Review</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/articles/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Article Title *</label>
                <input name="title" type="text" placeholder="e.g. Best Mobile Phones Under 30,000 in Nepal (2026)" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" required>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Smartphone Reviews">Smartphone Reviews</option>
                    <option value="Laptop Guides">Laptop Guides</option>
                    <option value="Nepal Tech">Nepal Tech</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Reading Time (Minutes)</label>
                  <input name="read_time_minutes" type="number" defaultValue={5} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Author Byline *</label>
                  <input name="author_name" type="text" defaultValue="BuyerNepal Editorial Team" required />
                </div>
                <div className="form-group">
                  <label>Cover Image URL *</label>
                  <input name="cover_image" type="url" placeholder="https://images.unsplash.com/..." required />
                </div>
              </div>

              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input name="tags" type="text" placeholder="e.g. smartphones, budget, mdms, nepal" />
              </div>

              <div className="form-group">
                <label>Executive Excerpt / Deck *</label>
                <textarea name="excerpt" rows={2} placeholder="Brief summary of the article..." required></textarea>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Article Body (Markdown &amp; REHub Review Blocks) *</label>
                  <div className="article-formatting-toolbar" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-insert-tag" data-tag="h2">H2</button>
                    <button type="button" className="btn-insert-tag" data-tag="h3">H3</button>
                    <button type="button" className="btn-insert-tag" data-tag="pros">👍 Pros</button>
                    <button type="button" className="btn-insert-tag" data-tag="cons">⚠️ Cons</button>
                    <button type="button" className="btn-insert-tag" data-tag="deal">⚡ Deal</button>
                    <button type="button" className="btn-insert-tag" data-tag="table">📊 Table</button>
                  </div>
                </div>
                <textarea
                  name="content"
                  rows={9}
                  placeholder="Write your in-depth guide here... Use ## for section titles, ### for subheadings, - for bullets, and > for callouts."
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700, color: 'var(--ink)' }}>
                  <input type="checkbox" name="is_featured" value="1" style={{ width: '16px', height: '16px' }} />
                  ⭐ Feature as Hero Story
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700, color: 'var(--ink)' }}>
                  <input type="checkbox" name="is_published" value="1" defaultChecked style={{ width: '16px', height: '16px' }} />
                  🚀 Publish Immediately
                </label>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: 'var(--accent)', color: '#ffffff' }}>
                Publish Article to Storefront 🚀
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Add Department / Category */}
      <div id="addCategoryModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '580px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>📁 Add Store Department</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/categories/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Department Name *</label>
                <input name="name" type="text" placeholder="e.g. Fitness &amp; Outdoors" required />
              </div>
              <div className="form-group">
                <label>URL Slug *</label>
                <input name="slug" type="text" placeholder="e.g. fitness-outdoors" required />
              </div>
              <div className="form-group">
                <label>Icon Emoji</label>
                <input name="icon" type="text" placeholder="e.g. 🏃" defaultValue="📁" />
              </div>
              <div className="form-group">
                <label>Editorial Description</label>
                <textarea name="description" rows={3} placeholder="Department highlights and summary…"></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: 'var(--accent)', color: '#ffffff' }}>
                Create Department
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Create Promo Voucher */}
      <div id="addCouponModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '580px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>🏷️ Create Promo Voucher</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/coupons/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Coupon Code *</label>
                <input name="code" type="text" placeholder="e.g. DASHAIN2026" required style={{ textTransform: 'uppercase' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Discount Type</label>
                  <select name="discount_type">
                    <option value="fixed">Fixed NPR Discount</option>
                    <option value="percentage">Percentage Discount (%)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount Value *</label>
                  <input name="discount_value" type="number" placeholder="1000 or 15" required />
                </div>
              </div>
              <div className="form-group">
                <label>Minimum Purchase (NPR)</label>
                <input name="min_purchase" type="number" placeholder="5000" defaultValue="0" />
              </div>
              <div className="form-group">
                <label>Description / Terms</label>
                <input name="description" type="text" placeholder="Flat Rs. 1,000 OFF on electronics" />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal primary-action" style={{ background: '#ffffff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: 'var(--accent)', color: '#ffffff' }}>
                Publish Promo Voucher
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Admin Interactive Script for Modals */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              // 0. Add Product Modal Triggers
              const addProdModal = document.getElementById('addProductModal');
              document.querySelectorAll('#btnOpenAddProduct, .btn-trigger-add-product').forEach(btn => {
                btn.addEventListener('click', () => {
                  if (addProdModal) addProdModal.classList.add('open');
                });
              });

              // 0.01 Add Article, Category, Coupon Modal Triggers
              const addArtModal = document.getElementById('addArticleModal');
              document.querySelectorAll('.btn-trigger-add-article').forEach(btn => {
                btn.addEventListener('click', () => {
                  if (addArtModal) addArtModal.classList.add('open');
                });
              });

              const addCatModal = document.getElementById('addCategoryModal');
              document.querySelectorAll('.btn-trigger-add-category').forEach(btn => {
                btn.addEventListener('click', () => {
                  if (addCatModal) addCatModal.classList.add('open');
                });
              });

              const addCpnModal = document.getElementById('addCouponModal');
              document.querySelectorAll('.btn-trigger-add-coupon').forEach(btn => {
                btn.addEventListener('click', () => {
                  if (addCpnModal) addCpnModal.classList.add('open');
                });
              });

              // 0.02 Real-time Articles Live Search & Filter
              const artSearch = document.getElementById('adminArticleSearch');
              const artCatFilter = document.getElementById('adminArticleCategoryFilter');
              const artCountBadge = document.getElementById('filteredArticleCount');
              const artRows = document.querySelectorAll('.admin-article-row');

              function applyArticleFilters() {
                const q = (artSearch?.value || '').toLowerCase().trim();
                const cat = (artCatFilter?.value || '').toLowerCase().trim();
                let count = 0;

                artRows.forEach(row => {
                  const title = row.getAttribute('data-title') || '';
                  const author = row.getAttribute('data-author') || '';
                  const rowCat = row.getAttribute('data-category') || '';

                  const matchQ = !q || title.includes(q) || author.includes(q);
                  const matchC = !cat || rowCat.includes(cat);

                  if (matchQ && matchC) {
                    row.style.display = '';
                    count++;
                  } else {
                    row.style.display = 'none';
                  }
                });

                if (artCountBadge) artCountBadge.textContent = count + ' Articles';
              }

              if (artSearch) artSearch.addEventListener('input', applyArticleFilters);
              if (artCatFilter) artCatFilter.addEventListener('change', applyArticleFilters);

              // 0.1 Real-time Catalog Live Search & Filters
              const searchInput = document.getElementById('adminProductSearch');
              const catFilter = document.getElementById('adminCategoryFilter');
              const statusFilter = document.getElementById('adminStatusFilter');
              const countBadge = document.getElementById('filteredCountBadge');
              const productRows = document.querySelectorAll('.admin-product-row');

              function applyProductFilters() {
                const q = (searchInput?.value || '').toLowerCase().trim();
                const cat = (catFilter?.value || '').toLowerCase().trim();
                const st = (statusFilter?.value || '').toLowerCase().trim();
                let visibleCount = 0;

                productRows.forEach(row => {
                  const name = row.getAttribute('data-name') || '';
                  const brand = row.getAttribute('data-brand') || '';
                  const rowCat = row.getAttribute('data-category') || '';
                  const rowStore = row.getAttribute('data-store') || '';
                  const rowStatus = row.getAttribute('data-status') || '';
                  const rowEmi = row.getAttribute('data-emi') || '';

                  const matchQuery = !q || name.includes(q) || brand.includes(q) || rowStore.includes(q) || rowCat.includes(q);
                  const matchCat = !cat || rowCat === cat;
                  let matchStatus = true;
                  if (st === 'active') matchStatus = rowStatus === 'active';
                  else if (st === 'draft') matchStatus = rowStatus === 'draft';
                  else if (st === 'emi') matchStatus = rowEmi === 'emi';

                  if (matchQuery && matchCat && matchStatus) {
                    row.style.display = '';
                    visibleCount++;
                  } else {
                    row.style.display = 'none';
                  }
                });

                if (countBadge) countBadge.textContent = visibleCount + ' Items';
              }

              if (searchInput) searchInput.addEventListener('input', applyProductFilters);
              if (catFilter) catFilter.addEventListener('change', applyProductFilters);
              if (statusFilter) statusFilter.addEventListener('change', applyProductFilters);

              // 1. Edit Product Modal Triggers
              const editProdModal = document.getElementById('editProductModal');
              const editProdForm = document.getElementById('editProductForm');
              document.querySelectorAll('.btn-edit-product').forEach(btn => {
                btn.addEventListener('click', () => {
                  const id = btn.getAttribute('data-id');
                  if (editProdForm) editProdForm.action = '/admin/products/' + id + '/edit';
                  const setVal = (elId, attr) => {
                    const el = document.getElementById(elId);
                    if (el) el.value = btn.getAttribute(attr) || '';
                  };
                  setVal('editProdId', 'data-id');
                  setVal('editProdName', 'data-name');
                  setVal('editProdPrice', 'data-price');
                  setVal('editProdOriginalPrice', 'data-original-price');
                  setVal('editProdCategory', 'data-category-id');
                  setVal('editProdStore', 'data-store');
                  setVal('editProdBadge', 'data-badge');
                  setVal('editProdBrand', 'data-brand');
                  setVal('editProdAffiliate', 'data-affiliate');
                  setVal('editProdImage', 'data-image');
                  setVal('editProdDesc', 'data-desc');
                  setVal('editProdActive', 'data-active');
                  setVal('editProdVerdict', 'data-verdict');
                  const emiEl = document.getElementById('editProdEmiAvailable');
                  if (emiEl) emiEl.checked = btn.getAttribute('data-emi') === '1';
                  if (editProdModal) editProdModal.classList.add('open');
                });
              });

              // 2. Edit Category Modal Triggers
              const editCatModal = document.getElementById('editCategoryModal');
              const editCatForm = document.getElementById('editCategoryForm');
              document.querySelectorAll('.btn-edit-category').forEach(btn => {
                btn.addEventListener('click', () => {
                  const id = btn.getAttribute('data-id');
                  if (editCatForm) editCatForm.action = '/admin/categories/' + id + '/edit';
                  const setVal = (elId, attr) => {
                    const el = document.getElementById(elId);
                    if (el) el.value = btn.getAttribute(attr) || '';
                  };
                  setVal('editCatId', 'data-id');
                  setVal('editCatName', 'data-name');
                  setVal('editCatSlug', 'data-slug');
                  setVal('editCatIcon', 'data-icon');
                  setVal('editCatDesc', 'data-desc');
                  setVal('editCatActive', 'data-active');
                  if (editCatModal) editCatModal.classList.add('open');
                });
              });

              // 3. Edit Coupon Modal Triggers
              const editCouponModal = document.getElementById('editCouponModal');
              const editCouponForm = document.getElementById('editCouponForm');
              document.querySelectorAll('.btn-edit-coupon').forEach(btn => {
                btn.addEventListener('click', () => {
                  const id = btn.getAttribute('data-id');
                  if (editCouponForm) editCouponForm.action = '/admin/coupons/' + id + '/edit';
                  const setVal = (elId, attr) => {
                    const el = document.getElementById(elId);
                    if (el) el.value = btn.getAttribute(attr) || '';
                  };
                  setVal('editCouponId', 'data-id');
                  setVal('editCouponCode', 'data-code');
                  setVal('editCouponType', 'data-type');
                  setVal('editCouponValue', 'data-value');
                  setVal('editCouponMin', 'data-min');
                  setVal('editCouponDesc', 'data-desc');
                  setVal('editCouponActive', 'data-active');
                  if (editCouponModal) editCouponModal.classList.add('open');
                });
              });

              // 4. Edit Product Scores Modal Triggers
              const scoresModal = document.getElementById('editProductScoresModal');
              const scoresForm = document.getElementById('editProductScoresForm');
              document.querySelectorAll('.btn-scores-product').forEach(btn => {
                btn.addEventListener('click', () => {
                  const id = btn.getAttribute('data-id');
                  if (scoresForm) scoresForm.action = '/admin/products/' + id + '/scores';
                  const titleEl = document.getElementById('scoresProductName');
                  if (titleEl) titleEl.textContent = btn.getAttribute('data-name') || ('Product #' + id);
                  const setVal = (elId, attr) => {
                    const el = document.getElementById(elId);
                    if (el) el.value = btn.getAttribute(attr) || '';
                  };
                  setVal('scoresProductId', 'data-id');
                  setVal('scoreDisplay', 'data-display');
                  setVal('scorePerformance', 'data-performance');
                  setVal('scoreCamera', 'data-camera');
                  setVal('scoreBattery', 'data-battery');
                  setVal('scoreValue', 'data-value');
                  setVal('scoreOverall', 'data-overall');
                  setVal('scoreVerdict', 'data-verdict');
                  if (scoresModal) scoresModal.classList.add('open');
                });
              });

              // 5. Edit Article Modal Triggers
              const editArtModal = document.getElementById('editArticleModal');
              const editArtForm = document.getElementById('editArticleForm');
              document.querySelectorAll('.btn-edit-article').forEach(btn => {
                btn.addEventListener('click', () => {
                  const id = btn.getAttribute('data-id');
                  if (editArtForm) editArtForm.action = '/admin/articles/' + id + '/edit';
                  const setVal = (elId, attr) => {
                    const el = document.getElementById(elId);
                    if (el) el.value = btn.getAttribute(attr) || '';
                  };
                  setVal('editArticleId', 'data-id');
                  setVal('editArticleTitle', 'data-title');
                  setVal('editArticleSlug', 'data-slug');
                  setVal('editArticleCat', 'data-category');
                  setVal('editArticleAuthor', 'data-author');
                  setVal('editArticleCover', 'data-cover');
                  setVal('editArticleReadTime', 'data-readtime');
                  setVal('editArticleTags', 'data-tags');
                  setVal('editArticleExcerpt', 'data-excerpt');
                  setVal('editArticleContent', 'data-content');
                  const featEl = document.getElementById('editArticleFeatured');
                  if (featEl) featEl.checked = btn.getAttribute('data-featured') === '1';
                  const pubEl = document.getElementById('editArticlePublished');
                  if (pubEl) pubEl.checked = btn.getAttribute('data-published') === '1';
                  if (editArtModal) editArtModal.classList.add('open');
                });
              });

              // 6. Article Formatting Toolbar Snippet Inserter
              document.querySelectorAll('.btn-insert-tag').forEach(btn => {
                btn.addEventListener('click', () => {
                  const tag = btn.getAttribute('data-tag');
                  const formGroup = btn.closest('.form-group');
                  if (!formGroup) return;
                  const textarea = formGroup.querySelector('textarea');
                  if (!textarea) return;

                  let snippet = '';
                  if (tag === 'h2') snippet = '\n\n## Section Title Here\n';
                  else if (tag === 'h3') snippet = '\n\n### Subheading Here\n';
                  else if (tag === 'pros') snippet = '\n\n[pros]\n- High-resolution AMOLED 120Hz display\n- Official 1-year GenNext Nepal warranty\n- All-day battery endurance\n[/pros]\n';
                  else if (tag === 'cons') snippet = '\n\n[cons]\n- Charger not included in retail package\n- Premium pricing in Nepal\n[/cons]\n';
                  else if (tag === 'deal') snippet = '\n\n[deal: 18 | Daraz Mall | Rs. 84,999 | https://www.daraz.com.np/products/...]\n';
                  else if (tag === 'table') snippet = '\n\n| Specification | Details |\n| :--- | :--- |\n| Processor | Apple A18 Pro 3nm |\n| Display | 6.9-inch Super Retina XDR OLED |\n| Battery | Up to 33 hours video playback |\n| Price in Nepal | Rs. 214,999 (256GB) |\n';

                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const text = textarea.value;
                  textarea.value = text.substring(0, start) + snippet + text.substring(end);
                  textarea.focus();
                  textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
                });
              });

              // Modal close helpers
              document.querySelectorAll('.close-admin-modal').forEach(btn => {
                btn.addEventListener('click', () => {
                  document.querySelectorAll('.admin-modal-backdrop').forEach(m => m.classList.remove('open'));
                });
              });

              document.querySelectorAll('.admin-modal-backdrop').forEach(backdrop => {
                backdrop.addEventListener('click', (e) => {
                  if (e.target === backdrop) backdrop.classList.remove('open');
                });
              });

              document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                  document.querySelectorAll('.admin-modal-backdrop').forEach(m => m.classList.remove('open'));
                }
              });
            });
          `
        }}
      />
    </Layout>
  );
};
