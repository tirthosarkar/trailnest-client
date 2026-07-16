import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";
import { getUserSession } from "@/lib/core/session";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trailnest-client.vercel.app"),

  title: {
    default: "TrailNest | Camping & Outdoor Adventure Booking",
    template: "%s | TrailNest",
  },

  description:
    "Discover, explore, and book the best campsites, cabins, RV parks, and outdoor adventures with TrailNest. Your perfect camping experience starts here.",

  keywords: [
    "TrailNest",
    "camping",
    "camping booking",
    "campgrounds",
    "campsites",
    "outdoor adventure",
    "RV park",
    "cabins",
    "nature travel",
    "hiking",
    "trekking",
    "camping Bangladesh",
    "travel booking",
    "outdoor gear",
    "eco tourism",
  ],

  authors: [
    {
      name: "Md. Shahadat Hossain",
    },
  ],

  creator: "Md. Shahadat Hossain",

  publisher: "TrailNest",

  category: "Travel",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "TrailNest | Camping & Outdoor Adventure Booking",

    description:
      "Find and book beautiful campsites, cabins, RV parks, and unforgettable outdoor experiences with TrailNest.",

    url: "https://trailnest-client.vercel.app",

    siteName: "TrailNest",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TrailNest",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "TrailNest",

    description:
      "Book campsites, cabins, RV parks, and outdoor adventures effortlessly.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch session on the server completely securely
  const user = await getUserSession();

  return (
    <html data-theme="light" lang="en" className={` h-full antialiased`}>
      <body
        className={`${outfit.variable} ${inter.variable} min-h-full flex flex-col`}
      >
        <Navbar user={user} />

        <main> {children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "white",
              border: "1px solid #e5e7eb",
            },
            className: "rounded-xl shadow-lg",
          }}
        />
      </body>
    </html>
  );
}
