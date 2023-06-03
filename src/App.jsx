import React, { useState } from "react";
import "./App.css";
import { Markets } from "./components/Markets";
import { Search } from "./components/Search";
import { SearchedMarkets } from "./components/SearchedMarkets";
import { GraphCurrency } from "./components/GraphCurrency";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [coinId, setCoinId] = useState(null);

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleSearchChange = (queryData) => {
    setFilteredData(queryData);
  };

  const handleSearchActive = (isSearchActive) => {
    setIsSearch(isSearchActive);
  };

  const handleIdCapture = (idCoin) => {
    setCoinId(idCoin)
  }

  return (
    <div className="App">
      <div className="graphic">
        <h3>Sales Activity</h3>
       
        <GraphCurrency initialData={data}  idGraph={coinId} />
        
      </div>
      <div className="information">
        <h4>Control panel</h4>
        <Search
          onSearchChange={handleSearchChange}
          onSearchActive={handleSearchActive}
        />
        <h5>CRYPTOCURRENCY</h5>
        <p>Details</p>
        {isSearch ? (
          <SearchedMarkets queriedData={filteredData} onIdChange={handleIdCapture} />
        ) : (
          <Markets data={data} onDataChange={handleDataChange} onIdChange={handleIdCapture} />
        )}
      </div>
    </div>
  );
}

export default App;
