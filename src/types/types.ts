export type WeatherResponseType = {
  id: number;
  name: string;
  temp: string;
  icon: string;
  desc: string;
};

export type ForecastData = {
  id: number;
  name: string;
  list: Array<ForecastDataItem>;
};

type ForecastDataItem = {
  icon: string;
  temp: number;
  date: string;
  desc: string;
};
