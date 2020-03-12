import { SEARCH_ITEM } from "../types"

const initialState = {
    inputItem: null
}

export const searchItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ITEM:
            return {
                ...state,
                inputItem: action.payload
            }
        default: return state

    }
}