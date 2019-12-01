import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import List from "../list";
import Expand from "../expand";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/expand" component={Expand} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
