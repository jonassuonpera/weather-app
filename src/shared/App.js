import React, { Component } from "react";
import WeatherListItem from "./components/weather_list_item";
import Input from "./components/input";
import Button from "./components/button";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: "",
      city: "",
      temperature: "",
      humidity: "",
      wind: "",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.fetchWeather = this.fetchWeather.bind(this);
    // this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  componentDidMount() {
    let paramCity = this.getParamCity();
    if (!paramCity) {
      window.history.replaceState(null, null, `?city=copenhagen`);
      console.log("name is :", this.props.data.name);
      this.setState({
        city: this.props.data.name,
        temperature: this.props.data.main.temp,
        humidity: this.props.data.main.humidity,
        wind: this.props.data.wind.speed,
        error: "",
      });
    } else {
      this.fetchWeather(paramCity);
    }
  }

  getParamCity() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const city = urlParams.get("city");
    return city;
  }

  setParamCity(city) {
    window.history.replaceState(null, null, `?city=${city}`);
  }

  fetchWeather(city) {
    fetch(`/weather?city=${city}`)
      .then((result) => result.json())
      .then((json) => {
        if (json.cod === "404") {
          this.setState({
            error: json.message,
          });
        } else {
          this.setState({
            city: json.name,
            temperature: json.main.temp,
            humidity: json.main.humidity,
            wind: json.wind.speed,
            error: "",
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: "Could not get weather data",
        });
      });
  }

  handleClick() {
    const value = this.state.inputValue;
    window.history.replaceState(null, null, `?city=${value}`);
    this.fetchWeather(value);
  }

  handleInputClick(e) {
    if (e.key === "Enter") {
      this.handleClick();
    }
  }

  handleInputSubmit(event) {
    event.preventDefault();
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  render() {
    return (
      <div className="widget" style={{ margin: "auto", width: "300px" }}>
        <div className="panel panel-info">
          <div data-cy="widget-title" className="panel-heading">
            {this.state.city != "" ? (
              <span>
                Weather in <b>{this.state.city}</b>
              </span>
            ) : (
              "Weather was not found!"
            )}
          </div>

          <ul className="list-group">
            <WeatherListItem
              name="Temperature"
              value={
                this.state.temperature != ""
                  ? this.state.temperature + "°C"
                  : ""
              }
            />
            <WeatherListItem name="Humidity" value={this.state.humidity} />
            <WeatherListItem
              name="Wind"
              value={this.state.wind != "" ? this.state.wind + " m/s" : ""}
            />
            <li className="list-group-item">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="form-inline"
              >
                <div className="form-group">
                  <Input
                    id="city"
                    placeholder="City"
                    value={this.state.value}
                    onChange={this.handleChange}
                    cy="widget-input"
                    onEnter={this.handleClick}
                  />
                  <Button
                    cy="widget-button"
                    text="Search"
                    onClick={this.handleClick}
                  />
                </div>
              </form>
              {this.state.error != "" ? (
                <div data-cy="widget-error" style={{ textAlign: "center" }}>
                  {this.state.error}
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
