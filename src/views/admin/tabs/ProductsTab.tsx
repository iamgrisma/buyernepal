import { FC } from 'hono/jsx';
import { Product, Category } from '../../../types';

export const ProductsTab: FC<{
  products: Product[];
  categories: Category[];
}> = ({ products, categories }) => {
  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            id="adminProductSearch"
            placeholder="Live search products by title, brand, or store..."
          />
        </div>

        <div className="admin-filter-group">
          <select id="adminCategoryFilter" className="admin-select-filter">
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <select id="adminStatusFilter" className="admin-select-filter">
            <option value="">All Statuses</option>
            <option value="active">Active / Published</option>
            <option value="draft">Draft / Hidden</option>
            <option value="emi">0% EMI Enabled</option>
          </select>

          <span id="filteredCountBadge" className="badge badge-active" style={{ background: '#3b82f6', color: '#ffffff' }}>
            {products.length} Items
          </span>

          <button
            type="button"
            className="primary-action btn-trigger-add-product"
            style={{ padding: '7px 14px', fontSize: '12.5px', background: 'var(--accent)' }}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '36%' }}>Product Details &amp; Nepal SKU</th>
                <th>Category</th>
                <th>Pricing (NPR)</th>
                <th>Store &amp; Source</th>
                <th>REHub Score</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const cat = categories.find((c) => c.id === p.category_id);
                const discount = p.original_price && p.original_price > p.price
                  ? Math.round(((p.original_price - p.price) / p.original_price) * 100)
                  : 0;
                const score = p.score_overall || (p.rating ? (p.rating * 2).toFixed(1) : '9.0');

                return (
                  <tr
                    key={p.id}
                    className="admin-product-row"
                    data-name={(p.name || '').toLowerCase()}
                    data-brand={(p.brand || '').toLowerCase()}
                    data-category={(cat?.slug || '').toLowerCase()}
                    data-store={(p.store_name || '').toLowerCase()}
                    data-status={p.is_active ? 'active' : 'draft'}
                    data-emi={p.emi_available ? 'emi' : ''}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={p.image_url}
                          alt=""
                          style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'contain', border: '1px solid var(--line)', padding: '2px', background: '#fff' }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <strong style={{ fontSize: '13.5px', color: 'var(--ink)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '340px' }}>
                            {p.name}
                          </strong>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '3px', flexWrap: 'wrap' }}>
                            {p.brand && (
                              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                                {p.brand}
                              </span>
                            )}
                            {p.badge && (
                              <span style={{ fontSize: '10.5px', padding: '1px 6px', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: '4px', fontWeight: 700 }}>
                                {p.badge}
                              </span>
                            )}
                            {p.emi_available === 1 && (
                              <span style={{ fontSize: '10px', padding: '1px 5px', background: '#ecfdf5', color: '#059669', borderRadius: '4px', fontWeight: 700 }}>
                                0% EMI
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '12.5px', color: 'var(--ink-secondary)', fontWeight: 600 }}>
                        {cat ? `${cat.icon || '📁'} ${cat.name}` : 'General'}
                      </span>
                    </td>
                    <td>
                      <div>
                        <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>
                          Rs. {p.price.toLocaleString('en-IN')}
                        </strong>
                        {discount > 0 && (
                          <div style={{ fontSize: '11px', color: 'var(--muted)', textDecoration: 'line-through' }}>
                            Rs. {p.original_price?.toLocaleString('en-IN')}
                            <span style={{ color: '#059669', fontWeight: 700, marginLeft: '4px', textDecoration: 'none' }}>
                              -{discount}%
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px' }}>
                        <strong style={{ color: 'var(--ink)' }}>{p.store_name || 'Daraz Mall'}</strong>
                        {p.affiliate_url && (
                          <a
                            href={p.affiliate_url}
                            target="_blank"
                            rel="noopener"
                            style={{ display: 'block', fontSize: '11px', color: '#3b82f6', marginTop: '2px' }}
                          >
                            Source Link ↗
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-scores-product"
                        data-id={p.id}
                        data-name={p.name}
                        data-display={p.score_display || ''}
                        data-performance={p.score_performance || ''}
                        data-camera={p.score_camera || ''}
                        data-battery={p.score_battery || ''}
                        data-value={p.score_value || ''}
                        data-overall={p.score_overall || ''}
                        data-verdict={p.score_verdict || ''}
                        style={{
                          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                          color: '#f8fafc',
                          border: '1px solid #334155',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11.5px',
                          fontWeight: 700
                        }}
                        title="Configure REHub Lab benchmark ratings and radar scorecard"
                      >
                        <span style={{ color: '#f59e0b' }}>★</span> {score}/10
                      </button>
                    </td>
                    <td>
                      <span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>
                        {p.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <a
                          href={`/product/${p.id}`}
                          target="_blank"
                          rel="noopener"
                          className="btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          Preview ↗
                        </a>
                        <button
                          type="button"
                          className="btn-edit-product primary-action"
                          data-id={p.id}
                          data-name={p.name}
                          data-price={p.price}
                          data-original-price={p.original_price || ''}
                          data-category-id={p.category_id || ''}
                          data-store={p.store_name || ''}
                          data-badge={p.badge || ''}
                          data-brand={p.brand || ''}
                          data-affiliate={p.affiliate_url || ''}
                          data-image={p.image_url || ''}
                          data-desc={p.description || ''}
                          data-active={p.is_active}
                          data-verdict={p.verdict || ''}
                          data-emi={p.emi_available}
                          style={{ padding: '4px 8px', fontSize: '11px', background: '#3b82f6' }}
                        >
                          Edit
                        </button>
                        <form
                          method="post"
                          action={`/admin/products/${p.id}/delete`}
                          onsubmit="return confirm('Remove this product from Nepal catalog?');"
                          style={{ display: 'inline' }}
                        >
                          <button
                            type="submit"
                            style={{
                              background: 'transparent',
                              border: '1px solid #fee2e2',
                              color: '#ef4444',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              fontWeight: 700
                            }}
                          >
                            Delete
                          </button>
                        </form>
                      </div>
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
