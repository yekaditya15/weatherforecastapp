import React, { useState, useEffect } from "react"; // Import necessary React components and hooks
import axios from "axios"; // Import Axios for making HTTP requests
import apiKeys from "./apiKeys"; // Import API keys and base URL
import ReactAnimatedWeather from "react-animated-weather"; // Import a weather icon component

function Forcast(props) { // Define a React functional component named Forcast and accept props as an argument
  const [query, setQuery] = useState(""); // State: query stores user's input for the city
  const [error, setError] = useState(""); // State: error stores error messages
  const [weather, setWeather] = useState({}); // State: weather stores weather data

  const search = (city) => { // Define a function to search for weather data
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      ) // Make an API request to fetch weather data
      .then((response) => {
        setWeather(response.data); // Set the weather state with the API response data
        setQuery(""); // Clear the query state
      })
      .catch(function (error) {
        console.log(error); // Log any errors
        setWeather(""); // Clear the weather state
        setQuery(""); // Clear the query state
        setError({ message: "Not Found", query: query }); // Set an error message
      });
  };



  const defaults = { // Define default values for the weather icon
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi"); // Use the useEffect hook to trigger the initial weather search for Delhi
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon} // Display the weather icon based on props
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)} // Update the query state with user input
            value={query} // Bind the input value to the query state
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png" alt=" "
              onClick={search} // Trigger the search function on click
            />
          </div>
        </div>
        <ul>
          {typeof weather.main !== "undefined" ? ( // Conditionally render weather information or an error message
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country} 
                </p>
                <img
                  className="temp" alt=" "
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} // Display a weather icon
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c 
                </span>
              </li>
              <li>
                Weather{" "}
                <span className="temp">
                  {weather.weather[0].main} 
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi 
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h 
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message} 
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
