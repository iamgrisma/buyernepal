// components/Header.tsx
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <nav className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <ShoppingBag className="inline-block h-7 w-7 text-blue-600" /> Buyer
          <span className="text-blue-600">Nepal</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/reviews"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Reviews
          </Link>
          <Link
            href="/categories"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Categories
          </Link>
          {/* Add a link to admin for convenience */}
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium text-gray-500 hover:text-blue-600"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
