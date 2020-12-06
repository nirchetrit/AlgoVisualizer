import React from "react";
import Route from "./components/router/Route";
import Header from "./components/header/Header";
import PathFinding from "./components/pathFinding/PathFinding";
import SortingVisualizer from "./components/sortingVisualizer/SortingVisualizer";

import "./App.css";

function App() {
  return (
    <div>
      <Header></Header>

      {/* TODO REACT ROUTER !! */}
      <div className="body">
        <Route path="/">
          <div className="ui container">
            <PathFinding></PathFinding>
          </div>
        </Route>

        <Route path="/sortingvisualizer">
          <div className="ui container">
            {/* <h1>sort</h1> */}
            <SortingVisualizer></SortingVisualizer>
          </div>
        </Route>
      </div>
    </div>
  );
}

export default App;
