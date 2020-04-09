import { GEOLOCATION_WEATHER_DATA } from "../types";
import { WeatherResponseType } from "../../types/types";
import { GeolocationReceiveActionType } from "../actions/geolocation";


type InitialStateType = {
  geoWeather: WeatherResponseType | null;
};

const initialState: InitialStateType = {
  geoWeather: null,
};

export const geolocationReducer = (
  state = initialState,
  action: GeolocationReceiveActionType
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
