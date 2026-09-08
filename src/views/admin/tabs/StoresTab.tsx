import { FC } from 'hono/jsx';
import { Store } from '../../../types';

export const StoresTab: FC<{
  stores?: Store[];
}> = ({ stores = [] }) => {
  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Verified Nepal Stores &amp; Retailers</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Authorized online stores, flagship showrooms, and marketplace sellers monitored on BuyerNepal
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="/stores" target="_blank" className="primary-action" style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--ink)', color: '#fff' }}>
            View Public Directory ↗
          </a>
          <span className="badge badge-active" style={{ background: '#2563eb', color: '#ffffff' }}>
            {stores.length} Stores Listed
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Store Details &amp; Slug</th>
              <th>Coverage</th>
              <th>Warranty &amp; Returns</th>
              <th>Rating</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {s.logo_url ? (
                      <img src={s.logo_url} alt="" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--line)', padding: '4px', background: '#fff' }} />
                    ) : (
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--line-subtle)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '14px' }}>
                        {s.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <strong style={{ fontSize: '13.5px', color: 'var(--ink)', display: 'block' }}>{s.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>/store/{s.slug} • {s.location}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-secondary)' }}>
                    🚚 {s.delivery_coverage}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink)' }}>{s.warranty_support}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--muted)', marginTop: '2px' }}>↩️ {s.return_policy}</div>
                </td>
                <td>
                  <strong style={{ color: '#d97706', fontSize: '13px' }}>★ {s.rating.toFixed(1)}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: '4px' }}>({s.review_count})</span>
                </td>
                <td>
                  {s.is_verified === 1 ? (
                    <span className="badge" style={{ background: 'rgba(5, 150, 105, 0.15)', color: '#059669', fontWeight: 700 }}>
                      ✓ Verified Partner
                    </span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--line-subtle)', color: 'var(--muted)' }}>
                      Listed
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <a
                    href={`/store/${s.slug}`}
                    target="_blank"
                    className="primary-action"
                    style={{ padding: '5px 10px', fontSize: '11px', background: 'var(--line-subtle)', color: 'var(--ink)', border: '1px solid var(--line)', textDecoration: 'none' }}
                  >
                    Public Page ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
