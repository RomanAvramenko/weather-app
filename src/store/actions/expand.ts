import axios from "axios";
import {
  EXPAND_FORECAST_DATA_SUCCESS,
  EXPAND_FORECAST_DATA_START,
} from "../types";
import {
  URL_IMAGE,
  API_KEY_US,
  API_KEY_OW,
  URL_FORECAST,
} from "../../constants";
import { ForecastDataType, ImageResponse } from "../../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";

export type ExpandForecastDataActionType = {
  type: typeof EXPAND_FORECAST_DATA_SUCCESS;
  forecastData: ForecastDataType;
  forecastImage: Array<ImageResponse>;
};

export type ExpandForecastFetchStartActionType = {
  type: typeof EXPAND_FORECAST_DATA_START;
};

type ActionsTypes =
  | ExpandForecastDataActionType
  | ExpandForecastFetchStartActionType;

export const getExpandData = (
  location: any
): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (
  dispatch
) => {
  const { state } = location;
  const stateCheck = state ? state.name : sessionStorage.getItem("key");
  const urlWeather = `${URL_FORECAST}q=${stateCheck}&units=metric${API_KEY_OW}`;
  const urlImage = `${
    URL_IMAGE + API_KEY_US
  }&page=1&query=${stateCheck} city buildings`;
  await axios
    .all([axios.get(urlWeather), axios.get(urlImage)])
    .then(
      axios.spread((result, imgResp) =>
        dispatch(expandForecastReceive(result, imgResp))
      )
    )
    .catch((e) => console.log(e));
};

const expandForecastReceive = (
  result: any,
  imgData: any
): ExpandForecastDataActionType => {
  return {
    type: EXPAND_FORECAST_DATA_SUCCESS,
    forecastData: transformForecastData(result),
    forecastImage: imgData.data.results,
  };
};

export const expandForecastFetchStart = (): ExpandForecastFetchStartActionType => {
  return {
    type: EXPAND_FORECAST_DATA_START,
  };
};

const transformForecastData = (result: any) => {
  return {
    id: result.data.city.id,
    name: result.data.city.name,
    list: stateParser(result.data.list),
  };
};

const transformForecastItem = (item: any) => {
  return {
    temp: item.main.temp.toFixed(),
    icon: item.weather[0].icon,
    date: item.dt_txt,
    desc: item.weather[0].description,
  };
};

const stateParser = (list: any) => {
  const currentDay = list[0].dt_txt.replace(/ .*$/, "");
  const filteredDays: Array<any> = [];
  list.map((item: any) => {
    const days = item.dt_txt.replace(/ .*$/, "");
    if (currentDay !== days) {
      filteredDays.push(transformForecastItem(item));
    }
    return item;
  });
  return filteredDays.filter((i: number, index: number) => index % 4 === 0);
};
