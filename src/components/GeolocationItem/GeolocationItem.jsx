import React from "react";

import { Link } from "react-router-dom";

import { Request } from "../../request";

import "./GeolocationItem.scss";

class GeolocationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocationResp: []
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const request = new Request();
        request.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude.toFixed(
            5
          )}&lon=${position.coords.longitude.toFixed(
            5
          )}&units=metric&APPID=f32f005175f0b009bc5e5052a9f9722c`,
          responseJSON => {
            const geolocationResp = JSON.parse(responseJSON);
            if (geolocationResp) {
              this.setState({
                geolocationResp: [
                  ...this.state.geolocationResp,
                  geolocationResp
                ]
              });
            } else {
              console.error("Response is empty", responseJSON);
            }
          },
          e => {
            throw new Error(e);
          }
        );
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
              alt=""
            />
          </div>
          <div className="geoLocItem__expand">
            <Link
              to={{
                pathname: "/expand",
                state: { name: item.name }
              }}
            >
              Forecast for 5 days
            </Link>
          </div>
        </li>
      );
    });
  }
}

export default GeolocationItem;
