# Weather Forecast Web Application

A production-grade, beautiful weather forecasting web application built with Next.js, React, TypeScript, and Tailwind CSS. Features incredible UI/UX with animations, 3D effects, and a modern design.

![Weather Forecast App](https://via.placeholder.com/800x400?text=Weather+Forecast+App)

## ✨ Features

### Core Features
- 🌍 **City-based Weather Search** - Search for weather in any city worldwide
- 📍 **Auto-detect User Location** - Automatically detect and display weather for your current location
- 🌡️ **Current Weather Display** - Real-time current weather conditions
- 📅 **5-Day Weather Forecast** - Detailed 5-day weather forecast
- 📊 **Weather Table** - View weather for 25 popular cities with pagination
- 🌡️ **Temperature Unit Toggle** - Switch between Celsius (°C) and Fahrenheit (°F)
- 🌙 **Dark Mode Toggle** - Beautiful light and dark themes
- ⏳ **Skeleton Loading UI** - Smooth loading states
- ⚠️ **Error Handling** - Graceful error handling for invalid cities and network errors
- 📱 **Fully Responsive** - Mobile-first design that works on all devices

### UI/UX Features
- 🎨 **Modern Design** - Clean, beautiful, and intuitive interface
- ✨ **Smooth Animations** - Fade-in, slide-up, scale, and float animations
- 🎭 **3D Effects** - Card hover effects with 3D transforms
- 🌈 **Gradient Backgrounds** - Beautiful gradient overlays and backgrounds
- 💫 **Interactive Elements** - Hover effects, transitions, and micro-interactions
- 🎯 **Accessible** - Keyboard navigation and screen reader friendly
- 🚀 **Performance Optimized** - Fast loading with optimized API calls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd FINALINTELLI1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! The app runs immediately without any configuration or API keys.

## 📁 Project Structure

```
/app
  /api
    /geocode/route.ts      # Geocoding API route (city → coordinates)
    /weather/route.ts       # Weather API route (coordinates → weather)
  /components
    SearchBar.tsx          # City search input with debouncing
    WeatherCard.tsx        # Current weather display card
    ForecastCard.tsx       # Daily forecast card
    WeatherTable.tsx       # Table of 25 cities with pagination
    Pagination.tsx         # Pagination component
    Skeleton.tsx           # Loading skeleton components
    DarkModeToggle.tsx     # Dark/light mode toggle
    UnitToggle.tsx         # Temperature unit toggle
  /hooks
    useGeolocation.ts      # Browser geolocation hook
    useWeather.ts          # Weather data fetching hook
  /types
    weather.ts             # TypeScript interfaces and types
  /utils
    formatters.ts          # Utility functions (temp conversion, formatting)
  layout.tsx               # Root layout with metadata
  page.tsx                 # Main page component
  globals.css              # Global styles and animations
```

## 🔌 API Explanation

### Open-Meteo APIs (100% Free, No Key Required)

The application uses two free APIs from Open-Meteo:

#### 1. Geocoding API
- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Purpose**: Convert city names to latitude/longitude coordinates
- **Usage**: `/api/geocode?city={cityName}`
- **Response**: Array of matching locations with coordinates

#### 2. Weather Forecast API
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Purpose**: Get current weather and 5-day forecast
- **Usage**: `/api/weather?lat={lat}&lon={lon}&name={name}&country={country}`
- **Response**: Current weather conditions and daily forecast data

### API Routes

The app includes Next.js API routes that act as a proxy layer:

- **`/api/geocode`** - Handles city name to coordinates conversion
- **`/api/weather`** - Fetches weather data for given coordinates

Both routes include:
- Error handling
- Response caching (revalidation)
- Type-safe responses

## 🎨 Design Features

### Animations
- **Fade-in**: Smooth opacity transitions
- **Slide-up/down**: Vertical slide animations
- **Scale**: Transform scale effects
- **Float**: Continuous floating animation for weather icons
- **Pulse**: Slow pulse effects for backgrounds
- **Glow**: Glowing shadow effects

### 3D Effects
- Card hover transforms with perspective
- Gradient overlays on hover
- Shadow depth variations
- Transform scale effects

### Color Themes
- **Light Mode**: Clean whites and grays with blue/purple accents
- **Dark Mode**: Dark grays with vibrant gradient accents
- **Gradients**: Blue → Purple → Pink gradient combinations

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with functional components
- **TypeScript** - Type-safe development (strict mode, no `any`)
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 & CSS3** - Modern web standards

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column layout)
- **Desktop**: > 1024px (5-column forecast grid)

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

The app is ready for Vercel deployment with zero configuration.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### TypeScript

- Strict mode enabled
- No `any` types allowed
- Full type coverage
- Interface definitions for all data structures

## 🎯 Key Features Explained

### Debounced Search
The search input uses debouncing to reduce API calls while typing.

### Auto Location Detection
Uses browser Geolocation API to automatically detect and display weather for user's location.

### Pagination
Weather table shows 5 cities per page with smooth pagination controls.

### Error Handling
- Invalid city names
- Network failures
- API errors
- Geolocation errors

All errors are displayed with user-friendly messages.

## 📸 Screenshots

<!-- Add screenshots here -->
- **Home Page**: Main weather display with search
- **Forecast View**: 5-day forecast cards
- **Weather Table**: Popular cities table with pagination
- **Dark Mode**: Dark theme view
- **Mobile View**: Responsive mobile layout

## 🔮 Future Enhancements

Potential features for future versions:
- Weather maps
- Hourly forecast
- Weather alerts
- Historical data
- Multiple location favorites
- Weather widgets
- Export data

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

- **Weather Data**: [Open-Meteo](https://open-meteo.com) - Free weather API
- **Icons**: Unicode weather emojis
- **Design**: Custom design with Tailwind CSS

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

