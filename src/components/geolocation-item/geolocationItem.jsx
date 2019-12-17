import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL_WEATHER, API_KEY_OW } from "../../constants";
import { Spinner } from "../spinner/spinner";
import "./geolocationItem.scss";
export class GeolocationItem extends React.Component {

  state = {
    geolocationResp: null,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const lat = latitude.toFixed(5);
        const lon = longitude.toFixed(5);
        const location = (`lat=${lat}&lon=${lon}`);
        const url = `${URL_WEATHER}${location}&units=metric${API_KEY_OW}`;
        axios
          .get(url)
          .then(result => {
            this.setState({ geolocationResp: this._transformData(result) })
          })
          .catch(e => { console.log(e.config) });
      });
    } else {
      console.error("Geolocation is not require");
    }
  }

  _transformData = (result) => {
    return {
      id: result.data.id,
      name: result.data.name,
      temp: result.data.main.temp.toFixed(),
      icon: result.data.weather[0].icon,
      desc: result.data.weather[0].description
    }
  }

  render() {
    if (this.state.geolocationResp === null) {
      return (
        <Spinner />
      );
    }
    const { id, name, temp, icon, desc } = this.state.geolocationResp;
    return (
      <li key={id} className="geoLocItem">
        <div className="geoLocItem__temp">
          <span>{temp}&deg;</span>
        </div>
        <div className="geoLocItem__name">
          <span>{name}</span>
        </div>
        <div className="geoLocItem__img">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={`${desc}`}
          />
        </div>
        <div className="geoLocItem__expand">
          <Link
            to={{
              pathname: "/expand",
              state: { name: name }
            }}
            className="geoLocItem__expand"
          >
            Forecast for 5 days
            </Link>
        </div>
      </li>
    );
  }
}
