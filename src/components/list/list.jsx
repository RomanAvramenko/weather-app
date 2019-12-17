import React from "react";
import axios from "axios";
import { GeolocationItem } from "../geolocation-item/geolocationItem";
import { ListItem } from '../list-item/list-item';
import { URL_WEATHER, API_KEY_OW } from "../../constants";
import "./list.scss";

export class List extends React.Component {
  state = {
    items: [],
    currentItem: "",
    response: [],
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener("beforeunload", this.saveStateToLocalStorage);
    this.request();
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.state;
    if (prevState.items !== items) {
      const url = `${URL_WEATHER}q=${items[items.length - 1].text}&units=metric${API_KEY_OW}`;
      axios
        .get(url)
        .then(response => { this.setState({ response: [...this.state.response, response.data] }) })
        .catch(e => { console.error(e.config) });
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
      const url = `${URL_WEATHER}q=${item.text}&units=metric${API_KEY_OW}`
      axios
        .get(url)
        .then(result => { this.setState({ response: this._transformData(result) }) })
        .catch(e => { console.log(e.config); });
    });
  };

  _transformData = (result) => {
    return {
      id: result.data.id,
      name: result.data.name,
      temp: result.data.main.temp.toFixed(),
      icon: result.data.weather[0].icon,
      desc: result.data.weather[0].description
    }
  }

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
      .map(e => { return e.name.toLowerCase() })
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
      <div className="box">
        <form className="box__form" onSubmit={this.addItem}>
          <label>
            <input
              type="text"
              className="box__form__input"
              placeholder="City Name"
              value={this.currentItem}
              onChange={this.updateInput}
            />
          </label>
          <input className="box__form__btn" type="submit" value="Add" />
        </form>
        <ul className="box__list">
          <GeolocationItem />
          <ListItem response={this.state.response}
            deleteItem={this.deleteItem} />
        </ul>
      </div>
    );
  }
}
