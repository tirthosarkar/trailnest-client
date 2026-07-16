'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Button from '@/components/Ui/Button';

interface MobileDrawerProps {
  isLoggedIn: boolean;
}

const MobileDrawer = ({ isLoggedIn }: MobileDrawerProps) => {
  const [open, setOpen] = useState(false);

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
    <div className="lg:hidden">
      {/* Toggle Button */}

      <button onClick={() => setOpen(true)}>
        <Menu size={30} />
      </button>

      {/* Overlay */}

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* Drawer */}

          <div className="fixed right-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-xl">
            {/* Header */}

            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-xl font-bold text-[var(--primary)]">Menu</h2>

              <button onClick={() => setOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Links */}

            <div className="flex flex-1 flex-col gap-2 p-5">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 transition hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Bottom */}

            <div className="border-t p-5">
              {isLoggedIn ? (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      alt="User"
                      className="h-10 w-10 rounded-full"
                    />

                    <div>
                      <h3 className="font-semibold">Shahadat</h3>

                      <p className="text-sm text-gray-500">View Profile</p>
                    </div>
                  </div>

                  <button className="w-full rounded-xl bg-red-500 py-3 font-medium text-white">
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-3 flex flex-col">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {' '}
                      Login
                    </Button>
                  </Link>

                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileDrawer;
