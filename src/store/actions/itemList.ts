import axios from "axios";
import { ITEM_LIST_GET_DATA, ITEM_LIST_DELETE_ITEM } from "../types";
import { URL_WEATHER, API_KEY_OW } from "../../constants";
import { WeatherResponseType } from "../../types/types";

export type ItemListAddDataActionType = {
  type: typeof ITEM_LIST_GET_DATA;
  payload: Array<WeatherResponseType>;
};

export type ItemListDeleteItemActionType = {
  type: typeof ITEM_LIST_DELETE_ITEM;
  payload: number;
};

export const itemListGetData = () => async (
  dispatch: Function,
  getState: Function
) => {
  const {
    itemList: { response },
    search: { inputItem },
  } = getState();
  if (inputItem) {
    const url = `${URL_WEATHER}q=${inputItem}&units=metric${API_KEY_OW}`;
    await axios
      .get(url)
      .then((resp) => {
        if (
          !response.some((i: WeatherResponseType) => i.name === resp.data.name)
        ) {
          dispatch(itemListAddData([...response, transformData(resp)]));
        } else {
          return;
        }
      })
      .catch((e) => {
        console.error(e.config);
      });
  }
};

const transformData = (result: any) => {
  return {
    id: result.data.id,
    name: result.data.name,
    temp: result.data.main.temp.toFixed(),
    icon: result.data.weather[0].icon,
    desc: result.data.weather[0].description,
  };
};

const itemListAddData = (
  value: Array<WeatherResponseType>
): ItemListAddDataActionType => {
  return {
    type: ITEM_LIST_GET_DATA,
    payload: value,
  };
};

export const deleteItem = (id: number): ItemListDeleteItemActionType => {
  return {
    type: ITEM_LIST_DELETE_ITEM,
    payload: id,
  };
};
