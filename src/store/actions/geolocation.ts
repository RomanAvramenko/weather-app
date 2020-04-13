import { GEOLOCATION_WEATHER_DATA } from "../types";
import axios from "axios";
import { URL_WEATHER, API_KEY_OW } from "../../constants";
import { WeatherResponseType } from "../../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";

export type GeolocationReceiveActionType = {
  type: typeof GEOLOCATION_WEATHER_DATA;
  payload: WeatherResponseType;
};

export const getGeoData = (): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  GeolocationReceiveActionType
> => async dispatch => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const lat = latitude.toFixed(5);
    const lon = longitude.toFixed(5);
    const location = `lat=${lat}&lon=${lon}`;
    const url = `${URL_WEATHER}${location}&units=metric${API_KEY_OW}`;
    return axios
      .get(url)
      .then((result) => dispatch(geolocationReceive(result.data)))
      .catch((e) => {
        console.log(e.config);
      });
  });
};

const geolocationReceive = (result: any): GeolocationReceiveActionType => {
  return {
    type: GEOLOCATION_WEATHER_DATA,
    payload: transformData(result),
  };
};

const transformData = (result: any) => {
  return {
    id: result.id,
    name: result.name,
    temp: result.main.temp.toFixed(),
    icon: result.weather[0].icon,
    desc: result.weather[0].description,
  };
};
