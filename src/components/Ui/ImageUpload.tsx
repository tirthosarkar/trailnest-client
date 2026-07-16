// components/Ui/ImageUpload.tsx
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Loader2, Camera, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadProps {
  onImageUpload?: (url: string) => void;
  onImageRemove?: () => void;
  defaultImage?: string;
  label?: string;
  className?: string;
  required?: boolean;
}

const ImageUpload = ({
  onImageUpload,
  onImageRemove,
  defaultImage = '',
  label = 'Profile Photo',
  className = '',
  required = false,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(defaultImage);
  const { isUploading, uploadedImage, error, uploadImage, removeImage } =
    useImageUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Upload to ImgBB
    const result = await uploadImage(file);

    if (result) {
      setPreview(result.display_url || result.url);
      onImageUpload?.(result.url);
    } else {
      // Reset preview on error
      setPreview(defaultImage);
    }

    // Reset input
    e.target.value = '';
  };

  const handleRemove = () => {
    setPreview('');
    removeImage();
    onImageRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-(--dark)">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Upload Area */}
      {!preview ? (
        <div
          onClick={handleClick}
          className="relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 transition-all hover:border-(--primary) hover:bg-gray-50 group"
        >
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            {isUploading ? (
              <>
                <div className="rounded-full bg-(--primary)/10 p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-(--dark)">
                    Uploading...
                  </p>
                  <p className="text-xs text-(--text-secondary)">Please wait</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-(--primary)/10 p-4 group-hover:bg-(--primary)/20 transition-colors">
                  <Camera className="h-8 w-8 text-(--primary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-(--dark)">
                    Click to upload photo
                  </p>
                  <p className="text-xs text-(--text-secondary) mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      ) : (
        /* Preview Card */
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full bg-gray-100">
            <Image
              src={preview}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-10 w-10 animate-spin text-white" />
                  <p className="text-sm text-white">Uploading...</p>
                </div>
              </div>
            )}
          </div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleClick}
              disabled={isUploading}
              className="rounded-full bg-white/90 p-2.5 text-(--dark) transition hover:bg-white hover:scale-105 disabled:opacity-50"
              title="Change image"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="rounded-full bg-red-500/90 p-2.5 text-white transition hover:bg-red-600 hover:scale-105 disabled:opacity-50"
              title="Remove image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-(--text-secondary)" />
              <span className="text-xs text-(--text-secondary)">
                {uploadedImage
                  ? 'Image uploaded successfully'
                  : 'Image uploaded'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClick}
              disabled={isUploading}
              className="text-xs font-medium text-(--primary) hover:underline disabled:opacity-50"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          <X className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
