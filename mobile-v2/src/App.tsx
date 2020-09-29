import React from 'react';
import 'antd/dist/antd.css';
import { Plugins } from "@capacitor/core";
import { Provider } from "react-redux";

import './App.css';
import { RouteRoullet } from "./routing";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouteRoullet />
      </Provider>
    </div>
  );
}

export default App;
