import React from "react";

import moment from "moment";

import { Request } from "../../request";

import "./Expand.scss";

class Expand extends React.Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      expandForecast: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const request = new Request();
    if (this.props.location.state === undefined) {
      request.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${window.sessionStorage.getItem(
          "key"
        )}&units=metric&APPID=f32f005175f0b009bc5e5052a9f9722c`,
        responseJSON => {
          const expandForecast = JSON.parse(responseJSON);
          if (expandForecast || this._isMounted) {
            this.setState({
              expandForecast: [...this.state.expandForecast, expandForecast]
            });
          } else {
            console.error("Response is empty", responseJSON);
          }
        },
        e => {
          throw new Error(e);
        }
      );
    } else {
      request.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.props.location.state.name}&units=metric&APPID=f32f005175f0b009bc5e5052a9f9722c`,
        responseJSON => {
          const expandForecast = JSON.parse(responseJSON);
          if (expandForecast || this._isMounted) {
            this.setState({
              expandForecast: [...this.state.expandForecast, expandForecast]
            });
          } else {
            console.error("Response is empty", responseJSON);
          }
        },
        e => {
          throw new Error(e);
        }
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener(
      "beforeunload",
      window.sessionStorage.setItem("key", this.props.location.state.name)
    );
  }

  render() {
    return (
      <div>
        {this.state.expandForecast.map(item => {
          return (
            <div className="expand" key={item.city.id}>
              <h1>{item.city.name}</h1>
              <div className="expand__item">
                <div>{moment(item.list[0].dt_txt).format("dddd")}</div>
                <div>
                  {item.list[0].main.temp.toFixed()}&deg;/
                  {item.list[4].main.temp.toFixed()}&deg;
                </div>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.list[0].weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div>{item.list[0].weather[0].description}</div>
              </div>
              <div className="expand__item">
                <div>{moment(item.list[7].dt_txt).format("dddd")}</div>
                <div>
                  {item.list[7].main.temp.toFixed()}&deg;/
                  {item.list[11].main.temp.toFixed()}&deg;
                </div>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.list[7].weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div>{item.list[7].weather[0].description}</div>
              </div>
              <div className="expand__item">
                <div>{moment(item.list[15].dt_txt).format("dddd")}</div>
                <div>
                  {item.list[15].main.temp.toFixed()}&deg;/
                  {item.list[19].main.temp.toFixed()}&deg;
                </div>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.list[15].weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div>{item.list[15].weather[0].description}</div>
              </div>
              <div className="expand__item">
                <div>{moment(item.list[23].dt_txt).format("dddd")}</div>
                <div>
                  {item.list[23].main.temp.toFixed()}&deg;/
                  {item.list[27].main.temp.toFixed()}&deg;
                </div>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.list[23].weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div>{item.list[23].weather[0].description}</div>
              </div>
              <div className="expand__item">
                <div>{moment(item.list[31].dt_txt).format("dddd")}</div>
                <div>
                  {item.list[31].main.temp.toFixed()}&deg;/
                  {item.list[35].main.temp.toFixed()}&deg;
                </div>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.list[31].weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div>{item.list[31].weather[0].description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Expand;
