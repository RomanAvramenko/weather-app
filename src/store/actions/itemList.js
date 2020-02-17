import { ITEM_LIST_ADD_ITEM, ITEM_LIST_ADD_RESPONSE, ITEM_LIST_DELETE_ITEM, ITEM_LIST_RESTORE } from '../types'
import { loadStorage } from '../localStorage'

export const itemListAddItem = value => {
  return {
    type: ITEM_LIST_ADD_ITEM,
    payload: value
  }
}

export const itemListDeleteItem = (id) => {
  return {
    type: ITEM_LIST_DELETE_ITEM,
    payload: id
  }
}

export const itemListRestore = () => {
  return {
    type: ITEM_LIST_RESTORE,
    payload: loadStorage()
  }
}

export const itemListAddResponse = respData => {
  return {
    type: ITEM_LIST_ADD_RESPONSE,
    response: transformData(respData)
  }
}

const transformData = result => {
  console.log(result);
  return {
    id: result.data.id,
    name: result.data.name,
    temp: result.data.main.temp.toFixed(),
    icon: result.data.weather[0].icon,
    desc: result.data.weather[0].description
  }
}


