// app/my-bookings/page.tsx
import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import MyBookingsClient from "./MyBookingsClient";

interface Booking {
  _id: string;
  listingId: string;
  listing?: {
    _id: string;
    name: string;
    image: string;
    type: string;
    location: {
      lat: number;
      lng: number;
    };
    pricePerDay: number;
  };
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "cancelled" | "pending";
  createdAt: string;
}

export default async function MyBookingsPage() {
  // Get user session
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-(--dark)">Please Login</h2>
            <p className="mt-2 text-(--text-secondary)">
              You need to be logged in to view your bookings.
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

  // Fetch bookings using protectedFetch (automatically handles auth)
  let bookings: Booking[] = [];
  let error: string | null = null;

  try {
    bookings = await protectedFetch<Booking[]>("/my-bookings");
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load bookings";
    console.error("Error fetching bookings:", err);
  }

  return <MyBookingsClient bookings={bookings} error={error} user={user} />;
}
