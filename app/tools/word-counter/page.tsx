import type { Metadata } from 'next';
import WordCounter from '@/components/tools/WordCounter';

export const metadata: Metadata = {
  title: 'Word Counter - Free Online Word Count Tool',
  description: 'Count words, characters, sentences, and paragraphs in your text. Get instant statistics and reading time estimates with our free online word counter tool.',
  keywords: 'word counter, character count, sentence counter, paragraph counter, reading time calculator, text analysis',
};

export default function WordCounterPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Tool Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Word Counter
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          A free online tool to count words, characters, sentences, and paragraphs in your text.
          Get instant statistics and estimated reading time.
        </p>
      </div>

      {/* Main Tool */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <WordCounter />
      </div>

      {/* Tool Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          About Word Counter
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Our Word Counter tool provides instant text analysis to help you understand your writing better.
            Whether you're writing an essay, blog post, or any other content, this tool gives you valuable
            insights about your text.
          </p>
          
          <h3>Features:</h3>
          <ul>
            <li>Accurate word count</li>
            <li>Character count (with and without spaces)</li>
            <li>Sentence and paragraph counting</li>
            <li>Reading time estimation</li>
            <li>Text case conversion (uppercase/lowercase)</li>
          </ul>

          <h3>How to Use:</h3>
          <ol>
            <li>Type or paste your text into the input area</li>
            <li>Get instant statistics about your text</li>
            <li>Use the additional tools to transform your text as needed</li>
            <li>Clear the input to start fresh</li>
          </ol>

          <h3>Use Cases:</h3>
          <ul>
            <li>Students writing essays with word count requirements</li>
            <li>Content writers optimizing article length</li>
            <li>Social media posts character limit checking</li>
            <li>Estimating reading time for blog posts</li>
          </ul>
        </div>
      </div>

      {/* Ad Section */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center mb-8">
        <span className="text-gray-600 dark:text-gray-300">Advertisement Space</span>
      </div>
    </div>
  );
} 