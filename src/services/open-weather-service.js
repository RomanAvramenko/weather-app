import axios from "axios";

export default class OpenWeatherService {
  getResource = async url => {
    await axios
      .get(url)
      .then(result => {
        this._transformData(result)
      })
      .catch(e => {
        console.log(e.config);
      });
  };

  _transformWeather = result => {
    return {
      id: result.data.id,
      name: result.data.name,
      temp: result.data.main.temp.toFixed(),
      icon: result.data.weather[0].icon,
      desc: result.data.weather[0].description
    };
  };
}