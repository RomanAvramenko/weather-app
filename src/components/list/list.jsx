import React, { useState, useEffect } from "react"
import axios from "axios"
import { URL_WEATHER, API_KEY_OW } from "../../constants"
import { GeolocationItem } from "../geolocation-item/geolocationItem"
import { ListItem } from '../list-item/list-item'
import { ErrorBoundary } from "../error-boundary/error-boundary"
import { SearchBar } from "../search-bar/search-bar"
import "./list.scss";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
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
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error);
    }
  }
  return [storedValue, setValue]
}

export const List = () => {

  const [items, setItems] = useLocalStorage("items", [])
  const [response, setResponse] = useLocalStorage("response", [])

  useEffect(() => {
    if (items.length > 0) {
      const url = `${URL_WEATHER}q=${items[items.length - 1]}&units=metric${API_KEY_OW}`
      axios
        .get(url)
        .then(resp => {
          if (!response.some(i => i.name === resp.data.name)) {
            setResponse([...response, transformData(resp)])
            setItems([])
          } else {
            setItems([])
          }
        })
        .catch(e => { console.error(e.config) });
    }
    return () => {
    }
  }, [items])

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

  const addItem = (item) => {
    if (!items.includes(item)) {
      setItems([...items, item])
    }
  }

  return (
    <div className="box">
      <SearchBar
        response={response}
        onAddData={addItem}
      />
      <ul className="box__list">
        <ErrorBoundary>
          <GeolocationItem />
          <ListItem
            response={response}
            deleteItem={deleteItem} />
        </ErrorBoundary>
      </ul>
    </div>
  );
}