import { ForecastDataType } from './../../types/types';
import {
  EXPAND_FORECAST_DATA_SUCCESS,
  EXPAND_FORECAST_DATA_START,
} from "../types";
import {
  ExpandForecastDataActionType,
  ExpandForecastFetchStartActionType,
} from "../actions/expand";

export type InitialStateType = {
  expandForecast: ForecastDataType | null;
  imageResp?: Array<ImageResponse> | null;
  loading?: boolean;
};

export type ImageResponse = {
  urls: { small: string };
  id: string;
};

const initialState: InitialStateType = {
  expandForecast: null,
  imageResp: null,
  loading: false,
};

export const expandReducer = (
  state = initialState,
  action: ExpandForecastDataActionType | ExpandForecastFetchStartActionType
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
