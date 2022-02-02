import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import "./expand-forecast.scss";

export const ExpandForecast = () => {
  const { id, name, list }: any = useSelector(
    //Change Type
    (state: AppStateType) => state.expand.expandForecast
  );
  const _imgUrl = "https://openweathermap.org/img/wn/";

  const weatherIcon = (icon: string) => `${_imgUrl}${icon}@2x.png`;

  return (
    <div className="expand" key={id}>
      <h1 className="expand__name">{name!.toUpperCase()}</h1>
      <ul className="expand__list">
        {list.map((i: any, idx: string) => {
          return (
            <div className="expand__list__item" key={idx}>
              {i.day}
              <div>
                {i.minTemp}&deg;/
                {i.maxTemp}&deg;
              </div>
              <div>
                <img className="icon" src={weatherIcon(i.icon)} alt="" />
              </div>
              <div>{i.description}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
