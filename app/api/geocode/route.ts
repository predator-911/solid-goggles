import { NextRequest, NextResponse } from 'next/server';
import { GeocodingResponse } from '@/app/types/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  if (!city || city.trim() === '') {
    return NextResponse.json(
      { error: 'City name is required' },
      { status: 400 }
    );
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Geocoding API request failed');
    }

    const data: GeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
}

