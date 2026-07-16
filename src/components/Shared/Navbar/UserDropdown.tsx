// components/Navbar/UserDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  PlusCircle,
  Calendar,
} from "lucide-react";

import { signOut } from "@/lib/auth-client";
import type { UserSession } from "@/lib/core/session";
import { toast } from "sonner";

interface UserDropdownProps {
  user: UserSession | null;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      setIsOpen(false);

      // Show loading toast
      const loadingToast = toast.loading("Logging out...");

      await signOut({});

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success("👋 Logged out successfully", {
        description: "See you next time!",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Logout failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const menuItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "My Listings", href: "/my-listings", icon: Home },
    { name: "Add Listing", href: "/add-listing", icon: PlusCircle },
    { name: "My Bookings", href: "/my-bookings", icon: Calendar },
    // { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="relative z-50 flex items-center gap-2" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label="User menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 transition hover:bg-emerald-50 hover:shadow-md hover:shadow-emerald-700/20"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              fill
              sizes="32px"
              className="object-cover"
              onError={(e) => {
                // If image fails to load, show initials fallback
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                // Show initials fallback
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("span");
                  fallback.className =
                    "flex h-full w-full items-center justify-center text-sm font-medium text-gray-600 bg-gray-200";
                  fallback.textContent =
                    user.name?.charAt(0).toUpperCase() || "U";
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            // Initials fallback when no image URL
            <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600 bg-gray-200">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Logout Button - Outside Dropdown (always visible) */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-300"
        aria-label="Logout"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
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
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-(--primary)/10 text-(--primary) font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
              >
                <item.icon
                  className={`h-4 w-4 ${isActive ? "text-(--primary)" : "text-gray-400"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Button Inside Dropdown */}
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
