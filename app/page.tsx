'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tool {
  name: string;
  description: string;
  category: string;
  slug: string;
  icon: string;
}

const tools: Tool[] = [
  {
    name: 'Word Counter',
    description: 'Count words, characters, and paragraphs in your text',
    category: 'Text Tools',
    slug: 'word-counter',
    icon: '📝',
  },
  {
    name: 'Image to PNG',
    description: 'Convert any image format to PNG with high quality',
    category: 'Image Tools',
    slug: 'image-to-png',
    icon: '🖼️',
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    category: 'Developer Tools',
    slug: 'json-formatter',
    icon: '🔧',
  },
  {
    name: 'Meta Tag Generator',
    description: 'Generate meta tags for your website',
    category: 'SEO Tools',
    slug: 'meta-tag-generator',
    icon: '🏷️',
  },
  {
    name: 'Color Converter',
    description: 'Convert between different color formats',
    category: 'Developer Tools',
    slug: 'color-converter',
    icon: '🎨',
  },
  // Add more tools here as they are implemented
];

const categories = [
  'All',
  'Image Tools',
  'SEO Tools',
  'Text Tools',
  'Developer Tools',
  'Calculators',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          100+ Free Online Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your one-stop destination for all the tools you need
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
              🔍
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="text-3xl mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {tool.description}
              </p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  {tool.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Section */}
      <div className="mt-12 mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
          <span className="text-gray-600 dark:text-gray-300">Advertisement Space</span>
        </div>
      </div>
    </div>
  );
} 