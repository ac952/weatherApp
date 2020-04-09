import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard.js';
import DegreeToggle from './DegreeToggle.js';



class WeekContainer extends React.Component {


    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }



  componentDidMount = () => {
    const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.weatherKey}`
    fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))

            this.setState({
                fullData: data.list,
                dailyData: dailyData
            }, () => console.log(this.state))

    })
  }

    // day cards = only 5 data points
    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType}/>)
    }


    toggleDegreeButtons = () => {
        return <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree}/>
    }

    updateForecastDegree = event =>{
        this.setState({
            degreeType: event.target.value
        },() => console.log(this.state))
    }


  render() {
    return (
        <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
            <h5 className="display-5 text-muted">New York, US</h5>
            {this.toggleDegreeButtons()}
            <div className="row justify-content-center">

                {this.formatDayCards()}

            </div>
        </div>
    )
  }
}

export default WeekContainer;