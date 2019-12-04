import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import List from "../list";
import Expand from "../expand";
import Header from '../header'

const App = () => {
  return (
    <React.Fragment>
      <Router>
      <Header/>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/expand" component={Expand} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
