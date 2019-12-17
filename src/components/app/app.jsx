import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import { List } from "../list/list";
import { Expand } from "../expand/expand";
import { Header } from '../header/header'

export const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/expand" component={Expand} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};