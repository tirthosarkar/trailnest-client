// app/my-listings/page.tsx
import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import MyListingsClient from "./MyListingsClient";
import type { Listing } from "@/types/listing";

export default async function MyListingsPage() {
  // Get user session
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-(--dark)">Please Login</h2>
            <p className="mt-2 text-(--text-secondary)">
              You need to be logged in to view your listings.
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

  // Fetch user's listings
  let listings: Listing[] = [];
  let error: string | null = null;

  try {
    listings = await protectedFetch<Listing[]>("/my-listings");
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load listings";
    console.error("Error fetching listings:", err);
  }

  return <MyListingsClient listings={listings} error={error} user={user} />;
}
