import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { GeolocationItem } from "../geolocation-item/geolocationItem"
import { ListItem } from '../list-item/list-item'
import { SearchBar } from "../search-bar/search-bar"
import { itemListGetData } from '../../store/actions/itemList'
import "./list.scss";

type RootState = { search: object }

type Search = { inputItem?: string}

export const List = () => {

  const dispatch = useDispatch()
  const { inputItem }: Search = useSelector((state: RootState) => state.search)

  useEffect(() => {
    dispatch(itemListGetData())
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