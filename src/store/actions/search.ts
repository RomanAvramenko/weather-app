import { SEARCH_ITEM } from "../types";

export type SearchItemActionType = {
  type: typeof SEARCH_ITEM,
  payload: string
};

export const searchItem = (value: string): SearchItemActionType => {
  return {
    type: SEARCH_ITEM,
    payload: value,
  };
};
