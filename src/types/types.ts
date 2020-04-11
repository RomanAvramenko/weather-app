export type RootState = {
  geoloc: {
    geoWeather: WeatherResponseType;
  };
  search: Search;
  itemList: ListDataType;
  expand: ExpandType;
};

type Search = {
  inputItem?: string;
};

export type ListDataType = {
  response?: Array<WeatherResponseType>;
};

export type WeatherResponseType = {
  id: number;
  name?: string;
  temp?: string;
  icon?: string;
  desc?: string;
};

export type ExpandType = {
  expandForecast: ForecastData | null;
  imageResp?: Array<ImageResponse>;
  loading?: boolean;
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

export type ImageResponse = {
  urls: { small: string };
  id: string;
};
