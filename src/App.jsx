import React from 'react';
// eslint-disable-next-line
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss';

import List from "./components/List/List.jsx";
import Expand from "./components/Expand/Expand.jsx";

export class App extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={List} />
          <Route path="/expand" component={Expand} />
        </Switch>
      </div>
    );
  }
}

export default App;
