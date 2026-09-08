import { FC } from 'hono/jsx';
import { User } from '../../../types';

export const UsersTab: FC<{
  users: User[];
}> = ({ users }) => {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
            Registered Staff &amp; Administrators ({users.length})
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            Users with access to BuyerNepal management portal
          </span>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ fontWeight: 700 }}>{u.username}</td>
              <td style={{ color: '#64748b' }}>{u.email}</td>
              <td>
                <span className="badge badge-active">{u.role}</span>
              </td>
              <td>
                <span className={`badge ${u.is_active ? 'badge-active' : 'badge-inactive'}`}>
                  {u.is_active ? 'Active' : 'Disabled'}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                {u.username !== 'admin' && (
                  <form method="post" action={`/admin/users/${u.id}/delete`} onsubmit="return confirm('Remove user?');" style={{ display: 'inline' }}>
                    <button type="submit" style={{ background: 'transparent', border: '1px solid #fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
                      Remove
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
