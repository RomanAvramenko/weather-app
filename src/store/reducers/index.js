import { combineReducers } from 'redux'
import { geolocationReducer } from './geolocation'
import { expandReducer } from './expand'
import { itemListReducer } from './itemList'

export default combineReducers({
    geoloc: geolocationReducer,
    expand: expandReducer,
    itemList: itemListReducer
})