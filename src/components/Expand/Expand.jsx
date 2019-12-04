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
    imageResp: [],
    parsedData: []
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
            this.stateParser()
          } else {
            console.error("Response is empty", result.data);
          }
        })
      )
      .catch(e => {
        console.error(e.config);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  stateParser = () => {
    this.state.expandForecast.map(item => {
      const currentDay = moment(item.list[0].dt_txt).format('dddd');
      item.list.forEach((date, index) => {
        const days = moment(date.dt_txt).format('LLLL').replace(/,.*$/, '');
        let temp = 0;
        if (currentDay === days) {
          temp++;
        }
        item.list.splice(index, temp)
      });
      this.setState({ expandForecast: [...this.state.expandForecast[0], item.list] });
    })
  }

  render() {
    console.log(this.state.expandForecast);
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
                      className="icon"
                      src={`${_imgUrl}${item.list[4].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[4].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[8].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[8].main.temp.toFixed()}&deg;/
                    {item.list[12].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={`${_imgUrl}${item.list[12].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[12].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[16].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[16].main.temp.toFixed()}&deg;/
                    {item.list[20].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={`${_imgUrl}${item.list[20].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[20].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[24].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[24].main.temp.toFixed()}&deg;/
                    {item.list[28].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={`${_imgUrl}${item.list[28].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[28].weather[0].description}</div>
                </div>
                <div className="expand__list__item">
                  <div>{moment(item.list[32].dt_txt).format("dddd")}</div>
                  <div>
                    {item.list[32].main.temp.toFixed()}&deg;/
                    {item.list[36].main.temp.toFixed()}&deg;
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={`${_imgUrl}${item.list[36].weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                  <div>{item.list[36].weather[0].description}</div>
                </div>
              </ul>
            </div>
          );
        })}
        {this.state.imageResp.map(i => {
          const randPicture = Math.floor(Math.random() * 10);
          const bgImage = {
            backgroundImage: `url(${i.results[randPicture].urls.small})`
          }
          return (
            <div
              className="expand__bg"
              key={i.results[0].id}
              style={bgImage}
            >
            </div>
          );
        })}
      </div>
    );
  }
}
