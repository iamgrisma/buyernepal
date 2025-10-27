// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import Header from '@/components/Header'; // Include Header here

// This is the direct API URL for server-side fetching
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getHomepageData(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/public/products?limit=10&status=published`,
      {
        next: { revalidate: 600 }, // <-- THIS IS ISR (10 minutes)
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return []; // Return empty array on error
  }
}

export default async function HomePage() {
  const products = await getHomepageData();

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-12">
          <section className="rounded-lg bg-white p-8 text-center shadow">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find the Best Products in Nepal
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Honest reviews and recommendations you can trust.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Top Recommendations</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found. Check back later.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-80">
        <Image
          src={product.image_url} // This MUST be the Cloudflare R2 URL
          alt={product.title}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {product.description?.substring(0, 50) || 'View details'}...
        </p>
        <p className="mt-2 text-lg font-semibold text-gray-900">
          Rs. {product.current_price}
        </p>
      </div>
    </Link>
  );
}
