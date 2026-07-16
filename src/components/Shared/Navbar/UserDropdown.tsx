'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';

const UserDropdown = () => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Temporary user
  const user = {
    name: 'Shahadat',
    image: 'https://i.pravatar.cc/150?img=12',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:border-[var(--primary)]"
      >
        <img
          src={user.image}
          alt={user.name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <span className="hidden font-medium lg:block">{user.name}</span>

        <ChevronDown
          size={18}
          className={`transition duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <button className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-gray-100">
            <User size={18} />
            My Profile
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
