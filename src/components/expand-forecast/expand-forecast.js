import React from 'react'
import moment from "moment";
import './expand-forecast.scss'

export const ExpandForecast = ({ expandForecast }) => {
  const { id, name, list } = expandForecast;
  const _imgUrl = "http://openweathermap.org/img/wn/";

  return (
    <div className="expand" key={id}>
      <h1 className="expand__name">{name.toUpperCase()}</h1>
      <ul className="expand__list">
        <div className="expand__list__item">
          <div>{moment(list[0].dt_txt).format("dddd")}</div>
          <div>
            {list[0].main.temp.toFixed()}&deg;/
                    {list[4].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[4].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[4].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[8].dt_txt).format("dddd")}</div>
          <div>
            {list[8].main.temp.toFixed()}&deg;/
                    {list[12].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[12].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[12].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[16].dt_txt).format("dddd")}</div>
          <div>
            {list[16].main.temp.toFixed()}&deg;/
                    {list[20].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[20].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[20].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[24].dt_txt).format("dddd")}</div>
          <div>
            {list[24].main.temp.toFixed()}&deg;/
                    {list[28].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[28].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[28].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[list.length - 4].dt_txt).format("dddd")}</div>
          <div>
            {list[list.length - 4].main.temp.toFixed()}&deg;/
                    {list[list.length - 1].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[list.length - 1].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[list.length - 1].weather[0].description}</div>
        </div>
      </ul>
    </div>
  );
}

