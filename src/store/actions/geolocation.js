import { GEOLOCATION_WEATHER_DATA } from "../types"
import axios from "axios";
import { URL_WEATHER, API_KEY_OW } from "../../constants";

export const getGeoData = () => {
  return async dispatch => {
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
}

export const geolocationReceive = (result) => {
  return {
    type: GEOLOCATION_WEATHER_DATA,
    payload: transformData(result)
  }
}

const transformData = result => {
  return {
    id: result.data.id,
    name: result.data.name,
    temp: result.data.main.temp.toFixed(),
    icon: result.data.weather[0].icon,
    desc: result.data.weather[0].description
  }
}