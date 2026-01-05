export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  generationtime_ms: number;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  precipitation: number;
}

export interface DailyForecast {
  date: string;
  temperature_max: number;
  temperature_min: number;
  weather_code: number;
  precipitation_sum: number;
  wind_speed_max: number;
}

export interface WeatherForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  current: CurrentWeather;
  forecast: DailyForecast[];
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherTableItem {
  id: string;
  city: string;
  country: string;
  temperature: number;
  weatherCode: number;
  humidity: number;
}

