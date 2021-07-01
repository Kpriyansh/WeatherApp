import React, { Component } from 'react';
import AppStyles from './App.module.css';
import WeatherBox from './Component/WeatherBox';
import SearchBar from './Component/SearchBar';

const API_KEY = "3dd0e496acmsha1da45f82452d1bp1e08b1jsnd0cbecc2c546"
let name = '';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "City Name",
      show: false,
      temperature: "NaN",
      icon: '',
      weather: 'WEATHER CONDITION'
    }
  }


  componentDidMount() {
    
    if (this.state.icon.length && this.state.icon.charAt(2) === "n") {
      document.body.style.backgroundImage = "radial-gradient(at top, #6157a5, #28205f)";
    }
    else {
      document.body.style.backgroundImage = "radial-gradient(at top, #75bcfa, #4062df)";
    }
  }


  setData = (data) => {

    const temp = data.list[0].main.temp;
    this.setState({ temperature: temp });
    const weather = data.list[0].weather[0].description;
    this.setState({ weather: weather });
    const icon = data.list[0].weather[0].icon;
    this.setState({ icon: icon });
    this.componentDidMount();

  }


  getWeather = (city) => {

    fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&type=link%2C%20accurate&units=metric`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(response => {

        this.setData(response);

      })
      .catch(err => {
        console.error(err);
      });
  }

  handleInput = (event) => {
    name = event.target.value;
  }

  handleSubmit = (event) => {
    if (event.key === "Enter") {

      name = name[0].toUpperCase() + name.slice(1);
      this.setState({ input: name });
      this.setState({ show: true });
      this.getWeather(name);
    }
  }

  render() {

    let city = null;
    city = (
      <div>
        <h1 className={AppStyles.City}>{this.state.input}</h1>
        <p className={AppStyles.Condition}>{this.state.weather}</p>
      </div>
    )

    return (
      <div className={AppStyles.App}>
        <div className={AppStyles.Header}>
          {city}
        </div>
        <div>
          {
            (this.state.input.length && this.state.show) ?
              <WeatherBox
                tempValue={this.state.temperature}
                icon={this.state.icon}

              />
              : (
                <h2 className={AppStyles.temperature}>{this.state.temperature}</h2>
              )

          }
        </div>

        <SearchBar onSubmit={(event) => this.handleSubmit(event)} setInput={this.handleInput} />

      </div>
    );
  }
}

export default App;
