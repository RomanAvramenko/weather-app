import React from "react"
import axios from "axios"
import { URL_WEATHER, API_KEY_OW } from "../../constants"
import { GeolocationItem } from "../geolocation-item/geolocationItem"
import { ListItem } from '../list-item/list-item'
import ErrorBoundary from "../error-boundary/error-boundary"
import { SearchBar } from "../search-bar/search-bar"
import "./list.scss";

export class List extends React.Component {
  state = {
    items: [],
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
      const url = `${URL_WEATHER}q=${items}&units=metric${API_KEY_OW}`;
      axios
        .get(url)
        .then(response => {
          return (
            !!this.checkRepeat(response) === false
              ? this.setState({ response: [...this.state.response, this.transformData(response)] })
              : null
          )
        })
        .catch(e => { console.error(e.config) });
    }
  }

  checkRepeat = (res) => {
    const current = res.data.id
    this.state.response.map(i => i.id).includes(current)
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
        .then(result => { this.setState({ response: this.transformData(result) }) })
        .catch(e => { console.log(e.config); });
    });
  };

  transformData = (result) => {
    return {
      id: result.data.id,
      name: result.data.name,
      temp: result.data.main.temp.toFixed(),
      icon: result.data.weather[0].icon,
      desc: result.data.weather[0].description
    }
  }

  deleteItem = id => {
    this.setState({
      response: this.state.response.filter(el => el.id !== id)
    });
    localStorage.removeItem(id);
  }

  addItem = (item) => {
    this.setState({
      items: item
    })
  }

  render() {
    return (
      <div className="box">
        <SearchBar
          response={this.state.response}
          onAddData={this.addItem}
        />
        <ul className="box__list">
          <ErrorBoundary>
            <GeolocationItem />
            <ListItem
              response={this.state.response}
              deleteItem={this.deleteItem} />
          </ErrorBoundary>
        </ul>
      </div>
    );
  }
}
