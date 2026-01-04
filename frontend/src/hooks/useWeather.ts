import { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = () => {
      // Simulate weather API call with realistic Indian locations
      const locations = [
        { name: 'Delhi', temp: 28, condition: 'Sunny', icon: '☀️' },
        { name: 'Mumbai', temp: 32, condition: 'Humid', icon: '🌤️' },
        { name: 'Bangalore', temp: 25, condition: 'Pleasant', icon: '⛅' },
        { name: 'Chennai', temp: 34, condition: 'Hot', icon: '🌞' },
        { name: 'Kolkata', temp: 30, condition: 'Cloudy', icon: '☁️' },
        { name: 'Hyderabad', temp: 29, condition: 'Clear', icon: '🌤️' },
        { name: 'Pune', temp: 26, condition: 'Mild', icon: '⛅' },
        { name: 'Ahmedabad', temp: 35, condition: 'Very Hot', icon: '🌞' },
        { name: 'Jaipur', temp: 31, condition: 'Dry', icon: '☀️' },
        { name: 'Lucknow', temp: 27, condition: 'Pleasant', icon: '🌤️' }
      ];

      setTimeout(() => {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        setWeather({
          location: randomLocation.name,
          temperature: randomLocation.temp,
          condition: randomLocation.condition,
          icon: randomLocation.icon
        });
        setLoading(false);
      }, 2000);
    };

    fetchWeather();
  }, []);

  return { weather, loading };
};