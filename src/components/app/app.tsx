import React, {FunctionComponent} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import "./app.scss";
import { List } from "../list/list";
import { Expand } from "../expand/expand";
import { Header } from '../header/header'
import { ErrorBoundary } from "../error-boundary/error-boundary";
import { store } from "../../store/store";

export const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/expand" component={Expand} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
};