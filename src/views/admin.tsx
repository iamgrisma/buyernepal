import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings } from '../types';
import { Layout } from './layout';

export const AdminLoginView: FC<{ error?: string }> = ({ error }) => {
  return (
    <Layout title="Admin Login — BuyerNepal">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', padding: '20px' }}>
        <div className="admin-login-box">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="store-logo-mark" style={{ margin: '0 auto 12px' }}>B</span>
            <h1>BuyerNepal Admin</h1>
            <p>Enter your administrator credentials to manage the platform.</p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form method="post" action="/admin/login">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" required autoFocus />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required />
            </div>

            <button
              type="submit"
              className="primary-action"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px' }}
            >
              Sign In to Dashboard
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px' }}>
            <a href="/" style={{ color: '#6b7280' }}>← Return to Storefront</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const AdminDashboardView: FC<{
  user: { username: string; email: string };
  stats: { products: number; categories: number; users: number; pendingReviews: number; activeCoupons: number };
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
}> = ({ user, stats, products, categories, settings }) => {
  return (
    <Layout title="Admin Dashboard — BuyerNepal">
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Top bar */}
        <div style={{ background: '#111827', color: '#fff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="store-logo-mark" style={{ width: '30px', height: '30px', fontSize: '14px' }}>B</span>
            <strong>BuyerNepal Admin</strong>
            <span style={{ background: '#374151', color: '#9ca3af', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>Edge SSR</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
            <span style={{ color: '#9ca3af' }}>Logged in as <b>{user.username}</b></span>
            <a href="/" target="_blank" style={{ color: '#60a5fa' }}>View Store ↗</a>
            <form method="post" action="/api/auth/logout" style={{ display: 'inline' }}>
              <button type="submit" style={{ background: 'transparent', border: '1px solid #4b5563', color: '#fff', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                Sign Out
              </button>
            </form>
          </div>
        </div>

        <main className="store-shell" style={{ padding: '36px 0' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-1px' }}>
            Dashboard Overview
          </h1>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '36px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>TOTAL PRODUCTS</span>
              <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.products}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>CATEGORIES</span>
              <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.categories}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>PENDING REVIEWS</span>
              <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: stats.pendingReviews > 0 ? '#e11d48' : '#111827' }}>{stats.pendingReviews}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>ACTIVE COUPONS</span>
              <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.activeCoupons}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>USERS</span>
              <strong style={{ display: 'block', fontSize: '32px', marginTop: '6px', color: '#111827' }}>{stats.users}</strong>
            </div>
          </div>

          {/* Quick Actions and Recent Products */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Products Table */}
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Curated Products ({products.length})</h2>
              </div>

              {products.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left', color: '#6b7280' }}>
                        <th style={{ padding: '10px 0' }}>Product</th>
                        <th style={{ padding: '10px 8px' }}>Price</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '12px 0', fontWeight: 600 }}>
                            <a href={`/product/${p.id}`} target="_blank" style={{ color: '#111827' }}>{p.name}</a>
                          </td>
                          <td style={{ padding: '12px 8px', color: '#111827', fontWeight: 600 }}>
                            Rs. {p.price.toLocaleString('en-NP')}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ background: p.is_active ? '#dcfce7' : '#fee2e2', color: p.is_active ? '#15803d' : '#b91c1c', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                              {p.is_active ? 'ACTIVE' : 'DRAFT'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                            <a href={`/product/${p.id}`} target="_blank" style={{ color: '#2563eb', marginRight: '8px' }}>View</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: '#9ca3af', fontSize: '13px', padding: '20px 0' }}>No products listed yet.</p>
              )}
            </div>

            {/* Categories & Configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Categories ({categories.length})</h2>
                {categories.length > 0 ? (
                  <ul style={{ listStyle: 'none', fontSize: '13px' }}>
                    {categories.map((c) => (
                      <li key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{c.name}</span>
                        <code style={{ fontSize: '11px', color: '#9ca3af' }}>/{c.slug}</code>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#9ca3af', fontSize: '13px' }}>No categories created yet.</p>
                )}
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Site Information</h2>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>
                  Title: <b>{settings.site_title || 'BuyerNepal'}</b><br />
                  Description: <i>{settings.site_description || 'Shop Smarter in Nepal'}</i>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};
