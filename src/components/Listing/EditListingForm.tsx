// components/Listing/EditListingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  AlertCircle,
  Check,
  Loader2,
  Tent,
  Wrench,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/Ui/Button";
import Input from "@/components/Ui/Input";
import ListingMap from "@/components/Listing/ListingMap";
import { serverMutation } from "@/lib/core/server";
import type { Listing } from "@/types/listing";

interface EditListingFormProps {
  listing: Listing;
  onClose: () => void;
}

const EditListingForm = ({ listing, onClose }: EditListingFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    name: listing.name,
    description: listing.description,
    image: listing.image,
    type: listing.type as "campsite" | "gear",
    location: listing.location,
    capacity: listing.capacity,
    pricePerDay: listing.pricePerDay,
    features: listing.features || [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const featuresOptions = {
    campsite: [
      { id: "fire-pit", label: "Fire Pit" },
      { id: "parking", label: "Parking" },
      { id: "water-access", label: "Water Access" },
      { id: "electricity", label: "Electricity" },
      { id: "pet-friendly", label: "Pet Friendly" },
    ],
    gear: [
      { id: "waterproof", label: "Waterproof" },
      { id: "setup-kit", label: "Includes Setup Kit" },
      { id: "lightweight", label: "Lightweight" },
      { id: "heavy-duty", label: "Heavy Duty" },
    ],
  };

  const currentFeatures = formData.type ? featuresOptions[formData.type] : [];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Listing name is required";
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      isValid = false;
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
      isValid = false;
    } else if (
      !formData.image.startsWith("http://") &&
      !formData.image.startsWith("https://")
    ) {
      newErrors.image = "Please enter a valid URL";
      isValid = false;
    }

    if (!formData.type) {
      newErrors.type = "Please select a listing type";
      isValid = false;
    }

    if (!formData.location) {
      newErrors.location = "Please select a location on the map";
      isValid = false;
    }

    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity =
        formData.type === "gear"
          ? "Quantity must be at least 1"
          : "Capacity must be at least 1";
      isValid = false;
    }

    if (!formData.pricePerDay || formData.pricePerDay <= 0) {
      newErrors.pricePerDay = "Price must be greater than $0.00";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      await serverMutation(`/listing/${listing._id}`, formData, "PUT");

      toast.success("✅ Listing updated successfully!", {
        description: "Your changes have been saved.",
        duration: 4000,
      });

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error updating listing:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update listing. Please try again.";
      setErrors({ general: errorMessage });
      toast.error("Failed to update listing", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setImageError(false);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, location: { lat, lng } }));
    if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-(--dark)">Edit Listing</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errors.general && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Switcher */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-(--dark)">
              What are you listing? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "campsite",
                    features: [],
                  }))
                }
                className={`flex items-center justify-center gap-3 rounded-xl border p-4 font-medium transition duration-200 ${
                  formData.type === "campsite"
                    ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Tent size={20} />
                <span>Campsite Space</span>
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "gear",
                    features: [],
                  }))
                }
                className={`flex items-center justify-center gap-3 rounded-xl border p-4 font-medium transition duration-200 ${
                  formData.type === "gear"
                    ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Wrench size={20} />
                <span>Outdoor Gear</span>
              </button>
            </div>
            {errors.type && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3" /> {errors.type}
              </p>
            )}
          </div>

          {/* Listing Name */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-(--dark)">
              Listing Title <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              type="text"
              placeholder={
                formData.type === "gear"
                  ? "e.g., 4-Person Waterproof Camping Tent"
                  : "e.g., Riverside Valley Green Canopy"
              }
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.name ? "border-red-500 focus:ring-red-100" : ""}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-(--dark)">
              Description & Details <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe the landscape, accessibility, features, guidelines, or specific gear quality attributes..."
              value={formData.description}
              onChange={handleChange}
              disabled={isLoading}
              rows={4}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-100 placeholder:text-gray-400 ${
                errors.description
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-200 shadow-sm"
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3" /> {errors.description}
              </p>
            )}
          </div>

          {/* Image URL with Preview */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-(--dark)">
              Display Image URL <span className="text-red-500">*</span>
            </label>
            <Input
              name="image"
              type="url"
              placeholder="https://images.unsplash.com/your-premium-outdoor-photo"
              value={formData.image}
              onChange={handleChange}
              disabled={isLoading}
              className={
                errors.image ? "border-red-500 focus:ring-red-100" : ""
              }
            />
            {errors.image && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3" /> {errors.image}
              </p>
            )}

            {formData.image && !errors.image && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 h-44 flex items-center justify-center group shadow-inner">
                {imageError ? (
                  <div className="flex flex-col items-center text-gray-400 gap-1.5">
                    <ImageIcon size={28} className="stroke-[1.5]" />
                    <span className="text-xs font-medium">
                      Failed to resolve image asset location
                    </span>
                  </div>
                ) : (
                  <Image
                    src={formData.image}
                    alt="Listing Preview Frame"
                    fill
                    unoptimized
                    className="object-cover transition duration-300 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Capacity & Price */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-(--dark)">
                {formData.type === "gear"
                  ? "Available Quantity"
                  : "Max Guest Capacity"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <Input
                name="capacity"
                type="number"
                min="1"
                placeholder="1"
                value={formData.capacity}
                onChange={handleNumberChange}
                disabled={isLoading}
                className={
                  errors.capacity ? "border-red-500 focus:ring-red-100" : ""
                }
              />
              {errors.capacity && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="h-3 w-3" /> {errors.capacity}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-(--dark)">
                Price per Day ($ USD) <span className="text-red-500">*</span>
              </label>
              <Input
                name="pricePerDay"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={formData.pricePerDay || ""}
                onChange={handleNumberChange}
                disabled={isLoading}
                className={
                  errors.pricePerDay ? "border-red-500 focus:ring-red-100" : ""
                }
              />
              {errors.pricePerDay && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="h-3 w-3" /> {errors.pricePerDay}
                </p>
              )}
            </div>
          </div>

          {/* Features/Amenities */}
          {currentFeatures.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-(--dark)">
                Features & Specifications
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {currentFeatures.map((feature) => {
                  const isSelected = formData.features.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition text-sm font-medium ${
                        isSelected
                          ? "border-gray-900 bg-gray-950 text-white shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-white transition ${
                          isSelected
                            ? "border-white bg-transparent"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && <Check size={12} className="stroke-3" />}
                      </div>
                      <span className="truncate">{feature.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Location Map */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-(--dark)">
              Pinpoint Location Coordinates{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
              <ListingMap
                onLocationSelect={handleLocationSelect}
                selectedLocation={formData.location}
              />
            </div>
            {errors.location && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3" /> {errors.location}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-13 rounded-xl font-semibold shadow-md transition-all duration-200 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-white/80" />
                  Updating Listing...
                </span>
              ) : (
                <span className="flex items-center gap-2">Save Changes</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingForm;
