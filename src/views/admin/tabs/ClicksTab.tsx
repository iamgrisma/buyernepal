import { FC } from 'hono/jsx';

export const ClicksTab: FC<{
  outboundClicks?: any[];
}> = ({ outboundClicks = [] }) => {
  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Affiliate Outbound Clicks</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Cloaked link redirects (/go/:type/:id) tracked across Daraz, partner stores and vouchers
          </span>
        </div>
        <span className="badge badge-active" style={{ background: '#8b5cf6', color: '#ffffff' }}>
          {outboundClicks.length} Clicks Tracked
        </span>
      </div>

      {outboundClicks.length === 0 ? (
        <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
          <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>🔗</span>
          <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>No outbound clicks logged yet.</strong>
          <p style={{ fontSize: '13px', marginTop: '6px' }}>When visitors click "View Deal" on any product, their outbound transition is logged here.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Target Type</th>
                <th>Store Name</th>
                <th>Destination URL</th>
                <th>Visitor Country</th>
              </tr>
            </thead>
            <tbody>
              {outboundClicks.map((c: any, idx: number) => (
                <tr key={c.id || idx}>
                  <td style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {c.created_at ? new Date(c.created_at).toLocaleString() : 'Recent'}
                  </td>
                  <td>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', padding: '2px 6px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '4px', fontWeight: 700 }}>
                      {c.target_type}
                    </span>
                  </td>
                  <td>
                    <strong>{c.store_name}</strong>
                  </td>
                  <td>
                    <a
                      href={c.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: '#3b82f6', maxWidth: '320px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {c.target_url}
                    </a>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: 700 }}>🇳🇵 {c.ip_country || 'NP'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
