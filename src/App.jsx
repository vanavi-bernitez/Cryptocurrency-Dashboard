import React, { useState } from "react";
import "./App.css";
import { Markets } from "./components/Markets";
import { Search } from "./components/Search";

function App() {
  return (
    <div className="App">
      <div className="graphic">
        <h3>Sales Activity</h3>
        <p>Graph</p>
      </div>
      <div className="information">
        <h4>Control panel</h4>
        <Search />
        <h5>CRYPTOCURRENCY</h5>
        <p>Details</p>

        <Markets />
      </div>
    </div>
  );
}

export default App;
