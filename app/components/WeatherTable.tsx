'use client';

import { useState, useEffect } from 'react';
import { WeatherTableItem, TemperatureUnit } from '@/app/types/weather';
import { formatTemperature, getWeatherIcon } from '@/app/utils/formatters';
import { Pagination } from './Pagination';
import { ForecastCardSkeleton } from './Skeleton';

interface WeatherTableProps {
  unit: TemperatureUnit;
}

const POPULAR_CITIES = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Sydney',
  'Berlin',
  'Moscow',
  'Dubai',
  'Singapore',
  'Barcelona',
  'Rome',
  'Amsterdam',
  'Vienna',
  'Prague',
  'Stockholm',
  'Copenhagen',
  'Dublin',
  'Edinburgh',
  'Madrid',
  'Lisbon',
  'Athens',
  'Istanbul',
  'Cairo',
  'Mumbai',
  'Bangkok',
];

export function WeatherTable({ unit }: WeatherTableProps) {
  const [weatherData, setWeatherData] = useState<WeatherTableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllCities = async () => {
      setLoading(true);
      try {
        const promises = POPULAR_CITIES.map(async (city) => {
          try {
            // Get coordinates
            const geoResponse = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`);
            if (!geoResponse.ok) throw new Error('Geocoding failed');
            
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
              throw new Error('City not found');
            }
            
            const location = geoData.results[0];
            
            // Get weather
            const weatherResponse = await fetch(
              `/api/weather?lat=${location.latitude}&lon=${location.longitude}&name=${encodeURIComponent(location.name)}&country=${encodeURIComponent(location.country)}`
            );
            if (!weatherResponse.ok) throw new Error('Weather fetch failed');
            
            const weatherData = await weatherResponse.json();
            
            return {
              id: `${location.name}-${location.country}`,
              city: location.name,
              country: location.country,
              temperature: weatherData.current.temperature_2m,
              weatherCode: weatherData.current.weather_code,
              humidity: weatherData.current.relative_humidity_2m,
            };
          } catch (error) {
            console.error(`Error fetching data for ${city}:`, error);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validResults = results.filter(
          (item): item is WeatherTableItem => item !== null
        );
        setWeatherData(validResults);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCities();
  }, []);

  const totalPages = Math.ceil(weatherData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = weatherData.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <ForecastCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Weather</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Temperature</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Humidity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.city}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.country}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-3xl">{getWeatherIcon(item.weatherCode)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatTemperature(item.temperature, unit)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.humidity}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

