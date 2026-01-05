import { NextRequest, NextResponse } from 'next/server';
import { WeatherForecastResponse, WeatherData, DailyForecast } from '@/app/types/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const name = searchParams.get('name') || 'Unknown';
  const country = searchParams.get('country') || '';

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=5`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data: WeatherForecastResponse = await response.json();

    const forecast: DailyForecast[] = data.daily.time.slice(0, 5).map((date, index) => ({
      date,
      temperature_max: data.daily.temperature_2m_max[index],
      temperature_min: data.daily.temperature_2m_min[index],
      weather_code: data.daily.weather_code[index],
      precipitation_sum: data.daily.precipitation_sum[index],
      wind_speed_max: data.daily.wind_speed_10m_max[index],
    }));

    const weatherData: WeatherData = {
      location: {
        name,
        country,
        latitude: data.latitude,
        longitude: data.longitude,
      },
      current: data.current_weather,
      forecast,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

