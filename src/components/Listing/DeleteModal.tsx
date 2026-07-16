// components/Listing/DeleteModal.tsx
"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/Ui/Button";
import { serverMutation } from "@/lib/core/server";

interface DeleteModalProps {
  listingId: string;
  listingName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteModal = ({
  listingId,
  listingName,
  onClose,
  onSuccess,
}: DeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // Actual API call to delete listing
      await serverMutation(`/listing/${listingId}`, undefined, "DELETE");

      toast.success("✅ Listing deleted successfully", {
        description: `"${listingName}" has been removed permanently.`,
        duration: 4000,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error deleting listing:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete listing";

      toast.error("Failed to delete listing", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-slide-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-(--dark)">Delete Listing</h3>
          <p className="mt-2 text-sm text-(--text-secondary)">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-(--dark)">
              &quot;{listingName}&quot;
            </span>
            ? This action cannot be undone.
          </p>

          {/* Warning: Related bookings will be deleted */}
          <p className="mt-3 text-xs text-red-500 bg-red-50 p-2 rounded-lg">
            ⚠️ All related bookings will also be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
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
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
