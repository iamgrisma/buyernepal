import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/ui/Loading';

interface Category { id:number; name:string; slug:string; description:string; }
interface Product { id:number; name:string; description:string; price:number; image_url:string; affiliate_url:string; }

export default function CategoryPage() {
  const { slug } = useParams();
  const [category,setCategory] = useState<Category|null>(null);
  const [products,setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(true);
  const [notFound,setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true); setNotFound(false);
    fetch(`/api/categories/${encodeURIComponent(slug)}`)
      .then(async r => { const data=await r.json(); if(!r.ok) throw new Error(data.error||'Not found'); return data; })
      .then(data => { setCategory(data.category); setProducts(data.products || []); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (notFound || !category) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-3">Category not found</h1><Link className="text-primary hover:underline" to="/">Back to home</Link></div></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card"><div className="container mx-auto px-4 py-4"><Link to="/" className="text-2xl font-bold text-foreground">BuyerNepal</Link></div></header>
      <main className="container mx-auto px-4 py-12">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
        <h1 className="text-4xl font-bold text-foreground mt-4">{category.name}</h1>
        {category.description && <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>}
        {products.length === 0 ? <p className="py-16 text-center text-muted-foreground">No products in this category yet.</p> :
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {products.map(product => <div key={product.id} className="card overflow-hidden">
              {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" loading="lazy" decoding="async" />}
              <div className="p-4"><h2 className="font-semibold text-foreground mb-2">{product.name}</h2><p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p><div className="flex items-center justify-between"><span className="text-lg font-bold text-primary">${Number(product.price).toFixed(2)}</span>{product.affiliate_url && <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Buy Now</a>}</div></div>
            </div>)}
          </div>}
      </main>
    </div>
  );
}
