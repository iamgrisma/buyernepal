import { FC } from 'hono/jsx';
import { Article } from '../../../types';

export const ArticlesTab: FC<{
  articles?: Article[];
}> = ({ articles = [] }) => {
  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            id="adminArticleSearch"
            placeholder="Live search guides by title, category, or author..."
          />
        </div>

        <div className="admin-filter-group">
          <select id="adminArticleCategoryFilter" className="admin-select-filter">
            <option value="">All Categories</option>
            <option value="buying guides">Buying Guides</option>
            <option value="smartphone reviews">Smartphone Reviews</option>
            <option value="laptop guides">Laptop Guides</option>
            <option value="nepal tech">Nepal Tech</option>
          </select>

          <span id="filteredArticleCount" className="badge badge-active" style={{ background: '#3b82f6', color: '#ffffff' }}>
            {articles.length} Articles
          </span>

          <button
            type="button"
            className="primary-action btn-trigger-add-article"
            style={{ padding: '7px 14px', fontSize: '12.5px', background: 'var(--accent)' }}
          >
            + Write Guide / Review
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '42%' }}>Article Title &amp; Slug</th>
                <th>Category</th>
                <th>Author</th>
                <th>Read Time</th>
                <th>Views</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr
                  key={a.id}
                  className="admin-article-row"
                  data-title={(a.title || '').toLowerCase()}
                  data-category={(a.category || '').toLowerCase()}
                  data-author={(a.author_name || '').toLowerCase()}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={a.cover_image}
                        alt=""
                        style={{ width: '56px', height: '38px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--line)', background: '#f1f5f9' }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ fontSize: '13.5px', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '380px', display: 'block' }}>
                            {a.title}
                          </strong>
                          {a.is_featured === 1 && (
                            <span style={{ fontSize: '12px' }} title="Featured as Hero Story">⭐</span>
                          )}
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>
                          /blog/{a.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', padding: '2px 8px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '4px', fontWeight: 600 }}>
                      {a.category}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', color: 'var(--ink-secondary)' }}>{a.author_name}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{a.read_time_minutes || 5} min read</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '12.5px', color: 'var(--ink)' }}>
                      {(a.views_count || 0).toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <span className={`badge ${a.is_published ? 'badge-active' : 'badge-inactive'}`}>
                      {a.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <a
                        href={`/blog/${a.slug}`}
                        target="_blank"
                        rel="noopener"
                        className="btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        Read ↗
                      </a>
                      <button
                        type="button"
                        className="btn-edit-article primary-action"
                        data-id={a.id}
                        data-title={a.title}
                        data-slug={a.slug}
                        data-category={a.category}
                        data-author={a.author_name}
                        data-cover={a.cover_image}
                        data-readtime={a.read_time_minutes || 5}
                        data-tags={a.tags || ''}
                        data-excerpt={a.excerpt || ''}
                        data-content={a.content || ''}
                        data-featured={a.is_featured}
                        data-published={a.is_published}
                        style={{ padding: '4px 8px', fontSize: '11px', background: '#3b82f6' }}
                      >
                        Edit
                      </button>
                      <form
                        method="post"
                        action={`/admin/articles/${a.id}/delete`}
                        onsubmit="return confirm('Delete this editorial guide?');"
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
