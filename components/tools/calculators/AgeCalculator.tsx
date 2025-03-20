'use client';

import { useState } from 'react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  nextBirthday: string;
  daysUntilNextBirthday: number;
}

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();

    const birth = new Date(birthDate);
    const today = new Date();

    // Set both dates to UTC to avoid timezone issues
    birth.setUTCHours(0, 0, 0, 0);
    today.setUTCHours(0, 0, 0, 0);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust months and years if days are negative
    if (days < 0) {
      months--;
      // Get days in the previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
      days = Math.floor((today.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24));
    }

    // Adjust years if months are negative
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      nextBirthday: nextBirthday.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      daysUntilNextBirthday
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <form onSubmit={calculateAge} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Calculate Age
          </button>
        </form>

        {result && (
          <div className="mt-6 space-y-6">
            {/* Age Result */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Age</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-3xl font-bold text-blue-500">{result.years}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Years</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-3xl font-bold text-blue-500">{result.months}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Months</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-3xl font-bold text-blue-500">{result.days}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Days</p>
                </div>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Next Birthday</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{result.nextBirthday}</p>
              <p className="text-gray-600 dark:text-gray-300">
                Days until next birthday: <span className="font-bold text-blue-500">{result.daysUntilNextBirthday}</span>
              </p>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Age Calculator</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>This calculator helps you determine:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Your exact age in years, months, and days</li>
              <li>The date of your next birthday</li>
              <li>Number of days until your next birthday</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator; 