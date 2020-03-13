import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import "./list-item.scss"
import { deleteItem } from '../../store/actions/itemList'

export const ListItem = () => {
  const dispatch = useDispatch()
  const { response } = useSelector((state) => state.itemList)

  return (
    <>
      {response.map(item => {
        const image = {
          backgroundImage: `url(https://openweathermap.org/img/wn/${item.icon}@2x.png)`
        }
        return (
          <li className="list-item" key={item.id}>
            <div className="list-item__temp">{item.temp}&deg;</div>
            <div className="list-item__img" style={image}></div>
            <button
              className="list-item__btn"
              onClick={() => dispatch(deleteItem(item.id))}
            >
              <i className="fas fa-times"></i>
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
              more &nbsp;
              <i className="fas fa-angle-double-right"></i>
            </Link>
          </li>
        );
      })}
    </>
  )
}