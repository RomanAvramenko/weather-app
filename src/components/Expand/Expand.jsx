import React from "react";
import moment from "moment";
import axios from "axios";
import Spinner from "../spinner";
import { URL_FORECAST, API_KEY_OW, URL_IMAGE, API_KEY_US } from "../../constants"

import "./expand.scss";

export default class Expand extends React.Component {
  _isMounted = false;
  state = {
    expandForecast: [],
    imageResp: [],
    parsedData: [],
    loading: true
  };

  componentDidMount() {
    this._isMounted = true;
    this.getData()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getData() {
    const state = this.props.location.state
    if (state) {
      window.addEventListener(
        "beforeunload",
        window.sessionStorage.setItem("key", state.name)
      );
    }
    const loadData = undefined;
    const stateCheck = loadData ? state.name : window.sessionStorage.getItem("key");
    const urlWeather = `${URL_FORECAST}q=${stateCheck}&units=metric${API_KEY_OW}`;
    const urlImage = `${URL_IMAGE + API_KEY_US}&page=1&query=${stateCheck} city`;
    await axios
      .all([
        axios.get(urlWeather),
        axios.get(urlImage)
      ])
      .then(
        axios.spread((result, imgResp) => {
          this.setState({
            expandForecast: [...this.state.expandForecast, result.data],
            imageResp: [...this.state.imageResp, imgResp.data],
            loading: false,
          });
          this.stateParser()
        })
      )
      .catch(e => {
        console.log(e.config);
      });
  }

  stateParser = () => {
    this.state.expandForecast.map(item => {
      const currentDay = item.list[0].dt_txt.replace(/ .*$/, '');
      item.list.map((date) => {
        const days = date.dt_txt.replace(/ .*$/, '');
        if (currentDay === days) {
          item.list.splice(0, 2)
        }
        return date;
      });
      this.setState({ expandForecast: [...this.state.expandForecast[0], item.list] });
      return item;
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner/>
      );
    }
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
