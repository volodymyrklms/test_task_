import React from 'react';
import {Route, Switch} from "react-router";
import './App.css';
import TreeSelect from "./pages/treeSelect";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path={''} exact component={TreeSelect}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;
