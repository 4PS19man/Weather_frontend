import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Import CSS for styling

const WeatherCryptoDashboard = () => {
  const [weather, setWeather] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [news, setNews] = useState([]);

  // Fetch Weather Data
  
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/weather")
      .then(response => setWeather(response.data))
      .catch(error => console.error("Weather API Error:", error));
  }, []);

  // Fetch Crypto Data
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_market_cap=true&include_24hr_change=true")
      .then(response => {
        const data = response.data;
        setCrypto([
          { name: "Bitcoin", price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change, marketCap: data.bitcoin.usd_market_cap },
          { name: "Ethereum", price: data.ethereum.usd, change: data.ethereum.usd_24h_change, marketCap: data.ethereum.usd_market_cap },
          { name: "Dogecoin", price: data.dogecoin.usd, change: data.dogecoin.usd_24h_change, marketCap: data.dogecoin.usd_market_cap },
        ]);
      })
      .catch(error => console.error("Crypto API Error:", error));
  }, []);

  // Fetch News Data
 

  useEffect(() => {
    // Fetch Crypto News
    axios.get("http://localhost:5000/crypto-news")
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
      });
  }, []);


  return (
    <div className="dashboard">
      <h1 className="title">🌍 Crypto & Weather Nexus</h1>

      {/* Weather Section */}
      <h2 className="section-title">☁️ Weather Updates</h2>
      <div className="weather-grid">
        {weather.map((city, index) => (
          <div key={index} className="info-card">
            <h3>{city.name}</h3>
            <p>🌡️ Temp: {city.main?.temp}°C</p>
            <p>💧 Humidity: {city.main?.humidity}%</p>
            <p>☁️ {city.weather?.[0]?.description}</p>
          </div>
        ))}
      </div>

      {/* Crypto Section */}
      <h2 className="section-title">💰 Cryptocurrency Prices</h2>
      <div className="crypto-grid">
        {crypto.map((coin, index) => (
          <div key={index} className="info-card">
            <h3>{coin.name}</h3>
            <p>💲 Price: ${coin.price.toFixed(2)}</p>
            <p>📉 24h Change: {coin.change.toFixed(2)}%</p>
            <p>🏦 Market Cap: ${coin.marketCap.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* News Section */}
      <h2 className="section-title news">📰 Crypto News</h2>
      <div className="news-grid">
        {news.length > 0 ? (
          news.map((article, index) => (
            <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-item">
              🔹 {article.title}
            </a>
          ))
        ) : (
          <p className="loading-text">Fetching latest crypto news...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherCryptoDashboard;
