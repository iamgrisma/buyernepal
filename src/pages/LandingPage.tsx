import { useQuery } from "@tanstack/react-query";

export default function LandingPage() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      return res.json();
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground">BuyerNepal</h1>
          <p className="text-muted-foreground">Honest tech reviews in Nepal</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(products) && products.map((product: any) => (
              <a 
                key={product.id} 
                href={`/p/${product.slug}`}
                className="block p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm">{product.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
