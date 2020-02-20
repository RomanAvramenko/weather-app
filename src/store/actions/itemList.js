import { ITEM_LIST_ADD_ITEM } from '../types'

export const itemListAddItem = value => {
  return {
    type: ITEM_LIST_ADD_ITEM,
    payload: value
  }
}


