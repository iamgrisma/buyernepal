import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StoreHeader from '../components/store/StoreHeader';
import ProductCard, { StoreProduct } from '../components/store/ProductCard';

interface Category { id:number; name:string; slug:string; description:string; }

export default function CategoryPage() {
  const { slug } = useParams();
  const [category,setCategory] = useState<Category|null>(null);
  const [products,setProducts] = useState<StoreProduct[]>([]);
  const [categories,setCategories] = useState<Category[]>([]);
  const [loading,setLoading] = useState(true);
  const [query,setQuery] = useState('');
  const [notFound,setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let alive=true;
    setLoading(true); setNotFound(false);
    Promise.all([
      fetch(`/api/categories/${encodeURIComponent(slug)}`).then(async r=>{const d: any=await r.json();if(!r.ok)throw new Error(d?.error||'Not found');return d;}),
      fetch('/api/categories').then(r=>r.json()),
    ]).then(([data,all]: [any, any])=>{if(!alive)return;setCategory(data?.category);setProducts(data?.products||[]);setCategories(all?.categories||[]);}).catch(()=>alive&&setNotFound(true)).finally(()=>alive&&setLoading(false));
    return ()=>{alive=false;};
  },[slug]);

  const filtered=useMemo(()=>{const q=query.trim().toLowerCase();return products.filter(p=>!q||`${p.name} ${p.description}`.toLowerCase().includes(q));},[products,query]);
  if(loading)return <div className="store-page"><StoreHeader categories={categories}/><main className="store-shell product-loading"><div className="product-grid">{[1,2,3,4].map(i=><div className="skeleton-image" key={i}/>)}</div></main></div>;
  if(notFound||!category)return <div className="store-page"><StoreHeader categories={categories}/><div className="store-shell store-empty"><div className="empty-icon">!</div><h1>Category not found</h1><p>The category may have been removed or is not available.</p><Link to="/" className="primary-action">Back to shopping</Link></div></div>;

  return <div className="store-page"><StoreHeader categories={categories}/><main className="store-shell category-page-main">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>›</span><strong>{category.name}</strong></div>
    <section className="category-hero"><div><span className="eyebrow">CATEGORY</span><h1>{category.name}</h1><p>{category.description||`Explore our curated ${category.name.toLowerCase()} picks.`}</p></div><div className="category-total"><strong>{products.length}</strong><span>listed products</span></div></section>
    <div className="category-toolbar"><div className="category-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${category.name.toLowerCase()}…`} aria-label={`Search ${category.name}`}/></div><span>{filtered.length} results</span></div>
    {filtered.length?<div className="product-grid">{filtered.map(product=><ProductCard key={product.id} product={product}/>)}</div>:<div className="store-empty"><div className="empty-icon">⌕</div><h3>No matching products</h3><p>Try a different search term.</p><button className="secondary-action" onClick={()=>setQuery('')}>Clear search</button></div>}
  </main></div>;
}
