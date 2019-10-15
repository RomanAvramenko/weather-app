import React from "react";
import moment from "moment";
import axios from "axios";

import "./Expand.scss";

class Expand extends React.Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      expandForecast: [],
      imageResp: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.location.state) {
      window.addEventListener(
        "beforeunload",
        window.sessionStorage.setItem("key", this.props.location.state.name)
      );
    }
    const loadData = undefined;
    axios
      .all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${
            loadData
              ? this.props.location.state.name
              : window.sessionStorage.getItem("key")
          }&units=metric&APPID=f32f005175f0b009bc5e5052a9f9722c`
        ),
        axios.get(
          `https://api.unsplash.com/search/photos?client_id=12d2d6b1c85dfb2d161d77513660ad8cc333ac66ea4bedb36b7691096b4c3dad&page=1&query=${
            loadData
              ? this.props.location.state.name
              : window.sessionStorage.getItem("key")
          } architecture`
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
        {this.state.imageResp.map(i => {
          return(
            <img src={`${i.results[0].urls.regular}`} alt='' className="expand__bg" key={i.results[0].id}/>
          )
        })
        }
      </div>
    );
  }
}

export default Expand;
