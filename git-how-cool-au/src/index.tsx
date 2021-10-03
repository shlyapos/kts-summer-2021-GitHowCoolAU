import React from 'react';

import App from "app/App";
import 'styles/index.scss';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'config/configureMobX';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
