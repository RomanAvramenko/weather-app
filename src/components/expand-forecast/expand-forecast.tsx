import React from 'react'
import { useSelector } from 'react-redux'
import moment from "moment";
import './expand-forecast.scss'

type RootState = {
  expand: { expandForecast: object }
}

interface Weather {
  description: string,
  icon: string,
}

interface List {
  weather: Weather[],
  main: { temp: number },
  dt_txt: string
}

interface Forecast {
  id?: number,
  name?: string,
  list?: List[]
}

export const ExpandForecast = () => {
  const { id, name, list }: Forecast = useSelector((state: RootState) => state.expand.expandForecast)
  const _imgUrl = "https://openweathermap.org/img/wn/";
  const weatherIcon = (index: number) => `${_imgUrl}${list![index].weather[0].icon}@2x.png`
  return (
    <div className="expand" key={id}>
      <h1 className="expand__name">{name!.toUpperCase()}</h1>
      <ul className="expand__list">
        <div className="expand__list__item">
          {moment(list![0].dt_txt).format("dddd")}
          <div>
            {list![0].main.temp.toFixed()}&deg;/
            {list![1].main.temp.toFixed()}&deg;
          </div>
          <div>
            <img
              className="icon"
              src={weatherIcon(1)}
              alt=""
            />
          </div>
          <div>{list![1].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![2].dt_txt).format("dddd")}</div>
          <div>
            {list![2].main.temp.toFixed()}&deg;/
            {list![3].main.temp.toFixed()}&deg;
          </div>
          <div>
            <img
              className="icon"
              src={weatherIcon(3)}
              alt=""
            />
          </div>
          <div>{list![3].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![4].dt_txt).format("dddd")}</div>
          <div>
            {list![4].main.temp.toFixed()}&deg;/
            {list![5].main.temp.toFixed()}&deg;
          </div>
          <div>
            <img
              className="icon"
              src={weatherIcon(5)}
              alt=""
            />
          </div>
          <div>{list![5].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![6].dt_txt).format("dddd")}</div>
          <div>
            {list![6].main.temp.toFixed()}&deg;/
            {list![7].main.temp.toFixed()}&deg;
          </div>
          <div>
            <img
              className="icon"
              src={weatherIcon(7)}
              alt=""
            />
          </div>
          <div>{list![7].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![8].dt_txt).format("dddd")}</div>
          <div>
            {list![8].main.temp.toFixed()}&deg;/
            {list![list!.length - 1].main.temp.toFixed()}&deg;
          </div>
          <div>
            <img
              className="icon"
              src={weatherIcon(list!.length - 1)}
              alt=""
            />
          </div>
          <div>{list![list!.length - 1].weather[0].description}</div>
        </div>
      </ul>
    </div>
  );
}