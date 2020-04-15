import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { GeolocationItem } from "../geolocation-item/geolocationItem"
import { ListItem } from '../list-item/list-item'
import { SearchBar } from "../search-bar/search-bar"
import { AppStateType } from "../../store/store"
import { getItemListData } from "../../store/actions/itemList"
import "./list.scss";

export const List = () => {

  const dispatch = useDispatch()
  const { inputItem } = useSelector((state: AppStateType) => state.search)

  useEffect(() => {
    dispatch(getItemListData())
    // eslint-disable-next-line
  }, [inputItem])

  return (
    <div className="box">
      <SearchBar/>
      <ul className="box__list">
        <GeolocationItem />
        <ListItem/>
      </ul>
    </div>
  );
}