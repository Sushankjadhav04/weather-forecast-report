import React, { useEffect, useState } from "react";
import { API_KEY, BASE_API, IMG_API } from './../constants/index';
import { locationSearch } from './../utils/validation';

function Weather() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [weatherDump, setWeatherDump] = useState(null);
  const [lastSearched, setLastSearchedCountry] = useState([]);
  const [city, setCity] =  useState("");
  const [errorMsg, setError] = useState("");

  // function get weather data
  const getWeatherData = (query) => {
    let url = `${BASE_API}/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.cod === "404" || locationSearch(query)) {
          setError("Please Enter City Name")
        }
        setData(res.main);
        setWeatherDump(res)
        setCity(query);
        if (query && lastSearched.indexOf(query) === -1) {
           setLastSearchedCountry([...lastSearched, query]);
        }
      })
      .catch(() => {
        setData(null);
        setWeatherDump(null)
      });
  };

  // Storing history of searched countries
  useEffect(() => {
    if (lastSearched) {
      localStorage.setItem('lastSearchedCountry', lastSearched)
    }
  });

  return (
    <>
      <h1>Simple Weather App</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Enter City Name"
        value={inputValue}
        onInput={(e) => setInputValue(e.target.value)}
      />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => getWeatherData(inputValue)}
      >
        Search
      </button>
      <div>
        {
        data ? (
        <div className="weather-info card">
          <h2>
            {city}
            <sup>{weatherDump.sys.country}</sup>
          </h2>
          <p className="temperature">{Math.round(data.temp)} °C</p>
          <img className="icon-weather" width="40" src={`${IMG_API}/img/wn/${weatherDump.weather[0].icon}.png`} alt={weatherDump.weather[0].desccription} />
          <p className="temperature">{weatherDump.weather[0].description}</p>
        </div>
        ) : (
          <p className="error-message">{errorMsg}</p>
        )}
      </div>
      <div className="last-searched card weather-info">
        <h3>Searched places</h3>
        {
          lastSearched.length ? (
            lastSearched.map((ele) => {
              return (
                <p className="country-list">{ele}</p>
              );
            })
          ) : null
        }
      </div>
    </> 
  );
}

export default Weather;