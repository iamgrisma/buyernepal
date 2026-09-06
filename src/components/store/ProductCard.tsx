import { Link } from 'react-router-dom';

export interface StoreProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  affiliate_url: string;
  category_id?: number | null;
}

function ProductImage({ product }: { product: StoreProduct }) {
  if (product.image_url) return <img src={product.image_url} alt={product.name} loading="lazy" decoding="async" />;
  return <div className="product-image-placeholder" aria-hidden="true"><span>BN</span></div>;
}

export default function ProductCard({ product }: { product: StoreProduct }) {
  const price = Number(product.price) || 0;
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
        <ProductImage product={product} />
        <span className="product-badge">Recommended</span>
      </Link>
      <div className="product-card-body">
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <p className="product-description">{product.description || 'Explore product details and current availability.'}</p>
        <div className="product-card-bottom">
          <div><span className="price-label">Price</span><strong className="product-price">Rs. {price.toLocaleString('en-NP')}</strong></div>
          {product.affiliate_url ? <a className="product-buy" href={product.affiliate_url} target="_blank" rel="noopener noreferrer">Shop now <span>↗</span></a> : <Link className="product-buy product-buy-secondary" to={`/product/${product.id}`}>View <span>→</span></Link>}
        </div>
      </div>
    </article>
  );
}
