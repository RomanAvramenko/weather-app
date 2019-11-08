export default class OpenWeatherService {
  _apiBase = "https://api.openweathermap.org/data/2.5";
  _apiUnitFormat = "&units=metric";
  _apiKey = "&APPID=f32f005175f0b009bc5e5052a9f9722c";

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}${this._apiUnitFormat}${this._apiKey}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getWeather = async (id) => {
    const res = await this.getResource(`/weather?q=${id}`);
    return res.results.map(this._transformWeather);
  };

  getForecast = async (id) => {
    const res = await this.getResource(`/forecast?q=${id}`);
    return res.results.map(this._transformForecast);
  };

  _transformWeather = city => {
    return {
      id: city.id,
      name: city.name,
      temperature: city.main.temp.toFixed(),
      icon: city.weather.icon
    }
  }
}
