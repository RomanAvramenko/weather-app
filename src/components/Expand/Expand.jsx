import React from "react";
import moment from "moment";
import axios from "axios";

import "./expand.scss";

export default class Expand extends React.Component {
  _apiBase = "https://api.openweathermap.org/data/2.5/forecast?";
  _apiKey = "&APPID=f32f005175f0b009bc5e5052a9f9722c";
  _unsplashApiBase = "https://api.unsplash.com/search/photos?client_id=12d2d6b1c85dfb2d161d77513660ad8cc333ac66ea4bedb36b7691096b4c3dad"
  _isMounted = false;
  state = {
    expandForecast: [],
    imageResp: []
  };

  componentDidMount() {
    this._isMounted = true;
    const state = this.props.location.state
    if (state) {
      window.addEventListener(
        "beforeunload",
        window.sessionStorage.setItem("key", state.name)
      );
    }
    const loadData = undefined;
    axios
      .all([
        axios.get(
          `${this._apiBase}q=${
            loadData
              ? state.name
              : window.sessionStorage.getItem("key")
          }&units=metric${this._apiKey}`
        ),
        axios.get(
          `${this._unsplashApiBase}&page=1&query=${
            loadData
              ? state.name
              : window.sessionStorage.getItem("key")
          } city`
        )
      ])
      .then(
        axios.spread((result, imgResp) => {
          if (result.data || this._isMounted) {
            this.setState({
              expandForecast: [...this.state.expandForecast, result.data],
              imageResp: [...this.state.imageResp, imgResp.data]
            });
          } else {
            console.error("Response is empty", result.data);
          }
        })
      )
      .catch(e => {
        console.log(e.config);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.expandForecast.map(item => {
          const _imgUrl = "http://openweathermap.org/img/wn/";
          return (
            <div className="expand" key={item.city.id}>
              <h1 className="expand__name">{item.city.name.toUpperCase()}</h1>
              <ul className="expand__list">
                <div className="expand__list__item">
                  <div>{moment(item.list[0].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[0].main.temp.toFixed()}&deg;/
                    {item.list[4].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      src={`${_imgUrl}${item.list[0].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[0].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[7].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[7].main.temp.toFixed()}&deg;/
                    {item.list[11].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      src={`${_imgUrl}${item.list[7].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[7].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[15].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[15].main.temp.toFixed()}&deg;/
                    {item.list[19].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      src={`${_imgUrl}${item.list[15].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[15].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[23].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[23].main.temp.toFixed()}&deg;/
                    {item.list[27].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      src={`${_imgUrl}${item.list[23].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[23].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[31].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[31].main.temp.toFixed()}&deg;/
                    {item.list[35].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      src={`${_imgUrl}${item.list[31].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[31].weather[0].description}</div>
                </div>
              </ul>
            </div>
          );
        })}
        {this.state.imageResp.map(i => {
          const randPicture = Math.floor(Math.random() * 10)
          return (
            <img
              src={`${i.results[randPicture].urls.regular}`}
              alt=""
              className="expand__bg"
              key={i.results[0].id}
            />
          );
        })}
      </div>
    );
  }
}
