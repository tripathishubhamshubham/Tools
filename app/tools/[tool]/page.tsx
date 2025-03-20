'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import WordCounter from '@/components/tools/WordCounter';
import ImageToPng from '@/components/tools/image/ImageToPng';
import ImageToJpg from '@/components/tools/image/ImageToJpg';
import ImageResizer from '@/components/tools/image/ImageResizer';
import PercentageCalculator from '@/components/tools/calculators/PercentageCalculator';
import BmiCalculator from '@/components/tools/calculators/BmiCalculator';
import AgeCalculator from '@/components/tools/calculators/AgeCalculator';
import CaloriesCalculator from '@/components/tools/calculators/CaloriesCalculator';

// Tool components mapping
const toolComponents: { [key: string]: React.ComponentType } = {
  'word-counter': WordCounter,
  'image-to-png': ImageToPng,
  'image-to-jpg': ImageToJpg,
  'image-resizer': ImageResizer,
  'percentage-calculator': PercentageCalculator,
  'bmi-calculator': BmiCalculator,
  'age-calculator': AgeCalculator,
  'calories-calculator': CaloriesCalculator,
};

// Tool descriptions for the about section
const toolDescriptions: { [key: string]: { description: string; features: string[] } } = {
  'word-counter': {
    description: 'Count words, characters, sentences, and paragraphs in your text. Get instant statistics and reading time estimates.',
    features: [
      'Accurate word counting',
      'Character counting (with and without spaces)',
      'Sentence and paragraph detection',
      'Reading time estimation',
      'Text case conversion'
    ]
  },
  'image-to-png': {
    description: 'Convert any image format to PNG while preserving quality. Supports JPEG, WebP, GIF, and other image formats.',
    features: [
      'High-quality PNG conversion',
      'Maintains original dimensions',
      'Preserves transparency',
      'Batch processing support',
      'No file size limits'
    ]
  },
  'image-to-jpg': {
    description: 'Convert images to JPG format with adjustable quality settings. Perfect for reducing file size while maintaining visual quality.',
    features: [
      'Adjustable quality settings',
      'White background for transparent images',
      'Maintains original dimensions',
      'Optimized file size',
      'Support for all image formats'
    ]
  },
  'image-resizer': {
    description: 'Resize any image to your desired dimensions while maintaining quality. Perfect for creating thumbnails or preparing images for specific platforms.',
    features: [
      'Custom width and height settings',
      'Maintain aspect ratio option',
      'Multiple output formats (PNG, JPG, WebP)',
      'Quality adjustment for JPG and WebP',
      'Preview before download'
    ]
  },
  'percentage-calculator': {
    description: 'A versatile percentage calculator that helps you calculate percentages, find percentage of a number, or determine what percentage one number is of another.',
    features: [
      'Calculate percentage of any number',
      'Find what percentage X is of Y',
      'Easy-to-use interface',
      'Instant calculations',
      'Common percentage examples included'
    ]
  },
  'bmi-calculator': {
    description: 'Calculate your Body Mass Index (BMI) using either metric or imperial units. Get instant results and health recommendations based on your BMI score.',
    features: [
      'Support for both metric and imperial units',
      'Instant BMI calculation',
      'BMI category classification',
      'Health recommendations',
      'BMI range information'
    ]
  },
  'age-calculator': {
    description: 'Calculate your exact age in years, months, and days. Find out your next birthday and how many days until then.',
    features: [
      'Precise age calculation',
      'Next birthday countdown',
      'Easy date selection',
      'Instant results',
      'Mobile-friendly interface'
    ]
  },
  'calories-calculator': {
    description: 'Calculate your daily calorie needs based on your age, gender, weight, height, and activity level using the Mifflin-St Jeor Equation.',
    features: [
      'BMR calculation',
      'Activity level adjustment',
      'Weight loss/gain targets',
      'Multiple activity levels',
      'Personalized recommendations'
    ]
  }
};

// Function to get tool info from slug
const getToolInfo = (slug: string) => {
  // If no description exists, generate a placeholder
  if (!toolDescriptions[slug]) {
    const name = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      name,
      description: `${name} - Coming Soon! This tool is currently under development.`,
      features: ['Feature 1 - Coming Soon', 'Feature 2 - Coming Soon', 'Feature 3 - Coming Soon']
    };
  }

  return {
    name: slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    ...toolDescriptions[slug]
  };
};

export default function ToolPage() {
  const params = useParams();
  const toolSlug = params.tool as string;

  // Get the component for this tool
  const ToolComponent = toolComponents[toolSlug];
  const toolInfo = getToolInfo(toolSlug);

  // If no component exists for this tool, show coming soon
  if (!ToolComponent) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {toolInfo.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {toolInfo.description}
          </p>
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Coming Soon
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tool Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {toolInfo.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {toolInfo.description}
        </p>
      </div>

      {/* Main Tool */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <ToolComponent />
      </div>

      {/* Tool Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          About {toolInfo.name}
        </h2>
        <div className="prose dark:prose-invert">
          <p>{toolInfo.description}</p>
          <h3>Features:</h3>
          <ul>
            {toolInfo.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ad Section */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
        <span className="text-gray-600 dark:text-gray-300">Advertisement Space</span>
      </div>
    </div>
  );
} 