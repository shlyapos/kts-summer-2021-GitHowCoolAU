import React from "react";

import App from "./App";
import "styles/index.scss";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "config/configureMobX";
import "regenerator-runtime/runtime";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
