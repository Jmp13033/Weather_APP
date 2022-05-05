import React, { useState } from 'react';
import './App.css';
const api_key = {
  key: "275429001743351b026fbf0b7d2719c2",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key ==="Enter") {
      fetch(`${api_key.base}weather?q=${query}&units=metric&APPID=${api_key.key}`)
      .then(res => res.json()) // change it into json data 
      .then(result => {
        setWeather(result)
        setQuery("");
        console.log(weather);
      
      });
    }
  }

  const datebuilder = (d) => {

    let months =["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednsesday", "Saturday"]
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear();
    return ` ${date}, ${month} ${year}`


  }
  return (
    <div className={(typeof weather.main !="undefined")
    ? 
    ((weather.main.temp > 16)? 
    "App warm  ": 
    "App") : 
    "App"}>
    <main>
      <div className='search_box'>
          <input 
          value={query}
          onKeyPress={search}
          onChange={e => setQuery(e.target.value)}
          type="text" 
          className='search_bar'
          placeholder='enter your search '/>
    
      </div>

      {(typeof weather.main != "undefined") ? (
        <div>
      <div className='location_box'>
      <div className='location'>{weather.name}, {weather.sys.country}</div>
      <div className='date'>{datebuilder(new Date())}</div>
      </div>
      <div className='weather-box'>
      <div className='temp'>
      {Math.round(weather.main.temp)} C
      </div>
      <div className='weather'> {weather.weather[0].main} </div>
      
      </div>
      </div>
      ) : ("")}
    
    </main>
    </div>
  );
}

export default App;
