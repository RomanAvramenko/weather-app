import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { URL_WEATHER, API_KEY_OW } from "../../constants";

import { Spinner } from "../spinner/spinner";

import "./geolocationItem.scss";
import { geolocationReceive } from "../../store/actions/geolocation";

export const GeolocationItem = () => {

  const { geoWeather } = useSelector(state => state)
  const dispatch = useDispatch()



  const getData = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const lat = latitude.toFixed(5);
      const lon = longitude.toFixed(5);
      const location = (`lat=${lat}&lon=${lon}`);
      const url = `${URL_WEATHER}${location}&units=metric${API_KEY_OW}`;
      return axios
        .get(url)
        .then(result => dispatch(geolocationReceive(result)))
        .catch(e => { console.log(e.config) })
    })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  if (geoWeather) {
    const { id, name, temp, icon, desc } = geoWeather;
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

