// app/utils/formatters.ts

/**
 * Type-safe debounce utility (Vercel + strict TS safe)
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Format temperature with unit
 */
export function formatTemperature(
  temp: number,
  unit: 'C' | 'F' = 'C'
): string {
  return `${Math.round(temp)}°${unit}`;
}

/**
 * Convert m/s → km/h
 */
export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed * 3.6)} km/h`;
}

/**
 * Format date string (YYYY-MM-DD → Mon, 12 Aug)
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Return emoji icon based on weather code / description
 * (Open-Meteo compatible)
 */
export function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if (code === 3) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return '🌧️';
  if ([71, 73, 75].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌡️';
}

/**
 * Human-readable weather description
 */
export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Snow fall',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm',
  };

  return descriptions[code] ?? 'Unknown weather';
}
