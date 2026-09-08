export const skeletonCss = `
/* ========================================================
   SKELETON LOADING SHIMMER & SCREENS
   Perceived performance loading state for product grids & search
   ======================================================== */
@keyframes bnShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(226, 232, 240, 0.6) 0%,
    rgba(241, 245, 249, 0.95) 35%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(241, 245, 249, 0.95) 65%,
    rgba(226, 232, 240, 0.6) 100%
  );
  background-size: 250% 100%;
  animation: bnShimmer 1.5s infinite ease-in-out;
  border-radius: var(--radius-sm);
  display: block;
}

[data-theme="dark"] .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #182234 0%,
    #253348 35%,
    #334561 50%,
    #253348 65%,
    #182234 100%
  );
  background-size: 250% 100%;
}

/* Product Card Skeleton */
.product-card-skeleton {
  pointer-events: none;
  user-select: none;
  border-color: var(--line);
  background: var(--card-bg, #ffffff);
}

.product-card-skeleton .skeleton-top-stage {
  position: relative;
  height: 240px;
  width: 100%;
  background: var(--bg-alt);
  border-bottom: 1px solid var(--line);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-card-skeleton .skeleton-image {
  width: 75%;
  height: 75%;
  border-radius: var(--radius-md);
}

.product-card-skeleton .skeleton-badge-pill {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 48px;
  height: 22px;
  border-radius: 6px;
}

.product-card-skeleton .skeleton-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.product-card-skeleton .skeleton-title-wrap {
  margin-bottom: 12px;
}

.product-card-skeleton .skeleton-store-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.product-card-skeleton .skeleton-bottom-row {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--line);
}

.product-card-skeleton .skeleton-price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Search Autocomplete Skeleton Dropdown */
.search-skeleton-dropdown {
  padding: 6px 0;
  pointer-events: none;
}

.search-skeleton-group-title {
  width: 120px;
  height: 12px;
  margin: 8px 14px 10px;
}

.search-skeleton-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--line);
}

.search-skeleton-thumb {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 6px;
}

.search-skeleton-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.search-skeleton-line {
  border-radius: 4px;
}

@media (max-width: 768px) {
  .product-card-skeleton .skeleton-top-stage {
    height: 190px;
  }
}

/* Empty State */
.store-empty {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 60px 20px;
  text-align: center;
  max-width: 500px;
  margin: 40px auto;
}
.empty-icon {
  font-size: 48px;
  color: var(--muted);
  margin-bottom: 12px;
}
.store-empty h3 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 6px;
}
.store-empty p {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 20px;
}
.primary-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  border: 0;
  cursor: pointer;
  transition: all 0.15s;
}
.primary-action:hover {
  background: var(--accent);
  color: #ffffff;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--btn-secondary-bg) !important;
  color: var(--btn-secondary-color) !important;
  border: 1px solid var(--btn-secondary-border) !important;
  padding: 9px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}
.btn-secondary:hover {
  background: var(--line) !important;
  color: var(--ink) !important;
}

/* Editorial Banner */
.editorial-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  border-radius: var(--radius-lg);
  padding: 40px 48px;
  margin: 60px auto 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  color: #ffffff;
}
.editorial-banner h2 {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.15;
  margin: 8px 0 12px;
}
.editorial-banner p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  max-width: 520px;
}
.editorial-stat {
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  padding: 24px 32px;
  min-width: 180px;
}
.editorial-stat strong {
  display: block;
  font-size: 42px;
  font-weight: 900;
  color: #fda4af;
  line-height: 1;
}
.editorial-stat span {
  font-size: 12px;
  color: #cbd5e1;
  font-weight: 600;
  margin-top: 6px;
  display: block;
}

/* Footer */
.store-footer {
  background: #0b0f19;
  color: #cbd5e1;
  border-top: 1px solid #1e293b;
  padding: 60px 0 24px;
  margin-top: 60px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1.1fr 1.3fr 0.9fr;
  gap: 32px;
  margin-bottom: 40px;
}
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}
@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}


`;
