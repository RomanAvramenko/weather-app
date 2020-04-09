import axios from "axios";
import { EXPAND_FORECAST_DATA } from "../types";
import {
  URL_IMAGE,
  API_KEY_US,
  API_KEY_OW,
  URL_FORECAST,
} from "../../constants";
import { ForecastData, ImageResponse } from "../../types/types";

export type ExportForecastDataActionType = {
  type: typeof EXPAND_FORECAST_DATA;
  forecastData: ForecastData;
  forecastImage: ImageResponse;
};

export const getData = (location: any) => {
  return async (dispatch: any) => {
    const state = location.state;
    const loadData = undefined;
    const stateCheck = loadData
      ? state.name
      : window.sessionStorage.getItem("key");
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
};

const expandForecastReceive = (
  result: any,
  imgData: any
): ExportForecastDataActionType => {
  return {
    type: EXPAND_FORECAST_DATA,
    forecastData: transformForecastData(result),
    forecastImage: imgData.data.results,
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
  const filteredDays: any = [];
  list.map((item: any) => {
    const days = item.dt_txt.replace(/ .*$/, "");
    if (currentDay !== days) {
      filteredDays.push(transformForecastItem(item));
    }
    return item;
  });
  return filteredDays.filter((i: any, index: number) => index % 4 === 0);
};
