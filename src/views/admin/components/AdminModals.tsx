import { FC } from 'hono/jsx';
import { Category } from '../../../types';

export const AdminModals: FC<{
  categories: Category[];
}> = ({ categories }) => {
  return (
    <>
      {/* Modal 1: Add Curated Product */}
      <div id="addProductModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '680px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✨ Add Curated Product to Nepal Catalog</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/products/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Product Title *</label>
                <input name="name" type="text" placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Deal Price (NPR) *</label>
                  <input name="price" type="number" placeholder="44999" required />
                </div>
                <div className="form-group">
                  <label>Original MRP (NPR)</label>
                  <input name="original_price" type="number" placeholder="49999" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Department / Category</label>
                  <select name="category_id">
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Verified Store Name</label>
                  <input name="store_name" type="text" placeholder="e.g. Oliz Store Nepal" defaultValue="Daraz Mall" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Badge Tag</label>
                  <input name="badge" type="text" placeholder="e.g. 🔥 Hot Deal" defaultValue="🔥 Hot Deal" />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input name="brand" type="text" placeholder="e.g. Sony" />
                </div>
              </div>

              <div className="form-group">
                <label>Store / Affiliate URL</label>
                <input name="affiliate_url" type="url" placeholder="https://www.daraz.com.np/products/..." />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input name="image_url" type="url" placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-subtle, #f8fafc)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line, #e2e8f0)' }}>
                <input type="checkbox" id="modalAddProdEmi" name="emi_available" value="1" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="modalAddProdEmi" style={{ margin: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>
                  💳 0% Bank EMI Available in Nepal (Nabil, NIC Asia, Global IME, etc.)
                </label>
              </div>

              <div className="form-group">
                <label>Editorial Verdict &amp; Nepal Buying Advice</label>
                <textarea name="verdict" rows={2} placeholder="Our bottom-line recommendation for Nepali shoppers…"></textarea>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Description &amp; Specs Highlights</label>
                <textarea name="description" rows={3} placeholder="Key specs, dimensions and warranty details…"></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Publish Product to Nepal Catalog
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 2: Edit Curated Product */}
      <div id="editProductModal" className="admin-modal-backdrop">
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Curated Product</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editProductForm" method="post" action="/admin/products/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editProdId" name="id" />
              
              <div className="form-group">
                <label>Product Title *</label>
                <input id="editProdName" name="name" type="text" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Deal Price (NPR) *</label>
                  <input id="editProdPrice" name="price" type="number" required />
                </div>
                <div className="form-group">
                  <label>Original MRP (NPR)</label>
                  <input id="editProdOriginalPrice" name="original_price" type="number" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Department / Category</label>
                  <select id="editProdCategory" name="category_id">
                    <option value="">-- Select Department --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Store Name</label>
                  <input id="editProdStore" name="store_name" type="text" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Badge Tag</label>
                  <input id="editProdBadge" name="badge" type="text" />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input id="editProdBrand" name="brand" type="text" />
                </div>
              </div>

              <div className="form-group">
                <label>Store / Affiliate URL</label>
                <input id="editProdAffiliate" name="affiliate_url" type="url" />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input id="editProdImage" name="image_url" type="url" />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-subtle, #f8fafc)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line, #e2e8f0)' }}>
                <input type="checkbox" id="editProdEmiAvailable" name="emi_available" value="1" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label htmlFor="editProdEmiAvailable" style={{ margin: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>
                  💳 0% Bank EMI Available in Nepal (Nabil, NIC Asia, Global IME, etc.)
                </label>
              </div>

              <div className="form-group">
                <label>Editorial Verdict &amp; Nepal Buying Advice</label>
                <textarea id="editProdVerdict" name="verdict" rows={2}></textarea>
              </div>

              <div className="form-group">
                <label>Description &amp; Specs</label>
                <textarea id="editProdDesc" name="description" rows={3}></textarea>
              </div>

              <div className="form-group">
                <label>Catalog Status</label>
                <select id="editProdActive" name="is_active">
                  <option value="1">Active / Published</option>
                  <option value="0">Draft / Archived</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Save Product Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 3: Edit Category */}
      <div id="editCategoryModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '520px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Department</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editCategoryForm" method="post" action="/admin/categories/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editCatId" name="id" />
              <div className="form-group">
                <label>Department Name *</label>
                <input id="editCatName" name="name" type="text" required />
              </div>
              <div className="form-group">
                <label>URL Slug *</label>
                <input id="editCatSlug" name="slug" type="text" required />
              </div>
              <div className="form-group">
                <label>Icon Emoji</label>
                <input id="editCatIcon" name="icon" type="text" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea id="editCatDesc" name="description" rows={3}></textarea>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select id="editCatActive" name="is_active">
                  <option value="1">Active</option>
                  <option value="0">Hidden</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Update Department
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 4: Edit Coupon */}
      <div id="editCouponModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '520px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Promo Voucher</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editCouponForm" method="post" action="/admin/coupons/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editCouponId" name="id" />
              <div className="form-group">
                <label>Coupon Code *</label>
                <input id="editCouponCode" name="code" type="text" required style={{ textTransform: 'uppercase' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Discount Type</label>
                  <select id="editCouponType" name="discount_type">
                    <option value="fixed">Fixed NPR Discount</option>
                    <option value="percentage">Percentage Discount (%)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount Value *</label>
                  <input id="editCouponValue" name="discount_value" type="number" required />
                </div>
              </div>
              <div className="form-group">
                <label>Minimum Purchase (NPR)</label>
                <input id="editCouponMin" name="min_purchase" type="number" />
              </div>
              <div className="form-group">
                <label>Description / Terms</label>
                <input id="editCouponDesc" name="description" type="text" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select id="editCouponActive" name="is_active">
                  <option value="1">Active / Usable</option>
                  <option value="0">Expired / Inactive</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Update Voucher
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 5: Edit Product Scores (REHub Lab Evaluation) */}
      <div id="editProductScoresModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '600px' }}>
          <div className="admin-modal-header">
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>📊 REHub Lab Review Scores</h3>
              <span id="scoresProductName" style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}></span>
            </div>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editProductScoresForm" method="post" action="/admin/products/0/scores">
            <div className="admin-modal-body">
              <input type="hidden" id="scoresProductId" name="product_id" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Display Quality (0 - 10)</label>
                  <input id="scoreDisplay" name="score_display" type="number" step="0.1" min="0" max="10" placeholder="9.5" />
                </div>
                <div className="form-group">
                  <label>Performance &amp; Speed (0 - 10)</label>
                  <input id="scorePerformance" name="score_performance" type="number" step="0.1" min="0" max="10" placeholder="9.8" />
                </div>
                <div className="form-group">
                  <label>Camera &amp; Optics (0 - 10)</label>
                  <input id="scoreCamera" name="score_camera" type="number" step="0.1" min="0" max="10" placeholder="9.2" />
                </div>
                <div className="form-group">
                  <label>Battery &amp; Charging (0 - 10)</label>
                  <input id="scoreBattery" name="score_battery" type="number" step="0.1" min="0" max="10" placeholder="9.0" />
                </div>
                <div className="form-group">
                  <label>Nepal Value For Money (0 - 10)</label>
                  <input id="scoreValue" name="score_value" type="number" step="0.1" min="0" max="10" placeholder="9.4" />
                </div>
                <div className="form-group">
                  <label>Overall Benchmark Score (0 - 10)</label>
                  <input id="scoreOverall" name="score_overall" type="number" step="0.1" min="0" max="10" placeholder="9.4" required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>REHub Benchmark Summary Verdict</label>
                <textarea id="scoreVerdict" name="score_verdict" rows={2} placeholder="e.g. Nepal flagship benchmark with unmatched performance and official GenNext warranty."></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Save REHub Evaluation Scores
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 6: Edit Article */}
      <div id="editArticleModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '780px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✏️ Edit Tech Guide / Editorial Article</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form id="editArticleForm" method="post" action="/admin/articles/0/edit">
            <div className="admin-modal-body">
              <input type="hidden" id="editArticleId" name="id" />
              <div className="form-group">
                <label>Article Title *</label>
                <input id="editArticleTitle" name="title" type="text" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>URL Slug *</label>
                  <input id="editArticleSlug" name="slug" type="text" required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select id="editArticleCat" name="category" required>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Smartphone Reviews">Smartphone Reviews</option>
                    <option value="Laptop Guides">Laptop Guides</option>
                    <option value="Nepal Tech">Nepal Tech</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Author Byline *</label>
                  <input id="editArticleAuthor" name="author_name" type="text" required />
                </div>
                <div className="form-group">
                  <label>Reading Time (Minutes)</label>
                  <input id="editArticleReadTime" name="read_time_minutes" type="number" />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image URL *</label>
                <input id="editArticleCover" name="cover_image" type="url" required />
              </div>

              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input id="editArticleTags" name="tags" type="text" />
              </div>

              <div className="form-group">
                <label>Executive Excerpt *</label>
                <textarea id="editArticleExcerpt" name="excerpt" rows={2} required></textarea>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Content (Markdown &amp; REHub Review Blocks) *</label>
                  <div className="article-formatting-toolbar" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-insert-tag" data-tag="h2">H2</button>
                    <button type="button" className="btn-insert-tag" data-tag="h3">H3</button>
                    <button type="button" className="btn-insert-tag" data-tag="pros">👍 Pros</button>
                    <button type="button" className="btn-insert-tag" data-tag="cons">⚠️ Cons</button>
                    <button type="button" className="btn-insert-tag" data-tag="deal">⚡ Deal</button>
                    <button type="button" className="btn-insert-tag" data-tag="table">📊 Table</button>
                    <button type="button" className="btn-insert-tag" data-tag="score">🏆 Scorecard</button>
                    <button type="button" className="btn-insert-tag" data-tag="coupon">🎟️ Coupon</button>
                  </div>
                </div>
                <textarea id="editArticleContent" name="content" rows={8} required></textarea>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                  <input id="editArticleFeatured" type="checkbox" name="is_featured" value="1" />
                  ⭐ Feature as Hero Story
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                  <input id="editArticlePublished" type="checkbox" name="is_published" value="1" />
                  🚀 Published
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Update Article
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 7: Add Article */}
      <div id="addArticleModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '780px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>✍️ Write New Tech Guide / Review</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/articles/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Article Title *</label>
                <input name="title" type="text" placeholder="e.g. Best Mobile Phones Under 30,000 in Nepal (2026)" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" required>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Smartphone Reviews">Smartphone Reviews</option>
                    <option value="Laptop Guides">Laptop Guides</option>
                    <option value="Nepal Tech">Nepal Tech</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Reading Time (Minutes)</label>
                  <input name="read_time_minutes" type="number" defaultValue={5} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Author Byline *</label>
                  <input name="author_name" type="text" defaultValue="BuyerNepal Editorial Team" required />
                </div>
                <div className="form-group">
                  <label>Cover Image URL *</label>
                  <input name="cover_image" type="url" placeholder="https://images.unsplash.com/..." required />
                </div>
              </div>

              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input name="tags" type="text" placeholder="e.g. smartphones, budget, deals, nepal" />
              </div>

              <div className="form-group">
                <label>Executive Excerpt / Deck *</label>
                <textarea name="excerpt" rows={2} placeholder="Brief summary of the article..." required></textarea>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Article Body (Markdown &amp; REHub Review Blocks) *</label>
                  <div className="article-formatting-toolbar" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-insert-tag" data-tag="h2">H2</button>
                    <button type="button" className="btn-insert-tag" data-tag="h3">H3</button>
                    <button type="button" className="btn-insert-tag" data-tag="pros">👍 Pros</button>
                    <button type="button" className="btn-insert-tag" data-tag="cons">⚠️ Cons</button>
                    <button type="button" className="btn-insert-tag" data-tag="deal">⚡ Deal</button>
                    <button type="button" className="btn-insert-tag" data-tag="table">📊 Table</button>
                    <button type="button" className="btn-insert-tag" data-tag="score">🏆 Scorecard</button>
                    <button type="button" className="btn-insert-tag" data-tag="coupon">🎟️ Coupon</button>
                  </div>
                </div>
                <textarea
                  name="content"
                  rows={9}
                  placeholder="Write your in-depth guide here... Use ## for section titles, ### for subheadings, - for bullets, and > for callouts."
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700, color: 'var(--ink)' }}>
                  <input type="checkbox" name="is_featured" value="1" style={{ width: '16px', height: '16px' }} />
                  ⭐ Feature as Hero Story
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700, color: 'var(--ink)' }}>
                  <input type="checkbox" name="is_published" value="1" defaultChecked style={{ width: '16px', height: '16px' }} />
                  🚀 Publish Immediately
                </label>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: 'var(--accent)', color: '#ffffff' }}>
                Publish Article to Storefront 🚀
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 8: Add Department / Category */}
      <div id="addCategoryModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '580px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>📁 Add Store Department</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/categories/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Department Name *</label>
                <input name="name" type="text" placeholder="e.g. Fitness &amp; Outdoors" required />
              </div>
              <div className="form-group">
                <label>URL Slug *</label>
                <input name="slug" type="text" placeholder="e.g. fitness-outdoors" required />
              </div>
              <div className="form-group">
                <label>Icon Emoji</label>
                <input name="icon" type="text" placeholder="e.g. 🏃" defaultValue="📁" />
              </div>
              <div className="form-group">
                <label>Editorial Description</label>
                <textarea name="description" rows={3} placeholder="Department highlights and summary…"></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: 'var(--accent)', color: '#ffffff' }}>
                Create Department
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal 9: Create Promo Voucher */}
      <div id="addCouponModal" className="admin-modal-backdrop">
        <div className="admin-modal-content" style={{ maxWidth: '580px' }}>
          <div className="admin-modal-header">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>🏷️ Create Promo Voucher</h3>
            <button type="button" className="close-admin-modal" style={{ background: 'transparent', border: 0, fontSize: '24px', cursor: 'pointer', color: 'var(--muted)', lineHeight: 1 }}>×</button>
          </div>
          <form method="post" action="/admin/coupons/new">
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Coupon Code *</label>
                <input name="code" type="text" placeholder="e.g. DASHAIN2026" required style={{ textTransform: 'uppercase' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Discount Type</label>
                  <select name="discount_type">
                    <option value="fixed">Fixed NPR Discount</option>
                    <option value="percentage">Percentage Discount (%)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount Value *</label>
                  <input name="discount_value" type="number" placeholder="1000 or 15" required />
                </div>
              </div>
              <div className="form-group">
                <label>Minimum Purchase (NPR)</label>
                <input name="min_purchase" type="number" placeholder="5000" defaultValue="0" />
              </div>
              <div className="form-group">
                <label>Description / Terms</label>
                <input name="description" type="text" placeholder="Flat Rs. 1,000 OFF on electronics" />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="close-admin-modal btn-secondary">
                Cancel
              </button>
              <button type="submit" className="primary-action" style={{ background: 'var(--accent)', color: '#ffffff' }}>
                Publish Promo Voucher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
