import React from "react";
import { Link } from "react-router-dom";
import "./geolocationItem.scss";
import axios from "axios";
import {URL_WEATHER, API_KEY_OW} from "../../constants";
//import OpenWeatherService from "../../services/open-weather-service";

export default class GeolocationItem extends React.Component {

  //weatherService = new OpenWeatherService();

  state = {
    geolocationResp: [],
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const lat = latitude.toFixed(5);
        const lon = longitude.toFixed(5);
        const location = (`lat=${lat}&lon=${lon}`)
        axios
          .get(`${URL_WEATHER}${location}&units=metric${API_KEY_OW}`)
          .then(result => {
            if (result.data) {
              this.setState({
                geolocationResp: [
                  ...this.state.geolocationResp,
                  result.data
                ]
              });
            } else {
              console.error("Response is empty", result);
            }
          })
          .catch(e => {
            console.log(e.config);
          });
      });
    } else {
      console.error("Geolocation is not require");
    }
  }

  render() {
    return this.state.geolocationResp.map(item => {
      return (
        <li key={item.id} className="geoLocItem">
          <div className="geoLocItem__temp">
            <span>{item.main.temp.toFixed()}&deg;</span>
          </div>
          <div className="geoLocItem__name">
            <span>{item.name}</span>
          </div>
          <div className="geoLocItem__img">
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={`${item.weather[0].description}`}
            />
          </div>
          <div className="geoLocItem__expand">
            <Link
              to={{
                pathname: "/expand",
                state: { name: item.name }
              }}
              className="geoLocItem__expand"
            >
              Forecast for 5 days
            </Link>
          </div>
        </li>
      );
    });
  }
}
