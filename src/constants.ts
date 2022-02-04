type Constants = string;

const openweatherUrl: Constants = "https://api.openweathermap.org/data/2.5/";

export const URL_FORECAST: Constants = `${openweatherUrl}forecast?`;
export const URL_WEATHER: Constants = `${openweatherUrl}weather?`;
export const API_KEY_OW: Constants = `&APPID=f32f005175f0b009bc5e5052a9f9722c`;
export const URL_IMAGE: Constants = "https://api.unsplash.com/search/photos?";
export const API_KEY_US: Constants = `client_id=12d2d6b1c85dfb2d161d77513660ad8cc333ac66ea4bedb36b7691096b4c3dad`;
