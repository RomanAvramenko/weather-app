import { createStore } from 'redux'
import { geolocationReducer } from './reducers/geolocation'

export const store = createStore(geolocationReducer)
