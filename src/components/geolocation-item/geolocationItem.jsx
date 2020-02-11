import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL_WEATHER, API_KEY_OW } from "../../constants";
import "./geolocationItem.scss";
import { Spinner } from "../spinner/spinner";

export const GeolocationItem = () => {

  const [state, setState] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const lat = latitude.toFixed(5);
      const lon = longitude.toFixed(5);
      const location = (`lat=${lat}&lon=${lon}`);
      const url = `${URL_WEATHER}${location}&units=metric${API_KEY_OW}`;
      const getData = () => {
        return axios
          .get(url)
          .then(result => {
            setState({
              data: transformData(result)
            })
          })
          .catch(e => { console.log(e.config) });
      }
      getData()
    })
  }, [])

  const transformData = result => {
    return {
      id: result.data.id,
      name: result.data.name,
      temp: result.data.main.temp.toFixed(),
      icon: result.data.weather[0].icon,
      desc: result.data.weather[0].description
    }
  }

  if (state) {
    const { id, name, temp, icon, desc } = state.data;

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
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
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
            more &nbsp;
              <i className="fas fa-angle-double-right"></i>
          </Link>
        </div>
      </li>
    );
  } else {
    return (<Spinner />)
  }
}

