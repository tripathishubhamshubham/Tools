'use client';

import { useState } from 'react';
import { useImageUpload, ImageUploader, ProcessingButton, ImagePreview } from './ImageToolsCommon';

const ImageToJpg = () => {
  const {
    image,
    isProcessing,
    error,
    handleImageUpload,
    setIsProcessing,
    clearImage,
  } = useImageUpload();

  const [quality, setQuality] = useState(90);

  const convertToJpg = async () => {
    if (!image) return;

    setIsProcessing(true);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = image.preview;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get canvas context');
      }

      // Fill with white background (for transparent images)
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image onto canvas
      context.drawImage(img, 0, 0);

      // Convert to JPG with specified quality
      const jpgUrl = canvas.toDataURL('image/jpeg', quality / 100);

      // Create download link
      const link = document.createElement('a');
      link.download = `${image.file.name.split('.')[0]}.jpg`;
      link.href = jpgUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error converting image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <ImageUploader
          onImageUpload={handleImageUpload}
          accept="image/*"
        />
      ) : (
        <div className="space-y-4">
          <ImagePreview
            src={image.preview}
            alt="Image preview"
            onClear={clearImage}
          />
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Lower quality, smaller file</span>
                <span>Higher quality, larger file</span>
              </div>
            </div>
            <div className="flex justify-center">
              <ProcessingButton
                onClick={convertToJpg}
                isProcessing={isProcessing}
                text="Convert to JPG"
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          How to Convert Images to JPG
        </h3>
        <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>Upload any image file (PNG, WebP, GIF, etc.)</li>
          <li>Adjust the quality slider (higher quality = larger file size)</li>
          <li>Click the "Convert to JPG" button</li>
          <li>Your JPG file will download automatically</li>
          <li>White background is added to transparent images</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageToJpg; 