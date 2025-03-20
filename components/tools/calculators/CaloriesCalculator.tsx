'use client';

import { useState } from 'react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

interface CalorieResult {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
}

const activityMultipliers = {
  sedentary: 1.2, // Little or no exercise
  light: 1.375, // Light exercise 1-3 days/week
  moderate: 1.55, // Moderate exercise 3-5 days/week
  active: 1.725, // Heavy exercise 6-7 days/week
  'very-active': 1.9 // Very heavy exercise, physical job, training 2x/day
};

const activityDescriptions = {
  sedentary: 'Little or no exercise, desk job',
  light: 'Light exercise 1-3 days/week',
  moderate: 'Moderate exercise 3-5 days/week',
  active: 'Heavy exercise 6-7 days/week',
  'very-active': 'Very heavy exercise, physical job, training 2x/day'
};

const CaloriesCalculator = () => {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<CalorieResult | null>(null);

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert inputs to numbers
    const numAge = parseFloat(age);
    const numWeight = parseFloat(weight);
    const numHeight = parseFloat(height);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * numWeight + 6.25 * numHeight - 5 * numAge + 5;
    } else {
      bmr = 10 * numWeight + 6.25 * numHeight - 5 * numAge - 161;
    }

    // Calculate maintenance calories
    const maintenance = bmr * activityMultipliers[activityLevel];

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(maintenance - 500), // 500 calorie deficit for weight loss
      weightGain: Math.round(maintenance + 500) // 500 calorie surplus for weight gain
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <form onSubmit={calculateCalories} className="space-y-4">
          {/* Gender Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  gender === 'male'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  gender === 'female'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Age Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              min="15"
              max="120"
            />
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              min="30"
              max="300"
              step="0.1"
            />
          </div>

          {/* Height Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              min="100"
              max="250"
            />
          </div>

          {/* Activity Level Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {Object.entries(activityDescriptions).map(([level, description]) => (
                <option key={level} value={level}>
                  {description}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Calculate Calories
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Daily Calorie Needs</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Basal Metabolic Rate (BMR)</p>
                  <p className="text-2xl font-bold text-blue-500">{result.bmr} calories/day</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Calories your body burns at complete rest</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance Calories</p>
                  <p className="text-2xl font-bold text-blue-500">{result.maintenance} calories/day</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Calories needed to maintain current weight</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weight Loss</p>
                    <p className="text-2xl font-bold text-blue-500">{result.weightLoss} calories/day</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">For losing ~0.5kg/week</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weight Gain</p>
                    <p className="text-2xl font-bold text-blue-500">{result.weightGain} calories/day</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">For gaining ~0.5kg/week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Calorie Calculator</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>This calculator uses the Mifflin-St Jeor Equation to estimate your daily calorie needs:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>BMR (Basal Metabolic Rate)</li>
              <li>Maintenance calories based on activity level</li>
              <li>Calorie targets for weight loss and gain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalculator; 