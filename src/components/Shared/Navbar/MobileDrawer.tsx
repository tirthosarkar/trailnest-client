'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  PlusCircle,
  Calendar,
  User,
  Settings,
  LogOut,
  Compass,
} from 'lucide-react';

import Button from '@/components/Ui/Button';
import { signOut } from '@/lib/auth-client'; // ✅ Imported BetterAuth client
import type { UserSession } from '@/lib/core/session'; // ✅ Adjusted session type path

interface MobileDrawerProps {
  isLoggedIn: boolean;
  user: UserSession | null; // ✅ Added user prop configuration
}

const MobileDrawer = ({ isLoggedIn, user }: MobileDrawerProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Primary navigation links
  const mainLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Compass },
  ];

  // Action links for authenticated users
  const actionLinks = [
    { name: 'Add Listing', href: '/add-listing', icon: PlusCircle },
    { name: 'My Listings', href: '/my-listings', icon: Home },
    { name: 'My Bookings', href: '/my-bookings', icon: Calendar },
  ];

  // User account specific settings
  const accountLinks = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  // ✅ Seamless BetterAuth Logout processing
  const handleLogout = async () => {
    try {
      setOpen(false);
      await signOut({});
      setTimeout(() => {
        router.push('/login');
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  return (
    <div className="lg:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
      >
        <Menu size={22} />
      </button>

      {/* Drawer Overlay & Panel */}
      {open && (
        <>
          {/* Backdrop Blur */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all animate-in fade-in duration-200"
          />

          {/* Premium Right Drawer Panel */}
          <div className="fixed right-0 top-0 z-50 flex h-screen w-80 flex-col bg-white shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right">
            {/* Header section */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-bold text-(--dark)">Navigation</h2>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Main App Links */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Discover
                </p>
                {mainLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
                      isActiveLink(link.href)
                        ? 'bg-(--primary)/10 text-(--primary) font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <link.icon
                      className={`h-4 w-4 ${isActiveLink(link.href) ? 'text-(--primary)' : 'text-gray-400'}`}
                    />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Dynamic Action / Management Links */}
              {isLoggedIn && (
                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Manage
                  </p>
                  {actionLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
                        isActiveLink(link.href)
                          ? 'bg-(--primary)/10 text-(--primary) font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <link.icon
                        className={`h-4 w-4 ${isActiveLink(link.href) ? 'text-(--primary)' : 'text-gray-400'}`}
                      />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Profile Options inside Menu */}
              {isLoggedIn && (
                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Account
                  </p>
                  {accountLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
                        isActiveLink(link.href)
                          ? 'bg-(--primary)/10 text-(--primary) font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <link.icon
                        className={`h-4 w-4 ${isActiveLink(link.href) ? 'text-(--primary)' : 'text-gray-400'}`}
                      />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Premium User Card / Authentication Actions Bottom Wrapper */}
            <div className="border-t bg-gray-50/70 p-4">
              {isLoggedIn && user ? (
                <div className="space-y-4">
                  {/* User Profile Summary block */}
                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={
                          user.image ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`
                        } // ✅ Safe dynamic profile fallback
                        alt={user.name || 'User profile avatar'}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="truncate font-semibold text-sm text-(--dark)">
                        {user.name}
                      </h3>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Clean Text-based Logout matching Dropdown style */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                /* Unauthenticated Flow Buttons */
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full justify-center">
                      Login
                    </Button>
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    <Button
                      variant="secondary"
                      className="w-full justify-center"
                    >
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
