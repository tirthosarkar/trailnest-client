import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Shared/Navbar/Navbar';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TrailNest',
  description: 'Outdoor Gear & Campsite Booking Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en" className={` h-full antialiased`}>
      <body
        className={`${outfit.variable} ${inter.variable} min-h-full flex flex-col`}
      >
        <Navbar />

        <main> {children}</main>
      </body>
    </html>
  );
}
