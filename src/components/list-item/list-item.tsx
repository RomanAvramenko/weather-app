import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import "./list-item.scss"
import { deleteItem } from '../../store/actions/itemList'
import { Spinner } from '../spinner/spinner'

type RootState = { itemList: object }

type Item = { response?: Items[] }

interface Items {
  icon: string;
  id: number;
  temp: number;
  name: string
}

export const ListItem = () => {
  const dispatch = useDispatch()
  const { response }: Item = useSelector((state: RootState) => state.itemList)

  const renderList = () => {
    return (
      response!.map(item => {
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
      })
    )
  }

  return (
    <>
      {
        !response
          ? <Spinner />
          : renderList()
      }
    </>
  )
}