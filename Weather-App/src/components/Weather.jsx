import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import clouds_icon from '../assets/clouds.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import mist_icon from '../assets/mist.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {

    const inputRef = useRef(null); // Reference for the input field
    const [weatherData, setWeatherData] = useState(false); // State to store weather data

    // Object mapping weather codes to their corresponding icons
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": clouds_icon,
        "02n": clouds_icon,
        "03d": clouds_icon,
        "03n": clouds_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": mist_icon,
        "11n": mist_icon,
        "13d": snow_icon,
        "13n": snow_icon, 
    };

    // Function to fetch weather data for the provided city
    const search = async (city) => {
        if (city === "") { // Check if the city input is empty
            alert("Enter City Name");
            return;
        }
        try {
            // API endpoint for OpenWeatherMap with the city name and API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const response = await fetch(url); // Fetch weather data
            const data = await response.json(); // Parse the response as JSON

            if (!response.ok) { // Handle API errors
                alert(data.message);
                return;
            }

            console.log(data); // Log API response to the console

            // Set weather data in state, map weather icon to the correct image
            const icon = allIcons[data.weather[0].icon] || clear_icon; // Default to clear_icon if no match
            setWeatherData({
                humidity: data.main.humidity, // Humidity value
                wind: data.wind.speed,        // Wind speed
                temperature: Math.floor(data.main.temp), // Round temperature to the nearest whole number
                location: data.name,          // City name
                icon: icon                    // Weather icon
            });

            inputRef.current.value = ""; // Clear the input field
        } catch (error) {
            setWeatherData(false); // Reset weather data on error
            console.error("Error In Fetching Weather Data");
        }
    };

    // Automatically fetch weather data for "London" when the component loads
    useEffect(() => {
        search("London");
    }, []);

    return (
        <div className='weather'>
            {/* Search bar for city input */}
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img 
                    src={search_icon} 
                    alt="Search Icon" 
                    onClick={() => search(inputRef.current.value)} // Trigger search on click
                />
            </div>

            {/* Display weather data if available */}
            {weatherData ? (
                <>
                    {/* Weather Icon */}
                    <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                    
                    {/* Temperature */}
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    
                    {/* Location */}
                    <p className='location'>{weatherData.location}</p>

                    {/* Additional weather details */}
                    <div className="weather-data">
                        {/* Humidity Section */}
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity Icon" />
                            <p>{weatherData.humidity} % <span>Humidity</span></p>
                        </div>

                        {/* Wind Speed Section */}
                        <div className="col">
                            <img src={wind_icon} alt="Wind Icon" />
                            <p>{weatherData.wind} KM/h <span>Wind Speed</span></p>
                        </div>
                    </div>
                </>
            ) : (
                <></> // If no weather data, show nothing
            )}
        </div>
    );
};

export default Weather;
