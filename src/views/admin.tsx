import { FC } from 'hono/jsx';
import { Category, Product, Review, SiteSettings, User, Coupon, Article, Order, Store, Brand, Vehicle, VehicleInquiry, VehicleCuratedCollection } from '../types';
import { Layout } from './layout';
import { AdminSidebar } from './admin/components/AdminSidebar';
import { AdminHeader } from './admin/components/AdminHeader';
import { AdminModals } from './admin/components/AdminModals';
import { AdminScripts } from './admin/components/AdminScripts';
import { OverviewTab } from './admin/tabs/OverviewTab';
import { ProductsTab } from './admin/tabs/ProductsTab';
import { VehiclesTab } from './admin/tabs/VehiclesTab';
import { CategoriesTab } from './admin/tabs/CategoriesTab';
import { ArticlesTab } from './admin/tabs/ArticlesTab';
import { ReviewsTab } from './admin/tabs/ReviewsTab';
import { CouponsTab } from './admin/tabs/CouponsTab';
import { OrdersTab } from './admin/tabs/OrdersTab';
import { ClicksTab } from './admin/tabs/ClicksTab';
import { StoresTab } from './admin/tabs/StoresTab';
import { BrandsTab } from './admin/tabs/BrandsTab';
import { CustomizerTab } from './admin/tabs/CustomizerTab';
import { SettingsTab } from './admin/tabs/SettingsTab';
import { UsersTab } from './admin/tabs/UsersTab';

export const AdminLoginView: FC<{ error?: string; success?: string }> = ({ error, success }) => {
  return (
    <Layout title="Admin Portal Login — BuyerNepal">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '20px' }}>
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '40px 36px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="store-logo-mark" style={{ margin: '0 auto 16px', width: '48px', height: '48px', fontSize: '24px' }}>
              B
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.8px' }}>
              BuyerNepal Portal
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
              Management suite for verified Nepal products, deals and stores.
            </p>
          </div>

          {error && <div className="alert-box alert-error">{error}</div>}
          {success && <div className="alert-box alert-success">{success}</div>}

          <div
            style={{
              background: 'rgba(5, 150, 105, 0.08)',
              border: '1px solid rgba(5, 150, 105, 0.25)',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '20px',
              fontSize: '12px',
              lineHeight: '1.5'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: '#059669' }}>🧪 Test Environment Active</span>
              <button
                type="button"
                id="fillTestCredsBtn"
                style={{
                  background: '#059669',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onclick="document.getElementById('username').value='admin'; document.getElementById('password').value='admin';"
              >
                Auto-fill
              </button>
            </div>
            <div style={{ color: 'var(--ink)', marginTop: '4px' }}>
              Username: <code style={{ background: 'var(--line)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>admin</code> &nbsp;|&nbsp; 
              Password: <code style={{ background: 'var(--line)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>admin</code>
            </div>
          </div>

          <form method="post" action="/admin/login">
            <div className="form-group">
              <label htmlFor="username">Administrator Username or Email</label>
              <input id="username" name="username" type="text" placeholder="admin" required autoFocus />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="admin" required />
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
            <a href="/" style={{ color: 'var(--muted)', fontWeight: 600 }}>← Return to Public Storefront</a>
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
  stores?: Store[];
  brands?: Brand[];
  vehicles?: Vehicle[];
  vehicleInquiries?: VehicleInquiry[];
  vehicleCollections?: VehicleCuratedCollection[];
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
  stores = [],
  brands = [],
  vehicles = [],
  vehicleInquiries = [],
  vehicleCollections = [],
  settings,
  activeTab = 'overview',
  notice
}) => {
  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending' || r.is_approved === 0 || r.is_approved === false).length;

  return (
    <Layout title="Executive Management Portal — BuyerNepal" settings={settings}>
      <div className="admin-shell">
        {/* Modular Left Sidebar */}
        <AdminSidebar
          currentUser={currentUser}
          activeTab={activeTab}
          pendingReviewsCount={pendingReviewsCount}
          productsCount={products.length}
          ordersCount={orders.length}
          couponsCount={coupons.length}
          vehiclesCount={vehicles.length}
        />

        {/* Main Workspace Area */}
        <main className="admin-main">
          <AdminHeader activeTab={activeTab} notice={notice} />

          <div className="admin-body">
            {activeTab === 'overview' && (
              <OverviewTab
                stats={stats}
                products={products}
                categories={categories}
                reviews={reviews}
                orders={orders}
                outboundClicks={outboundClicks}
                currentUser={currentUser}
              />
            )}
            {activeTab === 'products' && (
              <ProductsTab products={products} categories={categories} />
            )}
            {activeTab === 'vehicles' && (
              <VehiclesTab
                vehicles={vehicles}
                inquiries={vehicleInquiries}
                collections={vehicleCollections}
              />
            )}
            {activeTab === 'categories' && (
              <CategoriesTab categories={categories} products={products} />
            )}
            {activeTab === 'blog' && (
              <ArticlesTab articles={articles} />
            )}
            {activeTab === 'reviews' && (
              <ReviewsTab reviews={reviews} products={products} />
            )}
            {activeTab === 'coupons' && (
              <CouponsTab coupons={coupons} />
            )}
            {activeTab === 'orders' && (
              <OrdersTab orders={orders} />
            )}
            {activeTab === 'clicks' && (
              <ClicksTab outboundClicks={outboundClicks} />
            )}
            {activeTab === 'stores' && (
              <StoresTab stores={stores} />
            )}
            {activeTab === 'brands' && (
              <BrandsTab brands={brands} />
            )}
            {activeTab === 'customizer' && (
              <CustomizerTab settings={settings} />
            )}
            {activeTab === 'settings' && (
              <SettingsTab settings={settings} />
            )}
            {activeTab === 'users' && (
              <UsersTab users={users} />
            )}
          </div>
        </main>
      </div>

      {/* Centralized Modals & Interactions */}
      <AdminModals categories={categories} />
      <AdminScripts />
    </Layout>
  );
};
