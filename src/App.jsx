import React, { useState, useEffect } from "react";
import "./App.css";
import { Markets } from "./components/Markets";
import { Search } from "./components/Search";
import { SearchedMarkets } from "./components/SearchedMarkets";
import { GraphCurrency } from "./components/GraphCurrency";
import { Error } from "./components/Error";
import { getMarket } from "./helpers/getCrypto";
import { getQueriedCrypto } from "./helpers/getQueriedCrypto";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [coinId, setCoinId] = useState(null);
  const [idCoinData, setIdCoinData] = useState([]);
  const [minYValue, setMinYValue] = useState(0);
  const [maxYValue, setMaxYValue] = useState(0);
  const [isError, setIsError] = useState(false);

  const fillCoinCard = async () => {
    try {
      const coinsData = await getMarket();
      setData(coinsData);

      if (data.length === undefined) {
        setMinYValue(0);
        setMaxYValue(0);
      } else {
        const minimunY = coinsData[0].minY;
        const maximunY = coinsData[0].maxY;
        setMinYValue(minimunY);
        setMaxYValue(maximunY);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fillCoinCard();
  }, []);

  useEffect(() => {
    const fillGraph = async () => {
      try {
        const coinQueryData = await getQueriedCrypto(coinId);
        setFilteredData(coinQueryData);
        setIdCoinData(coinQueryData[0]);
        setMinYValue(coinQueryData[0].minY);
        setMaxYValue(coinQueryData[0].maxY);
      } catch (error) {
        setIsError(true);
      }
    };

    if (coinId) {
      fillGraph();
    } else {
      setIsSearch(false);
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
      {isError ? (
        <Error />
      ) : (
        <>
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

            {isSearch && !isError && (
              <SearchedMarkets
                queriedData={filteredData}
                onIdChange={handleIdCapture}
              />
            )}

            {!isSearch && !isError && (
              <Markets data={data} onIdChange={handleIdCapture} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
