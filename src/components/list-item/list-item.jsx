import React from 'react';
import { Link } from "react-router-dom";

import "./list-item.scss";

export default class ListItem extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.response.map(item => {
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
                                    this.props.deleteItem(item.id);
                                }}
                            >
                                &#10006;
                    </button>
                        </li>
                    );
                })}
            </React.Fragment>
        )
    }
}