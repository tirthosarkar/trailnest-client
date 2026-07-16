// components/Navbar/UserDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  PlusCircle,
  Calendar,
} from 'lucide-react';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Listings', href: '/my-listings', icon: Home },
    { name: 'Add Listing', href: '/add-listing', icon: PlusCircle },
    { name: 'My Bookings', href: '/my-bookings', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
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
        <Image
          src="https://i.pravatar.cc/100?img=12"
          alt="User avatar"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
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
        {/* User Info */}
        <div className="border-b px-4 py-3">
          <p className="font-semibold text-(--dark)">Shahadat</p>
          <p className="text-sm text-gray-500">shahadat@email.com</p>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-100"
              role="menuitem"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t p-2">
          <button
            onClick={() => {
              setIsOpen(false);
              // Handle logout
              console.log('Logout clicked');
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50"
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
