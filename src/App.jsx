import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("Bekasi");
  const [data, setData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherImage = (weather) => {
    if (!weather) return "/images/default.png";
    const main = weather.toLowerCase();
    if (main.includes("cloud")) return "/images/cloudy.png";
    if (main.includes("rain")) return "/images/rainy.png";
    if (main.includes("clear")) return "/images/sunny.png";
    if (main.includes("snow")) return "/images/snow.png";
    if (main.includes("storm")) return "/images/storm.png";
    return "/images/default.png";
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Masukkan kotamu..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {data ? (
        <div className="weather-card">
          <h2>
            {data.name}, {data?.sys?.country}
          </h2>
          <img
            src={getWeatherImage(data.weather[0].main)}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="description">{data.weather[0].description}</p>
          <p className="temp">{data.main.temp}°C</p>
          <p>Feels like {data.main.feels_like}°C</p>
          <p>Humidity {data.main.humidity}%</p>
          <p>Wind Speed {data.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default App;
