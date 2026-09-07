import { FC } from 'hono/jsx';
import { Article, SiteSettings } from '../types';
import { Layout } from './layout';

export const ArticleEditorPage: FC<{
  settings: SiteSettings;
  article?: Article | null;
  isEdit?: boolean;
}> = ({ settings, article, isEdit = false }) => {
  const pageTitle = isEdit ? `Edit: ${article?.title || 'Article'}` : 'Write New Article';
  const formAction = '/admin/articles/save';

  const wordCount = article?.content ? article.content.split(/\s+/).filter(Boolean).length : 0;
  const autoReadTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Layout title={`${pageTitle} — BuyerNepal CMS`} settings={settings}>
      <div className="editor-shell">
        {/* Top Bar */}
        <div className="editor-topbar">
          <div className="editor-topbar-left">
            <a href="/admin?tab=blog" className="editor-back-btn">← Back to CMS</a>
            <h1 className="editor-topbar-title">{isEdit ? '✏️ Edit Article' : '✍️ Write New Article'}</h1>
          </div>
          <div className="editor-topbar-right">
            <a href={isEdit && article ? `/blog/${article.slug}` : '/blog'} target="_blank" className="editor-preview-link">
              👁️ View Live
            </a>
            <button type="button" id="editorSaveBtn" className="editor-save-btn">
              {isEdit ? '💾 Update Article' : '🚀 Publish Article'}
            </button>
          </div>
        </div>

        <form id="articleEditorForm" method="post" action={formAction}>
          {isEdit && article && <input type="hidden" name="id" value={String(article.id)} />}

          {/* Meta Row: Title, Slug, Category, Author */}
          <div className="editor-meta-row">
            <div className="editor-meta-full">
              <label className="editor-label">Article Title</label>
              <input
                id="editorTitle"
                name="title"
                type="text"
                className="editor-title-input"
                placeholder="e.g. Best Mobile Phones Under 30,000 in Nepal (2026)"
                defaultValue={article?.title || ''}
                required
              />
            </div>
            <div className="editor-meta-grid">
              <div>
                <label className="editor-label">URL Slug</label>
                <div className="editor-slug-wrap">
                  <span className="editor-slug-prefix">/blog/</span>
                  <input
                    id="editorSlug"
                    name="slug"
                    type="text"
                    className="editor-slug-input"
                    placeholder="auto-generated-from-title"
                    defaultValue={article?.slug || ''}
                  />
                </div>
              </div>
              <div>
                <label className="editor-label">Category</label>
                <select id="editorCategory" name="category" className="editor-select">
                  {['Buying Guides', 'Smartphone Reviews', 'Laptop Guides', 'Nepal Tech', 'Deals & Offers', 'How-To', 'Comparison'].map(cat => (
                    <option key={cat} value={cat} selected={article?.category === cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="editor-label">Author Byline</label>
                <input
                  id="editorAuthor"
                  name="author_name"
                  type="text"
                  className="editor-input"
                  defaultValue={article?.author_name || 'BuyerNepal Editorial Team'}
                  required
                />
              </div>
              <div>
                <label className="editor-label">Cover Image URL</label>
                <input
                  id="editorCover"
                  name="cover_image"
                  type="url"
                  className="editor-input"
                  placeholder="https://images.unsplash.com/..."
                  defaultValue={article?.cover_image || ''}
                  required
                />
              </div>
            </div>
          </div>

          {/* Editor Body: 2-column */}
          <div className="editor-body">
            {/* LEFT: Markdown Editor */}
            <div className="editor-pane-left">
              <div className="editor-toolbar">
                <span className="editor-toolbar-label">FORMAT:</span>
                <button type="button" className="editor-tb-btn" data-insert="h2" title="Heading 2">H2</button>
                <button type="button" className="editor-tb-btn" data-insert="h3" title="Heading 3">H3</button>
                <span className="editor-tb-sep"></span>
                <button type="button" className="editor-tb-btn" data-insert="bold" title="Bold">𝐁</button>
                <button type="button" className="editor-tb-btn" data-insert="italic" title="Italic">𝐼</button>
                <button type="button" className="editor-tb-btn" data-insert="link" title="Link">🔗</button>
                <button type="button" className="editor-tb-btn" data-insert="image" title="Image">🖼️</button>
                <span className="editor-tb-sep"></span>
                <button type="button" className="editor-tb-btn" data-insert="bullet" title="Bullet List">• List</button>
                <button type="button" className="editor-tb-btn" data-insert="quote" title="Blockquote">❝ Quote</button>
                <button type="button" className="editor-tb-btn" data-insert="hr" title="Horizontal Rule">— HR</button>
                <span className="editor-tb-sep"></span>
                <button type="button" className="editor-tb-btn editor-tb-accent" data-insert="pros" title="Pros Box">👍 Pros</button>
                <button type="button" className="editor-tb-btn editor-tb-accent" data-insert="cons" title="Cons Box">⚠️ Cons</button>
                <button type="button" className="editor-tb-btn editor-tb-accent" data-insert="deal" title="Deal Card">⚡ Deal</button>
                <button type="button" className="editor-tb-btn editor-tb-accent" data-insert="table" title="Spec Table">📊 Table</button>
                <button type="button" className="editor-tb-btn editor-tb-accent" data-insert="score" title="Scorecard">🏆 Score</button>
                <button type="button" className="editor-tb-btn editor-tb-accent" data-insert="coupon" title="Coupon Box">🎟️ Coupon</button>
              </div>
              <textarea
                id="editorContent"
                name="content"
                className="editor-textarea"
                placeholder="Write your article content here using Markdown...

## Section Title
Regular paragraph text with **bold** and *italic* formatting.

### Subheading
- Bullet point one
- Bullet point two

> Callout / quote block

[pros] Great battery life; Beautiful display; Fast charging [/pros]
[cons] No headphone jack; Expensive in Nepal [/cons]

[score: 9.2 | Display: 9.5 | Performance: 9.0 | Cameras: 9.2 | Battery: 8.8 | Nepal Value: 9.0 | verdict: Best phone under 50K in Nepal]

[deal title=&quot;Samsung Galaxy S24&quot; price=&quot;Rs. 124,999&quot; store=&quot;Daraz Mall&quot; url=&quot;https://daraz.com.np&quot;]"
                required
              >{article?.content || ''}</textarea>
              <div className="editor-content-stats">
                <span id="editorWordCount">{wordCount} words</span>
                <span id="editorReadTime">~{autoReadTime} min read</span>
                <input type="hidden" id="editorReadTimeInput" name="read_time_minutes" value={String(article?.read_time_minutes || autoReadTime)} />
              </div>
            </div>

            {/* RIGHT: Live Preview */}
            <div className="editor-pane-right">
              <div className="editor-preview-header">
                <span>📄 LIVE PREVIEW</span>
              </div>
              <div id="editorPreview" className="editor-preview-body">
                <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 20px' }}>
                  Start writing to see a live preview...
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Panel: SEO + Meta */}
          <div className="editor-seo-panel">
            <div className="editor-seo-header">
              <span>🔍 SEO & Search Optimization</span>
            </div>
            <div className="editor-seo-body">
              <div className="editor-seo-grid">
                <div className="editor-seo-inputs">
                  <div className="editor-field">
                    <label className="editor-label">
                      SEO Title
                      <span id="seoTitleCount" className="editor-char-count">0 / 60</span>
                    </label>
                    <input
                      id="editorSeoTitle"
                      name="seo_title"
                      type="text"
                      className="editor-input"
                      placeholder="Optimized title for Google (50-60 characters recommended)"
                      defaultValue={article?.seo_title || ''}
                      maxLength={70}
                    />
                  </div>
                  <div className="editor-field">
                    <label className="editor-label">
                      Meta Description
                      <span id="seoDescCount" className="editor-char-count">0 / 160</span>
                    </label>
                    <textarea
                      id="editorSeoDesc"
                      name="seo_description"
                      className="editor-input editor-seo-textarea"
                      placeholder="Compelling description for search results (150-160 characters recommended)"
                      defaultValue={article?.seo_description || ''}
                      maxLength={200}
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="editor-field">
                    <label className="editor-label">Focus Keyword</label>
                    <input
                      id="editorFocusKeyword"
                      name="focus_keyword"
                      type="text"
                      className="editor-input"
                      placeholder="e.g. best phones under 30000 nepal"
                      defaultValue={article?.focus_keyword || ''}
                    />
                  </div>
                  <div className="editor-field">
                    <label className="editor-label">Tags (comma separated)</label>
                    <input
                      id="editorTags"
                      name="tags"
                      type="text"
                      className="editor-input"
                      placeholder="e.g. smartphones, budget, deals, nepal"
                      defaultValue={article?.tags || ''}
                    />
                  </div>
                </div>

                {/* Google SERP Preview */}
                <div className="editor-serp-preview">
                  <div className="editor-serp-header">Google Search Preview</div>
                  <div className="editor-serp-card">
                    <div className="serp-url">
                      <span className="serp-favicon">🟢</span>
                      <span>buyernepal.com › blog › <span id="serpSlug">{article?.slug || 'article-slug'}</span></span>
                    </div>
                    <div id="serpTitle" className="serp-title">
                      {article?.seo_title || article?.title || 'Your Article Title — BuyerNepal'}
                    </div>
                    <div id="serpDescription" className="serp-description">
                      {article?.seo_description || article?.excerpt || 'Your meta description will appear here. Write a compelling summary to improve click-through rate from Google search results.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="editor-excerpt-panel">
            <label className="editor-label">Article Excerpt / Summary</label>
            <textarea
              id="editorExcerpt"
              name="excerpt"
              className="editor-input"
              placeholder="Brief summary that appears in article cards and social shares..."
              rows={2}
              required
            >{article?.excerpt || ''}</textarea>
          </div>

          {/* Publish Options Row */}
          <div className="editor-publish-row">
            <div className="editor-publish-options">
              <label className="editor-checkbox-label">
                <input type="checkbox" name="is_featured" value="1" checked={article?.is_featured === 1} />
                ⭐ Feature as Hero Story
              </label>
              <label className="editor-checkbox-label">
                <input type="checkbox" name="is_published" value="1" checked={isEdit ? article?.is_published === 1 : true} />
                🚀 Published (visible on storefront)
              </label>
            </div>
            <div className="editor-publish-actions">
              <a href="/admin?tab=blog" className="editor-cancel-btn">Cancel</a>
              <button type="submit" className="editor-save-btn">
                {isEdit ? '💾 Update Article' : '🚀 Publish Article'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Client-Side Editor Logic */}
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  const titleInput = document.getElementById('editorTitle');
  const slugInput = document.getElementById('editorSlug');
  const contentTA = document.getElementById('editorContent');
  const preview = document.getElementById('editorPreview');
  const wordCountEl = document.getElementById('editorWordCount');
  const readTimeEl = document.getElementById('editorReadTime');
  const readTimeInput = document.getElementById('editorReadTimeInput');
  const seoTitle = document.getElementById('editorSeoTitle');
  const seoDesc = document.getElementById('editorSeoDesc');
  const seoTitleCount = document.getElementById('seoTitleCount');
  const seoDescCount = document.getElementById('seoDescCount');
  const serpTitle = document.getElementById('serpTitle');
  const serpDesc = document.getElementById('serpDescription');
  const serpSlug = document.getElementById('serpSlug');
  const saveBtn = document.getElementById('editorSaveBtn');
  const form = document.getElementById('articleEditorForm');

  // Auto-generate slug from title
  if (titleInput && slugInput) {
    titleInput.addEventListener('input', () => {
      if (!slugInput.dataset.manual) {
        slugInput.value = titleInput.value.toLowerCase()
          .replace(/[^a-z0-9\\s-]/g, '')
          .replace(/\\s+/g, '-')
          .replace(/-+/g, '-')
          .substring(0, 80);
      }
      // Update SERP preview title
      if (serpTitle) {
        serpTitle.textContent = seoTitle?.value || (titleInput.value + ' — BuyerNepal');
      }
      if (serpSlug) {
        serpSlug.textContent = slugInput.value || 'article-slug';
      }
    });
    slugInput.addEventListener('input', () => { slugInput.dataset.manual = '1'; });
  }

  // SEO character counters
  function updateSeoCounters() {
    if (seoTitle && seoTitleCount) {
      const len = seoTitle.value.length;
      seoTitleCount.textContent = len + ' / 60';
      seoTitleCount.className = 'editor-char-count' + (len > 60 ? ' over' : len >= 50 ? ' good' : '');
    }
    if (seoDesc && seoDescCount) {
      const len = seoDesc.value.length;
      seoDescCount.textContent = len + ' / 160';
      seoDescCount.className = 'editor-char-count' + (len > 160 ? ' over' : len >= 150 ? ' good' : '');
    }
    // Update SERP preview
    if (serpTitle) serpTitle.textContent = seoTitle?.value || titleInput?.value || 'Article Title — BuyerNepal';
    if (serpDesc) serpDesc.textContent = seoDesc?.value || document.getElementById('editorExcerpt')?.value || 'Meta description preview...';
    if (serpSlug) serpSlug.textContent = slugInput?.value || 'article-slug';
  }
  if (seoTitle) seoTitle.addEventListener('input', updateSeoCounters);
  if (seoDesc) seoDesc.addEventListener('input', updateSeoCounters);
  updateSeoCounters();

  // Live markdown preview
  function renderPreview() {
    if (!contentTA || !preview) return;
    const md = contentTA.value;
    const words = md.split(/\\s+/).filter(Boolean);
    const wc = words.length;
    const rt = Math.max(1, Math.ceil(wc / 200));

    if (wordCountEl) wordCountEl.textContent = wc + ' words';
    if (readTimeEl) readTimeEl.textContent = '~' + rt + ' min read';
    if (readTimeInput) readTimeInput.value = String(rt);

    // Simple client-side markdown renderer
    const lines = md.split('\\n');
    const parts = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        if (inList) { parts.push('</ul>'); inList = false; }
        continue;
      }

      // Pros
      if (line.startsWith('[pros]') && line.endsWith('[/pros]')) {
        const items = line.replace('[pros]','').replace('[/pros]','').split(';');
        parts.push('<div style="background:#ecfdf5;border-left:4px solid #059669;border-radius:8px;padding:14px 18px;margin:16px 0"><strong style="color:#059669">👍 Key Strengths</strong><ul style="margin:8px 0 0;padding-left:18px">' + items.map(it => '<li style="color:#065f46">✓ '+it.trim()+'</li>').join('') + '</ul></div>');
        continue;
      }
      // Cons
      if (line.startsWith('[cons]') && line.endsWith('[/cons]')) {
        const items = line.replace('[cons]','').replace('[/cons]','').split(';');
        parts.push('<div style="background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;padding:14px 18px;margin:16px 0"><strong style="color:#dc2626">⚠️ Downsides</strong><ul style="margin:8px 0 0;padding-left:18px">' + items.map(it => '<li style="color:#991b1b">✕ '+it.trim()+'</li>').join('') + '</ul></div>');
        continue;
      }
      // Score
      if (line.startsWith('[score:') && line.endsWith(']')) {
        const raw = line.slice(7, -1).trim();
        const segs = raw.split('|').map(s => s.trim());
        const overall = segs[0] || '9.0';
        let verdict = '';
        const metrics = [];
        for (let j = 1; j < segs.length; j++) {
          if (segs[j].toLowerCase().startsWith('verdict:')) verdict = segs[j].substring(8).trim();
          else if (segs[j].includes(':')) {
            const [n,v] = segs[j].split(':');
            metrics.push({name:n.trim(),val:parseFloat(v)||9});
          }
        }
        parts.push('<div style="background:var(--card-bg,#fff);border:2px solid var(--accent,#e11d48);border-radius:12px;padding:20px;margin:20px 0;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--line,#e2e8f0)"><div><span style="font-size:10px;font-weight:800;color:var(--accent,#e11d48);letter-spacing:0.8px;text-transform:uppercase">🏆 SCORECARD</span></div><div style="background:linear-gradient(135deg,var(--accent,#e11d48),#7c3aed);color:#fff;padding:8px 14px;border-radius:10px;text-align:center"><span style="font-size:22px;font-weight:900;display:block;line-height:1">'+overall+'</span><small style="font-size:9px;text-transform:uppercase;opacity:0.9">/ 10</small></div></div>' +
          (metrics.length ? '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:12px">' + metrics.map(m => '<div><div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:3px"><span>'+m.name+'</span><strong>'+m.val+'/10</strong></div><div style="background:var(--line,#e2e8f0);height:6px;border-radius:3px;overflow:hidden"><div style="background:var(--accent,#e11d48);width:'+Math.min(100,m.val*10)+'%;height:100%;border-radius:3px"></div></div></div>').join('') + '</div>' : '') +
          (verdict ? '<div style="background:rgba(225,29,72,0.06);border-left:3px solid var(--accent,#e11d48);padding:10px 14px;border-radius:0 6px 6px 0;font-size:12px;font-style:italic;margin-top:8px"><strong>Verdict:</strong> "'+verdict+'"</div>' : '') +
        '</div>');
        continue;
      }
      // Deal
      if (line.startsWith('[deal') && line.endsWith(']')) {
        const t = (line.match(/title="([^"]+)"/) || [])[1] || 'Deal';
        const p = (line.match(/price="([^"]+)"/) || [])[1] || '';
        const s = (line.match(/store="([^"]+)"/) || [])[1] || 'Store';
        const u = (line.match(/url="([^"]+)"/) || [])[1] || '#';
        parts.push('<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px 20px;margin:16px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px"><div><span style="font-size:10px;font-weight:800;color:#2563eb;background:#dbeafe;padding:2px 8px;border-radius:4px">🔥 VERIFIED DEAL</span><div style="font-weight:800;font-size:14px;margin-top:4px;color:#1e3a5f">'+t+'</div><div style="font-size:11px;color:#64748b;margin-top:2px">at <strong>'+s+'</strong></div></div><div style="display:flex;align-items:center;gap:10px">'+(p ? '<span style="font-weight:900;font-size:15px;color:#059669">'+p+'</span>' : '')+'<a href="'+u+'" target="_blank" style="background:#2563eb;color:#fff;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none">View Deal ↗</a></div></div>');
        continue;
      }
      // Coupon
      if (line.startsWith('[coupon:') && line.endsWith(']')) {
        const raw = line.slice(8,-1).trim();
        const [code, store, disc, url] = raw.split('|').map(s => s.trim());
        parts.push('<div style="background:#fffbeb;border:2px dashed #f59e0b;border-radius:10px;padding:16px;margin:16px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px"><div><span style="font-size:10px;font-weight:800;color:#b45309;background:#fef3c7;padding:2px 8px;border-radius:4px">🎟️ COUPON</span><div style="font-weight:800;font-size:14px;margin-top:4px;color:#92400e">'+(disc||'Discount')+' at '+(store||'Store')+'</div></div><div style="display:flex;gap:8px;align-items:center"><span style="font-family:monospace;font-weight:900;background:#fff;border:1px solid #fde68a;color:#b45309;padding:6px 12px;border-radius:6px;letter-spacing:1px">'+(code||'CODE')+'</span><a href="'+(url||'#')+'" target="_blank" style="background:#d97706;color:#fff;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none">Redeem ↗</a></div></div>');
        continue;
      }
      // Table
      if (line.startsWith('|') && line.endsWith('|')) {
        if (inList) { parts.push('</ul>'); inList = false; }
        // Collect all table lines
        const tableLines = [line];
        while (i + 1 < lines.length && lines[i+1].trim().startsWith('|')) {
          i++;
          tableLines.push(lines[i].trim());
        }
        let thead = '';
        let tbody = '';
        tableLines.forEach((tl, ti) => {
          if (tl.includes('---')) return;
          const cells = tl.split('|').map(c => c.trim()).filter((c, ci, arr) => ci > 0 && ci < arr.length - 1);
          if (ti === 0) thead = '<tr>' + cells.map(c => '<th style="text-align:left;padding:8px 12px;font-weight:800;font-size:12px;color:var(--ink,#1e293b);background:var(--line-subtle,#f1f5f9);border-bottom:2px solid var(--line,#e2e8f0)">'+c+'</th>').join('') + '</tr>';
          else tbody += '<tr>' + cells.map(c => '<td style="padding:8px 12px;font-size:12px;border-bottom:1px solid var(--line,#e2e8f0)">'+c+'</td>').join('') + '</tr>';
        });
        parts.push('<div style="overflow-x:auto;margin:16px 0;border-radius:8px;border:1px solid var(--line,#e2e8f0)"><table style="width:100%;border-collapse:collapse"><thead>'+thead+'</thead><tbody>'+tbody+'</tbody></table></div>');
        continue;
      }
      // H2
      if (line.startsWith('## ')) {
        if (inList) { parts.push('</ul>'); inList = false; }
        parts.push('<h2 style="font-size:20px;font-weight:900;color:var(--ink,#1e293b);margin:28px 0 10px;padding-bottom:8px;border-bottom:2px solid var(--line,#e2e8f0)">'+line.slice(3)+'</h2>');
        continue;
      }
      // H3
      if (line.startsWith('### ')) {
        if (inList) { parts.push('</ul>'); inList = false; }
        parts.push('<h3 style="font-size:16px;font-weight:800;color:var(--ink,#1e293b);margin:20px 0 8px">'+line.slice(4)+'</h3>');
        continue;
      }
      // Bullet
      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList) { parts.push('<ul style="padding-left:20px;margin:10px 0">'); inList = true; }
        const content = line.substring(2).replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>').replace(/\\*(.+?)\\*/g,'<em>$1</em>');
        parts.push('<li style="margin:4px 0;font-size:13px;line-height:1.6">'+content+'</li>');
        continue;
      }
      // Quote
      if (line.startsWith('> ')) {
        if (inList) { parts.push('</ul>'); inList = false; }
        parts.push('<blockquote style="border-left:4px solid var(--accent,#e11d48);background:var(--line-subtle,#f8fafc);padding:12px 16px;margin:16px 0;border-radius:0 8px 8px 0;font-size:13px;color:var(--ink-secondary,#475569)"><span style="margin-right:6px">💡</span>'+line.slice(2)+'</blockquote>');
        continue;
      }
      // HR
      if (line === '---' || line === '***') {
        if (inList) { parts.push('</ul>'); inList = false; }
        parts.push('<hr style="border:none;border-top:2px solid var(--line,#e2e8f0);margin:24px 0" />');
        continue;
      }
      // Paragraph
      if (inList) { parts.push('</ul>'); inList = false; }
      const pContent = line
        .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
        .replace(/\\[(.+?)\\]\\((.+?)\\)/g, '<a href="$2" style="color:var(--accent,#e11d48);font-weight:600" target="_blank">$1</a>');
      parts.push('<p style="margin:10px 0;font-size:14px;line-height:1.7;color:var(--ink,#1e293b)">'+pContent+'</p>');
    }
    if (inList) parts.push('</ul>');

    preview.innerHTML = parts.join('\\n') || '<p style="color:var(--muted);text-align:center;padding:40px 20px">Start writing to see a live preview...</p>';
  }

  let debounceTimer;
  if (contentTA) {
    contentTA.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(renderPreview, 200);
    });
    // Initial render
    if (contentTA.value.trim()) renderPreview();
  }

  // Toolbar Insert Snippets
  document.querySelectorAll('.editor-tb-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!contentTA) return;
      const type = btn.getAttribute('data-insert');
      let snippet = '';
      switch(type) {
        case 'h2': snippet = '\\n\\n## Section Title\\n'; break;
        case 'h3': snippet = '\\n\\n### Subheading\\n'; break;
        case 'bold': snippet = '**bold text**'; break;
        case 'italic': snippet = '*italic text*'; break;
        case 'link': snippet = '[Link Text](https://example.com)'; break;
        case 'image': snippet = '![Alt text](https://images.unsplash.com/...)'; break;
        case 'bullet': snippet = '\\n- Item one\\n- Item two\\n- Item three\\n'; break;
        case 'quote': snippet = '\\n> Important note or callout\\n'; break;
        case 'hr': snippet = '\\n---\\n'; break;
        case 'pros': snippet = '\\n\\n[pros] Great battery life; Beautiful AMOLED display; Official Nepal warranty [/pros]\\n'; break;
        case 'cons': snippet = '\\n\\n[cons] No headphone jack; Premium pricing in Nepal [/cons]\\n'; break;
        case 'deal': snippet = '\\n\\n[deal title="Product Name" price="Rs. 49,999" store="Daraz Mall" url="https://daraz.com.np"]\\n'; break;
        case 'table': snippet = '\\n\\n| Specification | Details |\\n| :--- | :--- |\\n| Processor | Snapdragon 8 Gen 3 |\\n| Display | 6.7" AMOLED 120Hz |\\n| Battery | 5000mAh |\\n| Price in Nepal | Rs. 49,999 |\\n'; break;
        case 'score': snippet = '\\n\\n[score: 9.2 | Display: 9.5 | Performance: 9.0 | Cameras: 9.2 | Battery: 8.8 | Nepal Value: 9.0 | verdict: Best in class for Nepali consumers]\\n'; break;
        case 'coupon': snippet = '\\n\\n[coupon: BUYERNEPAL | Daraz Nepal | 10% OFF up to Rs. 2,000 | https://daraz.com.np]\\n'; break;
      }
      const start = contentTA.selectionStart;
      const end = contentTA.selectionEnd;
      const text = contentTA.value;
      contentTA.value = text.substring(0, start) + snippet + text.substring(end);
      contentTA.focus();
      contentTA.selectionStart = contentTA.selectionEnd = start + snippet.length;
      renderPreview();
    });
  });

  // Save button triggers form submit
  if (saveBtn && form) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      form.submit();
    });
  }
})();
      ` }} />
    </Layout>
  );
};
