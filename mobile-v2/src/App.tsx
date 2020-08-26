import React from 'react';
import 'antd/dist/antd.css';
import { Plugins } from "@capacitor/core";

import './App.css';
import { RouteRoullet } from "./routing";

function App() {
  return (
    <div className="App">
      <RouteRoullet />
    </div>
  );
}

export default App;
