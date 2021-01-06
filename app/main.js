// This file sets up React. You shouldn't need to edit it.
// (But if you really want to, no one's gonna stop you.

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <h1>Hello, World!</h1>
  </Provider>,
  document.getElementById("app") // make sure this is the same as    the id of the div in your index.html
);
