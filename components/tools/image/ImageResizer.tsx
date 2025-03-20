'use client';

import { useState } from 'react';
import { useImageUpload, ImageUploader, ProcessingButton, ImagePreview } from './ImageToolsCommon';

interface Dimensions {
  width: number;
  height: number;
}

const ImageResizer = () => {
  const {
    image,
    isProcessing,
    error,
    handleImageUpload,
    setIsProcessing,
    clearImage,
  } = useImageUpload();

  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState(90);

  // Update dimensions when image is loaded
  const handleImageLoad = (img: HTMLImageElement) => {
    const newDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
    setDimensions(newDimensions);
    setOriginalDimensions(newDimensions);
  };

  // Update height when width changes (if maintaining aspect ratio)
  const handleWidthChange = (newWidth: number) => {
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setDimensions({
        width: newWidth,
        height: Math.round(newWidth / aspectRatio),
      });
    } else {
      setDimensions(prev => ({ ...prev, width: newWidth }));
    }
  };

  // Update width when height changes (if maintaining aspect ratio)
  const handleHeightChange = (newHeight: number) => {
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setDimensions({
        width: Math.round(newHeight * aspectRatio),
        height: newHeight,
      });
    } else {
      setDimensions(prev => ({ ...prev, height: newHeight }));
    }
  };

  const resizeImage = async () => {
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
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get canvas context');
      }

      // Fill with white background for JPG
      if (format === 'jpeg') {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw image onto canvas at new size
      context.drawImage(img, 0, 0, dimensions.width, dimensions.height);

      // Convert to desired format
      const mimeType = `image/${format}`;
      const dataUrl = format === 'png' 
        ? canvas.toDataURL(mimeType)
        : canvas.toDataURL(mimeType, quality / 100);

      // Download the image
      const link = document.createElement('a');
      link.download = `${image.file.name.split('.')[0]}_${dimensions.width}x${dimensions.height}.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error resizing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <ImageUploader
          onImageUpload={(e) => {
            handleImageUpload(e);
            if (e.target.files?.[0]) {
              const img = new Image();
              img.onload = () => handleImageLoad(img);
              img.src = URL.createObjectURL(e.target.files[0]);
            }
          }}
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
            {/* Dimension Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Aspect Ratio Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="aspectRatio" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Maintain aspect ratio
              </label>
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Output Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'png' | 'jpeg' | 'webp')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            {/* Quality Slider (for JPG and WebP) */}
            {format !== 'png' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
              </div>
            )}

            <div className="flex justify-center">
              <ProcessingButton
                onClick={resizeImage}
                isProcessing={isProcessing}
                text="Resize Image"
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
          How to Resize Images
        </h3>
        <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>Upload any image file</li>
          <li>Enter desired width and height in pixels</li>
          <li>Toggle aspect ratio lock to maintain proportions</li>
          <li>Choose output format (PNG, JPG, or WebP)</li>
          <li>Adjust quality for JPG and WebP formats</li>
          <li>Click "Resize Image" to download the result</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageResizer; 