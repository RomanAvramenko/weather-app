import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './search-bar.scss'
import { searchItem } from '../../store/actions/search'

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch()
  const [item, setItem] = useState('')

  const addItem = (event:React.FormEvent<EventTarget>): void => {
    dispatch(searchItem(item))
    setItem('')
    event.preventDefault();
  }

  return (
    <>
      <form className="search__form" onSubmit={addItem}>
        <label>
          <input
            type="text"
            className="search__form__input"
            placeholder="City Name"
            value={item}
            onChange={event => setItem(event.target.value.toLowerCase())}
          />
        </label>
        <input className="search__form__btn" type="submit" value="Add" />
      </form>
    </>
  )
}