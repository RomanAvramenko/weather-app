import { ITEM_LIST_GET_DATA, ITEM_LIST_DELETE_ITEM } from "../types";
import { WeatherResponseType } from "../../types/types";
import { ItemListAddDataActionType, ItemListDeleteItemActionType } from "../actions/itemList";

type InitialStateType = {
  response: Array<WeatherResponseType>;
};

const initialState: InitialStateType = {
  response: []
};

export const itemListReducer = (
  state = initialState,
  action: ItemListAddDataActionType | ItemListDeleteItemActionType
): InitialStateType => {
  switch (action.type) {
    case ITEM_LIST_GET_DATA:
      return {
        ...state,
        response: action.payload,
      };
    case ITEM_LIST_DELETE_ITEM:
      return {
        ...state,
        response: [
          ...state.response.filter((el: WeatherResponseType) => el.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
