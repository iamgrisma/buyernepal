import { FC } from 'hono/jsx';
import { Review, Product } from '../../../types';

export const ReviewsTab: FC<{
  reviews: Review[];
  products: Product[];
}> = ({ reviews, products }) => {
  const pending = reviews.filter((r) => r.status === 'pending' || r.is_approved === 0 || r.is_approved === false);
  const approved = reviews.filter((r) => r.status === 'approved' || r.is_approved === 1 || r.is_approved === true);

  return (
    <div>
      {/* Moderation Queue for Pending Reviews */}
      {pending.length > 0 && (
        <div className="admin-card" style={{ marginBottom: '24px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                ⏳ Reviews Requiring Moderation ({pending.length})
              </h2>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Customer submissions awaiting verification before appearing publicly on product pages
              </span>
            </div>
            <span className="badge badge-active" style={{ background: '#f59e0b', color: '#ffffff' }}>
              Action Required
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pending.map((r) => {
              const prod = products.find((p) => p.id === r.product_id);
              return (
                <div
                  key={r.id}
                  style={{
                    padding: '16px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '13.5px', color: 'var(--ink)' }}>{r.user_name}</strong>
                      <span style={{ color: '#f59e0b', fontSize: '13px' }}>{'★'.repeat(r.rating)}</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        for {prod ? prod.name : `Product #${r.product_id}`}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                      "{r.comment}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <form method="post" action={`/admin/reviews/${r.id}/approve`}>
                      <button
                        type="submit"
                        className="primary-action"
                        style={{ padding: '6px 14px', fontSize: '12px', background: '#059669' }}
                      >
                        ✓ Approve Review
                      </button>
                    </form>
                    <form method="post" action={`/admin/reviews/${r.id}/delete`}>
                      <button
                        type="submit"
                        style={{
                          background: 'transparent',
                          border: '1px solid #fee2e2',
                          color: '#ef4444',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 700
                        }}
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Approved Reviews Catalog */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
              Verified Community Reviews ({approved.length})
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Live user testimonials across Nepal catalog</span>
          </div>
        </div>

        {approved.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
            No verified reviews yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Reviewer</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Helpful Votes</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {approved.map((r) => {
                  const prod = products.find((p) => p.id === r.product_id);
                  return (
                    <tr key={r.id}>
                      <td>
                        <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                          {prod ? prod.name : `Product #${r.product_id}`}
                        </strong>
                      </td>
                      <td>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{r.user_name}</span>
                      </td>
                      <td>
                        <span style={{ color: '#f59e0b', fontSize: '13px' }}>{'★'.repeat(r.rating)}</span>
                      </td>
                      <td>
                        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--ink-secondary)', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.comment}
                        </p>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                          👍 {r.helpful_count || 0} votes
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <form
                          method="post"
                          action={`/admin/reviews/${r.id}/delete`}
                          onsubmit="return confirm('Delete review?');"
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
