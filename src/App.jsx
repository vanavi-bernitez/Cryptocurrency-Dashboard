import React, { useState } from "react";
import "./App.css";
import { Markets } from "./components/Markets";
import { Search } from "./components/Search";
import { SearchedMarkets } from "./components/SearchedMarkets";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleSearchChange = (queryData) => {
    setFilteredData(queryData);
    // console.log("outer", queryData);
    console.log("OUTER", filteredData);
  };

  const handleSearchActive = (isSearchActive) => {
    setIsSearch(isSearchActive);
    console.log(isSearch);
  };

  return (
    <div className="App">
      <div className="graphic">
        <h3>Sales Activity</h3>
        <p>Graph</p>
      </div>
      <div className="information">
        <h4>Control panel</h4>
        <Search
          data={data}
          onSearchChange={handleSearchChange}
          onSearchActive={handleSearchActive}
        />
        <h5>CRYPTOCURRENCY</h5>
        <p>Details</p>
        {isSearch ? (
          <SearchedMarkets queriedData={filteredData} />
        ) : (
          <Markets onDataChange={handleDataChange} />
        )}
      </div>
    </div>
  );
}

export default App;
