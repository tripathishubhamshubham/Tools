'use client';

import { useState } from 'react';

export interface ImageFile {
  file: File;
  preview: string;
}

export const useImageUpload = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setImage({ file, preview });
  };

  const clearImage = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
    setError(null);
  };

  return {
    image,
    setImage,
    isProcessing,
    setIsProcessing,
    error,
    setError,
    handleImageUpload,
    clearImage,
  };
};

export const ImageUploader = ({
  onImageUpload,
  accept = "image/*",
  maxSize = 5242880, // 5MB
}: {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  maxSize?: number;
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supported formats • Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={onImageUpload}
          accept={accept}
        />
      </label>
    </div>
  );
};

export const ProcessingButton = ({
  onClick,
  isProcessing,
  text = "Process Image",
  processingText = "Processing...",
}: {
  onClick: () => void;
  isProcessing: boolean;
  text?: string;
  processingText?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={`px-4 py-2 rounded-lg text-white ${
        isProcessing
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 transition-colors'
      }`}
    >
      {isProcessing ? processingText : text}
    </button>
  );
};

export const ImagePreview = ({
  src,
  alt = "Preview",
  onClear,
}: {
  src: string;
  alt?: string;
  onClear: () => void;
}) => {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
      <button
        onClick={onClear}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}; 