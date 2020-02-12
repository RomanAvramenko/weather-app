import { GEOLOCATION_WEATHER_DATA } from "../types"

export const geolocationReceive = (result) => {
  return {
    type: GEOLOCATION_WEATHER_DATA,
    payload: transformData(result)
  }
}

const transformData = result => {
  return {
    id: result.data.id,
    name: result.data.name,
    temp: result.data.main.temp.toFixed(),
    icon: result.data.weather[0].icon,
    desc: result.data.weather[0].description
  }
}