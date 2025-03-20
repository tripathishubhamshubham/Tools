'use client';

import { useImageUpload, ImageUploader, ProcessingButton, ImagePreview } from './ImageToolsCommon';

const ImageToPng = () => {
  const {
    image,
    isProcessing,
    error,
    handleImageUpload,
    setIsProcessing,
    clearImage,
  } = useImageUpload();

  const convertToPng = async () => {
    if (!image) return;

    setIsProcessing(true);

    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      // Create a promise to handle image loading
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.preview;
      });

      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image onto canvas
      ctx?.drawImage(img, 0, 0);

      // Convert to PNG
      const pngUrl = canvas.toDataURL('image/png');

      // Create download link
      const link = document.createElement('a');
      link.download = `${image.file.name.split('.')[0]}.png`;
      link.href = pngUrl;
      link.click();
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
          <div className="flex justify-center">
            <ProcessingButton
              onClick={convertToPng}
              isProcessing={isProcessing}
              text="Convert to PNG"
            />
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
          How to Convert Images to PNG
        </h3>
        <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>Upload any image file (JPEG, WebP, GIF, etc.)</li>
          <li>Click the "Convert to PNG" button</li>
          <li>Your PNG file will download automatically</li>
          <li>Original image quality is preserved</li>
          <li>No file size limits</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageToPng; 