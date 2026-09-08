export const articleEditorCss = `
/* ============================================================
   FULL-PAGE ARTICLE EDITOR
   ============================================================ */
.editor-shell { min-height: 100vh; background: var(--bg); }
.editor-topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  background: var(--card-bg); border-bottom: 1px solid var(--line);
  padding: 10px 24px; box-shadow: var(--shadow-sm);
}
.editor-topbar-left { display: flex; align-items: center; gap: 16px; }
.editor-back-btn {
  font-size: 13px; font-weight: 700; color: var(--accent);
  text-decoration: none; padding: 6px 12px; border-radius: 6px;
  border: 1px solid var(--line); background: var(--card-bg);
  transition: all 0.15s;
}
.editor-back-btn:hover { background: var(--accent-soft); }
.editor-topbar-title { font-size: 16px; font-weight: 800; color: var(--ink); margin: 0; }
.editor-topbar-right { display: flex; align-items: center; gap: 10px; }
.editor-preview-link {
  font-size: 12px; font-weight: 700; color: var(--muted);
  text-decoration: none; padding: 6px 12px; border-radius: 6px;
  border: 1px solid var(--line); transition: all 0.15s;
}
.editor-preview-link:hover { color: var(--ink); border-color: var(--ink); }
.editor-save-btn {
  background: var(--accent); color: #fff; border: none;
  padding: 8px 20px; border-radius: 8px; font-weight: 800;
  font-size: 13px; cursor: pointer; transition: all 0.15s;
}
.editor-save-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

.editor-meta-row { padding: 20px 24px 0; }
.editor-meta-full { margin-bottom: 16px; }
.editor-title-input {
  width: 100%; padding: 12px 16px; font-size: 22px; font-weight: 800;
  border: 2px solid var(--line); border-radius: 10px; color: var(--ink);
  background: var(--card-bg); transition: border-color 0.2s;
  font-family: inherit;
}
.editor-title-input:focus { border-color: var(--accent); outline: none; }
.editor-meta-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px;
}
.editor-label {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11px; font-weight: 800; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
}
.editor-input, .editor-select, .editor-slug-input {
  width: 100%; padding: 8px 12px; font-size: 13px; border: 1px solid var(--line);
  border-radius: 8px; color: var(--ink); background: var(--card-bg);
  font-family: inherit; transition: border-color 0.2s;
}
.editor-input:focus, .editor-select:focus, .editor-slug-input:focus,
.editor-seo-textarea:focus { border-color: var(--accent); outline: none; }
.editor-slug-wrap {
  display: flex; align-items: center; border: 1px solid var(--line);
  border-radius: 8px; overflow: hidden; background: var(--card-bg);
}
.editor-slug-prefix {
  padding: 8px 10px; font-size: 12px; font-weight: 700;
  color: var(--muted); background: var(--line-subtle);
  border-right: 1px solid var(--line); white-space: nowrap;
}
.editor-slug-wrap .editor-slug-input { border: none; border-radius: 0; }

.editor-body {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  margin: 16px 24px; border: 1px solid var(--line); border-radius: 12px;
  overflow: hidden; background: var(--card-bg); min-height: 500px;
}
.editor-pane-left {
  display: flex; flex-direction: column;
  border-right: 1px solid var(--line);
}
.editor-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 3px;
  padding: 8px 12px; background: var(--line-subtle);
  border-bottom: 1px solid var(--line);
}
.editor-toolbar-label {
  font-size: 9px; font-weight: 800; color: var(--muted);
  letter-spacing: 0.5px; margin-right: 6px;
}
.editor-tb-btn {
  padding: 4px 8px; font-size: 11px; font-weight: 700;
  border: 1px solid var(--line); border-radius: 5px;
  background: var(--card-bg); color: var(--ink); cursor: pointer;
  transition: all 0.15s; white-space: nowrap;
}
.editor-tb-btn:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
.editor-tb-accent { color: var(--accent); border-color: var(--accent-soft); }
.editor-tb-accent:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
.editor-tb-sep { width: 1px; height: 20px; background: var(--line); margin: 0 4px; }
.editor-textarea {
  flex: 1; width: 100%; padding: 16px; font-size: 13.5px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  line-height: 1.65; border: none; resize: none; color: var(--ink);
  background: var(--card-bg); min-height: 400px;
}
.editor-textarea:focus { outline: none; }
.editor-textarea::placeholder { color: var(--muted); opacity: 0.6; }
.editor-content-stats {
  display: flex; gap: 16px; padding: 8px 16px;
  border-top: 1px solid var(--line); background: var(--line-subtle);
  font-size: 11px; font-weight: 700; color: var(--muted);
}
.editor-pane-right { display: flex; flex-direction: column; overflow: hidden; }
.editor-preview-header {
  padding: 8px 16px; background: var(--line-subtle);
  border-bottom: 1px solid var(--line);
  font-size: 10px; font-weight: 800; color: var(--accent);
  letter-spacing: 0.8px; text-transform: uppercase;
}
.editor-preview-body {
  flex: 1; padding: 20px; overflow-y: auto;
  max-height: 600px; font-family: inherit;
}

.editor-seo-panel {
  margin: 0 24px 16px; border: 1px solid var(--line);
  border-radius: 12px; overflow: hidden; background: var(--card-bg);
}
.editor-seo-header {
  padding: 10px 16px; background: var(--line-subtle);
  border-bottom: 1px solid var(--line);
  font-size: 12px; font-weight: 800; color: var(--ink);
}
.editor-seo-body { padding: 16px; }
.editor-seo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.editor-seo-inputs { display: flex; flex-direction: column; gap: 12px; }
.editor-field { display: flex; flex-direction: column; }
.editor-seo-textarea { resize: vertical; }
.editor-char-count { font-size: 10px; font-weight: 700; color: var(--muted); }
.editor-char-count.good { color: var(--emerald); }
.editor-char-count.over { color: #dc2626; }

.editor-serp-preview { padding-top: 8px; }
.editor-serp-header {
  font-size: 10px; font-weight: 800; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
}
.editor-serp-card {
  border: 1px solid var(--line); border-radius: 10px;
  padding: 16px 18px; background: #fff;
}
.serp-url {
  font-size: 12px; color: #202124; display: flex;
  align-items: center; gap: 6px; margin-bottom: 4px;
}
.serp-favicon { font-size: 10px; }
.serp-title {
  font-size: 18px; font-weight: 400; color: #1a0dab;
  line-height: 1.3; margin-bottom: 4px; cursor: pointer;
}
.serp-title:hover { text-decoration: underline; }
.serp-description {
  font-size: 13px; color: #4d5156; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; overflow: hidden;
}

.editor-excerpt-panel {
  margin: 0 24px 16px; background: var(--card-bg);
  border: 1px solid var(--line); border-radius: 12px; padding: 16px;
}
.editor-publish-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px 24px; flex-wrap: wrap; gap: 12px;
}
.editor-publish-options { display: flex; gap: 20px; }
.editor-checkbox-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700; color: var(--ink); cursor: pointer;
}
.editor-checkbox-label input { width: 16px; height: 16px; cursor: pointer; }
.editor-publish-actions { display: flex; gap: 10px; }
.editor-cancel-btn {
  padding: 8px 20px; font-size: 13px; font-weight: 700;
  border: 1px solid var(--line); border-radius: 8px;
  color: var(--muted); text-decoration: none; background: var(--card-bg);
  cursor: pointer; transition: all 0.15s;
}
.editor-cancel-btn:hover { color: var(--ink); border-color: var(--ink); }

@media (max-width: 900px) {
  .editor-body { grid-template-columns: 1fr; }
  .editor-pane-left { border-right: none; border-bottom: 1px solid var(--line); }
  .editor-meta-grid { grid-template-columns: 1fr 1fr; }
  .editor-seo-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .editor-meta-grid { grid-template-columns: 1fr; }
  .editor-topbar { flex-direction: column; gap: 8px; padding: 10px 16px; }
  .editor-topbar-left, .editor-topbar-right { width: 100%; justify-content: center; }
  .editor-body, .editor-seo-panel, .editor-excerpt-panel { margin-left: 12px; margin-right: 12px; }
}


`;
