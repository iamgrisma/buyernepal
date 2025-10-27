// app/admin/layout.tsx
'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import {
  LogOut,
  LayoutDashboard,
  Loader2,
  Package,
  Link2,
  Settings,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

// 1. Auth check hook
function useAuth() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      // This hits your GET /api/auth/me endpoint
      const { data } = await api.get('/api/auth/me');
      return data;
    },
    retry: false, // Don't retry if it fails (user is just not logged in)
    refetchOnWindowFocus: true, // Re-check auth on focus
  });
}

// 2. Logout mutation
function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      // This hits your POST /api/auth/logout endpoint
      return api.post('/api/auth/logout');
    },
    onSuccess: () => {
      toast.success('Logged out');
      // On success, redirect to login
      router.push('/admin/login');
    },
    onError: () => {
      toast.error('Logout failed');
    },
  });
}

// Helper for active link styling
function AdminNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded p-2 font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, isError } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  // Don't protect the login page itself
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError) {
    // User is not authenticated, redirect to login
    router.replace('/admin/login');
    return null; // Don't render anything
  }

  // If we are here, user is logged in
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r bg-white p-4">
        <h2 className="text-xl font-bold text-blue-600">BuyerNepal Admin</h2>
        <nav className="mt-8 flex flex-col space-y-2">
          <AdminNavLink href="/admin/dashboard">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </AdminNavLink>
          <AdminNavLink href="/admin/products">
            <Package className="h-5 w-5" /> Products
          </AdminNavLink>
          <AdminNavLink href="/admin/links">
            <Link2 className="h-5 w-5" /> Links
          </AdminNavLink>
          <AdminNavLink href="/admin/reviews">
            <Star className="h-5 w-5" /> Reviews
          </AdminNavLink>
          <AdminNavLink href="/admin/settings">
            <Settings className="h-5 w-5" /> Settings
          </AdminNavLink>
        </nav>
        <button
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="mt-auto flex w-full items-center gap-2 rounded p-2 text-left font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
