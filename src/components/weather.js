import React, { useState } from "react";
import { API_KEY } from './../constants/index';

function Weather() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");

  // function get weather data
  const getWeatherData = (query) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.main);
        setCity(query);
      })
      .catch(() => {
        setData(null);
      });
  };

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
        Submit
      </button>
      <div>
        {
        data ? (
        <div className="weather-info card">
          <p className="weather-p-city">Weather Details of City : {city}</p>
          
          <div className="weather-information-container">
          <p >Current Temperature : {data.temp} °C</p>
          <p >Temperature Range : {data.temp_min} °C  to  {data.temp_max} °C</p>
          <p >Humidity  : {data.humidity}</p>
          </div>
        </div>
        ) : (
          null
        )}
      </div>
    </>
  );
}

export default Weather;