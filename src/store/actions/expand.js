import axios from "axios"
import { EXPAND_FORECAST_DATA } from "../types"
import { URL_IMAGE, API_KEY_US, API_KEY_OW, URL_FORECAST } from "../../constants";

export const getData = (location) => {
  return async dispatch => {
    const state = location.state
    if (state) {
      window.addEventListener(
        "beforeunload",
        window.sessionStorage.setItem("key", state.name)
      );
    }
    const loadData = undefined;
    const stateCheck = loadData ? state.name : window.sessionStorage.getItem("key");
    const urlWeather = `${URL_FORECAST}q=${stateCheck}&units=metric${API_KEY_OW}`;
    const urlImage = `${URL_IMAGE + API_KEY_US}&page=1&query=${stateCheck} city buildings`;
    await axios
      .all([
        axios.get(urlWeather),
        axios.get(urlImage)
      ])
      .then(
        axios.spread((result, imgResp) => dispatch(expandForecastReceive(result, imgResp)))
      )
      .catch(e => console.log(e));
  }
}

const expandForecastReceive = (result, imgData) => {
  return {
    type: EXPAND_FORECAST_DATA,
    forecastData: transformForecastData(result),
    forecastImage: imgData.data.results
  }
}

const transformForecastData = (result) => {
  return {
    id: result.data.city.id,
    name: result.data.city.name,
    list: stateParser(result.data.list)
  }
}

const stateParser = (list) => {
  const currentDay = list[0].dt_txt.replace(/ .*$/, '');
  const filteredDays = [];
  list.map(item => {
    const days = item.dt_txt.replace(/ .*$/, '');
    if (currentDay !== days) {
      filteredDays.push(item)
    }
    return item
  })
  return filteredDays.filter((i, index) => index % 4 === 0);
}