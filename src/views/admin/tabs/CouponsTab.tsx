import { FC } from 'hono/jsx';
import { Coupon } from '../../../types';

export const CouponsTab: FC<{
  coupons: Coupon[];
}> = ({ coupons }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      {/* Create Promo Voucher Form */}
      <div className="admin-card">
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', color: 'var(--ink)' }}>
          + Create Promo Voucher
        </h2>
        <form method="post" action="/admin/coupons/new">
          <div className="form-group">
            <label>Voucher Code *</label>
            <input name="code" type="text" placeholder="e.g. NEPALNEWYEAR" required style={{ textTransform: 'uppercase' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Discount Type</label>
              <select name="discount_type">
                <option value="fixed">Fixed NPR Discount</option>
                <option value="percentage">Percentage Discount (%)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Discount Value *</label>
              <input name="discount_value" type="number" placeholder="500 or 10" required />
            </div>
          </div>
          <div className="form-group">
            <label>Minimum Purchase (NPR)</label>
            <input name="min_purchase" type="number" placeholder="2000" defaultValue="0" />
          </div>
          <div className="form-group">
            <label>Description / Terms</label>
            <input name="description" type="text" placeholder="Flat Rs. 500 OFF on gadgets" />
          </div>
          <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
            Publish Voucher
          </button>
        </form>
      </div>

      {/* Existing Vouchers List */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
              Active Promo Vouchers ({coupons.length})
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Coupon codes applicable at checkout or Daraz</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Min Spend</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((cpn) => (
                <tr key={cpn.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <code style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                        {cpn.code}
                      </code>
                    </div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '13px', color: '#059669' }}>
                      {cpn.discount_type === 'percentage'
                        ? `${cpn.discount_value}% OFF`
                        : `Rs. ${cpn.discount_value.toLocaleString('en-IN')} OFF`}
                    </strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
                      Rs. {cpn.min_purchase ? cpn.min_purchase.toLocaleString('en-IN') : '0'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${cpn.is_active ? 'badge-active' : 'badge-inactive'}`}>
                      {cpn.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="btn-edit-coupon primary-action"
                        data-id={cpn.id}
                        data-code={cpn.code}
                        data-type={cpn.discount_type}
                        data-value={cpn.discount_value}
                        data-min={cpn.min_purchase || 0}
                        data-desc={cpn.description || ''}
                        data-active={cpn.is_active}
                        style={{ padding: '4px 8px', fontSize: '11px', background: '#3b82f6' }}
                      >
                        Edit
                      </button>
                      <form
                        method="post"
                        action={`/admin/coupons/${cpn.id}/delete`}
                        onsubmit="return confirm('Remove voucher?');"
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
