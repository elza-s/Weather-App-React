import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import CurrentTemperature from "./CurrentTemperature";
import Forecast from "./Forecast";

export default function Search(props) {
  const[apiData, setApiData] = useState({ready:false});
  const[city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setApiData({
      ready :true,
      temperature : response.data.main.temp,
      realFeel: response.data.main.feels_like,
      city : response.data.name,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    search();
  }

  function handleCity(event){
    setCity(event.target.value);
  }

  function search(){
    const apiKey = "c859cc5005db2af23ee315e1d40f88f0"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if(apiData.ready){
    return (
      <div className="Search">
        <CurrentTemperature data={apiData}/>
        <form className="row m-auto" onSubmit={handleSubmit}>
          {/* <div className="col-lg-3 m-auto "> */}
            <input className="form-control col-lg-9 col-md-9 col-sm-9 m-auto" type="search" name="" id="search" placeholder="Search for a city" autoFocus="on" onChange={handleCity}/>
            <input className="col-lg-1 col-md-2 col-sm-2 m-auto btn btn-light" type="submit" value="Search"/>
          {/* </div> */}
        </form>
        <Forecast city={apiData.city}/>
      </div>
    );

  }else{
    search();
    return "Loading..."
  }
}