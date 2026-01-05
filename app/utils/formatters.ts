import { TemperatureUnit } from '@/app/types/weather';

export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit
): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit
): string {
  const temp = convertTemperature(celsius, unit);
  return `${temp}°${unit === 'celsius' ? 'C' : 'F'}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(timeString: string): string {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function getWeatherIcon(weatherCode: number): string {
  // WMO Weather interpretation codes (WW)
  // Simplified mapping
  if (weatherCode === 0) return '☀️'; // Clear sky
  if (weatherCode <= 3) return '🌤️'; // Mainly clear, partly cloudy
  if (weatherCode <= 48) return '☁️'; // Fog and depositing rime fog
  if (weatherCode <= 55) return '🌧️'; // Drizzle
  if (weatherCode <= 57) return '🌧️'; // Freezing Drizzle
  if (weatherCode <= 66) return '🌦️'; // Rain
  if (weatherCode <= 67) return '🌨️'; // Freezing Rain
  if (weatherCode <= 77) return '❄️'; // Snow fall
  if (weatherCode <= 82) return '🌧️'; // Rain showers
  if (weatherCode <= 86) return '🌨️'; // Snow showers
  if (weatherCode <= 99) return '⛈️'; // Thunderstorm
  return '🌤️';
}

export function getWeatherDescription(weatherCode: number): string {
  if (weatherCode === 0) return 'Clear sky';
  if (weatherCode <= 3) return 'Partly cloudy';
  if (weatherCode <= 48) return 'Foggy';
  if (weatherCode <= 55) return 'Drizzle';
  if (weatherCode <= 57) return 'Freezing drizzle';
  if (weatherCode <= 66) return 'Rain';
  if (weatherCode <= 67) return 'Freezing rain';
  if (weatherCode <= 77) return 'Snow';
  if (weatherCode <= 82) return 'Rain showers';
  if (weatherCode <= 86) return 'Snow showers';
  if (weatherCode <= 99) return 'Thunderstorm';
  return 'Unknown';
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index] || 'N';
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

