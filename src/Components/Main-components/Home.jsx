import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import sun from "./img/clear.jpg";
import rain from "./img/rain.png";
import cloud from "./img/cloudy.png";
import haze from "./img/haze.png";
import thuunder from "./img/thunderstrom.png";

const Home = ({home, setHome, auth, setAuth}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const apiKey = "3e6184d3b5a7e11052c1124d03ce6236";
              const { latitude, longitude } = position.coords;

              const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

              const response = await axios.get(apiUrl);
              setWeatherData(response.data);
              setLoading(false);
            },
            (error) => {
              console.error("Error getting location:", error.message);
              setError("Error getting location");
              setLoading(false);
            }
          );
        } else {
          setError("Geolocation is not supported in this browser");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setError("Error fetching weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("user-name");
    setAuth({
      ...auth,
      authenticated: false,
    });
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const weatherIcons = {
    Clear: sun,
    Clouds: cloud,
    Haze: haze,
    Thunderstorm: thuunder,
    Rain: rain,
  };

  return (
    <div>
      <nav>
        <div className="logo-cont">
          <img src={logo} alt="logo" className="logo"></img>
          <span>Alpaago</span>
        </div>
        <div className="action-btns">
          <span onClick={()=>setHome(false)}>User Dashboard</span>
          <button className="logout-btn" onClick={()=>handleLogout()}>Logout</button>
        </div>
      </nav>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="weather-container">
          <div className="left-container">
            <div className="weather-details">
              <div className="city-name">
                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>{" "}
                {weatherData.name}
              </div>
              <div className="temperature">
                <p>
                  {weatherData.main.temp}
                  <span>°C</span>
                </p>
              </div>
              <div className="weather-description">
                <img
                  src={
                    weatherIcons[weatherData.weather[0].description] ||
                    weatherIcons.Clouds
                  }
                  alt="-"
                ></img>
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="Humidity">
              <p>Humidity</p> <span>{weatherData.main.humidity}% </span>
            </div>
            <div className="Wind-Speed">
              <p>Wind Speed</p> <span>{weatherData.wind.speed} m/s </span>
            </div>
            <div className="Pressure">
              <p>Pressure</p> <span>{weatherData.main.pressure} hPa </span>
            </div>
            <div className="Sunrise">
              <p>Sunrise</p>{" "}
              <span>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}{" "}
              </span>
            </div>
            <div className="Sunset">
              <p>Sunset</p>{" "}
              <span>
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}{" "}
              </span>
            </div>
            <div className="data Visibility">
              <p>Visibility</p>
              <span>{weatherData.visibility} meters</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
