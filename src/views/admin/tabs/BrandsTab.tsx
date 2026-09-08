import { FC } from 'hono/jsx';
import { Brand } from '../../../types';

export const BrandsTab: FC<{
  brands?: Brand[];
}> = ({ brands = [] }) => {
  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Official Brand Directory</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Authorized national distributors and official warranty service networks across Nepal
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="/brands" target="_blank" className="primary-action" style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--ink)', color: '#fff' }}>
            View Public Directory ↗
          </a>
          <span className="badge badge-active" style={{ background: '#8b5cf6', color: '#ffffff' }}>
            {brands.length} Brands Listed
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Brand Name &amp; Slug</th>
              <th>Origin</th>
              <th>Nepal Warranty Service Center</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {b.logo_url ? (
                      <img src={b.logo_url} alt="" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--line)', padding: '4px', background: '#fff' }} />
                    ) : (
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--line-subtle)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '14px' }}>
                        {b.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <strong style={{ fontSize: '13.5px', color: 'var(--ink)', display: 'block' }}>{b.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>/brand/{b.slug}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-secondary)' }}>
                    🌐 {b.origin_country || 'Global'}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '12px', color: 'var(--ink)' }}>🏢 {b.warranty_service_center}</div>
                </td>
                <td>
                  {b.is_featured === 1 ? (
                    <span className="badge" style={{ background: '#fef3c7', color: '#d97706', fontWeight: 700 }}>
                      ⭐ Official Partner
                    </span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--line-subtle)', color: 'var(--muted)' }}>
                      Verified Brand
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <a
                    href={`/brand/${b.slug}`}
                    target="_blank"
                    className="primary-action"
                    style={{ padding: '5px 10px', fontSize: '11px', background: 'var(--line-subtle)', color: 'var(--ink)', border: '1px solid var(--line)', textDecoration: 'none' }}
                  >
                    Brand Deals ↗
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
