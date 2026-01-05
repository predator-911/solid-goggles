'use client';

import { useState, useEffect } from 'react';
import { TemperatureUnit } from './types/weather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { WeatherTable } from './components/WeatherTable';
import { DarkModeToggle } from './components/DarkModeToggle';
import { UnitToggle } from './components/UnitToggle';
import { WeatherCardSkeleton, ForecastCardSkeleton } from './components/Skeleton';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<{
    name: string;
    country: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geolocation = useGeolocation();
  const weather = useWeather(
    selectedCity?.lat || null,
    selectedCity?.lon || null,
    selectedCity?.name || '',
    selectedCity?.country || ''
  );

  // Initialize dark mode from localStorage
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Auto-detect location on mount
  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude && !selectedCity) {
      handleLocationSearch(geolocation.latitude, geolocation.longitude);
    }
  }, [geolocation.latitude, geolocation.longitude]);

  const handleLocationSearch = async (lat: number, lon: number) => {
    try {
      // Open-Meteo doesn't support reverse geocoding, so we'll use coordinates directly
      // Try to find a nearby city by searching with approximate coordinates
      // This is a workaround - we'll show "Current Location" as the name
      setSelectedCity({
        name: 'Current Location',
        country: '',
        lat: lat,
        lon: lon,
      });
      setError(null);
    } catch (err) {
      console.error('Location search error:', err);
      setError('Failed to use your location');
    }
  };

  const handleCitySearch = async (searchCity: string) => {
    if (!searchCity.trim()) return;

    setSearchLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/geocode?city=${encodeURIComponent(searchCity)}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to find city');
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error('City not found. Please try a different city name.');
      }

      const location = data.results[0];
      setSelectedCity({
        name: location.name,
        country: location.country,
        lat: location.latitude,
        lon: location.longitude,
      });
      setCity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSelectedCity(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (geolocation.latitude && geolocation.longitude) {
      handleLocationSearch(geolocation.latitude, geolocation.longitude);
    } else if (geolocation.error) {
      setError(geolocation.error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-down">
                Weather Forecast
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time weather data for any city worldwide
              </p>
            </div>
            <div className="flex items-center gap-4">
              <UnitToggle unit={unit} onToggle={setUnit} />
              <DarkModeToggle />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 animate-slide-up">
            <SearchBar onSearch={handleCitySearch} loading={searchLoading} />
          </div>

          {/* Location Button */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <button
              onClick={handleUseLocation}
              disabled={geolocation.loading || !geolocation.latitude}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {geolocation.loading
                ? 'Detecting location...'
                : geolocation.latitude
                ? 'Use My Location'
                : 'Enable Location Access'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 animate-slide-down">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        {weather.loading && !weather.data && (
          <div className="space-y-8 animate-fade-in">
            <WeatherCardSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <ForecastCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {weather.error && !weather.loading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <p className="text-red-600 dark:text-red-400 text-lg">
                {weather.error}
              </p>
            </div>
          </div>
        )}

        {weather.data && !weather.loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Current Weather */}
            <WeatherCard weather={weather.data} unit={unit} />

            {/* 5-Day Forecast */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {weather.data.forecast.map((forecast, index) => (
                  <ForecastCard
                    key={forecast.date}
                    forecast={forecast}
                    unit={unit}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Weather Table Section */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Cities Weather
          </h2>
          <WeatherTable unit={unit} />
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 text-center text-gray-600 dark:text-gray-400 animate-fade-in">
          <p className="mb-2">
            Powered by{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open-Meteo
            </a>
          </p>
          <p className="text-sm">
            Free weather API - No API key required
          </p>
        </footer>
      </div>
    </main>
  );
}

