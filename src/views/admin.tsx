import { FC } from 'hono/jsx';
import { Category, Product, Review, SiteSettings, User, Coupon, Article } from '../types';
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
  stats: { products: number; categories: number; users: number; pendingReviews: number; activeCoupons: number; articles?: number };
  products: Product[];
  categories: Category[];
  users: User[];
  reviews: Review[];
  coupons: Coupon[];
  articles?: Article[];
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
          </div>

          <nav className="admin-nav">
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
            <a
              href="/admin?tab=blog"
              className={`admin-nav-item ${activeTab === 'blog' ? 'active' : ''}`}
            >
              <span>📰 Tech Guides CMS</span>
              <span className="admin-nav-badge" style={{ background: '#f59e0b' }}>{articles.length}</span>
            </a>
            <a
              href="/admin?tab=users"
              className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            >
              <span>👥 User Access</span>
              <span className="admin-nav-badge" style={{ background: '#64748b' }}>{users.length}</span>
            </a>
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
          </nav>

          <div style={{ padding: '20px', borderTop: '1px solid #1e293b', fontSize: '12px', color: '#64748b' }}>
            <span style={{ display: 'block', color: '#cbd5e1', fontWeight: 700 }}>
              Logged in: {currentUser.username}
            </span>
            <span style={{ display: 'block', marginTop: '2px' }}>Role: {currentUser.role}</span>
            <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
              <a href="/" target="_blank" style={{ color: '#60a5fa', fontWeight: 600 }}>Live Store ↗</a>
              <span>•</span>
              <a href="/admin/logout" style={{ color: '#f87171', fontWeight: 600 }}>Sign Out</a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          {/* Top Info Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.8px' }}>
                {activeTab === 'overview' && 'Executive Overview & Analytics'}
                {activeTab === 'products' && 'Curated Products Catalog'}
                {activeTab === 'categories' && 'Departments & Menu Hierarchy'}
                {activeTab === 'reviews' && 'Customer Review Moderation'}
                {activeTab === 'coupons' && 'Promo Coupons & Discount Codes'}
                {activeTab === 'users' && 'Staff & User Access Control'}
                {activeTab === 'customizer' && 'Store Customizer & Feature Flags'}
                {activeTab === 'settings' && 'Store Branding & Global Settings'}
              </h1>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Cloudflare Workers Fullstack Edge SSR • Kathmandu, Nepal
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/" target="_blank" className="primary-action" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid var(--line)' }}>
                View Storefront ↗
              </a>
              <form method="post" action="/admin/seed" style={{ display: 'inline' }}>
                <button
                  type="submit"
                  className="primary-action"
                  title="Populate or refresh D1 database with 22+ curated Nepali products"
                  style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
                >
                  🌱 Seed Catalog in D1
                </button>
              </form>
              <form
                method="post"
                action="/admin/catalog/clear"
                onsubmit="return confirm('⚠️ ARE YOU SURE? This will permanently wipe all products, categories, coupons, and reviews from D1. Admin user accounts will remain safe.');"
                style={{ display: 'inline' }}
              >
                <button
                  type="submit"
                  className="primary-action"
                  title="Wipe all products, categories, coupons, and reviews from D1"
                  style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
                >
                  🗑️ Clear Catalog in D1
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
              {/* Stat Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <span className="admin-stat-label">CURATED PRODUCTS</span>
                  <strong className="admin-stat-value">{stats.products}</strong>
                  <span className="admin-stat-trend">↑ Active in 7 departments</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">DEPARTMENTS</span>
                  <strong className="admin-stat-value">{stats.categories}</strong>
                  <span className="admin-stat-trend">↑ Verified categories</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">PENDING REVIEWS</span>
                  <strong className="admin-stat-value" style={{ color: pendingReviews.length > 0 ? '#e11d48' : '#0f172a' }}>
                    {pendingReviews.length}
                  </strong>
                  <span className="admin-stat-trend" style={{ color: pendingReviews.length > 0 ? '#e11d48' : '#64748b' }}>
                    {pendingReviews.length > 0 ? 'Requires moderation' : 'All reviews moderated'}
                  </span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">ACTIVE PROMOS</span>
                  <strong className="admin-stat-value">{stats.activeCoupons}</strong>
                  <span className="admin-stat-trend">↑ Active vouchers</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">TECH GUIDES &amp; BLOG</span>
                  <strong className="admin-stat-value" style={{ color: '#d97706' }}>{stats.articles || articles.length}</strong>
                  <span className="admin-stat-trend">↑ Editorial stories</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">AUTHORIZED USERS</span>
                  <strong className="admin-stat-value">{stats.users}</strong>
                  <span className="admin-stat-trend">Staff access granted</span>
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

          {/* TAB 2: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
              {/* Add Product Form */}
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Add Curated Product</h2>
                <form method="post" action="/admin/products/new">
                  <div className="form-group">
                    <label>Product Title *</label>
                    <input name="name" type="text" placeholder="e.g. Sony WH-1000XM5 Headphones" required />
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
                      <label>Department</label>
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
                    <input name="affiliate_url" type="url" placeholder="https://www.daraz.com.np/..." />
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input name="image_url" type="url" placeholder="https://images.unsplash.com/..." />
                  </div>

                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-subtle, #f8fafc)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line, #e2e8f0)' }}>
                    <input type="checkbox" id="addProdEmi" name="emi_available" value="1" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    <label htmlFor="addProdEmi" style={{ margin: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>
                      💳 0% Bank EMI Available in Nepal (Nabil, NIC Asia, Global IME, etc.)
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Editorial Verdict &amp; Nepal Buying Advice</label>
                    <textarea name="verdict" rows={2} placeholder="Our bottom-line recommendation for Nepali shoppers…"></textarea>
                  </div>

                  <div className="form-group">
                    <label>Description &amp; Specs Highlights</label>
                    <textarea name="description" rows={3} placeholder="Highlights, specs and warranty details…"></textarea>
                  </div>

                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Publish Product to Nepal Catalog
                  </button>
                </form>
              </div>

              {/* Product Listing Table */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Catalog Items ({products.length})</h2>
                </div>
                <div style={{ overflowX: 'auto', maxHeight: '700px' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Store</th>
                        <th>Price</th>
                        <th>0% EMI</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {p.image_url ? (
                                <img src={p.image_url} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                              ) : (
                                <span style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#f1f5f9', display: 'grid', placeItems: 'center' }}>🛍️</span>
                              )}
                              <div>
                                <span style={{ fontWeight: 700, display: 'block' }}>{p.name}</span>
                                <span style={{ fontSize: '11px', color: '#64748b' }}>{p.category_name || 'General'}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '11px', fontWeight: 600, background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                              {p.store_name || 'Daraz Mall'}
                            </span>
                          </td>
                          <td style={{ fontWeight: 800 }}>Rs. {Number(p.price).toLocaleString('en-NP')}</td>
                          <td>
                            {p.emi_available === 1 ? (
                              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '3px 8px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                💳 Yes
                              </span>
                            ) : (
                              <span style={{ fontSize: '11px', color: '#94a3b8', background: '#f1f5f9', padding: '3px 8px', borderRadius: '12px' }}>
                                No
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
                              >
                                {p.is_active ? 'Active' : 'Draft'}
                              </button>
                            </form>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              <a href={`/product/${p.id}`} target="_blank" className="primary-action" style={{ padding: '4px 8px', fontSize: '11px', background: '#0f172a' }}>
                                View ↗
                              </a>
                              <button
                                type="button"
                                className="btn-scores-product primary-action"
                                style={{ padding: '4px 8px', fontSize: '11px', background: '#d97706', border: 0, cursor: 'pointer' }}
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
                                style={{ padding: '4px 8px', fontSize: '11px', background: '#2563eb', border: 0, cursor: 'pointer' }}
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
                              <form method="post" action={`/admin/products/${p.id}/delete`} onsubmit="return confirm('Delete this product?');" style={{ display: 'inline' }}>
                                <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
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

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'categories' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Add Department</h2>
                <form method="post" action="/admin/categories/new">
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
                    <label>Description</label>
                    <textarea name="description" rows={3} placeholder="Department highlights…"></textarea>
                  </div>
                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Create Department
                  </button>
                </form>
              </div>

              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Existing Departments ({categories.length})</h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Icon &amp; Name</th>
                      <th>Slug</th>
                      <th>Description</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 700 }}>
                          <span style={{ marginRight: '8px' }}>{c.icon || '📁'}</span> {c.name}
                        </td>
                        <td style={{ color: '#64748b' }}>{c.slug}</td>
                        <td style={{ fontSize: '12px', color: '#64748b', maxWidth: '280px' }}>{c.description}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            <button
                              type="button"
                              className="btn-edit-category primary-action"
                              style={{ padding: '4px 8px', fontSize: '11px', background: '#2563eb', border: 0, cursor: 'pointer' }}
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
                              <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
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

          {/* TAB 5: COUPONS */}
          {activeTab === 'coupons' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Create Promo Voucher</h2>
                <form method="post" action="/admin/coupons/new">
                  <div className="form-group">
                    <label>Coupon Code *</label>
                    <input name="code" type="text" placeholder="e.g. DASHAIN2026" required style={{ textTransform: 'uppercase' }} />
                  </div>
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
                  <div className="form-group">
                    <label>Minimum Purchase (NPR)</label>
                    <input name="min_purchase" type="number" placeholder="5000" defaultValue="0" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input name="description" type="text" placeholder="Flat Rs. 1,000 OFF on electronics" />
                  </div>
                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Publish Promo Voucher
                  </button>
                </form>
              </div>

              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Active Promo Vouchers ({coupons.length})</h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Min Purchase</th>
                      <th>Description</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 800, color: '#e11d48' }}>{c.code}</td>
                        <td style={{ fontWeight: 700 }}>
                          {c.discount_type === 'percentage' ? `${c.discount_value}%` : `Rs. ${c.discount_value}`}
                        </td>
                        <td>Rs. {c.min_purchase.toLocaleString('en-NP')}</td>
                        <td style={{ fontSize: '12px', color: '#64748b' }}>{c.description}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            <button
                              type="button"
                              className="btn-edit-coupon primary-action"
                              style={{ padding: '4px 8px', fontSize: '11px', background: '#2563eb', border: 0, cursor: 'pointer' }}
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
                              <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
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

          {/* TAB: TECH GUIDES & BLOG CMS */}
          {activeTab === 'blog' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
              {/* Add Article Form */}
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
                  ✍️ Write New Tech Guide / Review
                </h2>
                <form method="post" action="/admin/articles/new">
                  <div className="form-group">
                    <label>Article Title *</label>
                    <input name="title" type="text" placeholder="e.g. Best Mobile Phones Under 30,000 in Nepal (2026)" required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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

                  <div className="form-group">
                    <label>Author Byline *</label>
                    <input name="author_name" type="text" defaultValue="BuyerNepal Editorial Team" required />
                  </div>

                  <div className="form-group">
                    <label>Cover Image URL *</label>
                    <input name="cover_image" type="url" placeholder="https://images.unsplash.com/..." required />
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
                    <label>Article Body (Markdown supported) *</label>
                    <textarea
                      name="content"
                      rows={8}
                      placeholder="Write your in-depth guide here... Use ## for section titles, ### for subheadings, - for bullets, and > for callouts."
                      required
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                      <input type="checkbox" name="is_featured" value="1" />
                      ⭐ Feature as Hero Story
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                      <input type="checkbox" name="is_published" value="1" defaultChecked />
                      🚀 Publish Immediately
                    </label>
                  </div>

                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Publish Article to Storefront
                  </button>
                </form>
              </div>

              {/* Articles Management Table */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                      Editorial Magazine Articles ({articles.length})
                    </h2>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>
                      Publish, moderate, or edit tech journalism and consumer buying guides.
                    </p>
                  </div>
                  <a href="/blog" target="_blank" className="primary-action" style={{ padding: '6px 12px', fontSize: '12px', background: '#0f172a' }}>
                    View Magazine ↗
                  </a>
                </div>

                <div style={{ overflowX: 'auto', maxHeight: '700px' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Guide Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Views</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((art) => (
                        <tr key={art.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img
                                src={art.cover_image}
                                alt=""
                                style={{ width: '42px', height: '32px', borderRadius: '4px', objectFit: 'cover' }}
                              />
                              <div>
                                <span style={{ fontWeight: 700, display: 'block' }}>{art.title}</span>
                                <span style={{ fontSize: '11px', color: '#64748b' }}>
                                  /{art.slug} {art.is_featured === 1 && '• ⭐ Hero'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                              {art.category}
                            </span>
                          </td>
                          <td style={{ fontSize: '12px', color: '#475569' }}>{art.author_name}</td>
                          <td style={{ fontSize: '12px', fontWeight: 700 }}>👁️ {art.views_count || 0}</td>
                          <td>
                            <form method="post" action={`/admin/articles/${art.id}/toggle`} style={{ display: 'inline' }}>
                              <input type="hidden" name="is_published" value={art.is_published ? '0' : '1'} />
                              <button
                                type="submit"
                                className={`badge ${art.is_published ? 'badge-active' : 'badge-inactive'}`}
                                style={{ border: 0, cursor: 'pointer' }}
                              >
                                {art.is_published ? 'Published' : 'Draft'}
                              </button>
                            </form>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              <a
                                href={`/blog/${art.slug}`}
                                target="_blank"
                                className="primary-action"
                                style={{ padding: '4px 8px', fontSize: '11px', background: '#0f172a' }}
                              >
                                View ↗
                              </a>
                              <button
                                type="button"
                                className="btn-edit-article primary-action"
                                style={{ padding: '4px 8px', fontSize: '11px', background: '#2563eb', border: 0, cursor: 'pointer' }}
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
                                onsubmit="return confirm('Delete this article?');"
                                style={{ display: 'inline' }}
                              >
                                <button
                                  type="submit"
                                  style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
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
        </main>
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
                <label>Content (Markdown) *</label>
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

      {/* Admin Interactive Script for Modals */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
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
