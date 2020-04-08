import { SEARCH_ITEM } from "../types";
import {SearchItemActionType} from "../actions/search"

type InitialStateType = {
  inputItem: string | null;
};

const initialState: InitialStateType = {
  inputItem: null,
};

export const searchItemReducer = (
  state = initialState,
  action: SearchItemActionType
): InitialStateType => {
  switch (action.type) {
    case SEARCH_ITEM:
      return {
        ...state,
        inputItem: action.payload,
      };
    default:
      return state;
  }
};
