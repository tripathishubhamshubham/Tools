'use client';

import { useState, useEffect } from 'react';

interface WordStats {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<WordStats>({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  const calculateStats = (text: string): WordStats => {
    // Remove extra whitespace and get actual text content
    const cleanText = text.trim();
    
    // Calculate words (split by whitespace and filter out empty strings)
    const words = cleanText ? cleanText.split(/\s+/).filter(word => word.length > 0).length : 0;
    
    // Calculate characters (with and without spaces)
    const characters = cleanText.length;
    
    // Calculate sentences (split by .!? followed by space or end of string)
    const sentences = cleanText ? cleanText.split(/[.!?](?:\s|$)/).filter(Boolean).length : 0;
    
    // Calculate paragraphs (split by double newline)
    const paragraphs = cleanText ? cleanText.split(/\n\s*\n/).filter(Boolean).length : 0;
    
    // Calculate reading time (average reading speed is 200-250 words per minute)
    const readingTime = Math.ceil(words / 200);

    return {
      words,
      characters,
      sentences,
      paragraphs,
      readingTime,
    };
  };

  useEffect(() => {
    const newStats = calculateStats(text);
    setStats(newStats);
  }, [text]);

  const StatBox = ({ label, value }: { label: string; value: number }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
          placeholder="Type or paste your text here..."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatBox label="Words" value={stats.words} />
        <StatBox label="Characters" value={stats.characters} />
        <StatBox label="Sentences" value={stats.sentences} />
        <StatBox label="Paragraphs" value={stats.paragraphs} />
        <StatBox label="Reading Time (min)" value={stats.readingTime} />
      </div>

      {/* Additional Features */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setText(text.toLowerCase())}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Convert to Lowercase
        </button>
        <button
          onClick={() => setText(text.toUpperCase())}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Convert to Uppercase
        </button>
        <button
          onClick={() => setText('')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Text
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Tips</h3>
        <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>Double-click to select a word</li>
          <li>Press Ctrl+A to select all text</li>
          <li>Use the buttons above to quickly transform your text</li>
          <li>Reading time is calculated based on an average reading speed of 200 words per minute</li>
        </ul>
      </div>
    </div>
  );
};

export default WordCounter; 