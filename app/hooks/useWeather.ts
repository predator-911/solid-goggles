'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '@/app/types/weather';

interface UseWeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(
  latitude: number | null,
  longitude: number | null,
  cityName: string,
  country: string
): UseWeatherState {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(
        `/api/weather?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(cityName)}&country=${encodeURIComponent(country)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather');
      }

      const data: WeatherData = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Unknown error occurred',
      });
    }
  }, [latitude, longitude, cityName, country]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return state;
}

