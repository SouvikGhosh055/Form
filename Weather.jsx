import './weather.css'
import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "783ca7475c9410c2742102b868fa87f1";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-screen flex items-center justify-center  ">
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Weather App 🌤️
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Search
          </button>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}

        {/* Weather Info */}
        {weather && (
          <div className="text-center mt-6">
            <h2 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="mt-2">Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

