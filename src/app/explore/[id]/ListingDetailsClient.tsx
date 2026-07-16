// app/explore/[id]/ListingDetailsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Star,
  DollarSign,
  Users,
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle,
  Shield,
  Heart,
  Share2,
  Tent,
  Wrench,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Container from "@/components/Ui/Container";
import Button from "@/components/Ui/Button";
import ListingMap from "@/components/Listing/ListingMap";
import BookingModal from "@/components/Listing/BookingModal";
import DeleteModal from "@/components/Listing/DeleteModal";
import EditListingForm from "@/components/Listing/EditListingForm";
import type { Listing } from "@/types/listing";
import type { UserSession } from "@/lib/core/session";

interface ListingDetailsClientProps {
  listing: Listing;
  user: UserSession | null;
  listingId: string;
}

const ListingDetailsClient = ({
  listing: initialListing,
  user,
  listingId,
}: ListingDetailsClientProps) => {
  const router = useRouter();
  const [listing, setListing] = useState<Listing>(initialListing);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isLoggedIn = !!user;
  const isOwner = listing.ownerEmail === user?.email;

  const featuresMap = {
    campsite: [
      { id: "fire-pit", label: "Fire Pit", icon: "🔥" },
      { id: "parking", label: "Parking", icon: "🅿️" },
      { id: "water-access", label: "Water Access", icon: "💧" },
      { id: "electricity", label: "Electricity", icon: "⚡" },
      { id: "pet-friendly", label: "Pet Friendly", icon: "🐾" },
    ],
    gear: [
      { id: "waterproof", label: "Waterproof", icon: "💧" },
      { id: "setup-kit", label: "Includes Setup Kit", icon: "🔧" },
      { id: "lightweight", label: "Lightweight", icon: "⚖️" },
      { id: "heavy-duty", label: "Heavy Duty", icon: "🛡️" },
    ],
  };

  const getFeatureLabel = (featureId: string) => {
    const allFeatures = [...featuresMap.campsite, ...featuresMap.gear];
    return allFeatures.find((f) => f.id === featureId)?.label || featureId;
  };

  const getFeatureIcon = (featureId: string) => {
    const allFeatures = [...featuresMap.campsite, ...featuresMap.gear];
    return allFeatures.find((f) => f.id === featureId)?.icon || "✅";
  };

  // Handle successful booking
  const handleBookingSuccess = () => {
    setListing((prev) => ({
      ...prev,
      bookingCount: (prev.bookingCount || 0) + 1,
    }));
    toast.success("🎉 Booking confirmed!");
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-(--background) py-8">
      <Container>
        {/* Back Button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-(--text-secondary) hover:text-(--primary) transition mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gray-100">
              {imageError ? (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                    <p>Failed to load image</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={
                    listing.image ||
                    "https://via.placeholder.com/800x400?text=No+Image"
                  }
                  alt={listing.name}
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              )}

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-(--dark) backdrop-blur-sm flex items-center gap-1.5">
                  {listing.type === "campsite" ? (
                    <Tent className="h-3.5 w-3.5" />
                  ) : (
                    <Wrench className="h-3.5 w-3.5" />
                  )}
                  {listing.type === "campsite" ? "Campsite" : "Gear"}
                </span>
                {listing.rating && listing.rating > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-(--dark) backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {listing.rating.toFixed(1)}
                  </span>
                )}
              </div>

              {/* Owner Actions */}
              {isOwner && (
                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="rounded-full bg-white/90 p-2.5 text-(--primary) backdrop-blur-sm transition hover:bg-white hover:shadow-lg"
                    title="Edit Listing"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="rounded-full bg-white/90 p-2.5 text-red-500 backdrop-blur-sm transition hover:bg-white hover:shadow-lg"
                    title="Delete Listing"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div>
              <h1 className="text-3xl font-bold text-(--dark)">
                {listing.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {listing.location.lat.toFixed(4)},{" "}
                  {listing.location.lng.toFixed(4)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Added {format(new Date(listing.createdAt), "MMM d, yyyy")}
                </span>
                {listing.bookingCount && listing.bookingCount > 0 && (
                  <span className="flex items-center gap-1.5 text-(--primary)">
                    <CheckCircle className="h-4 w-4" />
                    {listing.bookingCount} booking
                    {listing.bookingCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-(--dark) mb-3">
                Description
              </h2>
              <p className="text-(--text-secondary) leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            {/* Features */}
            {listing.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-(--dark) mb-3">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {listing.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-xl bg-(--primary)/5 px-3 py-2 text-sm text-(--primary)"
                    >
                      <span>{getFeatureIcon(feature)}</span>
                      <span>{getFeatureLabel(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-(--dark) mb-3">Location</h2>
              <div className="h-[300px] overflow-hidden rounded-xl">
                <ListingMap
                  onLocationSelect={() => {}}
                  selectedLocation={listing.location}
                />
              </div>
            </div>

            {/* Related Items */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-(--dark) mb-3">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="col-span-2 text-center py-8 text-(--text-secondary)">
                  <p>More adventures coming soon...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-(--primary)">
                    ${listing.pricePerDay}
                  </span>
                  <span className="text-sm text-(--text-secondary)">/day</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {listing.rating?.toFixed(1) || "New"}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--text-secondary)">Type</span>
                  <span className="font-medium text-(--dark) capitalize flex items-center gap-1.5">
                    {listing.type === "campsite" ? (
                      <Tent className="h-4 w-4" />
                    ) : (
                      <Wrench className="h-4 w-4" />
                    )}
                    {listing.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--text-secondary)">
                    {listing.type === "gear" ? "Quantity" : "Capacity"}
                  </span>
                  <span className="font-medium text-(--dark)">
                    <Users className="inline h-4 w-4 mr-1" />
                    {listing.capacity}{" "}
                    {listing.type === "gear" ? "available" : "guests"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--text-secondary)">Bookings</span>
                  <span className="font-medium text-(--dark)">
                    {listing.bookingCount || 0}
                  </span>
                </div>
              </div>

              {/* Book Now Button */}
              {isLoggedIn ? (
                <Button
                  variant="primary"
                  className="w-full mt-4"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="primary" className="w-full mt-4">
                    Login to Book
                  </Button>
                </Link>
              )}

              <div className="mt-3 text-center text-xs text-(--text-secondary)">
                <Shield className="inline h-3 w-3 mr-1" />
                Secure booking guaranteed
              </div>
            </div>

            {/* Share & Save */}
            <div className="rounded-2xl bg-white p-4 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-(--dark)">
                  Share this listing
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-(--primary) transition"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Modals */}
      {isBookingModalOpen && (
        <BookingModal
          listingId={listing._id}
          pricePerDay={listing.pricePerDay}
          listingType={listing.type}
          onClose={() => setIsBookingModalOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          listingId={listingId}
          listingName={listing.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={() => router.push("/explore")}
        />
      )}

      {isEditModalOpen && (
        <EditListingForm
          listing={listing}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ListingDetailsClient;
