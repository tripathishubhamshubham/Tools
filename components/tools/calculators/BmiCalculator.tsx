'use client';

import { useState } from 'react';

type Unit = 'metric' | 'imperial';

interface BmiRange {
  category: string;
  range: string;
  description: string;
}

const bmiRanges: BmiRange[] = [
  {
    category: 'Underweight',
    range: 'Less than 18.5',
    description: 'You may need to gain some weight. Consult with a healthcare provider.'
  },
  {
    category: 'Normal Weight',
    range: '18.5 to 24.9',
    description: 'You are at a healthy weight. Maintain your current lifestyle.'
  },
  {
    category: 'Overweight',
    range: '25 to 29.9',
    description: 'You may need to lose some weight. Consider diet and exercise changes.'
  },
  {
    category: 'Obese',
    range: '30 or greater',
    description: 'You should take action to reduce your weight. Consult with a healthcare provider.'
  }
];

const BmiCalculator = () => {
  const [unit, setUnit] = useState<Unit>('metric');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    let bmi: number;

    if (unit === 'metric') {
      const heightM = parseFloat(height) / 100; // Convert cm to m
      const weightKg = parseFloat(weight);
      bmi = weightKg / (heightM * heightM);
    } else {
      const heightTotalInches = (parseFloat(height) * 12) + parseFloat(heightInches || '0');
      const weightLbs = parseFloat(weight);
      bmi = (weightLbs * 703) / (heightTotalInches * heightTotalInches);
    }

    setBmiResult(parseFloat(bmi.toFixed(1)));
  };

  const getBmiCategory = (bmi: number): BmiRange => {
    if (bmi < 18.5) return bmiRanges[0];
    if (bmi < 25) return bmiRanges[1];
    if (bmi < 30) return bmiRanges[2];
    return bmiRanges[3];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        {/* Unit Toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              unit === 'metric'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Metric (cm/kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              unit === 'imperial'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Imperial (ft/lbs)
          </button>
        </div>

        {/* Calculator Form */}
        <form onSubmit={calculateBMI} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Height {unit === 'metric' ? '(cm)' : '(ft)'}
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter feet'}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                step="any"
              />
              {unit === 'imperial' && (
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  placeholder="Inches"
                  className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  step="any"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              step="any"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Calculate BMI
          </button>
        </form>

        {/* Results */}
        {bmiResult !== null && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your BMI Result</h3>
            <p className="text-3xl font-bold text-blue-500 mb-4">{bmiResult}</p>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {getBmiCategory(bmiResult).category}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {getBmiCategory(bmiResult).description}
              </p>
            </div>
          </div>
        )}

        {/* BMI Categories */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">BMI Categories</h3>
          <div className="space-y-4">
            {bmiRanges.map((range) => (
              <div
                key={range.category}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {range.category} (BMI {range.range})
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{range.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator; 