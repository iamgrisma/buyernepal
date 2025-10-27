// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/components/QueryProvider';
import Header from '@/components/Header';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

// Default metadata from your Site_Settings table
export const metadata: Metadata = {
  title: {
    default: 'BuyerNepal - Your Tech Guide in Nepal',
    template: '%s | BuyerNepal',
  },
  description:
    'Honest reviews and recommendations for tech products in Nepal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <QueryProvider>
          {/* The Header is part of the public layout, but not the admin layout */}
          {/* We will use route groups to handle this */}
          {children}
          <Toaster position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
