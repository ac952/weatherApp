import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard.js';
import DegreeToggle from './DegreeToggle.js';
import City from './City.js';
import './styles.css';

class WeekContainer extends React.Component {

    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit",
        city:"New York"
    }

  componentDidMount = () => {
    const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?q=New York&units=imperial&APPID=${apiConfig.weatherKey}`
    fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            })
    })
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.city == this.state.city) return;
      fetch
      (`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=imperial&APPID=${apiConfig.weatherKey}`)
          .then((res) => res.json())
          .then((data) => {
              const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
              this.setState({
                  fullData: data.list,
                  dailyData: dailyData
              }, () => console.log(this.state))
      })
  }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType}/>)
    }

    updateForecastDegree = event =>{
        this.setState({
            degreeType: event.target.value
        },() => console.log(this.state))
    }

    updateCity = event =>{
        this.setState({
            city: event.target.value
        },() => console.log(this.state))
    }

  render() {
    return (
        <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
            <h5 className="display-5">The current weather for: <City city={this.state.city} updateCity={this.updateCity}/></h5>
            <div>
                <h5 className="display-5">Select a degree type:</h5>
                <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree}/>
            </div>
            <div className="row justify-content-center">
                {this.formatDayCards()}
            </div>
        </div>
    )
  }
}

export default WeekContainer;

// Allow users to click on a card to view more info, such as humidity, or variable data, such as rainfall.
// You may need another Weather API to incorporate additional data.