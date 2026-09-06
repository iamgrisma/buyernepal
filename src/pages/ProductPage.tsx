import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StoreHeader from '../components/store/StoreHeader';
import { StoreProduct } from '../components/store/ProductCard';

interface Product extends StoreProduct { category_name?: string; }
interface Review { id:number; user_name:string; rating:number; comment:string; created_at:string; }
interface Category { id:number; name:string; slug:string; }

export default function ProductPage() {
  const { id } = useParams();
  const [product,setProduct] = useState<Product|null>(null);
  const [reviews,setReviews] = useState<Review[]>([]);
  const [categories,setCategories] = useState<Category[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(`/api/products/${encodeURIComponent(id || '')}`).then(async r => { const d: any=await r.json(); if(!r.ok) throw new Error(d?.error||'Product not found'); return d; }),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([productData, categoryData]: [any, any]) => { if(!alive) return; setProduct(productData?.product); setReviews(productData?.reviews||[]); setCategories(categoryData?.categories||[]); }).catch(e => alive && setError(e instanceof Error ? e.message : 'Product not found')).finally(() => alive && setLoading(false));
    return () => { alive=false; };
  }, [id]);

  if (loading) return <div className="store-page"><StoreHeader categories={categories}/><div className="store-shell product-loading"><div className="skeleton-image large"/><div className="skeleton-line wide"/><div className="skeleton-line"/></div></div>;
  if (error || !product) return <div className="store-page"><StoreHeader categories={categories}/><div className="store-shell store-empty"><div className="empty-icon">!</div><h1>Product not found</h1><p>{error || 'This product is no longer available.'}</p><Link to="/" className="primary-action">Back to shopping</Link></div></div>;

  const price = Number(product.price)||0;
  const average = reviews.length ? reviews.reduce((sum,r)=>sum+Number(r.rating||0),0)/reviews.length : 0;
  const stars = Math.round(average);

  return <div className="store-page">
    <StoreHeader categories={categories}/>
    <main className="store-shell product-detail">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>›</span>{product.category_name && <><span>{product.category_name}</span><span>›</span></>}<strong>{product.name}</strong></div>
      <div className="product-detail-grid">
        <div className="product-detail-media">{product.image_url ? <img src={product.image_url} alt={product.name}/> : <div className="product-detail-placeholder">BN</div>}</div>
        <div className="product-detail-copy">
          <span className="eyebrow">PRODUCT DETAILS</span>
          <h1>{product.name}</h1>
          <div className="rating-row"><span className="stars">{'★'.repeat(stars)}{'☆'.repeat(5-stars)}</span><span>{reviews.length ? `${average.toFixed(1)} from ${reviews.length} review${reviews.length===1?'':'s'}` : 'No reviews yet'}</span></div>
          <strong className="detail-price">Rs. {price.toLocaleString('en-NP')}</strong>
          <p className="detail-description">{product.description || 'Product information will be updated by the store.'}</p>
          {product.affiliate_url ? <a className="detail-buy" href={product.affiliate_url} target="_blank" rel="noopener noreferrer">Continue to seller <span>↗</span></a> : <span className="detail-unavailable">Seller link not available</span>}
          <div className="detail-note"><strong>Shopping note</strong><span>BuyerNepal helps you discover products. Final price, stock, delivery and seller terms are confirmed on the seller's website.</span></div>
        </div>
      </div>
      <section className="reviews-section"><div className="section-heading"><div><span className="section-kicker">CUSTOMER FEEDBACK</span><h2>Reviews</h2></div><span className="section-count">{reviews.length}</span></div>{reviews.length ? <div className="review-list">{reviews.map(review=><article className="review-card" key={review.id}><div className="review-top"><strong>{review.user_name}</strong><span className="stars">{'★'.repeat(Number(review.rating))}</span></div><p>{review.comment}</p><time>{new Date(review.created_at).toLocaleDateString('en-NP')}</time></article>)}</div> : <div className="review-empty">No approved reviews for this product yet.</div>}</section>
    </main>
  </div>;
}
