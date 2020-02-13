import { GEOLOCATION_WEATHER_DATA } from "../types";

const initialState = {
  geoWeather: null
}

export const geolocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GEOLOCATION_WEATHER_DATA:
      return {
        ...state, geoWeather: action.payload
      }
    default: return state
  }
}

