import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MultiTools - 100+ Free Online Tools',
  description: 'Your one-stop destination for free online tools including image converters, calculators, SEO tools, text utilities, unit converters, developer tools, and more.',
  keywords: 'online tools, web tools, image converter, calculator, SEO tools, developer tools, text tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
} 