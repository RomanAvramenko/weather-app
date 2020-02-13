import { EXPAND_FORECAST_DATA } from "../types"


export const expandForecastReceive = (result, imgData) => {
	return {
		type: EXPAND_FORECAST_DATA,
		forecastData: transformForecastData(result),
		forecastImage: imgData.data.results
	}
}

const transformForecastData = (result) => {
	return {
		id: result.data.city.id,
		name: result.data.city.name,
		list: stateParser(result.data.list)
	}
}

const stateParser = (list) => {
	const currentDay = list[0].dt_txt.replace(/ .*$/, '');
	const filteredDays = [];
	list.map(item => {
		const days = item.dt_txt.replace(/ .*$/, '');
		if (currentDay !== days) {
			filteredDays.push(item)
		}
		return item
	})
	return filteredDays.filter((i, index) => index % 4 === 0);
}