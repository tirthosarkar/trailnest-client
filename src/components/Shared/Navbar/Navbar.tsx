import Container from '@/components/Ui/Container';

import Logo from './Logo';
import UserDropdown from './UserDropdown';
import MobileDrawer from './MobileDrawer';

import Link from 'next/link';
import Button from '@/components/Ui/Button';

const Navbar = () => {
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}

          <Logo />

          {/* Desktop Menu */}

          <div className="hidden items-center gap-8 lg:flex">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition hover:text-(--primary)"
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
