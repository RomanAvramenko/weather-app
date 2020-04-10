import {
  EXPAND_FORECAST_DATA_SUCCESS,
  EXPAND_FORECAST_DATA_START,
} from "../types";
import { ForecastData, ImageResponse } from "../../types/types";
import {
  ExportForecastDataActionType,
  ExportForecastFetchStartActionType,
} from "../actions/expand";

type InitialStateType = {
  expandForecast: ForecastData | null;
  imageResp: ImageResponse | null;
  loading: boolean;
};

const initialState: InitialStateType = {
  expandForecast: null,
  imageResp: null,
  loading: false,
};

export const expandReducer = (
  state = initialState,
  action: ExportForecastDataActionType | ExportForecastFetchStartActionType
): InitialStateType => {
  switch (action.type) {
    case EXPAND_FORECAST_DATA_SUCCESS:
      return {
        ...state,
        expandForecast: action.forecastData,
        imageResp: action.forecastImage,
        loading: false,
      };
    case EXPAND_FORECAST_DATA_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
