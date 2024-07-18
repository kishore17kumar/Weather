import './App.css'

import sunicon from "./assets/sun.jpeg"
import rainicon from "./assets/rain.jpeg"
import windicon from "./assets/wind.png"
import snowicon from "./assets/snow.png"
import drizzleicon from "./assets/drizzle.png"
import humidity1 from "./assets/download.png"
import { CiSearch } from "react-icons/ci";

import { useEffect, useState } from 'react'


const WeatherDetails = ({icon,temp,city,country,lat,lon,humidity,wind}) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt='Image' />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='lon'>longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity1} alt='Humidity' className='icon'></img>
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windicon} alt='Wind' className='icon'></img>
          <div className='data'>
            <div className='wind-percent'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>

      </div>
    </>
  )
}

function App() {
  // let api_key="afd2e25053d873133b7531e16ad1ba3a"
  let api_key="57ba6b3093be6efba4835107c5068758"
  const[text,setText]=useState("Chennai")
  const [icon,setIcon]=useState(sunicon)
  const[temp,setTemp]=useState(0)
  const[city,setCity]=useState("Chennai")
  const[country,setCountry]=useState("India")
  const[lat,setLat]=useState(0)
  const[lon,setLon]=useState(0)
  const[humidity,setHumidity]=useState(0)
  const[wind,setWind]=useState(0)
  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)

  const weatherIconMap={
    "01d":sunicon,
    "01n":sunicon,
    "02d":sunicon,
    "02n":sunicon,
    "03d":drizzleicon,
    "03n":drizzleicon,
    "04d":drizzleicon,
    "04n":drizzleicon,
    "09d":rainicon,
    "09n":rainicon,
    "10d":rainicon,
    "10n":rainicon,
    "13d":snowicon,
    "13n":snowicon,
  }

  const search=async()=>{
    setLoading(true);
    setCityNotFound(false)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res=await fetch(url)
      let data=await res.json()
      console.log(data)
      if (data.cod==="404"){
        console.error("city not found")
        setCityNotFound(true)
        setLoading(false)
        return
      }

      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLon(data.coord.lon)

      const weatherIconCode=data.weather[0].icon
      setIcon(weatherIconMap[weatherIconCode] || snowicon)
      setCityNotFound(false)
    } catch (error) {
      console.error("An error occurred:",error.message)
      setError("An error ocurred while fetching weather data.")
    }finally{
      setLoading(false)
    }
  }

const abc=(e)=>{
  setText(e.target.value)
}

const cba=(e)=>{
  if(e.key==="Enter"){
    search()
  }
}

useEffect(function(){
  search()
},[])

  return (
    <>
      <div className='container'>
        <div className='input'>
          <input type='text' className='cityinput' placeholder='Search City'  value={text} onChange={abc} onKeyDown={cba}/>
          <div className='search' onClick={()=>search()}>
            <CiSearch className='ci' />
          </div>
        </div>
        
        {loading && <div className='loading-message'>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='citynotfound'>City not found</div>}

        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind} />}
        <p className='copyright'>
          Designed by <span>Kishore Kumar</span> 
        </p>
      </div>
    </>
  )
}

export default App
