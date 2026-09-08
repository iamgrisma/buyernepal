import { FC } from 'hono/jsx';
import { AdminNotice } from '../types';

export const AdminHeader: FC<{
  activeTab: string;
  notice?: AdminNotice;
}> = ({ activeTab, notice }) => {
  const titles: Record<string, string> = {
    overview: 'Executive Performance Dashboard',
    products: 'Curated Products & Deal Pipeline',
    categories: 'Shopping Categories & Departments',
    blog: 'Buying Guides, Reviews & Tech Journalism',
    reviews: 'Community Reviews Moderation',
    coupons: 'Promo Vouchers & Instant Coupons',
    orders: 'Customer Orders & COD Fulfillment',
    clicks: 'Affiliate Outbound Clicks & Analytics',
    stores: 'Verified Nepal Retailers & Showrooms',
    brands: 'Authorized Brand Distributors & Centers',
    customizer: 'REHub Theme Options & Customizer',
    settings: 'Store Identity & Global Branding',
    users: 'Staff & Administrator Permissions'
  };

  const currentTitle = titles[activeTab] || 'Management Portal';

  return (
    <>
      <div className="admin-header">
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            BUYERNEPAL EXECUTIVE SUITE
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '2px 0 0', color: 'var(--ink)', letterSpacing: '-0.5px' }}>
            {currentTitle}
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
          <a href="/" target="_blank" className="btn-secondary" rel="noopener">
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
        <div className={`alert-box alert-${notice.type}`} style={{ margin: '0 32px 20px' }}>
          {notice.message}
        </div>
      )}
    </>
  );
};
