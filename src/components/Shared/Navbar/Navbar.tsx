// components/Navbar/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Container from '@/components/Ui/Container';
import Logo from './Logo';
import UserDropdown from './UserDropdown';
import MobileDrawer from './MobileDrawer';
import Link from 'next/link';
import Button from '@/components/Ui/Button';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  /*
    BetterAuth
    const session = await auth();
    const isLoggedIn = !!session;
  */

  const isLoggedIn = true;

  const publicLinks = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Explore Listings',
      href: '/explore',
    },
  ];

  const privateLinks = [
    {
      name: 'Add Listing',
      href: '/add-listing',
    },
    {
      name: 'My Listings',
      href: '/my-listings',
    },
    {
      name: 'My Bookings',
      href: '/my-bookings',
    },
  ];

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? 'border-gray-200/80 shadow-md'
          : 'border-gray-200/50 shadow-sm'
      }`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Logo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition hover:text-(--primary) ${
                  isActiveLink(link.href)
                    ? 'text-(--primary) font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex">
            {isLoggedIn ? (
              <UserDropdown />
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

          {/* Mobile */}
          <MobileDrawer isLoggedIn={isLoggedIn} />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
