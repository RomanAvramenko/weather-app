import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "./expand-forecast.scss";
import { ForecastData } from "../../types/types";

type RootState = {
  expand: { expandForecast: ForecastData };
};

export const ExpandForecast = () => {
  const { id, name, list }: ForecastData = useSelector(
    (state: RootState) => state.expand.expandForecast
  );
  const _imgUrl = "https://openweathermap.org/img/wn/";
  const weatherIcon = (index: number) =>
    `${_imgUrl}${list![index].icon}@2x.png`;
  return (
    <div className="expand" key={id}>
      <h1 className="expand__name">{name!.toUpperCase()}</h1>
      <ul className="expand__list">
        <div className="expand__list__item">
          {moment(list![0].date).format("dddd")}
          <div>
            {list![0].temp}&deg;/
            {list![1].temp}&deg;
          </div>
          <div>
            <img className="icon" src={weatherIcon(1)} alt="" />
          </div>
          <div>{list![1].desc}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![2].date).format("dddd")}</div>
          <div>
            {list![2].temp}&deg;/
            {list![3].temp}&deg;
          </div>
          <div>
            <img className="icon" src={weatherIcon(3)} alt="" />
          </div>
          <div>{list![3].desc}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![4].date).format("dddd")}</div>
          <div>
            {list![4].temp}&deg;/
            {list![5].temp}&deg;
          </div>
          <div>
            <img className="icon" src={weatherIcon(5)} alt="" />
          </div>
          <div>{list![5].desc}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![6].date).format("dddd")}</div>
          <div>
            {list![6].temp}&deg;/
            {list![7].temp}&deg;
          </div>
          <div>
            <img className="icon" src={weatherIcon(7)} alt="" />
          </div>
          <div>{list![7].desc}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list![8].date).format("dddd")}</div>
          <div>
            {list![8].temp}&deg;/
            {list![list!.length - 1].temp}&deg;
          </div>
          <div>
            <img className="icon" src={weatherIcon(list!.length - 1)} alt="" />
          </div>
          <div>{list![list!.length - 1].desc}</div>
        </div>
      </ul>
    </div>
  );
};
