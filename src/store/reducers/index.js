import { combineReducers } from 'redux'
import { geolocationReducer } from './geolocation'
import { expandReducer } from './expand'

export default combineReducers({
    geoloc: geolocationReducer,
    expand: expandReducer
})