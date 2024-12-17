import React, { useEffect, useState } from 'react'
import './Weather.css';
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clouds_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import mist_icon from '../assets/mist.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);

    //Create an object and match it with the weather code. If it is a match, successfully show its image.
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
    }

    const search = async(city) =>{
        try {
            //Used openweathermap.org and get this Link
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon //  If not loading any image, then clear Icon Wrokes.
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),                      
                location: data.name,
                icon: icon
            })
        } catch (error) {
            
        }
    }

    useEffect (() =>{
        search("London");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Search' />
            <img src={search_icon} alt="" />
        </div>
        <img src = {weatherData.icon} alt="" className='weather-icon' />
        
        <p className='temperature'>{weatherData.temperature}°C</p>  {/* Used  useState if true*/} 
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <>
                    <p>{weatherData.humidity} % <span>Humidity</span></p>
                    
                </>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.wind} KM/h <span>Wind Speed</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
