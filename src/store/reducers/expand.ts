import { EXPAND_FORECAST_DATA } from "../types";
import { ForecastData, ImageResponse } from "../../types/types";
import { ExportForecastDataActionType } from "../actions/expand";

type InitialStateType = {
  expandForecast: ForecastData | null;
  imageResp: ImageResponse | null;
};

const initialState: InitialStateType = {
  expandForecast: null,
  imageResp: null,
};

export const expandReducer = (
  state = initialState,
  action: ExportForecastDataActionType
): InitialStateType => {
  switch (action.type) {
    case EXPAND_FORECAST_DATA:
      return {
        ...state,
        expandForecast: action.forecastData,
        imageResp: action.forecastImage,
      };
    default:
      return state;
  }
};
