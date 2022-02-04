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

export type ForecastDataItem = {
  icon: string;
  minTemp: number;
  maxTemp: number;
  day: string;
  description: string;
};

export type ImageResponse = {
  urls: { small: string };
  id: string;
};
