import { FC } from 'hono/jsx';
import { Category, Product, Review, SiteSettings, User, Coupon } from '../types';
import { Layout } from './layout';

export const AdminLoginView: FC<{ error?: string; success?: string }> = ({ error, success }) => {
  return (
    <Layout title="Admin Portal Login — BuyerNepal">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', padding: '20px' }}>
        <div className="admin-login-box">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="store-logo-mark" style={{ margin: '0 auto 14px' }}>B</span>
            <h1>BuyerNepal Admin</h1>
            <p>Enter your credentials to access store controls and management.</p>
          </div>

          {error && <div className="alert-box alert-error">{error}</div>}
          {success && <div className="alert-box alert-success">{success}</div>}

          <form method="post" action="/admin/login">
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <input id="username" name="username" type="text" placeholder="e.g. admin" required autoFocus />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>

            <button
              type="submit"
              className="primary-action"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px' }}
            >
              Sign In to Management Portal
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px' }}>
            <a href="/" style={{ color: '#6b7280' }}>← Return to Public Storefront</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const AdminDashboardView: FC<{
  currentUser: { id: number | string; username: string; email: string; role: string };
  stats: { products: number; categories: number; users: number; pendingReviews: number; activeCoupons: number };
  products: Product[];
  categories: Category[];
  users: User[];
  reviews: Review[];
  coupons: Coupon[];
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
  settings,
  activeTab = 'overview',
  notice
}) => {
  return (
    <Layout title="Admin Management Portal — BuyerNepal">
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Top Navbar */}
        <div style={{ background: '#111827', color: '#fff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="store-logo-mark" style={{ width: '32px', height: '32px', fontSize: '15px' }}>B</span>
            <strong>BuyerNepal Portal</strong>
            <span className="badge badge-admin">Production Edge SSR</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
            <span style={{ color: '#9ca3af' }}>
              Logged in: <b>{currentUser.username}</b> ({currentUser.role})
            </span>
            <a href="/" target="_blank" style={{ color: '#60a5fa', fontWeight: 600 }}>
              Live Store ↗
            </a>
            <form method="post" action="/api/auth/logout" style={{ display: 'inline' }}>
              <button
                type="submit"
                style={{
                  background: 'transparent',
                  border: '1px solid #4b5563',
                  color: '#fff',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        <main className="store-shell" style={{ padding: '32px 0' }}>
          {notice && (
            <div className={`alert-box alert-${notice.type}`}>
              {notice.message}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="admin-tabs">
            <button type="button" className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} data-tab="overview">
              📊 Overview
            </button>
            <button type="button" className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`} data-tab="products">
              🛍️ Products ({products.length})
            </button>
            <button type="button" className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`} data-tab="categories">
              📂 Menu &amp; Categories ({categories.length})
            </button>
            <button type="button" className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`} data-tab="users">
              👥 User System ({users.length})
            </button>
            <button type="button" className={`admin-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} data-tab="reviews">
              ⭐ Reviews ({reviews.length})
            </button>
            <button type="button" className={`admin-tab-btn ${activeTab === 'coupons' ? 'active' : ''}`} data-tab="coupons">
              🏷️ Coupons ({coupons.length})
            </button>
            <button type="button" className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`} data-tab="settings">
              ⚙️ Site Settings
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          <div id="tab-overview" className="admin-tab-pane" style={{ display: activeTab === 'overview' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.8px' }}>PRODUCTS</span>
                <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.products}</strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.8px' }}>CATEGORIES</span>
                <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.categories}</strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.8px' }}>PENDING REVIEWS</span>
                <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: stats.pendingReviews > 0 ? '#e11d48' : '#111827' }}>
                  {stats.pendingReviews}
                </strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.8px' }}>REGISTERED USERS</span>
                <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.users}</strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.8px' }}>COUPONS</span>
                <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.activeCoupons}</strong>
              </div>
            </div>

            <div className="admin-card">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Quick Actions &amp; Recent Products</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>{p.category_name || 'General'}</td>
                      <td>Rs. {p.price.toLocaleString('en-NP')}</td>
                      <td>
                        <span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>
                          {p.is_active ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <a href={`/product/${p.id}`} target="_blank" className="secondary-action" style={{ padding: '4px 10px', fontSize: '12px' }}>
                          View ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TAB 2: PRODUCTS */}
          <div id="tab-products" className="admin-tab-pane" style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
              {/* Add Product Form */}
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Add New Product</h2>
                <form method="post" action="/admin/products/new">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input name="name" type="text" placeholder="e.g. Sony WH-1000XM5" required />
                  </div>
                  <div className="form-group">
                    <label>Price (NPR) *</label>
                    <input name="price" type="number" step="1" placeholder="42999" required />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category_id">
                      <option value="">-- Select Category --</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Affiliate / Store URL</label>
                    <input name="affiliate_url" type="url" placeholder="https://..." />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input name="image_url" type="url" placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" rows={3} placeholder="Highlights and specifications..."></textarea>
                  </div>
                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Publish Product
                  </button>
                </form>
              </div>

              {/* Product Listing */}
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Curated Catalog ({products.length})</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <strong style={{ display: 'block', color: '#111827' }}>{p.name}</strong>
                            <small style={{ color: '#9ca3af' }}>{p.category_name || 'No Category'}</small>
                          </td>
                          <td>Rs. {p.price.toLocaleString('en-NP')}</td>
                          <td>
                            <span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>
                              {p.is_active ? 'Active' : 'Hidden'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <form method="post" action={`/admin/products/${p.id}/delete`} style={{ display: 'inline' }}>
                              <button type="submit" className="danger-action" onClick={() => confirm('Delete product?')}>
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
            </div>
          </div>

          {/* TAB 3: MENU & CATEGORIES */}
          <div id="tab-categories" className="admin-tab-pane" style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Add Category / Menu Item</h2>
                <form method="post" action="/admin/categories/new">
                  <div className="form-group">
                    <label>Category Name *</label>
                    <input name="name" type="text" placeholder="e.g. Smart Watches" required />
                  </div>
                  <div className="form-group">
                    <label>URL Slug *</label>
                    <input name="slug" type="text" placeholder="e.g. smart-watches" required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" rows={3} placeholder="Category description..."></textarea>
                  </div>
                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Create Category
                  </button>
                </form>
              </div>

              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Storefront Navigation Menu ({categories.length})</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                  These categories appear directly in the top header and the mobile navigation drawer.
                </p>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td><code>/{c.slug}</code></td>
                        <td>
                          <span className={`badge ${c.is_active ? 'badge-active' : 'badge-inactive'}`}>
                            {c.is_active ? 'Active' : 'Draft'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <a href={`/category/${c.slug}`} target="_blank" className="secondary-action" style={{ padding: '4px 10px', fontSize: '12px', marginRight: '6px' }}>
                            View ↗
                          </a>
                          <form method="post" action={`/admin/categories/${c.id}/delete`} style={{ display: 'inline' }}>
                            <button type="submit" className="danger-action" onClick={() => confirm('Delete category?')}>
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
          </div>

          {/* TAB 4: USER SYSTEM */}
          <div id="tab-users" className="admin-tab-pane" style={{ display: activeTab === 'users' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
              {/* Create User Form */}
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Create New User</h2>
                <form method="post" action="/admin/users/new">
                  <div className="form-group">
                    <label>Username *</label>
                    <input name="username" type="text" placeholder="e.g. editor1" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" placeholder="user@buyernepal.com" required />
                  </div>
                  <div className="form-group">
                    <label>Password (min 8 characters) *</label>
                    <input name="password" type="password" placeholder="••••••••" required />
                  </div>
                  <div className="form-group">
                    <label>Access Role *</label>
                    <select name="role" required>
                      <option value="user">User (Customer / Viewer)</option>
                      <option value="moderator">Moderator (Reviews &amp; Catalog)</option>
                      <option value="admin">Admin (Full Control)</option>
                    </select>
                  </div>
                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Create Account
                  </button>
                </form>
              </div>

              {/* Users Listing */}
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Registered Accounts ({users.length})</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <strong style={{ display: 'block' }}>{u.username}</strong>
                            <small style={{ color: '#9ca3af' }}>{u.email}</small>
                          </td>
                          <td>
                            <span className={`badge badge-${u.role}`}>{u.role}</span>
                          </td>
                          <td>
                            <span className={`badge ${u.is_active ? 'badge-active' : 'badge-inactive'}`}>
                              {u.is_active ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {u.id !== currentUser.id && (
                              <>
                                <form method="post" action={`/admin/users/${u.id}/toggle-status`} style={{ display: 'inline', marginRight: '6px' }}>
                                  <input type="hidden" name="is_active" value={u.is_active ? '0' : '1'} />
                                  <button type="submit" className="secondary-action" style={{ padding: '4px 8px', fontSize: '11px' }}>
                                    {u.is_active ? 'Deactivate' : 'Activate'}
                                  </button>
                                </form>
                                <form method="post" action={`/admin/users/${u.id}/delete`} style={{ display: 'inline' }}>
                                  <button type="submit" className="danger-action" onClick={() => confirm('Delete user?')}>
                                    Delete
                                  </button>
                                </form>
                              </>
                            )}
                            {u.id === currentUser.id && (
                              <span style={{ color: '#9ca3af', fontSize: '11px' }}>Current User</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* TAB 5: REVIEWS */}
          <div id="tab-reviews" className="admin-tab-pane" style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
            <div className="admin-card">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Customer Reviews Moderation ({reviews.length})</h2>
              {reviews.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Shopper</th>
                      <th>Rating</th>
                      <th>Comment</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600 }}>{r.product_name || `Product #${r.product_id}`}</td>
                        <td>{r.user_name}</td>
                        <td style={{ color: '#f59e0b' }}>{'★'.repeat(r.rating)}</td>
                        <td style={{ maxWidth: '300px' }}>{r.comment}</td>
                        <td>
                          <span className={`badge ${r.status === 'approved' ? 'badge-active' : 'badge-inactive'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          {r.status !== 'approved' && (
                            <form method="post" action={`/admin/reviews/${r.id}/approve`} style={{ display: 'inline', marginRight: '6px' }}>
                              <button type="submit" className="primary-action" style={{ padding: '4px 8px', fontSize: '11px', background: '#16a34a' }}>
                                Approve
                              </button>
                            </form>
                          )}
                          <form method="post" action={`/admin/reviews/${r.id}/delete`} style={{ display: 'inline' }}>
                            <button type="submit" className="danger-action">Delete</button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#9ca3af', padding: '20px 0' }}>No customer reviews to moderate.</p>
              )}
            </div>
          </div>

          {/* TAB 6: COUPONS */}
          <div id="tab-coupons" className="admin-tab-pane" style={{ display: activeTab === 'coupons' ? 'block' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Create Coupon</h2>
                <form method="post" action="/admin/coupons/new">
                  <div className="form-group">
                    <label>Coupon Code *</label>
                    <input name="code" type="text" placeholder="DASHAIN20" required />
                  </div>
                  <div className="form-group">
                    <label>Discount Type</label>
                    <select name="discount_type">
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (NPR)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Discount Value *</label>
                    <input name="discount_value" type="number" placeholder="15" required />
                  </div>
                  <div className="form-group">
                    <label>Minimum Purchase</label>
                    <input name="min_purchase" type="number" placeholder="1000" />
                  </div>
                  <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
                    Save Coupon
                  </button>
                </form>
              </div>

              <div className="admin-card">
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Active Discount Codes ({coupons.length})</h2>
                {coupons.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Min Spend</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((c) => (
                        <tr key={c.id}>
                          <td><strong>{c.code}</strong></td>
                          <td>{c.discount_type === 'percentage' ? `${c.discount_value}%` : `Rs. ${c.discount_value}`}</td>
                          <td>Rs. {c.min_purchase}</td>
                          <td style={{ textAlign: 'right' }}>
                            <form method="post" action={`/admin/coupons/${c.id}/delete`} style={{ display: 'inline' }}>
                              <button type="submit" className="danger-action">Delete</button>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: '#9ca3af', padding: '20px 0' }}>No coupons active right now.</p>
                )}
              </div>
            </div>
          </div>

          {/* TAB 7: SETTINGS */}
          <div id="tab-settings" className="admin-tab-pane" style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
            <div className="admin-card" style={{ maxWidth: '700px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Storefront Configuration</h2>
              <form method="post" action="/admin/settings">
                <div className="form-group">
                  <label>Site Title</label>
                  <input name="site_title" type="text" value={settings.site_title || 'BuyerNepal'} />
                </div>
                <div className="form-group">
                  <label>Site Meta Description</label>
                  <textarea name="site_description" rows={2} value={settings.site_description || ''}></textarea>
                </div>
                <div className="form-group">
                  <label>Site Logo URL</label>
                  <input name="site_logo" type="url" value={settings.site_logo || ''} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input name="contact_email" type="email" value={settings.contact_email || ''} placeholder="contact@buyernepal.com" />
                </div>
                <div className="form-group">
                  <label>Custom Homepage Content (HTML/Notice banner)</label>
                  <textarea name="homepage_html" rows={3} value={settings.homepage_html || ''}></textarea>
                </div>
                <button type="submit" className="primary-action">
                  Save All Settings
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};
