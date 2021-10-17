
import './App.css';
import React, { useState } from 'react';

//imported date time (requirements had said 'that day'), default is todays date - incase user wants fast access
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import axios for getting api endpoint
import axios from 'axios';

//component to display weather forecast for a specific day
const DisplayWeather = (props) => {


  return props.weather.map(function ({ air_pressure, humidity, max_temp, min_temp, predictability, the_temp, visibility, wind_direction, wind_direction_compass, wind_speed, applicable_date, created }, index) {
    return (
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1"> Temperature : {the_temp}</h5>
          <small>Date : {applicable_date} <br></br>
            Time Created : {created}
          </small>
        </div>
        <p class="mb-1">Air Presure : {air_pressure}</p>
        <p class="mb-1">Humidity : {humidity}</p>
        <p class="mb-1">Max Temp : {max_temp}</p>
        <p class="mb-1">Min Temp : {min_temp}</p>
        <p class="mb-1">Predicitability : {predictability}</p>
        <p class="mb-1">Visibility : {visibility}</p>
        <p class="mb-1">Wind Direction : {wind_direction}</p>
        <p class="mb-1">Wind Direction Compass : {wind_direction_compass}</p>
        <p class="mb-1">Wind Speed : {wind_speed}</p>

      </a>
    )
  })

}


function App() {

  //set location and weather (two states)
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [date, setDate] = useState(new Date());

  //call to get weather data
  const GetWeather = (props) => {

    let format_date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    props.preventDefault();
    axios.get(`https://www.metaweather.com/api/location/search/?query=${location}`)
      .then(async res => {
        const response = await axios.get('https://www.metaweather.com/api/location/' + res.data[0].woeid + '/' + format_date);
        setWeather(response.data);
      })
  }


  return (
    <div className="App">
      <form onSubmit={GetWeather}>
        <label>
          Enter Location & Weather!
          <br />
          <input type="text" name="name" onChange={(event) => setLocation(event.target.value)} />
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div class="list-group">
        {weather ? <DisplayWeather weather={weather}></DisplayWeather> : <div></div>}
      </div>

    </div>
  );
}

export default App;
