import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from "../spinner/spinner";
import "./geolocationItem.scss";
import { getGeoData } from '../../store/actions/geolocation'

type RootState = {
  geoloc: { geoWeather: object }
}

interface GeoWeather {
  id?: number,
  name?: string,
  temp?: string,
  icon?: string,
  desc?: string
}

export const GeolocationItem = () => {
  const geoWeather = useSelector((state: RootState) => state.geoloc.geoWeather)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGeoData())
    // eslint-disable-next-line
  }, [])

  if (geoWeather) {
    const { id, name, temp, icon, desc }: GeoWeather = geoWeather;
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

