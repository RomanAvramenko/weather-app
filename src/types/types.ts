export type WeatherResponseType = {
  id: number;
  name?: string;
  temp?: string;
  icon?: string;
  desc?: string;
};

export type ForecastDataType = {
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

export type ImageResponse = {
  urls: { small: string };
  id: string;
};