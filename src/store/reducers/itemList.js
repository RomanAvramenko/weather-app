import { ITEM_LIST_GET_DATA, ITEM_LIST_DELETE_ITEM } from '../types'

const initialState = {
  response: []
}

export const itemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_LIST_GET_DATA:
      return {
        ...state,
        response: action.payload
      }
    case ITEM_LIST_DELETE_ITEM:
      return {
        ...state,
        response: [...state.response.filter(el => el.id !== action.payload)]
      }
    default: return state
  }
}