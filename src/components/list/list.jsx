import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from 'react-redux'
import { URL_WEATHER, API_KEY_OW } from "../../constants"
import { GeolocationItem } from "../geolocation-item/geolocationItem"
import { ListItem } from '../list-item/list-item'
import { SearchBar } from "../search-bar/search-bar"
import "./list.scss";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  })
  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error);
    }
  }
  return [storedValue, setValue]
}

export const List = () => {

  //const dispatch = useDispatch()
  const item = useSelector(state => state.itemList.inputItem)
  const [response, setResponse] = useLocalStorage("response", [])

  useEffect(() => {
    const getData = async () => {
      if (item) {
        const url = `${URL_WEATHER}q=${item}&units=metric${API_KEY_OW}`
        await axios
          .get(url)
          .then(resp => {
            if (!response.some(i => i.name === resp.data.name)) {
              setResponse([...response, transformData(resp)])
            } else {
              return
            }
          })
          .catch(e => { console.error(e.config) });
      }
    }
    getData()
    // eslint-disable-next-line
  }, [item])

  const transformData = (result) => {
    return {
      id: result.data.id,
      name: result.data.name,
      temp: result.data.main.temp.toFixed(),
      icon: result.data.weather[0].icon,
      desc: result.data.weather[0].description
    }
  }

  const deleteItem = id => {
    setResponse(response.filter(el => el.id !== id))
  }

  return (
    <div className="box">
      <SearchBar
        response={response}
      />
      <ul className="box__list">
        <GeolocationItem />
        <ListItem
          response={response}
          deleteItem={deleteItem} />
      </ul>
    </div>
  );
}