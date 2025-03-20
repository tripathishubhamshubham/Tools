'use client';

import { useState } from 'react';

const PercentageCalculator = () => {
  const [value, setValue] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [mode, setMode] = useState<'find-percentage' | 'find-value'>('find-percentage');

  const calculatePercentage = () => {
    if (!value || !percentage) return;

    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);

    if (mode === 'find-percentage') {
      // Calculate percentage of a number
      const result = (numValue * numPercentage) / 100;
      setResult(result.toFixed(2));
    } else {
      // Find what percentage X is of Y
      const result = (numValue / numPercentage) * 100;
      setResult(result.toFixed(2));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePercentage();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setMode('find-percentage')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              mode === 'find-percentage'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Find Percentage of Number
          </button>
          <button
            onClick={() => setMode('find-value')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              mode === 'find-value'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Find Percentage
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'find-percentage' ? 'Number' : 'Value'}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={mode === 'find-percentage' ? 'Enter number' : 'Enter value'}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'find-percentage' ? 'Percentage' : 'Total Value'}
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder={mode === 'find-percentage' ? 'Enter percentage' : 'Enter total value'}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Result</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {mode === 'find-percentage' ? (
                <>
                  {percentage}% of {value} is <span className="font-bold text-blue-500">{result}</span>
                </>
              ) : (
                <>
                  {value} is <span className="font-bold text-blue-500">{result}%</span> of {percentage}
                </>
              )}
            </p>
          </div>
        )}

        {/* Examples Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Examples</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Find 15% of 200 = 30</p>
            <p>• Find what percentage 25 is of 100 = 25%</p>
            <p>• Calculate 75% of 80 = 60</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator; 