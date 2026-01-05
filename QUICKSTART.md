# Quick Start Guide

## Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Checklist

✅ **No Configuration Required**
- No API keys needed
- No .env files
- Runs immediately after installation

✅ **Core Features**
- City-based weather search
- Auto-detect user location
- Current weather display
- 5-day weather forecast
- Weather table (25 cities with pagination)
- Temperature unit toggle (°C / °F)
- Dark mode toggle
- Skeleton loading UI
- Error handling
- Fully responsive

✅ **UI/UX Features**
- Smooth animations (fade-in, slide-up, scale, float)
- 3D card hover effects
- Gradient backgrounds
- Interactive elements
- Modern design
- Accessible (keyboard + screen reader)

## Project Structure

```
/app
  /api          - API routes (geocode, weather)
  /components   - React components
  /hooks        - Custom React hooks
  /types        - TypeScript types
  /utils        - Utility functions
  layout.tsx    - Root layout
  page.tsx      - Main page
  globals.css   - Global styles
```

## API

Uses **Open-Meteo** APIs (100% free, no key):
- Geocoding API: City → Coordinates
- Weather Forecast API: Coordinates → Weather Data

## Deployment

Ready for Vercel deployment:
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

No configuration needed!

