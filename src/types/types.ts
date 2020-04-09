export type ListDataType = {
  response?: Array<ListItemDataType>;
};

type ListItemDataType = {
  icon: string;
  id: number;
  temp: number;
  name: string;
};

export type WeatherResponseType = {
  id?: number;
  name?: string;
  temp?: string;
  icon?: string;
  desc?: string;
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

export type ForecastImageType = {
  imageResp?: Array<ImageResponse>;
};

export type ImageResponse = {
  urls: { small: string };
  id: string;
};
