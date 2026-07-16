// app/my-bookings/MyBookingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  XCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Tent,
  Wrench,
  AlertTriangle,
  X,
  Package,
} from "lucide-react";
import { format, isAfter } from "date-fns";
import { toast } from "sonner";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import SectionTitle from "@/components/Ui/SectionTitle";
import { serverMutation } from "@/lib/core/server";

interface Booking {
  _id: string;
  listingId: string;
  listingType?: "campsite" | "gear";
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
  startDate?: string;
  endDate?: string;
  guests?: number;
  quantity?: number;
  totalPrice: number;
  status: "confirmed" | "cancelled" | "pending";
  createdAt: string;
}

interface MyBookingsClientProps {
  bookings: Booking[];
  error: string | null;
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string | null;
  };
  // token: string | null;
}

const MyBookingsClient = ({
  bookings: initialBookings,
  error: initialError,
  // user,
  // token,
}: MyBookingsClientProps) => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [error, setError] = useState<string | null>(initialError);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [selectedBookingName, setSelectedBookingName] = useState<string>("");

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Helper function to safely format dates
  const formatDateSafe = (date: string | undefined) => {
    if (!date) return "Invalid date";
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return "Invalid date";
      return format(parsedDate, "MMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const openConfirmModal = (bookingId: string, bookingName: string) => {
    setSelectedBookingId(bookingId);
    setSelectedBookingName(bookingName);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedBookingId(null);
    setSelectedBookingName("");
  };

  const handleCancel = async () => {
    if (!selectedBookingId) return;

    setCancellingId(selectedBookingId);
    closeConfirmModal();

    try {
      await serverMutation(
        `/bookings/${selectedBookingId}`,
        undefined,
        "DELETE",
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === selectedBookingId
            ? { ...booking, status: "cancelled" as const }
            : booking,
        ),
      );

      toast.success("Booking cancelled successfully", {
        description: "Your booking has been cancelled.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
            <CheckCircle className="h-3.5 w-3.5" />
            Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
            <XCircle className="h-3.5 w-3.5" />
            Cancelled
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700">
            <Clock className="h-3.5 w-3.5" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const canCancel = (booking: Booking) => {
    if (booking.status !== "confirmed") return false;

    // For campsites: check if start date is in the future
    if (booking.listingType === "campsite") {
      if (!booking.startDate) return false;
      const startDate = new Date(booking.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return isAfter(startDate, today);
    }

    // For gear: can always cancel (no date restriction)
    return true;
  };

  const getTotalDays = (
    startDate: string | undefined,
    endDate: string | undefined,
  ) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--primary) transition mb-4 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <SectionTitle
              title="My Bookings"
              subtitle="View and manage all your adventure bookings"
              center
            />
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-(--text-secondary)">Total Bookings</p>
              <p className="text-2xl font-bold text-(--dark)">
                {bookings.length}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-(--text-secondary)">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-(--text-secondary)">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">
                {bookings.filter((b) => b.status === "cancelled").length}
              </p>
            </div>
          </div>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto rounded-full bg-gray-100 p-6 w-fit">
                <Calendar className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-(--dark)">
                You have no bookings yet
              </h3>
              <p className="mt-2 text-(--text-secondary)">
                Start exploring and book your next adventure
              </p>
              <Link href="/explore">
                <Button variant="primary" className="mt-4">
                  Explore Listings
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Listing Info */}
                    <div className="flex flex-1 gap-4">
                      {/* Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={booking.listing?.image || "/placeholder.jpg"}
                          alt={booking.listing?.name || "Listing"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-(--dark)">
                              {booking.listing?.name || "Listing"}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-(--text-secondary)">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {booking.listing?.location?.lat?.toFixed(4) ||
                                "N/A"}
                              ,{" "}
                              {booking.listing?.location?.lng?.toFixed(4) ||
                                "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              {booking.listing?.type === "campsite" ? (
                                <Tent className="h-3.5 w-3.5" />
                              ) : (
                                <Wrench className="h-3.5 w-3.5" />
                              )}
                              {booking.listing?.type || "Unknown"}
                            </span>
                            <span className="flex items-center gap-1">
                              {booking.listingType === "campsite" ? (
                                <>
                                  <Users className="h-3.5 w-3.5" />
                                  {booking.guests || 1} guest
                                  {(booking.guests || 1) > 1 ? "s" : ""}
                                </>
                              ) : (
                                <>
                                  <Package className="h-3.5 w-3.5" />
                                  {booking.quantity || 1} unit
                                  {(booking.quantity || 1) > 1 ? "s" : ""}
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Dates - Only for campsites */}
                        {booking.listingType === "campsite" &&
                          booking.startDate &&
                          booking.endDate && (
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-(--text-secondary)">
                                <Calendar className="h-4 w-4" />
                                {formatDateSafe(booking.startDate)} -{" "}
                                {formatDateSafe(booking.endDate)}
                              </span>
                              <span className="text-xs text-(--text-secondary)">
                                {getTotalDays(
                                  booking.startDate,
                                  booking.endDate,
                                )}{" "}
                                days
                              </span>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Right: Price & Actions */}
                    <div className="flex flex-col items-end gap-3 lg:min-w-[180px]">
                      <div className="text-right">
                        <p className="text-lg font-bold text-(--primary)">
                          ${booking.totalPrice}
                        </p>
                        <p className="text-xs text-(--text-secondary)">
                          ${booking.listing?.pricePerDay || 0} ×{" "}
                          {booking.listingType === "campsite"
                            ? `${getTotalDays(booking.startDate, booking.endDate)} days`
                            : `${booking.quantity || 1} units`}
                        </p>
                      </div>

                      <div className="flex w-full gap-2">
                        {canCancel(booking) && (
                          <Button
                            variant="outline"
                            className="flex-1 border-red-300 text-red-600 hover:bg-red-500 hover:border-red-400"
                            onClick={() =>
                              openConfirmModal(
                                booking._id,
                                booking.listing?.name || "Booking",
                              )
                            }
                            disabled={cancellingId === booking._id}
                          >
                            {cancellingId === booking._id ? (
                              <span className="flex items-center gap-1">
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
                                Cancelling...
                              </span>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4" />
                                Cancel
                              </>
                            )}
                          </Button>
                        )}
                        <Link
                          href={`/explore/${booking.listingId}`}
                          className="flex-1"
                        >
                          <Button variant="outline" className="w-full">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Cancelled Banner */}
                  {booking.status === "cancelled" && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      <span>This booking has been cancelled</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-slide-in">
            <button
              onClick={closeConfirmModal}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-(--dark)">
                Cancel Booking
              </h3>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Are you sure you want to cancel{" "}
                <span className="font-semibold text-(--dark)">
                  &quot;{selectedBookingName}&quot;
                </span>
                ?
              </p>
              <p className="mt-1 text-xs text-red-500 bg-red-50 p-2 rounded-lg">
                ⚠️ This action cannot be undone. Your booking will be
                permanently cancelled.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={closeConfirmModal}
                disabled={cancellingId === selectedBookingId}
              >
                Keep Booking
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                onClick={handleCancel}
                disabled={cancellingId === selectedBookingId}
              >
                {cancellingId === selectedBookingId ? (
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
                    Cancelling...
                  </span>
                ) : (
                  "Yes, Cancel Booking"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookingsClient;
