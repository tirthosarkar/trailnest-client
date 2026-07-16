// app/explore/[id]/page.tsx
import { getUserSession } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";
import ListingDetailsClient from "./ListingDetailsClient";
import type { Listing } from "@/types/listing";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ListingDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Get user session on the server
  const user = await getUserSession();

  // Fetch listing data
  let listing: Listing | null = null;
  let error: string | null = null;

  try {
    listing = await serverFetch<Listing>(`/listing/${id}`);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load listing";
  }

  // If listing not found, show 404
  if (!listing || error) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-(--dark)">
              Listing not found
            </h2>
            <p className="mt-2 text-(--text-secondary)">
              The listing you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/explore"
              className="text-(--primary) hover:underline mt-4 inline-block"
            >
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ListingDetailsClient listing={listing} user={user} listingId={id} />;
}
