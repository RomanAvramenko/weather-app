import { ITEM_LIST_ADD_ITEM } from '../types'

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
    default: return state
  }
}