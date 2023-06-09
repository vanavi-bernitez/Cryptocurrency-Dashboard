import React, { useState, useEffect } from "react";
import "./App.css";
import { Markets } from "./components/Markets";
import { Search } from "./components/Search";
import { SearchedMarkets } from "./components/SearchedMarkets";
import { GraphCurrency } from "./components/GraphCurrency";
import { getMarket } from "./helpers/getCrypto";
import { getQueriedCrypto } from "./helpers/getQueriedCrypto";
import { getSearch } from "./helpers/getSearch";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [coinId, setCoinId] = useState(null);
  const [idCoinData, setIdCoinData] = useState([]);
  const [minYValue, setMinYValue] = useState(26500);
  const [maxYValue, setMaxYValue] = useState(28000);

  const fillCoinCard = async () => {
    const coinsData = await getMarket();
    setData(coinsData);
  };

  useEffect(() => {
    fillCoinCard();
  }, []);

  
  useEffect(() => {
    const fillGraph = async () => {
      const coinQueryData = await getQueriedCrypto(coinId);
      setFilteredData(coinQueryData);
      setIdCoinData(coinQueryData[0]);
      setMinYValue(coinQueryData[0].minY);
      setMaxYValue(coinQueryData[0].maxY);
    };

    if (coinId) {
      fillGraph();
    } else {
      setIsSearch(false)
    }
  }, [coinId]);

  const handleSearchChange = (queryData) => {
    setFilteredData(queryData);
  };

  const handleSearchActive = (isSearchActive) => {
    setIsSearch(isSearchActive);
  };

  const handleIdCapture = (idCoin) => {
    setCoinId(idCoin);
  };

  return (
    <div className="App">
      <div className="graphic">
        <h3>Sales Activity</h3>
        <p id="description">
          Here you can compare sales channel to determine the most effective
          channels and develop a sales strategy based on this data.
        </p>

        <GraphCurrency
          initialData={data}
          idGraph={coinId}
          idCoinData={idCoinData}
          minYValue={minYValue}
          maxYValue={maxYValue}
        />
      </div>
      <div className="information">
        <h4>Control panel</h4>
        <Search
          onSearchChange={handleSearchChange}
          onSearchActive={handleSearchActive}
          onIdChange={handleIdCapture}
        />
        <h5>CRYPTOCURRENCY</h5>
        <p>Details</p>
        {isSearch ? (
          <SearchedMarkets
            queriedData={filteredData}
            onIdChange={handleIdCapture}
          />
        ) : (
          <Markets data={data} onIdChange={handleIdCapture} />
        )}
      </div>
    </div>
  );
};

export default App;
