export const adminPortalCss = `
/* ==========================================================================
   2026 Executive Management Portal Suite
   ========================================================================== */
.admin-shell {
  display: flex; overflow-x: hidden;
  min-height: 100vh;
  background: #f8fafc;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
[data-theme="dark"] .admin-shell {
  background: #080c14;
}

/* Sidebar */
.admin-sidebar {
  width: 270px;
  background: #090d16;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #1e293b;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto; overflow-x: hidden;
}
.admin-sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #1e293b;
  background: rgba(15, 23, 42, 0.6);
}
.admin-telemetry-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  margin-top: 10px;
}
.admin-telemetry-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulseDot 2s infinite;
}
@keyframes pulseDot {
  0% { opacity: 0.6; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.6; transform: scale(0.9); }
}

.admin-nav {
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}
.admin-nav-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.admin-nav-section-title {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #64748b;
  text-transform: uppercase;
  padding: 4px 12px;
  margin-bottom: 4px;
}
.admin-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  width: 100%;
  text-align: left;
  text-decoration: none;
}
.admin-nav-item:hover {
  background: rgba(30, 41, 59, 0.7);
  color: #f8fafc;
  transform: translateX(2px);
}
.admin-nav-item.active {
  background: linear-gradient(90deg, rgba(225, 29, 72, 0.15) 0%, rgba(225, 29, 72, 0.05) 100%);
  color: #ffffff;
  border-color: rgba(225, 29, 72, 0.3);
  font-weight: 700;
}
.admin-nav-badge {
  background: var(--accent);
  color: #ffffff;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.admin-main {
  flex: 1; min-width: 0;
  padding: 32px 40px;
  overflow-y: auto;
  max-width: 1600px;
}
@media (max-width: 900px) {
  .admin-shell { flex-direction: column; }
  .admin-sidebar { width: 100%; height: auto; position: static; }
  .admin-main { padding: 20px 16px; }
}

/* 2026 Executive Top Telemetry Bar */
.admin-topbar-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}

/* Stat Cards: 2026 Mesh Glass */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}
.admin-stat-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
  border-radius: 18px;
  padding: 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
}
.admin-stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.admin-stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.admin-stat-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--muted);
  text-transform: uppercase;
}
.admin-stat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.admin-stat-value {
  font-size: 34px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -1.5px;
  line-height: 1;
  margin-bottom: 10px;
}
.admin-stat-trend {
  font-size: 11px;
  color: var(--emerald);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 2026 Admin Toolbar */
.admin-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.admin-search-box {
  position: relative;
  flex: 1;
  max-width: 420px;
  min-width: 240px;
}
.admin-search-box input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1px solid var(--line);
  border-radius: 10px;
  font-size: 13px;
  background: var(--card-bg);
  color: var(--ink);
  outline: none;
  transition: all 0.2s;
}
.admin-search-box input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--muted);
  pointer-events: none;
}
.admin-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.admin-filter-select {
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card-bg);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}

/* Admin Card & Table */
.admin-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  color: var(--ink);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}
.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;
}
.admin-table th {
  background: var(--line-subtle);
  padding: 14px 18px;
  text-align: left;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: var(--muted);
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.admin-table th:first-child {
  border-top-left-radius: 10px;
}
.admin-table th:last-child {
  border-top-right-radius: 10px;
}
.admin-table td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  vertical-align: middle;
}
.admin-table tr:hover td {
  background: var(--line-subtle);
}

/* Status Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
}
.badge-active { background: var(--emerald-soft); color: var(--emerald); }
.badge-inactive { background: var(--line-subtle); color: var(--muted); }
.badge-pending { background: var(--amber-soft); color: var(--amber); }

/* Form Controls */
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 6px;
}
.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--ink);
  background: var(--card-bg);
  outline: none;
  transition: border-color 0.15s;
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  border-color: var(--accent);
}

.alert-box {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}
.alert-success { background: var(--emerald-soft); color: var(--emerald); border: 1px solid #a7f3d0; }
.alert-error { background: #ffe4e6; color: #be123c; border: 1px solid #fecdd3; }

/* Admin Edit Modals */
.admin-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: none;
  place-items: center;
  z-index: 9999;
  padding: 20px;
  overflow-y: auto;
}
.admin-modal-backdrop.open {
  display: grid;
}
.admin-modal-content {
  background: var(--card-bg, #ffffff);
  color: var(--ink, #0f172a);
  border-radius: var(--radius-lg, 16px);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid var(--line);
  animation: adminModalIn 0.2s ease-out;
}
@keyframes adminModalIn {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.admin-modal-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.admin-modal-body {
  padding: 24px;
  overflow-y: auto;
}
.admin-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: var(--line-subtle, #f8fafc);
  border-radius: 0 0 var(--radius-lg, 16px) var(--radius-lg, 16px);
}


`;
