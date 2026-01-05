'use client';

import { DailyForecast, TemperatureUnit } from '@/app/types/weather';
import {
  formatDate,
  formatTemperature,
  getWeatherIcon,
  getWeatherDescription,
} from '@/app/utils/formatters';

interface ForecastCardProps {
  forecast: DailyForecast;
  unit: TemperatureUnit;
  index: number;
}

export function ForecastCard({ forecast, unit, index }: ForecastCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-gray-700 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {formatDate(forecast.date)}
        </h3>
        
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
            {getWeatherIcon(forecast.weather_code)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          {getWeatherDescription(forecast.weather_code)}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">High</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTemperature(forecast.temperature_max, unit)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Low</span>
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {formatTemperature(forecast.temperature_min, unit)}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-gray-500 dark:text-gray-500">Rain</p>
            <p className="text-gray-900 dark:text-white font-semibold">
              {forecast.precipitation_sum.toFixed(1)} mm
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-500">Wind</p>
            <p className="text-gray-900 dark:text-white font-semibold">
              {Math.round(forecast.wind_speed_max)} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

