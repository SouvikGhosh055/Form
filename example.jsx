import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; 

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '783ca7475c9410c2742102b868fa87f1'; 

  useEffect(() => {
    if (city) {
      setLoading(true);
      setError(null);
      setWeatherData(null);

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
          if (!response.ok) {
            throw new Error('City not found!');
          }
          return response.json();
        })
        .then(data => {
          setWeatherData(data);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="weather-app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
      />

            <button  onClick={WeatherData} className='ml-1 bg-sky-500 cursor-pointer rounded-2xl px-2 '>Search</button>


      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-results">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
