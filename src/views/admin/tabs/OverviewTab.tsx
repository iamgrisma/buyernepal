import { FC } from 'hono/jsx';
import { AdminStatCard } from '../components/AdminStatCard';
import { AdminStats, AdminUserSession } from '../types';
import { Product, Category, Review, Order } from '../../../types';

export const OverviewTab: FC<{
  stats: AdminStats;
  products: Product[];
  categories: Category[];
  reviews: Review[];
  orders?: Order[];
  outboundClicks?: any[];
  currentUser: AdminUserSession;
}> = ({ stats, products, categories, reviews, orders = [], outboundClicks = [], currentUser }) => {
  const totalOrdersAmount = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.order_status === 'placed' || o.order_status === 'processing').length;

  return (
    <div>
      {/* 4 Primary Executive Stat Cards */}
      <div className="admin-stats-grid">
        <AdminStatCard
          label="CURATED PRODUCTS"
          value={stats.products}
          trend="Nepal market verified"
          icon="🛍️"
          iconBg="#fef2f2"
          iconColor="#dc2626"
          strokeColor="#dc2626"
          sparklinePoints="M2 18 L15 14 L28 16 L42 8 L58 4"
        />
        <AdminStatCard
          label="VERIFIED ORDERS"
          value={`Rs. ${(totalOrdersAmount / 1000).toFixed(0)}k`}
          trend={`${orders.length} orders (${pendingOrdersCount} active)`}
          icon="📦"
          iconBg="#ecfdf5"
          iconColor="#059669"
          strokeColor="#059669"
          sparklinePoints="M2 20 L15 17 L28 12 L42 9 L58 3"
        />
        <AdminStatCard
          label="COMMUNITY REVIEWS"
          value={reviews.length}
          trend={`${stats.pendingReviews} awaiting moderation`}
          icon="⭐"
          iconBg="#fffbeb"
          iconColor="#d97706"
          strokeColor="#d97706"
          sparklinePoints="M2 19 L15 16 L28 15 L42 11 L58 6"
        />
        <AdminStatCard
          label="OUTBOUND CLICKS"
          value={outboundClicks.length}
          trend="Affiliate link traffic"
          icon="🔗"
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
          strokeColor="#7c3aed"
          sparklinePoints="M2 18 L15 13 L28 14 L42 7 L58 2"
        />
      </div>

      {/* Two Column Layout: Quick Actions & System Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Quick Actions Hub */}
        <div className="admin-card">
          <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px', color: 'var(--ink)' }}>
            ⚡ Rapid Workflow Hub
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a
              href="/admin?tab=products"
              className="btn-secondary"
              style={{ padding: '12px', justifyContent: 'flex-start', gap: '8px', fontSize: '13px' }}
            >
              <span>🛍️</span>
              <div>
                <strong>Catalog</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>Manage {stats.products} products</small>
              </div>
            </a>
            <a
              href="/admin?tab=customizer"
              className="btn-secondary"
              style={{ padding: '12px', justifyContent: 'flex-start', gap: '8px', fontSize: '13px' }}
            >
              <span>🎨</span>
              <div>
                <strong>Customizer</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>REHub theme options</small>
              </div>
            </a>
            <a
              href="/admin?tab=blog"
              className="btn-secondary"
              style={{ padding: '12px', justifyContent: 'flex-start', gap: '8px', fontSize: '13px' }}
            >
              <span>✍️</span>
              <div>
                <strong>Buying Guides</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>Tech reviews &amp; articles</small>
              </div>
            </a>
            <a
              href="/admin?tab=orders"
              className="btn-secondary"
              style={{ padding: '12px', justifyContent: 'flex-start', gap: '8px', fontSize: '13px' }}
            >
              <span>📦</span>
              <div>
                <strong>Fulfillment</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>{pendingOrdersCount} pending delivery</small>
              </div>
            </a>
          </div>
        </div>

        {/* Cloudflare D1 & Architecture Telemetry */}
        <div className="admin-card">
          <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px', color: 'var(--ink)' }}>
            🛰️ Edge Infrastructure Status
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                <strong>Primary Database Engine</strong>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Cloudflare D1 (Serverless SQLite)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                <strong>Serverless Edge Runtime</strong>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Hono SSR on V8 Isolates</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                <strong>0% EMI Calculator</strong>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>6 Nepal Commercial Banks</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                <strong>Link Cloaking &amp; Outbound Tracking</strong>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Active (/go/:type/:id)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Curated Products Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
              Recently Verified Curated Products
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Latest additions to Nepal catalog</span>
          </div>
          <a href="/admin?tab=products" className="primary-action" style={{ padding: '5px 12px', fontSize: '12px' }}>
            View All ({products.length}) →
          </a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Product</th>
                <th>Category</th>
                <th>Price in Nepal</th>
                <th>Store</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 6).map((p) => {
                const cat = categories.find((c) => c.id === p.category_id);
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={p.image_url}
                          alt=""
                          style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'contain', border: '1px solid var(--line)', padding: '2px', background: '#fff' }}
                        />
                        <div>
                          <strong style={{ fontSize: '13px', display: 'block' }}>{p.name}</strong>
                          {p.badge && (
                            <span style={{ fontSize: '10.5px', color: 'var(--accent)', fontWeight: 700 }}>
                              {p.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px' }}>{cat ? cat.name : 'General'}</span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                        Rs. {p.price.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.store_name || 'Daraz Mall'}</span>
                    </td>
                    <td>
                      <span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>
                        {p.is_active ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
