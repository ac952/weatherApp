import React from 'react';
import apiConfig from './apiKeys';



class WeekContainer extends React.Component {
  componentDidMount = () =>{
    const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.weatherKey}`
    fetch(weatherURL)
        .then(res => res.json())
        .then(data => console.log("Data List Loaded", data.list))
  }

  
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
}

export default WeekContainer;