import { FC } from 'hono/jsx';
import { Order } from '../../../types';

export const OrdersTab: FC<{
  orders?: Order[];
}> = ({ orders = [] }) => {
  const totalVolume = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const pendingCount = orders.filter((o) => o.order_status === 'placed' || o.order_status === 'processing').length;
  const deliveredCount = orders.filter((o) => o.order_status === 'delivered').length;

  return (
    <div>
      {/* 3 Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div className="admin-card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Gross Order Volume</span>
          <strong style={{ fontSize: '22px', display: 'block', color: 'var(--ink)', marginTop: '4px' }}>
            Rs. {totalVolume.toLocaleString('en-IN')}
          </strong>
        </div>
        <div className="admin-card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>Pending Dispatch</span>
          <strong style={{ fontSize: '22px', display: 'block', color: '#f59e0b', marginTop: '4px' }}>
            {pendingCount} Orders
          </strong>
        </div>
        <div className="admin-card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Delivered Successfully</span>
          <strong style={{ fontSize: '22px', display: 'block', color: '#059669', marginTop: '4px' }}>
            {deliveredCount} Orders
          </strong>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Customer Orders &amp; COD Pipeline</h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Direct orders, Cash on Delivery requests and digital fulfillment across Nepal
            </span>
          </div>
          <span className="badge badge-active" style={{ background: '#10b981', color: '#ffffff' }}>
            {orders.length} Total Orders
          </span>
        </div>

        {orders.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>📦</span>
            <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>No customer orders placed yet.</strong>
            <p style={{ fontSize: '13px', marginTop: '6px' }}>When buyers choose Direct COD or Digital download on products, orders will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Customer Details</th>
                  <th>Item &amp; Destination</th>
                  <th>Amount &amp; Method</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <div>
                        <strong style={{ fontSize: '13px', color: 'var(--ink)', fontFamily: 'monospace' }}>
                          #{o.order_number}
                        </strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>
                          {o.delivery_type === 'digital' ? '⚡ Digital' : '🚚 Physical'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>{o.customer_name}</strong>
                      <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{o.customer_phone}</span>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{o.customer_email}</div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{o.product_name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>
                        Qty: {o.quantity} • {o.city || 'Kathmandu'}, {o.district || 'Bagmati'}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '13.5px', color: '#059669', display: 'block' }}>
                        Rs. {o.total_amount.toLocaleString('en-IN')}
                      </strong>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', padding: '1px 5px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '4px' }}>
                        {o.payment_method}
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background:
                            o.order_status === 'delivered'
                              ? '#dcfce7'
                              : o.order_status === 'shipped'
                              ? '#dbeafe'
                              : o.order_status === 'cancelled'
                              ? '#fee2e2'
                              : '#fef3c7',
                          color:
                            o.order_status === 'delivered'
                              ? '#15803d'
                              : o.order_status === 'shipped'
                              ? '#1d4ed8'
                              : o.order_status === 'cancelled'
                              ? '#b91c1c'
                              : '#b45309',
                          textTransform: 'capitalize',
                          fontWeight: 700
                        }}
                      >
                        {o.order_status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <form method="post" action={`/admin/orders/${o.id}/status`} style={{ display: 'inline-flex', gap: '4px' }}>
                        <select name="status" defaultValue={o.order_status} style={{ fontSize: '11.5px', padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--line)' }}>
                          <option value="placed">Placed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button type="submit" className="primary-action" style={{ padding: '4px 8px', fontSize: '11px' }}>
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
