import { SEARCH_ITEM } from "../types"

export const searchItem = value => {
  return {
    type: SEARCH_ITEM,
    payload: value
  }
}