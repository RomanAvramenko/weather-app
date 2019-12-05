import React from 'react';
import { Link } from "react-router-dom";

import "./list-item.scss";

export default class ListItem extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.response.map(item => {
                    return (
                        <li key={item.id} className="list-item">
                            <div className="list-item__temp">
                                <span>{item.main.temp.toFixed()}&deg;</span>
                            </div>
                            <div className="list-item__img">
                                <img
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt=""
                                />
                            </div>
                            <button
                                className="list-item__btn"
                                onClick={() => {
                                    this.props.deleteItem(item.id);
                                }}>
                                &#10006;
                            </button>
                            <div className="list-item__name">
                                <span>{item.name}</span>
                            </div>
                            <div>
                                <Link
                                    to={{
                                        pathname: "/expand",
                                        state: { name: item.name }
                                    }}
                                    className="list-item__expand">
                                    Forecast for 5 days
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </React.Fragment>
        )
    }
}