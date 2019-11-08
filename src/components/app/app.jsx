import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import List from "../list";
import Expand from "../expand";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/expand" component={Expand} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
