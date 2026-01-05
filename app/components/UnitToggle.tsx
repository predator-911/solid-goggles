'use client';

import { TemperatureUnit } from '@/app/types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => onToggle('celsius')}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          unit === 'celsius'
            ? 'bg-blue-500 text-white shadow-md scale-105'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button
        onClick={() => onToggle('fahrenheit')}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          unit === 'fahrenheit'
            ? 'bg-blue-500 text-white shadow-md scale-105'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
}

