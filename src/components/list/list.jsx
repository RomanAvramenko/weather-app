import React, { useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import { URL_WEATHER, API_KEY_OW } from "../../constants"
import { GeolocationItem } from "../geolocation-item/geolocationItem"
import { ListItem } from '../list-item/list-item'
import { SearchBar } from "../search-bar/search-bar"
import "./list.scss";
import { itemListAddResponse } from "../../store/actions/itemList"

export const List = () => {

  const dispatch = useDispatch()
  const { inputItem, response } = useSelector(state => state.itemList)

  useEffect(() => {
    const getData = async () => {
      if (inputItem) {
        const url = `${URL_WEATHER}q=${inputItem}&units=metric${API_KEY_OW}`
        await axios
          .get(url)
          .then(resp => {
            if (!response.some(i => i.name === resp.data.name)) {
              dispatch(itemListAddResponse(resp))
            } else {
              return
            }
          })
          .catch(e => { console.error(e.config) });
      }
    }
    getData()
    // eslint-disable-next-line
  }, [inputItem])

  return (
    <div className="box">
      <SearchBar />
      <ul className="box__list">
        <GeolocationItem />
        <ListItem />
      </ul>
    </div>
  );
}