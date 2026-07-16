// components/Footer/index.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Mail,
  Phone,
  MapPin,
  Heart,
  Compass,
  TreePine,
  Tent,
  Award,
} from "lucide-react";
import Container from "@/components/Ui/Container";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import Logo from "../Navbar/Logo";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Explore Listings", href: "/explore" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Safety Tips", href: "/safety-tips" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebook, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Twitter", icon: BsTwitterX, href: "#" },
    { name: "Youtube", icon: FaYoutube, href: "#" },
  ];

  const features = [
    { icon: Compass, text: "Explore 1000+ Trails" },
    { icon: Tent, text: "Camping & Hiking" },
    { icon: TreePine, text: "Nature Experiences" },
    { icon: Award, text: "Best Travel Platform 2024" },
  ];

  return (
    <footer className="bg-(--dark) text-white/80">
      {/* Main Footer */}
      <Container>
        <div className="py-16">
          {/* Top Section - Brand & Features */}
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Logo isScrolled={false} />

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Discover the world&apos;s most breathtaking trails and camping
                spots. Your adventure starts here with TrailNest - where nature
                meets comfort.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="rounded-full bg-white/10 p-2.5 text-white/60 transition hover:bg-(--primary) hover:text-white hover:scale-110"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white/5 p-4 text-center transition hover:bg-white/10"
                  >
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-(--primary)/20 text-(--primary)">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition hover:text-(--primary) hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Support
              </h3>
              <ul className="space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition hover:text-(--primary) hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Get in Touch
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-(--primary)" />
                  <span>123 Adventure Lane, Outdoor City, OC 12345</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Mail className="h-5 w-5 flex-shrink-0 text-(--primary)" />
                  <a
                    href="mailto:hello@trailnest.com"
                    className="hover:text-(--primary) transition"
                  >
                    hello@trailnest.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Phone className="h-5 w-5 flex-shrink-0 text-(--primary)" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-(--primary) transition"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Newsletter
              </h3>
              <p className="mb-3 text-sm text-white/60">
                Subscribe to get special offers and updates!
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-(--primary)"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-(--primary) px-4 py-3 text-sm font-medium text-white transition hover:bg-(--primary)/80 hover:scale-105"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="mt-2 text-xs text-white/40">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between py-6 sm:flex-row">
            <p className="text-sm text-white/40">
              &copy; {currentYear} TrailNest. All rights reserved.
            </p>

            <div className="mt-4 flex items-center gap-6 sm:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-white/40 transition hover:text-(--primary)"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/40 transition hover:text-(--primary)"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-white/40 transition hover:text-(--primary)"
              >
                Sitemap
              </Link>
              <span className="sm:flex items-center gap-1 text-sm text-white/40 hidden  ">
                Made with{" "}
                <Heart className="h-4 w-4 text-red-400 animate-pulse" /> by
                TrailNest
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
