import React from "react";

import { Link } from "react-router-dom";

import { Request } from "../../request";

import "./ListItem.scss";

class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      response: []
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let id in this.state) {
      localStorage.setItem(id, JSON.stringify(this.state[id]));
    }
  }

  handleClick() {
    const request = new Request();
    request.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.props.currentItem.text}&units=metric&APPID=f32f005175f0b009bc5e5052a9f9722c`,
      responseJSON => {
        const response = JSON.parse(responseJSON);
        if (response) {
          localStorage.setItem("response", JSON.stringify(response));
          this.setState({
            response: [
              ...this.state.response,
              JSON.parse(localStorage.getItem("response"))
            ]
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

  deleteItem(id) {
    this.setState({
      response: this.state.response.filter(el => el.id !== id)
    });
    localStorage.removeItem(id);
  }

  render() {
    return this.state.response.map(item => {
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
          <div className="theListItem__expand">
            <Link
              to={{
                pathname: "/expand",
                state: { name: item.name }
              }}
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
    });
  }
}

export default ListItem;
