// app/my-listings/MyListingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Tent,
  Wrench,
  AlertCircle,
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import SectionTitle from "@/components/Ui/SectionTitle";
import { serverMutation } from "@/lib/core/server";
import type { Listing } from "@/types/listing";

interface MyListingsClientProps {
  listings: Listing[];
  error: string | null;
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string | null;
  };
}

const MyListingsClient = ({
  listings: initialListings,
  error: initialError,
  user,
}: MyListingsClientProps) => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [error, setError] = useState<string | null>(initialError);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Delete Confirmation Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );
  const [selectedListingName, setSelectedListingName] = useState<string>("");

  const openDeleteModal = (listingId: string, listingName: string) => {
    setSelectedListingId(listingId);
    setSelectedListingName(listingName);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedListingId(null);
    setSelectedListingName("");
  };

  const handleDelete = async () => {
    if (!selectedListingId) return;

    setDeletingId(selectedListingId);
    closeDeleteModal();

    try {
      await serverMutation(
        `/listing/${selectedListingId}`,
        undefined,
        "DELETE",
      );

      setListings((prev) =>
        prev.filter((listing) => listing._id !== selectedListingId),
      );

      toast.success("Listing deleted successfully", {
        description: "Your listing has been removed permanently.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "campsite" ? (
      <Tent className="h-4 w-4" />
    ) : (
      <Wrench className="h-4 w-4" />
    );
  };

  const getStatusBadge = (bookingCount: number) => {
    if (bookingCount > 0) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
          <CheckCircle className="h-3 w-3" />
          {bookingCount} booking{bookingCount > 1 ? "s" : ""}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
        <Clock className="h-3 w-3" />
        No bookings yet
      </span>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-(--background) py-12">
        <Container>
          <div className="text-center py-16">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-(--dark)">
              Something went wrong
            </h2>
            <p className="mt-2 text-(--text-secondary)">{error}</p>
            <button
              onClick={() => router.refresh()}
              className="mt-4 px-6 py-2 bg-(--primary) text-white rounded-lg hover:bg-(--primary)/90 transition"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-(--background) py-12">
        <Container>
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--primary) transition group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
              <SectionTitle
                title="My Listings"
                subtitle="Manage all your campsites and gear listings"
                center={false}
                className="mt-2"
              />
            </div>
            <Link href="/add-listing">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Listing
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-(--text-secondary)">Total Listings</p>
              <p className="text-2xl font-bold text-(--dark)">
                {listings.length}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-(--text-secondary)">Campsites</p>
              <p className="text-2xl font-bold text-(--primary)">
                {listings.filter((l) => l.type === "campsite").length}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-(--text-secondary)">Gear</p>
              <p className="text-2xl font-bold text-(--secondary)">
                {listings.filter((l) => l.type === "gear").length}
              </p>
            </div>
          </div>

          {/* Listings Grid */}
          {listings.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto rounded-full bg-gray-100 p-6 w-fit">
                <Tent className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-(--dark)">
                You have no listings yet
              </h3>
              <p className="mt-2 text-(--text-secondary)">
                Start sharing your campsites or gear with the community
              </p>
              <Link href="/add-listing">
                <Button variant="primary" className="mt-4">
                  Create Your First Listing
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={
                        listing.image ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={listing.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-(--dark) backdrop-blur-sm flex items-center gap-1">
                        {getTypeIcon(listing.type)}
                        {listing.type === "campsite" ? "Campsite" : "Gear"}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3">
                      {getStatusBadge(listing.bookingCount || 0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-(--dark) line-clamp-1 group-hover:text-(--primary) transition">
                      {listing.name}
                    </h3>
                    <p className="mt-1 text-sm text-(--text-secondary) line-clamp-2">
                      {listing.description}
                    </p>

                    {/* Meta Info */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>
                          {listing.location.lat.toFixed(4)},{" "}
                          {listing.location.lng.toFixed(4)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                          <Users className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>
                            {listing.capacity}{" "}
                            {listing.type === "gear" ? "units" : "guests"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-(--primary)">
                          <DollarSign className="h-4 w-4" />
                          <span>{listing.pricePerDay}</span>
                          <span className="text-xs font-normal text-(--text-secondary)">
                            /day
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>
                          Added{" "}
                          {format(new Date(listing.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <Link href={`/explore/${listing._id}`} className="flex-1">
                        <Button variant="outline" className="w-full text-sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      {/* <Link
                        href={`/edit-listing/${listing._id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full text-sm border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link> */}
                      <Button
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2 text-sm border-red-300 text-red-600 hover:bg-red-500 hover:border-red-400"
                        onClick={() =>
                          openDeleteModal(listing._id, listing.name)
                        }
                        disabled={deletingId === listing._id}
                      >
                        {deletingId === listing._id ? (
                          <>
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-slide-in">
            {/* Close Button */}
            <button
              onClick={closeDeleteModal}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <XCircle className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-(--dark)">
                Delete Listing
              </h3>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-(--dark)">
                  &quot;{selectedListingName}&quot;
                </span>
                ?
              </p>
              <p className="mt-1 text-xs text-red-500 bg-red-50 p-2 rounded-lg">
                ⚠️ This action cannot be undone. All related bookings will also
                be removed.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={closeDeleteModal}
                disabled={deletingId === selectedListingId}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                onClick={handleDelete}
                disabled={deletingId === selectedListingId}
              >
                {deletingId === selectedListingId ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Yes, Delete Listing"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyListingsClient;
