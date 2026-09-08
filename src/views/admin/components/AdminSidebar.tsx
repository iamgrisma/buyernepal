import { FC } from 'hono/jsx';
import { AdminUserSession } from '../types';

export const AdminSidebar: FC<{
  currentUser: AdminUserSession;
  activeTab: string;
  pendingReviewsCount: number;
  productsCount: number;
  ordersCount: number;
  couponsCount: number;
  vehiclesCount?: number;
}> = ({ currentUser, activeTab, pendingReviewsCount, productsCount, ordersCount, couponsCount, vehiclesCount = 0 }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <a href="/" className="store-brand" style={{ color: 'var(--ink)' }}>
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
        {/* Core Catalog & Content */}
        <div className="admin-nav-group">
          <div className="admin-nav-section-title">Core Platform</div>
          <a
            href="/admin?tab=overview"
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <span>📊 Overview</span>
          </a>
          <a
            href="/admin?tab=products"
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
          >
            <span>🛍️ Products</span>
            <span className="admin-nav-badge">{productsCount}</span>
          </a>
          <a
            href="/admin?tab=vehicles"
            className={`admin-nav-item ${activeTab === 'vehicles' ? 'active' : ''}`}
          >
            <span>🚗 Vehicles &amp; EV</span>
            {vehiclesCount > 0 && (
              <span className="admin-nav-badge" style={{ background: '#0284c7' }}>
                {vehiclesCount}
              </span>
            )}
          </a>
          <a
            href="/admin?tab=categories"
            className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
          >
            <span>📁 Categories</span>
          </a>
          <a
            href="/admin?tab=blog"
            className={`admin-nav-item ${activeTab === 'blog' ? 'active' : ''}`}
          >
            <span>📰 Buying Guides</span>
          </a>
          <a
            href="/admin?tab=reviews"
            className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            <span>⭐ Reviews</span>
            {pendingReviewsCount > 0 && (
              <span className="admin-nav-badge" style={{ background: '#f59e0b' }}>
                {pendingReviewsCount}
              </span>
            )}
          </a>
          <a
            href="/admin?tab=coupons"
            className={`admin-nav-item ${activeTab === 'coupons' ? 'active' : ''}`}
          >
            <span>🎟️ Vouchers</span>
            <span className="admin-nav-badge" style={{ background: '#059669' }}>
              {couponsCount}
            </span>
          </a>
        </div>

        {/* E-Commerce, Logistics & Directory */}
        <div className="admin-nav-group">
          <div className="admin-nav-section-title">E-Commerce &amp; Directory</div>
          <a
            href="/admin?tab=orders"
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <span>📦 Orders &amp; COD</span>
            {ordersCount > 0 && (
              <span className="admin-nav-badge" style={{ background: '#10b981' }}>
                {ordersCount}
              </span>
            )}
          </a>
          <a
            href="/admin?tab=clicks"
            className={`admin-nav-item ${activeTab === 'clicks' ? 'active' : ''}`}
          >
            <span>🔗 Affiliate Clicks</span>
          </a>
          <a
            href="/admin?tab=stores"
            className={`admin-nav-item ${activeTab === 'stores' ? 'active' : ''}`}
          >
            <span>🏪 Verified Stores</span>
          </a>
          <a
            href="/admin?tab=brands"
            className={`admin-nav-item ${activeTab === 'brands' ? 'active' : ''}`}
          >
            <span>🏷️ Brand Hubs</span>
          </a>
        </div>

        {/* REHub Customizer & System Settings */}
        <div className="admin-nav-group">
          <div className="admin-nav-section-title">Theme &amp; System</div>
          <a
            href="/admin?tab=customizer"
            className={`admin-nav-item ${activeTab === 'customizer' ? 'active' : ''}`}
          >
            <span>🎨 REHub Customizer</span>
          </a>
          <a
            href="/admin?tab=settings"
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <span>⚙️ Global Settings</span>
          </a>
          <a
            href="/admin?tab=users"
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
          >
            <span>👥 Staff Accounts</span>
          </a>
        </div>
      </nav>

      {/* User Footer */}
      <div className="admin-sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '14px',
              color: '#ffffff'
            }}
          >
            {currentUser.username.slice(0, 1).toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <strong style={{ fontSize: '12.5px', color: '#f8fafc', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {currentUser.username}
            </strong>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'capitalize' }}>
              {currentUser.role}
            </span>
          </div>
        </div>
        <form method="post" action="/admin/logout" style={{ marginTop: '12px' }}>
          <button
            type="submit"
            className="btn-secondary"
            style={{ width: '100%', fontSize: '12px', padding: '6px', justifyContent: 'center' }}
          >
            Sign Out ⎋
          </button>
        </form>
      </div>
    </aside>
  );
};
