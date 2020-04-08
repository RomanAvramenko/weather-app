import { GEOLOCATION_WEATHER_DATA } from "../types";
import { WeatherResponseType } from "../../types/types";


export type InitialStateType = {
  geoWeather: WeatherResponseType | null;
};

const initialState: InitialStateType = {
  geoWeather: null,
};

export const geolocationReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case GEOLOCATION_WEATHER_DATA:
      return {
        ...state,
        geoWeather: action.payload,
      };
    default:
      return state;
  }
};
