import { FC } from 'hono/jsx';

export const AdminScripts: FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            // Modal Open Helpers
            const setupModalOpen = (btnId, modalId) => {
              const btn = document.getElementById(btnId);
              const modal = document.getElementById(modalId);
              if (btn && modal) {
                btn.addEventListener('click', () => modal.classList.add('open'));
              }
            };

            setupModalOpen('btnOpenAddProduct', 'addProductModal');
            setupModalOpen('btnOpenAddStore', 'addStoreModal');
            setupModalOpen('btnOpenAddBrand', 'addBrandModal');
            setupModalOpen('btnOpenAddUser', 'addUserModal');

            // 1. Edit Product Modal Triggers
            const editProdModal = document.getElementById('editProductModal');
            const editProdForm = document.getElementById('editProductForm');
            document.querySelectorAll('.btn-edit-product').forEach(btn => {
              btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (editProdForm) editProdForm.action = '/admin/products/' + id + '/edit';
                const setVal = (elId, attr) => {
                  const el = document.getElementById(elId);
                  if (el) el.value = btn.getAttribute(attr) || '';
                };
                setVal('editProdId', 'data-id');
                setVal('editProdName', 'data-name');
                setVal('editProdCategory', 'data-category');
                setVal('editProdPrice', 'data-price');
                setVal('editProdOriginal', 'data-original');
                setVal('editProdStore', 'data-store');
                setVal('editProdBrand', 'data-brand');
                setVal('editProdAffiliate', 'data-affiliate');
                setVal('editProdImage', 'data-image');
                setVal('editProdBadge', 'data-badge');
                setVal('editProdRating', 'data-rating');
                setVal('editProdReviews', 'data-reviews');
                setVal('editProdDesc', 'data-desc');
                setVal('editProdPros', 'data-pros');
                setVal('editProdCons', 'data-cons');
                setVal('editProdVerdict', 'data-verdict');
                const emiEl = document.getElementById('editProdEmiAvailable');
                if (emiEl) emiEl.checked = btn.getAttribute('data-emi') === '1';
                if (editProdModal) editProdModal.classList.add('open');
              });
            });

            // 2. Edit Category Modal Triggers
            const editCatModal = document.getElementById('editCategoryModal');
            const editCatForm = document.getElementById('editCategoryForm');
            document.querySelectorAll('.btn-edit-category').forEach(btn => {
              btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (editCatForm) editCatForm.action = '/admin/categories/' + id + '/edit';
                const setVal = (elId, attr) => {
                  const el = document.getElementById(elId);
                  if (el) el.value = btn.getAttribute(attr) || '';
                };
                setVal('editCatId', 'data-id');
                setVal('editCatName', 'data-name');
                setVal('editCatSlug', 'data-slug');
                setVal('editCatIcon', 'data-icon');
                setVal('editCatDesc', 'data-desc');
                setVal('editCatActive', 'data-active');
                if (editCatModal) editCatModal.classList.add('open');
              });
            });

            // 3. Edit Coupon Modal Triggers
            const editCouponModal = document.getElementById('editCouponModal');
            const editCouponForm = document.getElementById('editCouponForm');
            document.querySelectorAll('.btn-edit-coupon').forEach(btn => {
              btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (editCouponForm) editCouponForm.action = '/admin/coupons/' + id + '/edit';
                const setVal = (elId, attr) => {
                  const el = document.getElementById(elId);
                  if (el) el.value = btn.getAttribute(attr) || '';
                };
                setVal('editCouponId', 'data-id');
                setVal('editCouponCode', 'data-code');
                setVal('editCouponType', 'data-type');
                setVal('editCouponValue', 'data-value');
                setVal('editCouponMin', 'data-min');
                setVal('editCouponDesc', 'data-desc');
                setVal('editCouponActive', 'data-active');
                if (editCouponModal) editCouponModal.classList.add('open');
              });
            });

            // 4. Edit Product Scores Modal Triggers
            const scoresModal = document.getElementById('editProductScoresModal');
            const scoresForm = document.getElementById('editProductScoresForm');
            document.querySelectorAll('.btn-scores-product').forEach(btn => {
              btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (scoresForm) scoresForm.action = '/admin/products/' + id + '/scores';
                const titleEl = document.getElementById('scoresProductName');
                if (titleEl) titleEl.textContent = btn.getAttribute('data-name') || ('Product #' + id);
                const setVal = (elId, attr) => {
                  const el = document.getElementById(elId);
                  if (el) el.value = btn.getAttribute(attr) || '';
                };
                setVal('scoresProductId', 'data-id');
                setVal('scoreDisplay', 'data-display');
                setVal('scorePerformance', 'data-performance');
                setVal('scoreCamera', 'data-camera');
                setVal('scoreBattery', 'data-battery');
                setVal('scoreValue', 'data-value');
                setVal('scoreOverall', 'data-overall');
                setVal('scoreVerdict', 'data-verdict');
                if (scoresModal) scoresModal.classList.add('open');
              });
            });

            // 5. Edit Article Modal Triggers
            const editArtModal = document.getElementById('editArticleModal');
            const editArtForm = document.getElementById('editArticleForm');
            document.querySelectorAll('.btn-edit-article').forEach(btn => {
              btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (editArtForm) editArtForm.action = '/admin/articles/' + id + '/edit';
                const setVal = (elId, attr) => {
                  const el = document.getElementById(elId);
                  if (el) el.value = btn.getAttribute(attr) || '';
                };
                setVal('editArticleId', 'data-id');
                setVal('editArticleTitle', 'data-title');
                setVal('editArticleSlug', 'data-slug');
                setVal('editArticleCat', 'data-category');
                setVal('editArticleAuthor', 'data-author');
                setVal('editArticleCover', 'data-cover');
                setVal('editArticleReadTime', 'data-readtime');
                setVal('editArticleTags', 'data-tags');
                setVal('editArticleExcerpt', 'data-excerpt');
                setVal('editArticleContent', 'data-content');
                const featEl = document.getElementById('editArticleFeatured');
                if (featEl) featEl.checked = btn.getAttribute('data-featured') === '1';
                const pubEl = document.getElementById('editArticlePublished');
                if (pubEl) pubEl.checked = btn.getAttribute('data-published') === '1';
                if (editArtModal) editArtModal.classList.add('open');
              });
            });

            // 6. Article Formatting Toolbar Snippet Inserter
            document.querySelectorAll('.btn-insert-tag').forEach(btn => {
              btn.addEventListener('click', () => {
                const tag = btn.getAttribute('data-tag');
                const formGroup = btn.closest('.form-group');
                if (!formGroup) return;
                const textarea = formGroup.querySelector('textarea');
                if (!textarea) return;

                let snippet = '';
                if (tag === 'h2') snippet = '\\n\\n## Section Title Here\\n';
                else if (tag === 'h3') snippet = '\\n\\n### Subheading Here\\n';
                else if (tag === 'pros') snippet = '\\n\\n[pros] High-resolution AMOLED 120Hz display; Official 1-year GenNext Nepal warranty; All-day battery endurance [/pros]\\n';
                else if (tag === 'cons') snippet = '\\n\\n[cons] Charger not included in retail package; Premium pricing in Nepal [/cons]\\n';
                else if (tag === 'deal') snippet = '\\n\\n[deal title="Apple iPhone 16 Pro Max (256GB)" price="Rs. 214,999" store="Daraz Mall" url="https://buyernepal.com/go/product/1"]\\n';
                else if (tag === 'table') snippet = '\\n\\n| Specification | Details |\\n| :--- | :--- |\\n| Processor | Apple A18 Pro 3nm |\\n| Display | 6.9-inch Super Retina XDR OLED |\\n| Battery | Up to 33 hours video playback |\\n| Price in Nepal | Rs. 214,999 (256GB) |\\n';
                else if (tag === 'score') snippet = '\\n\\n[score: 9.4 | Display: 9.6 | Performance: 9.8 | Cameras: 9.2 | Battery: 9.0 | Nepal Value: 9.4 | verdict: Nepal flagship benchmark with unmatched performance]\\n';
                else if (tag === 'coupon') snippet = '\\n\\n[coupon: BUYERNEPAL | Daraz Nepal | 10% OFF up to Rs. 2,000 | https://buyernepal.com/go/coupon/1]\\n';

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                textarea.value = text.substring(0, start) + snippet + text.substring(end);
                textarea.focus();
                textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
              });
            });

            // Modal close helpers
            document.querySelectorAll('.close-admin-modal').forEach(btn => {
              btn.addEventListener('click', () => {
                document.querySelectorAll('.admin-modal-backdrop').forEach(m => m.classList.remove('open'));
              });
            });

            document.querySelectorAll('.admin-modal-backdrop').forEach(backdrop => {
              backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) backdrop.classList.remove('open');
              });
            });

            document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                document.querySelectorAll('.admin-modal-backdrop').forEach(m => m.classList.remove('open'));
              }
            });
          });
        `
      }}
    />
  );
};
