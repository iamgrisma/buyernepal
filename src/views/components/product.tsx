import { FC } from 'hono/jsx';
import { Category, Product, SiteSettings, Coupon } from '../../types';

export const ProductCardSkeleton: FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <article className={`product-card product-card-skeleton ${className}`} aria-hidden="true">
      <div className="product-card-top-stage skeleton-top-stage">
        <div className="skeleton-image skeleton-shimmer" />
        <div className="skeleton-badge-pill skeleton-shimmer" />
      </div>
      <div className="product-card-body">
        <div className="pc-meta skeleton-meta-row">
          <div className="skeleton-chip skeleton-shimmer" style={{ width: '64px', height: '18px' }} />
          <div className="skeleton-chip skeleton-shimmer" style={{ width: '44px', height: '18px', marginLeft: 'auto' }} />
        </div>
        <div className="skeleton-title-wrap">
          <div className="skeleton-line skeleton-shimmer" style={{ width: '88%', height: '15px', marginBottom: '6px' }} />
          <div className="skeleton-line skeleton-shimmer" style={{ width: '60%', height: '15px' }} />
        </div>
        <div className="pc-store-row skeleton-store-row">
          <div className="skeleton-chip skeleton-shimmer" style={{ width: '88px', height: '18px' }} />
          <div className="skeleton-chip skeleton-shimmer" style={{ width: '68px', height: '18px', marginLeft: 'auto' }} />
        </div>
        <div className="product-card-bottom skeleton-bottom-row">
          <div className="price-block skeleton-price-block">
            <div className="skeleton-line skeleton-shimmer" style={{ width: '56px', height: '11px', marginBottom: '5px' }} />
            <div className="skeleton-line skeleton-shimmer" style={{ width: '92px', height: '19px' }} />
          </div>
          <div className="skeleton-btn skeleton-shimmer" style={{ width: '96px', height: '34px', borderRadius: 'var(--radius-sm)' }} />
        </div>
      </div>
    </article>
  );
};


export const ProductGridSkeleton: FC<{
  count?: number;
  id?: string;
  hidden?: boolean;
  className?: string;
}> = ({ count = 8, id = 'productGridSkeleton', hidden = false, className = '' }) => {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      id={id}
      className={`product-grid product-grid-skeleton ${className}`}
      style={{ display: hidden ? 'none' : 'grid' }}
      aria-busy="true"
      aria-live="polite"
    >
      {items.map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};


export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.original_price) || 0;
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  let formattedPrice = String(price);
  let formattedOriginal = String(originalPrice);
  try {
    formattedPrice = price.toLocaleString('en-NP');
    if (originalPrice > 0) formattedOriginal = originalPrice.toLocaleString('en-NP');
  } catch {
    formattedPrice = price.toLocaleString();
    if (originalPrice > 0) formattedOriginal = originalPrice.toLocaleString();
  }

  const badge = product.badge || 'Verified Deal';
  const storeName = product.store_name || 'Daraz Mall';
  const rating = product.rating || 4.8;
  const reviewCount = product.review_count || 42;
  const emiAvailable = product.emi_available === 1;
  const emiPrice = product.emi_starting_price || Math.round(price / 18);
  const brand = product.brand || '';
  const catName = product.category_name || 'Tech';

  return (
    <article
      className="product-card"
      data-id={product.id}
      data-name={product.name.toLowerCase()}
      data-desc={(product.description || '').toLowerCase()}
      data-category={String(product.category_id || '')}
      data-price={price}
      data-store={storeName.toLowerCase()}
      data-badge={badge.toLowerCase()}
      data-rating={rating}
      data-discount={discountPercent}
      data-brand={(brand).toLowerCase()}
      data-emi={emiAvailable ? '1' : '0'}
    >
      <div className="product-card-top-stage">
        <a
          href={`/product/${product.id}`}
          className="product-image-link"
          aria-label={`View details for ${product.name}`}
        >
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} loading="lazy" decoding="async" />
          ) : (
            <div className="product-image-placeholder" aria-hidden="true">
              <span>BN</span>
            </div>
          )}
        </a>

        {/* Discount Badge — top-left only when there's a deal */}
        {discountPercent > 0 && (
          <div className="product-card-badges">
            <span className="product-badge-overlay deal-accent">-{discountPercent}%</span>
          </div>
        )}

        {/* Quick Action Circles — top-right */}
        <div className="card-actions-float">
          <button
            type="button"
            className="btn-action-circle btn-wishlist-add"
            data-id={product.id}
            data-name={product.name}
            data-price={price}
            data-image={product.image_url}
            data-url={`/product/${product.id}`}
            title="Save to Wishlist"
            aria-label="Save to Wishlist"
          >
            ♡
          </button>
          <button
            type="button"
            className="btn-action-circle btn-compare-add"
            data-id={product.id}
            data-name={product.name}
            data-price={price}
            data-image={product.image_url}
            data-store={storeName}
            data-warranty={product.specs?.['Official Warranty'] || '1 Year Official'}
            title="Compare"
            aria-label="Add to Compare"
          >
            ⇌
          </button>
        </div>
      </div>

      {/* Card Body — Clean hierarchy, no clutter */}
      <div className="product-card-body">
        {/* Row 1: Category + Rating */}
        <div className="pc-meta">
          <span className="pc-cat">{catName}{brand ? ` · ${brand}` : ''}</span>
          <span className="pc-rating">★ {rating.toFixed(1)}</span>
        </div>

        {/* Row 2: Product Name */}
        <a href={`/product/${product.id}`} className="product-name" title={product.name}>
          {product.name}
        </a>

        {/* Row 3: Store verified tag + Deal Heat */}
        <div className="pc-store-row">
          <span className="pc-store-chip">✓ {storeName}</span>
          <div className={`deal-temperature-badge ${(product.temperature || 95) < 30 ? 'cold' : ''}`} title={`${product.votes_up || 18} upvotes`}>
            <span>🔥</span>
            <span>+{product.temperature || 95}°</span>
          </div>
          {emiAvailable && <span className="pc-emi-chip">0% EMI</span>}
        </div>

        {/* Row 4: Price + CTA */}
        <div className="product-card-bottom">
          <div className="price-block">
            {discountPercent > 0 && originalPrice > 0 && (
              <span className="original-price" data-base-npr={originalPrice}>
                Rs. {formattedOriginal}
              </span>
            )}
            <strong className="product-price" data-base-npr={price}>
              Rs. {formattedPrice}
            </strong>
          </div>

          <a
            className="product-buy"
            href={product.affiliate_url || `/product/${product.id}`}
            target={product.affiliate_url ? '_blank' : '_self'}
            rel="noopener noreferrer nofollow"
            title={`View deal on ${storeName}`}
          >
            {product.affiliate_url ? 'Buy Now' : 'Details'}
          </a>
        </div>
      </div>
    </article>
  );
};


