import React from 'react'
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
  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Search' />
            <img src={search_icon} alt="" />
        </div>
        <img src = {clear_icon} alt="" className='weather-icon' />
        <p className='temperature'>27°C</p>
        <p className='location'>London</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <>
                    <p>91 % <span>Humidity</span></p>
                    
                </>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <>
                    <p>3.8 KM/h <span>Wind Speed</span></p>
                    
                </>
            </div>
        </div>
    </div>
  )
}

export default Weather
