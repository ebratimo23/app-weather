import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loanding from './Loanding'

const CardWeather = ({lat , lon}) => {
    

    const [weather, setWeather] = useState()
    const [temperture, setTemperture] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        if (lon) {
            const APIKey ='734d36f22049b06e0aa0bfa038209cf2'
            const URL =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            
            axios.get(URL)
                .then(res =>{ 
                  setWeather(res.data)
                  const temp = {
                    celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
                    farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} ºF`
                  }
                  setTemperture(temp)
                  setisloading(false)
                })
                .catch(err => console.log(err))
        }
    }, [lat, lon])
    
    console.log(weather);

    const hanleClick = () => setIsCelsius(!isCelsius)
    if (isloading) {
      return <Loanding/>
    }else{
      return (
        <div>
          <section className='card'>
            <header className='title'>
              <h1> Weather App</h1>
              <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            </header>
            <main>
              <article>
                <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="icon-weather" />
                <div className='grados'>
                  <h2>{isCelsius? temperture?.celsius : temperture?.farenheit}</h2>
                </div>
              </article>
              <div className='description'>
                <div className='title-weather'>
                  <h3>{weather?.weather[0].description}</h3>
                </div>
                <div className='list'>
                  <ul>
                    <li><span>Wind speed:</span> {weather?.wind.speed} m/s</li>
                    <li><span>Clouds:</span> {weather?.clouds.all}%</li>
                    <li><span>Pressure:</span> {weather?.main.pressure}hPa</li>
                  </ul>
                </div>
              </div>
              <div className='btn'>
                <button onClick={hanleClick}>{isCelsius? 'Change to ºF' : 'Change to ºC'}</button>

              </div>
            </main>
    
          </section>
        </div>
      )
    }
}

export default CardWeather