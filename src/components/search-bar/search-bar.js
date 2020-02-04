import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './search-bar.scss'

export const SearchBar = ({ response, onAddData }) => {
  const [item, setItem] = useState('')

  const addItem = e => {
    const index = response
      .map(e => { return e.name.toLowerCase() })
      .includes(item);
    if (item !== "" && index === false && isNaN(parseInt(item))) {
      onAddData(item)
    }
    setItem('')
    e.preventDefault();
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

SearchBar.propTypes = {
  response: PropTypes.arrayOf(PropTypes.object),
  onAddData: PropTypes.func
}
