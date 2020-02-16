import { ITEM_LIST_ADD_ITEM, ITEM_LIST_ADD_RESPONSE, ITEM_LIST_DELETE_ITEM } from '../types'

const initialState = {
  inputItem: null,
  response: []
}

export const itemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_LIST_ADD_ITEM:
      return {
        ...state, inputItem: action.payload
      }
    case ITEM_LIST_ADD_RESPONSE:
      return {
        ...state,
        response: [...state.response, action.response]
      }
    case ITEM_LIST_DELETE_ITEM:
      return {
        ...state,
        response: state.response.filter(el => el.id !== action.payload)
      }
    default: return state
  }
}