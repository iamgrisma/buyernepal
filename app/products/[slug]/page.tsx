// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product, ProductDetailsResponse } from '@/lib/types';
import { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import Header from '@/components/Header'; // Include Header here

// This is the direct API URL for server-side fetching
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// --- DATA FETCHING ---

// 1. Get a single product by slug (for the page)
async function getProduct(slug: string): Promise<ProductDetailsResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/products/slug/${slug}`, {
      next: { revalidate: 3600 }, // <-- THIS IS ISR (1 hour)
    });
    if (!res.ok) {
      return null; // Triggers 404
    }
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return null;
  }
}

// 2. Get all product slugs (for SSG)
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/api/public/products?status=published`);
    if (!res.ok) return [];

    const products: Product[] = await res.json();

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// --- DYNAMIC METADATA & JSON-LD ---

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProduct(params.slug);
  if (!data) {
    return { title: 'Not Found' };
  }
  const { product } = data;

  return {
    title: product.title,
    description: product.description || `Check out the ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || '',
      images: [product.image_url],
      type: 'article',
    },
  };
}

// --- THE PAGE COMPONENT ---

export default async function ProductPage({ params }: Props) {
  const data = await getProduct(params.slug);

  if (!data) {
    notFound();
  }

  const { product, review, primary_link } = data;

  // Safely parse JSON arrays from review
  const pros =
    review && review.pros ? (JSON.parse(review.pros) as string[]) : [];
  const cons =
    review && review.cons ? (JSON.parse(review.cons) as string[]) : [];

  // --- JSON-LD Schema Generation ---
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'image': product.image_url,
    'description': product.description,
    'sku': product.id,
    'brand': {
      '@type': 'Brand',
      'name': product.brand || 'Unknown',
    },
    'offers': {
      '@type': 'Offer',
      'url': `${SITE_URL}/refer/${primary_link?.slug || ''}`,
      'priceCurrency': product.currency || 'NPR',
      'price': product.current_price,
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Daraz', // Make this dynamic later from a 'store' field
      },
    },
    ...(review && {
      'review': {
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': review.rating,
          'bestRating': '5',
        },
        'author': {
          '@type': 'Organization',
          'name': 'BuyerNepal',
        },
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': review.rating,
        'reviewCount': '1',
      },
    }),
  };

  return (
    <>
      {/* 1. Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <article className="rounded-lg bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Image */}
            <div>
              <Image
                src={product.image_url}
                alt={product.title}
                width={600}
                height={600}
                className="h-auto w-full rounded-lg"
                priority // Load this image first
              />
            </div>

            {/* Right Column: Info & CTA */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>
              <p className="mt-4 text-3xl font-bold text-gray-900">
                Rs. {product.current_price}
              </p>
              <p className="mt-4 text-base text-gray-600">
                {product.description}
              </p>

              {/* THE PRIMARY CTA BUTTON */}
              {primary_link ? (
                <a
                  href={`/refer/${primary_link.slug}`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Check Price on Daraz
                </a>
              ) : (
                <p className="mt-8 text-lg font-semibold text-red-600">
                  Link not available.
                </p>
              )}
              <p className="mt-2 text-center text-xs text-gray-500">
                (We may earn a commission from this link)
              </p>
            </div>
          </div>

          {/* 3. Review Section (if it exists) */}
          {review && (
            <div className="mt-12 border-t pt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                {review.title}
              </h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="space-y-2 rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="text-lg font-semibold text-green-800">Pros</h3>
                  <ul className="space-y-1">
                    {pros.map((pro: string) => (
                      <li key={pro} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Cons */}
                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-4">
                  <h3 className="text-lg font-semibold text-red-800">Cons</h3>
                  <ul className="space-y-1">
                    {cons.map((con: string) => (
                      <li key={con} className="flex items-start">
                        <X className="mr-2 h-5 w-5 flex-shrink-0 text-red-500" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Full Review Body */}
              <div
                className="prose prose-lg mt-6 max-w-none"
                dangerouslySetInnerHTML={{ __html: review.body_html }}
              />
            </div>
          )}
        </article>
      </main>
    </>
  );
}
