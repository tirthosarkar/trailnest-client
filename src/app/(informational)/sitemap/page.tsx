import Link from "next/link";
import { Network, ArrowRight } from "lucide-react";
import Container from "@/components/Ui/Container";

export default function SitemapPage() {
  const sections = [
    {
      title: "Discover",
      links: [
        { name: "Home Base", href: "/" },
        { name: "Explore Listings", href: "/explore" },
        { name: "How It Works", href: "/how-it-works" },
      ],
    },
    {
      title: "Account Hub",
      links: [
        { name: "User Profile", href: "/profile" },
        { name: "My Listings", href: "/my-listings" },
        { name: "My Bookings", href: "/my-bookings" },
        { name: "Account Settings", href: "/settings" },
      ],
    },
    {
      title: "Legal & Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Safety Tips", href: "/safety-tips" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <div className="relative min-h-[88vh] w-full flex items-center bg-linear-to-br from-green-50 via-white to-orange-50/70 overflow-hidden select-none py-12">
      {/* Background Trail Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="sitemap-premium-topo"
              width="180"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-40 40 Q 30 10, 90 40 T 220 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                className="text-(--dark) opacity-80"
              />
              <path
                d="M-40 90 Q 30 60, 90 90 T 220 90"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.2"
                className="text-(--dark) opacity-40"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sitemap-premium-topo)" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-tr from-green-200/20 to-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl border border-gray-100/90 text-(--primary)">
              <Network size={32} />
            </div>
            <span className="text-xs font-bold tracking-widest text-(--primary) uppercase bg-green-100/60 border border-green-200/30 px-4 py-1.5 rounded-full mb-3">
              System Architecture
            </span>
            <h1 className="text-3xl font-black tracking-tight text-(--dark) sm:text-4xl">
              Site Index Map
            </h1>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-6 sm:grid-cols-3">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-sm"
              >
                <h2 className="font-bold text-sm text-(--dark) uppercase tracking-wider border-b pb-3 mb-4 opacity-70">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-sm text-gray-600 hover:text-(--primary) font-medium transition"
                      >
                        <span>{link.name}</span>
                        <ArrowRight
                          size={14}
                          className="opacity-0 -translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0 text-(--primary)"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
