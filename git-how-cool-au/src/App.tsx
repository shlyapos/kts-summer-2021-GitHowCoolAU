import React from 'react';
import logo from './logo.svg';
import './App.css';

import { gitHubApp } from './root/root';

function App() {
  gitHubApp.getRepositoriesByUsername('shlyapos')
    .then(response => console.log(response));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
