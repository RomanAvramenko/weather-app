const openweatherUrl = 'https://api.openweathermap.org/data/2.5/';

export const URL_FORECAST = `${openweatherUrl}forecast?`;
export const URL_WEATHER = `${openweatherUrl}weather?`;
export const API_KEY_OW = `&APPID=${process.env.REACT_APP_OPEN_WEATHER_APIKEY}`;
export const URL_IMAGE = "https://api.unsplash.com/search/photos?";
export const API_KEY_US= `client_id=${process.env.REACT_APP_UNSPLASH_APIKEY}`;

