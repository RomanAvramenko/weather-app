import React from "react";

import GeolocationItem from "../GeolocationItem/GeolocationItem.jsx";
import ListItem from "../ListItem/ListItem.jsx";

import "./List.scss";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [{ text: "kiev" }],
      currentItem: ""
    };
    this.addItem = this.addItem.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items];
      items.push(newItem);
      this.setState({
        items: items,
        currentItem: { text: "" }
      });
    }
    e.target.reset();
  }

  updateInput(e) {
    const itemText = e.target.value;
    const lowerCaseText = itemText.toLowerCase();
    const currentItem = {
      text: lowerCaseText
    };
    this.setState({
      currentItem
    });
  }

  render() {
    return (
      <div className="listMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              type="text"
              className="headerInput"
              placeholder="Enter the City Name"
              value={this.currentItem}
              onChange={this.updateInput}
            />
            <button
              className="headerBtn"
              type="submit"
              onClick={() => this.listItem.handleClick()}
            >
              Add City
            </button>
          </form>
          <ul className="theList">
            <GeolocationItem />
            <ListItem
              currentItem={this.state.currentItem}
              ref={instance => {
                this.listItem = instance;
              }}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default List;
