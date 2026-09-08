import { FC } from 'hono/jsx';
import { Category, Product } from '../../../types';

export const CategoriesTab: FC<{
  categories: Category[];
  products: Product[];
}> = ({ categories, products }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      {/* Add New Department Form */}
      <div className="admin-card">
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', color: 'var(--ink)' }}>
          + Add New Department
        </h2>
        <form method="post" action="/admin/categories/new">
          <div className="form-group">
            <label>Department Name *</label>
            <input name="name" type="text" placeholder="e.g. Smart Watches" required />
          </div>
          <div className="form-group">
            <label>URL Slug *</label>
            <input name="slug" type="text" placeholder="e.g. smart-watches" required />
          </div>
          <div className="form-group">
            <label>Icon Emoji</label>
            <input name="icon" type="text" placeholder="e.g. ⌚" defaultValue="📁" />
          </div>
          <div className="form-group">
            <label>Department Description</label>
            <textarea name="description" rows={3} placeholder="Highlights for this department…"></textarea>
          </div>
          <button type="submit" className="primary-action" style={{ width: '100%', justifyContent: 'center' }}>
            Create Department
          </button>
        </form>
      </div>

      {/* Existing Departments Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
              Departments ({categories.length})
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Product categories mapped across Nepal</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Slug</th>
                <th>Products</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => {
                const count = products.filter((p) => p.category_id === c.id).length;
                return (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>{c.icon || '📁'}</span>
                        <strong style={{ fontSize: '13.5px', color: 'var(--ink)' }}>{c.name}</strong>
                      </div>
                    </td>
                    <td>
                      <code style={{ fontSize: '12px', background: 'var(--bg)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--line)' }}>
                        /{c.slug}
                      </code>
                    </td>
                    <td>
                      <span className="badge badge-active" style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}>
                        {count} items
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${c.is_active ? 'badge-active' : 'badge-inactive'}`}>
                        {c.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn-edit-category primary-action"
                          data-id={c.id}
                          data-name={c.name}
                          data-slug={c.slug}
                          data-icon={c.icon || ''}
                          data-desc={c.description || ''}
                          data-active={c.is_active}
                          style={{ padding: '4px 8px', fontSize: '11px', background: '#3b82f6' }}
                        >
                          Edit
                        </button>
                        <form
                          method="post"
                          action={`/admin/categories/${c.id}/delete`}
                          onsubmit="return confirm('Remove department? Products will be unlinked.');"
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
