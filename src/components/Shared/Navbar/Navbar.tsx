"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";
import MobileDrawer from "./MobileDrawer";
import { UserSession } from "@/lib/core/session";
// ✅ Adjust this import path to your session file

interface NavbarProps {
  user: UserSession | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Computed dynamically from the passed-in server session
  const isLoggedIn = !!user;
  console.log(user, "from Navbar");

  const publicLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Explore",
      href: "/explore",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const privateLinks = [
    {
      name: "Add Listing",
      href: "/add-listing",
    },
    {
      name: "My Listings",
      href: "/my-listings",
    },
    {
      name: "My Bookings",
      href: "/my-bookings",
    },
  ];

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-gray-200/80 shadow-md"
          : "border-gray-200/50 shadow-sm"
      }`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Logo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 hover:text-(--primary) ${
                    active ? "text-(--primary)" : "text-gray-600"
                  } group`}
                >
                  {link.name}
                  {/* Animated Accent Line */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-(--primary) transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Configurations */}
          <div className="hidden lg:flex">
            {isLoggedIn ? (
              <UserDropdown user={user} /> // ✅ Pass user info to your dropdown avatar/actions
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <MobileDrawer isLoggedIn={isLoggedIn} user={user} />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
