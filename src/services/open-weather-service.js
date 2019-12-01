import axios from "axios";

export default class OpenWeatherService {
  _apiBase = "https://api.openweathermap.org/data/2.5/weather?";
  _apiKey = "&APPID=f32f005175f0b009bc5e5052a9f9722c";

  getResource = url => {
    axios
      .get(`${this._apiBase}${url}&units=metric${this._apiKey}`)
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
    return {
      id: city.id,
      name: city.name,
      temperature: city.main.temp.toFixed(),
      icon: city.weather.icon
    };
  };
}