import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initApi } from "shared/http";
import { StorageKeys } from 'shared/constants';

function initialApp() {
  // FOR API GENERATION
  const token = localStorage.getItem(StorageKeys.token);

  if (!!token) {
    initApi(token);
  } else {
    initApi()
  }
}

initialApp();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
