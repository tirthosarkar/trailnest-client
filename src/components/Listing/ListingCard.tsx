"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Star,
  DollarSign,
  Users,
  ImageOff,
} from "lucide-react";
import { format, isValid } from "date-fns";
import Button from "../Ui/Button";

interface ListingCardProps {
  listing: {
    _id: string;
    name: string;
    description: string;
    image: string;
    type: string;
    location: {
      lat: number;
      lng: number;
    };
    capacity: number;
    pricePerDay: number;
    features: string[];
    createdAt: string;
    ownerEmail?: string;
    bookingCount?: number;
    rating?: number;
  };
  className?: string;
}

const ListingCard = ({ listing, className = "" }: ListingCardProps) => {
  const [imageError, setImageError] = useState(false);

  const {
    _id,
    name,
    description,
    image,
    type,
    location,
    capacity,
    pricePerDay,
    features = [],
    createdAt,
    bookingCount = 0,
    rating = 0,
  } = listing;

  // Ensure date parsing doesn't crash if database returns an irregular string
  const formattedDate = () => {
    const dateObj = new Date(createdAt);
    return isValid(dateObj) ? format(dateObj, "MMM d, yyyy") : "Recently";
  };

  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      <div>
        {/* Card Media Header */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
          {!image || imageError ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400">
              <ImageOff className="h-8 w-8 stroke-[1.5]" />
              <span className="text-xs">No preview available</span>
            </div>
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImageError(true)}
            />
          )}

          {/* Floating Badges */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-(--dark) shadow-xs backdrop-blur-xs">
              {type === "campsite" ? "🏕️ Campsite" : "🎒 Gear"}
            </span>
            {rating > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-(--dark) shadow-xs backdrop-blur-xs">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>

        {/* Info Layout */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-base font-bold text-(--dark) line-clamp-1 group-hover:text-(--primary) transition-colors duration-200">
              {name}
            </h3>
            <p className="mt-1 text-xs text-(--text-secondary) line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            {/* Location Coordinate Markers */}
            <div className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
              <span className="font-mono text-[11px]">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </span>
            </div>

            {/* Capacity & Pricing Tier */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                <Users className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                <span>
                  {capacity}{" "}
                  {type === "gear"
                    ? `unit${capacity !== 1 ? "s" : ""}`
                    : `person${capacity !== 1 ? "s" : ""}`}
                </span>
              </div>
              <div className="flex items-center gap-0.5 text-sm font-bold text-(--primary)">
                <DollarSign className="h-4 w-4" />
                <span>{pricePerDay}</span>
                <span className="text-xs font-normal text-(--text-secondary)">
                  /day
                </span>
              </div>
            </div>

            {/* Tag Badges */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-md bg-gray-50 border border-gray-100 px-2 py-0.5 text-[10px] font-medium text-(--text-secondary) capitalize"
                  >
                    {feature.replace("-", " ")}
                  </span>
                ))}
                {features.length > 3 && (
                  <span className="text-[10px] font-semibold text-gray-400 self-center ml-1">
                    +{features.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Metrics & Action Block */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between border-t border-gray-100 py-3 text-[11px] text-(--text-secondary)">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            <span>Added {formattedDate()}</span>
          </div>
          {bookingCount > 0 && (
            <span className="font-semibold text-(--primary) bg-(--primary)/5 px-2 py-0.5 rounded-md">
              {bookingCount} booking{bookingCount > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Next Link wraps the button with passHref style to maintain semantic markup */}
        <Link href={`/explore/${_id}`} passHref className="block w-full">
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-1 group-hover:bg-(--primary)/90 transition-colors"
          >
            View Details
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
