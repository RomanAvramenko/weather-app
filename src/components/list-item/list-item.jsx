import React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import "./list-item.scss";

export const ListItem = ({ response, deleteItem }) => {
  return (
    <>
      {response.map(item => {
        const image = {
          backgroundImage:
            `url(https://openweathermap.org/img/wn/${item.icon}@2x.png)`
        }
        return (
          <li className="list-item" key={item.id}>
            <div className="list-item__temp">
              {item.temp}&deg;
            </div>
            <div className="list-item__img"
              style={image}>
            </div>
            <button
              className="list-item__btn"
              onClick={() => {
                deleteItem(item.id);
              }}>
              &#10006;
            </button>
            <div className="list-item__name">
              <span>{item.name}</span>
            </div>
            <Link
              to={{
                pathname: "/expand",
                state: { name: item.name }
              }}
              className="list-item__expand">
              Forecast for 5 days
              </Link>
          </li>
        );
      })}
    </>
  )
}

ListItem.propTypes = {
  response: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.func
}