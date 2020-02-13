import { EXPAND_FORECAST_DATA } from '../types'

const initialState = {
  expandForecast: null,
  imageResp: [],
}

export const expandReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPAND_FORECAST_DATA:
      return {
        ...state,
        expandForecast: action.forecastData,
        imageResp: action.forecastImage
      }
    default: return state
  }
}
