import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { HashRouter as Router } from "react-router-dom";
import { App } from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);

serviceWorker.register();
