import React from "react";
import moment from "moment";
import axios from "axios";
import { Spinner } from "../spinner/spinner";
import { URL_FORECAST, API_KEY_OW, URL_IMAGE, API_KEY_US } from "../../constants"

import "./expand.scss";

export class Expand extends React.Component {
  _isMounted = false;
  state = {
    expandForecast: null,
    imageResp: [],
    parsedData: [],
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
    const urlImage = `${URL_IMAGE + API_KEY_US}&page=1&query=${stateCheck} city buildings`;
    await axios
      .all([
        axios.get(urlWeather),
        axios.get(urlImage)
      ])
      .then(
        axios.spread((result, imgResp) => {
          this.setState({
            expandForecast: this._transformData(result),
            imageResp: [...this.state.imageResp, imgResp.data],
          });
          this.stateParser()
        })
      )
      .catch(e => {
        console.log(e.config);
      });
  }

  _transformData = (result) => {
    return {
      id: result.data.city.id,
      name: result.data.city.name,
      list: this.stateParser(result.data.list)
    }
  }

  stateParser = (list) => {
    const currentDay = list[0].dt_txt.replace(/ .*$/, '');
    const filteredDays = [];
    list.map(item => {
      const days = item.dt_txt.replace(/ .*$/, '');
      if (currentDay !== days) {
        filteredDays.push(item)
      }
      return item
    });
    return filteredDays;
  }

  render() {
    if (this.state.expandForecast === null) {
      return (
        <Spinner />
      );
    }
    const { id, name, list } = this.state.expandForecast;
    const _imgUrl = "http://openweathermap.org/img/wn/";
    return (
      <div>
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
              <div>{moment(list[32].dt_txt).format("dddd")}</div>
              <div>
                {list[32].main.temp.toFixed()}&deg;/
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
