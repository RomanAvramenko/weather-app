import React from 'react'
import PropTypes from 'prop-types'
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
                    {list[1].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[1].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[1].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[2].dt_txt).format("dddd")}</div>
          <div>
            {list[2].main.temp.toFixed()}&deg;/
                    {list[3].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[3].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[3].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[4].dt_txt).format("dddd")}</div>
          <div>
            {list[4].main.temp.toFixed()}&deg;/
                    {list[5].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[5].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[5].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[6].dt_txt).format("dddd")}</div>
          <div>
            {list[6].main.temp.toFixed()}&deg;/
                    {list[7].main.temp.toFixed()}&deg;
                  </div>
          <div>
            <img
              className="icon"
              src={`${_imgUrl}${list[7].weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div>{list[7].weather[0].description}</div>
        </div>
        <div className="expand__list__item">
          <div>{moment(list[list.length - 2].dt_txt).format("dddd")}</div>
          <div>
            {list[list.length - 2].main.temp.toFixed()}&deg;/
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

ExpandForecast.propTypes = {
  expandForecast: PropTypes.object
}

