'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'; // ✅ Imported usePathname
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  PlusCircle,
  Calendar,
} from 'lucide-react';

import { signOut } from '@/lib/auth-client';
import type { UserSession } from '@/lib/core/session';

interface UserDropdownProps {
  user: UserSession | null;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current pathname

  // ✅ Hooks are moved ABOVE the early return to comply with React rules
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Safeguard if user is unexpectedly null
  if (!user) return null;

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await signOut({});
      setTimeout(() => {
        router.push('/login');
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const menuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'My Listings', href: '/my-listings', icon: Home },
    { name: 'Add Listing', href: '/add-listing', icon: PlusCircle },
    { name: 'My Bookings', href: '/my-bookings', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label="User menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 transition hover:bg-gray-200"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={
              user.image ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`
            }
            alt={user.name || 'User avatar'}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {/* User Info Section */}
        <div className="border-b px-4 py-3">
          <p className="font-semibold text-(--dark) truncate">{user.name}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map(item => {
            const isActive = pathname === item.href; // ✅ Check if item matches path

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-(--primary)/10 text-(--primary) font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                role="menuitem"
              >
                <item.icon
                  className={`h-4 w-4 ${isActive ? 'text-(--primary)' : 'text-gray-400'}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Control Trigger */}
        <div className="border-t p-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            role="menuitem"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
