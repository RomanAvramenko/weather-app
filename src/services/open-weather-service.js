import axios from "axios";
import { URL_WEATHER, API_KEY_OW } from "../constants";

export default class OpenWeatherService {
  getResource = async url => {
    await axios
      .get(`${URL_WEATHER}${url}&units=metric${API_KEY_OW}`)
      .then(result => {
        if (result.data) {
          this._transformWeather(result.data)
        } else {
          console.error("Response is empty", result);
        }
      })
      .catch(e => {
        console.log(e.config);
      });
  };

  getWeather = async id => {
    const res = await this.getResource(`${id}`);
    return res.results.map(this._transformWeather);
  };

  _transformWeather = city => {
    console.log(city)
    return {
      id: city.id,
      name: city.name,
      temperature: city.main.temp.toFixed(),
      icon: city.weather.icon
    };
  };
}
