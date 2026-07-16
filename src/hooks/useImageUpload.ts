// hooks/useImageUpload.ts
import { useState } from "react";

interface UploadedImage {
  url: string;
  display_url: string;
  delete_url: string;
}

interface UseImageUploadReturn {
  isUploading: boolean;
  uploadedImage: UploadedImage | null;
  error: string;
  uploadImage: (file: File) => Promise<UploadedImage | null>;
  removeImage: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null,
  );
  const [error, setError] = useState<string>("");

  const uploadImage = async (file: File): Promise<UploadedImage | null> => {
    if (!file) return null;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image (JPEG, PNG, GIF, WEBP, SVG)");
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return null;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        const imageData = {
          url: data.data.url,
          display_url: data.data.display_url,
          delete_url: data.data.delete_url,
        };
        setUploadedImage(imageData);
        setError("");
        return imageData;
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setError("");
  };

  return {
    isUploading,
    uploadedImage,
    error,
    uploadImage,
    removeImage,
  };
};
