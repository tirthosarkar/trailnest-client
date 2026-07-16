// app/profile/page.tsx
import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import ProfileClient from "./ProfileClient";
import type { UserSession } from "@/lib/core/session";

interface Booking {
  _id: string;
  listingId: string;
  listing?: {
    _id: string;
    name: string;
    image: string;
    type: string;
    pricePerDay: number;
  };
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "cancelled" | "pending";
  createdAt: string;
}

interface Listing {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  pricePerDay: number;
  bookingCount: number;
  createdAt: string;
}

export default async function ProfilePage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-(--dark)">Please Login</h2>
            <p className="mt-2 text-(--text-secondary)">
              You need to be logged in to view your profile.
            </p>
            <a
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-(--primary) text-white rounded-lg hover:bg-(--primary)/90 transition"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  let bookings: Booking[] = [];
  let listings: Listing[] = [];
  let error: string | null = null;

  try {
    const [bookingsData, listingsData] = await Promise.all([
      protectedFetch<Booking[]>("/my-bookings"),
      protectedFetch<Listing[]>("/my-listings"),
    ]);
    bookings = bookingsData || [];
    listings = listingsData || [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load profile data";
    console.error("Error fetching profile data:", err);
  }

  return (
    <ProfileClient
      user={user}
      bookings={bookings}
      listings={listings}
      error={error}
    />
  );
}
