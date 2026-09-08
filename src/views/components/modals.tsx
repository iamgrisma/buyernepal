import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../../types';

export const WishlistDrawer: FC = () => (
  <>
    <div id="wishlistDrawerBackdrop" className="wishlist-drawer-backdrop" />
    <aside id="wishlistDrawer" className="wishlist-drawer" aria-label="Saved Deals Wishlist">
      <div className="wishlist-drawer-header">
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Saved Deals Wishlist</h3>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }} id="wishlistSubCount">
            0 items saved
          </span>
        </div>
        <button id="closeWishlistBtn" type="button" className="mobile-drawer-close" aria-label="Close wishlist">
          ×
        </button>
      </div>

      <div id="wishlistItemsList" className="wishlist-drawer-body">
        <div className="wishlist-empty" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>❤️</span>
          <strong style={{ display: 'block', color: 'var(--ink)' }}>Your wishlist is empty</strong>
          <p style={{ fontSize: '13px', marginTop: '6px' }}>Click the heart icon on any product to save it here for later.</p>
        </div>
      </div>

      <div className="wishlist-drawer-footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
          <span>Total Saved Value:</span>
          <strong id="wishlistTotalValue" style={{ color: 'var(--accent)', fontSize: '15px' }}>Rs. 0</strong>
        </div>
        <button id="clearWishlistBtn" type="button" className="filter-pill" style={{ width: '100%', padding: '10px' }}>
          Clear Wishlist
        </button>
      </div>
    </aside>
  </>
);


export const ComparisonDock: FC = () => (
  <>
    <div id="compareDock" className="compare-dock">
      <div className="store-shell compare-dock-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚖️</span>
          <strong>Product Comparison Dock</strong>
          <span id="compareDockCount" style={{ fontSize: '12px', color: 'var(--muted)' }}>(0 of 3 items)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            id="openComparePageDirectLink"
            href="/compare"
            className="product-buy"
            style={{ padding: '6px 14px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Full Compare Page ⚖️
          </a>
          <button id="openCompareModalBtn" type="button" className="filter-pill" style={{ padding: '6px 12px', fontSize: '12px' }}>
            Quick Pop-up 🔍
          </button>
          <button id="closeCompareDockBtn" type="button" className="filter-pill" style={{ padding: '6px 10px' }}>
            ✕
          </button>
        </div>
      </div>
      <div className="store-shell compare-dock-body">
        <div id="compareDockItems" className="compare-dock-items">
          {/* Populated dynamically via client JS */}
        </div>
      </div>
    </div>

    {/* Full Screen Comparison Modal */}
    <div id="compareModalBackdrop" className="compare-modal-backdrop">
      <div className="compare-modal-content">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Detailed Product Comparison</h3>
          <button id="closeCompareModalBtn" type="button" className="mobile-drawer-close" aria-label="Close modal">
            ×
          </button>
        </div>
        <div id="compareModalBody" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Dynamic Comparison Matrix injected via JS */}
        </div>
      </div>
    </div>
  </>
);


