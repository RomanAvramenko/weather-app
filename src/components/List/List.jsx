import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import GeolocationItem from "../geolocation-item";

import "./list.scss";

export default class List extends React.Component {
  _apiBase = "https://api.openweathermap.org/data/2.5/weather?";
  _apiKey = "&APPID=f32f005175f0b009bc5e5052a9f9722c";
  state = {
    items: [],
    currentItem: "",
    response: []
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener("beforeunload", this.saveStateToLocalStorage);
    this.request();
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.state;
    if (prevState.items !== items) {
      axios
        .get(
          `${this._apiBase}q=${items[items.length - 1].text}&units=metric${this._apiKey}`
        )
        .then(response => {
          if (response.data) {
            this.setState({
              response: [...this.state.response, response.data]
            });
          } else {
            console.error("Response is empty", response.data);
          }
        })
        .catch(e => {
          console.error(e.config);
        });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage);

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("response")) {
      let value = localStorage.getItem("response");
      try {
        value = JSON.parse(value);
        this.setState({ response: value });
      } catch (e) {
        console.error({ response: value });
      }
    }
  };

  saveStateToLocalStorage = () => {
    for (let id in this.state) {
      localStorage.setItem(id, JSON.stringify(this.state[id]));
    }
  };

  request = () => {
    this.state.items.forEach(item => {
      axios
        .get(
          `${this._apiBase}q=${item.text}&units=metric${this._apiKey}`
        )
        .then(response => {
          if (response.data) {
            this.setState({
              response: [...this.state.response, response.data]
            });
          } else {
            console.error("Response is empty", response.data);
          }
        })
        .catch(e => {
          console.log(e.config);
        });
    });
  };

  updateInput = e => {
    const itemText = e.target.value.toLowerCase();
    const currentItem = {
      text: itemText
    };
    this.setState({
      currentItem
    });
  };

  addItem = e => {
    const newItem = this.state.currentItem;
    const index = this.state.response
      .map(e => {
        return e.name.toLowerCase();
      })
      .includes(newItem.text);
    if (newItem.text !== "" && index === false) {
      const items = [...this.state.items];
      items.push(newItem);
      this.setState(
        {
          items: items,
          currentItem: { text: "" }
        }
      );
    }
    e.target.reset();
    e.preventDefault();
  };

  deleteItem = id => {
    this.setState({
      response: this.state.response.filter(el => el.id !== id)
    });
    localStorage.removeItem(id);
  };

  render() {
    return (
      <div className="listMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <label>
              <input
                type="text"
                className="headerInput"
                placeholder="Enter the City Name"
                value={this.currentItem}
                onChange={this.updateInput}
              />
            </label>
            <input className="headerBtn" type="submit" value="Add City" />
          </form>
          <ul className="theList">
            <GeolocationItem />
            <React.Fragment>
              {this.state.response.map(item => {
                return (
                  <li key={item.id} className="theListItem">
                    <div className="theListItem__temp">
                      <span>{item.main.temp.toFixed()}&deg;</span>
                    </div>
                    <div className="theListItem__img">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                    <div className="theListItem__name">
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <Link
                        to={{
                          pathname: "/expand",
                          state: { name: item.name }
                        }}
                        className="theListItem__expand"
                      >
                        Forecast for 5 days
                      </Link>
                    </div>
                    <button
                      className="theListItem__btn"
                      onClick={() => {
                        this.deleteItem(item.id);
                      }}
                    >
                      &#10006;
                    </button>
                  </li>
                );
              })}
            </React.Fragment>
          </ul>
        </div>
      </div>
    );
  }
}
