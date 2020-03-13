import axios from "axios"
import { ITEM_LIST_GET_DATA, ITEM_LIST_DELETE_ITEM } from '../types'
import { URL_WEATHER, API_KEY_OW } from '../../constants';

export const itemListGetData = () => {
  return async (dispatch, getState) => {
    const { itemList: { response }, search: { inputItem } } = getState()
    if (inputItem) {
      const url = `${URL_WEATHER}q=${inputItem}&units=metric${API_KEY_OW}`
      await axios
        .get(url)
        .then(resp => {
          if (!response.some(i => i.name === resp.data.name)) {
            dispatch(itemListAddData([...response, transformData(resp)]))
          } else {
            return
          }
        })
        .catch(e => { console.error(e.config) });
    }
  }
}

const transformData = (result) => {
  return {
    id: result.data.id,
    name: result.data.name,
    temp: result.data.main.temp.toFixed(),
    icon: result.data.weather[0].icon,
    desc: result.data.weather[0].description
  }
}

const itemListAddData = value => {
  return {
    type: ITEM_LIST_GET_DATA,
    payload: value
  }
}

export const deleteItem = id => {
  return {
    type: ITEM_LIST_DELETE_ITEM,
    payload: id
  }
}


