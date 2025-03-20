'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { 
  FaImage, 
  FaMagnifyingGlass, 
  FaFont, 
  FaCode, 
  FaCalculator, 
  FaRightLeft,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa6';

interface Tool {
  name: string;
  slug: string;
  description?: string;
}

interface Category {
  name: string;
  slug: string;
  icon: IconType;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    name: 'Image Tools',
    slug: 'image-tools',
    icon: FaImage,
    tools: [
      { name: 'Image to PNG', slug: 'image-to-png' },
      { name: 'Image to JPG', slug: 'image-to-jpg' },
      { name: 'Image Resizer', slug: 'image-resizer' },
      { name: 'Image Compressor', slug: 'image-compressor' },
      { name: 'Image Cropper', slug: 'image-cropper' },
      { name: 'Image to Base64', slug: 'image-to-base64' },
      { name: 'WebP to PNG', slug: 'webp-to-png' },
      { name: 'GIF Maker', slug: 'gif-maker' },
      { name: 'QR Code Generator', slug: 'qr-code-generator' },
      { name: 'Screenshot to PDF', slug: 'screenshot-to-pdf' }
    ]
  },
  {
    name: 'SEO Tools',
    slug: 'seo-tools',
    icon: FaMagnifyingGlass,
    tools: [
      { name: 'Meta Tag Generator', slug: 'meta-tag-generator' },
      { name: 'Keyword Density Checker', slug: 'keyword-density' },
      { name: 'Sitemap Generator', slug: 'sitemap-generator' },
      { name: 'Robots.txt Generator', slug: 'robots-txt-generator' },
      { name: 'Google Index Checker', slug: 'google-index-checker' },
      { name: 'Domain Authority Checker', slug: 'domain-authority' },
      { name: 'Backlink Checker', slug: 'backlink-checker' },
      { name: 'Page Speed Checker', slug: 'page-speed-checker' },
      { name: 'XML Sitemap Validator', slug: 'sitemap-validator' },
      { name: 'Mobile-Friendly Test', slug: 'mobile-friendly-test' }
    ]
  },
  {
    name: 'Text Tools',
    slug: 'text-tools',
    icon: FaFont,
    tools: [
      { name: 'Word Counter', slug: 'word-counter' },
      { name: 'Character Counter', slug: 'character-counter' },
      { name: 'Case Converter', slug: 'case-converter' },
      { name: 'Plagiarism Checker', slug: 'plagiarism-checker' },
      { name: 'Grammar Checker', slug: 'grammar-checker' },
      { name: 'Text to Speech', slug: 'text-to-speech' },
      { name: 'Speech to Text', slug: 'speech-to-text' },
      { name: 'URL Encoder/Decoder', slug: 'url-encoder-decoder' },
      { name: 'Fancy Text Generator', slug: 'fancy-text' },
      { name: 'Random Text Generator', slug: 'random-text' }
    ]
  },
  {
    name: 'Developer Tools',
    slug: 'developer-tools',
    icon: FaCode,
    tools: [
      { name: 'JSON Formatter', slug: 'json-formatter' },
      { name: 'HTML to Markdown', slug: 'html-to-markdown' },
      { name: 'CSS Minifier', slug: 'css-minifier' },
      { name: 'JavaScript Minifier', slug: 'js-minifier' },
      { name: 'SQL Formatter', slug: 'sql-formatter' },
      { name: 'HTACCESS Generator', slug: 'htaccess-generator' },
      { name: 'Markdown to HTML', slug: 'markdown-to-html' },
      { name: 'Color Picker', slug: 'color-picker' },
      { name: 'Base64 Converter', slug: 'base64-converter' },
      { name: 'IP Lookup', slug: 'ip-lookup' }
    ]
  },
  {
    name: 'Calculators',
    slug: 'calculators',
    icon: FaCalculator,
    tools: [
      { name: 'Percentage Calculator', slug: 'percentage-calculator' },
      { name: 'Age Calculator', slug: 'age-calculator' },
      { name: 'BMI Calculator', slug: 'bmi-calculator' },
      { name: 'Calories Calculator', slug: 'calories-calculator' },
      { name: 'Loan EMI Calculator', slug: 'loan-calculator' },
      { name: 'Scientific Calculator', slug: 'scientific-calculator' },
      { name: 'Discount Calculator', slug: 'discount-calculator' },
      { name: 'Currency Converter', slug: 'currency-converter' },
      { name: 'Time Zone Converter', slug: 'timezone-converter' },
      { name: 'Tip Calculator', slug: 'tip-calculator' }
    ]
  },
  {
    name: 'Unit Converters',
    slug: 'unit-converters',
    icon: FaRightLeft,
    tools: [
      { name: 'Length Converter', slug: 'length-converter' },
      { name: 'Weight Converter', slug: 'weight-converter' },
      { name: 'Speed Converter', slug: 'speed-converter' },
      { name: 'Temperature Converter', slug: 'temperature-converter' },
      { name: 'Volume Converter', slug: 'volume-converter' },
      { name: 'Data Storage Converter', slug: 'storage-converter' },
      { name: 'Energy Converter', slug: 'energy-converter' },
      { name: 'Pressure Converter', slug: 'pressure-converter' },
      { name: 'Fuel Efficiency Converter', slug: 'fuel-converter' },
      { name: 'Angle Converter', slug: 'angle-converter' }
    ]
  }
];

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Categories</h2>
        
        {/* All Tools Link */}
        <Link
          href="/tools"
          className={`flex items-center px-4 py-2 rounded-lg mb-2 transition-colors ${
            !activeCategory
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          <span className="flex-1">All Tools</span>
          <span className="text-sm text-gray-400">
            {categories.reduce((acc, cat) => acc + cat.tools.length, 0)}
          </span>
        </Link>

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug} className="rounded-lg overflow-hidden">
              <div
                onClick={() => setActiveCategory(activeCategory === category.slug ? null : category.slug)}
                className={`w-full flex items-center px-4 py-2 text-left transition-colors cursor-pointer ${
                  activeCategory === category.slug
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                <span className="flex-1">{category.name}</span>
                {activeCategory === category.slug ? (
                  <FaChevronDown className="w-4 h-4" />
                ) : (
                  <FaChevronRight className="w-4 h-4" />
                )}
              </div>
              
              {/* Tool Links */}
              <div className={`transition-all duration-200 ease-in-out ${
                activeCategory === category.slug ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="ml-4 mt-1 space-y-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Space */}
        <div className="mt-8">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">Advertisement</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 