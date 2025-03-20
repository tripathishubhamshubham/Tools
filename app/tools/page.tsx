'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

// Import categories from Sidebar
import { categories } from '@/components/layout/Sidebar';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on search query
  const filteredTools = categories.flatMap(category => 
    category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(tool => ({
      ...tool,
      category: category.name,
      categorySlug: category.slug,
      icon: category.icon
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <tool.icon className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tool.category}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {tool.description || `${tool.name} - Coming Soon! This tool is currently under development.`}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">
            No tools found matching your search.
          </p>
        </div>
      )}

      {/* Ad Section */}
      <div className="mt-12 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
        <span className="text-gray-600 dark:text-gray-300">Advertisement Space</span>
      </div>
    </div>
  );
} 