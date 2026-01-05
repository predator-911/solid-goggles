'use client';

import { WeatherData, TemperatureUnit } from '@/app/types/weather';
import {
  formatTemperature,
  getWeatherIcon,
  getWeatherDescription,
  formatTime,
  getWindDirection,
} from '@/app/utils/formatters';

interface WeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export function WeatherCard({ weather, unit }: WeatherCardProps) {
  const { location, current } = weather;

  return (
    <div className="relative group">
      {/* 3D Card Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 transform group-hover:scale-110"></div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl border border-gray-100 dark:border-gray-700">
        {/* Animated Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 dark:from-blue-900 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
        
        <div className="relative z-10">
          {/* Location Header */}
          <div className="mb-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {location.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {location.country}
            </p>
          </div>

          {/* Main Weather Display */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div className="flex-1">
              <div className="text-8xl mb-4 animate-float">
                {getWeatherIcon(current.weather_code)}
              </div>
              <p className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {formatTemperature(current.temperature_2m, unit)}
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {getWeatherDescription(current.weather_code)}
              </p>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 transform transition-all duration-200 hover:scale-105">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Humidity</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {current.relative_humidity_2m}%
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 transform transition-all duration-200 hover:scale-105">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wind Speed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {Math.round(current.wind_speed_10m)} km/h
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 transform transition-all duration-200 hover:scale-105">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wind Direction</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getWindDirection(current.wind_direction_10m)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 transform transition-all duration-200 hover:scale-105">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precipitation</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {current.precipitation} mm
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Last updated: {formatTime(current.time)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

