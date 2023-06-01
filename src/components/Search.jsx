import React, { useState } from "react";
import searchIcon from "../images/search.svg";
import { getQueriedCrypto } from "../helpers/getQueriedCrypto";

const Search = ({ onSearchChange, onSearchActive }) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleOnChange = (event) => {
    setInputSearch(event.target.value);
  };

  const fillCoinCard = async (query) => {
    const coinsData = await getQueriedCrypto(query);
    onSearchChange(coinsData);
    onSearchActive(true);
    setInputSearch("");
  };

  const handleOnClick = () => {
    fillCoinCard(inputSearch);
  };

  return (
    <div className="searchContainer">
      <input
        placeholder="Enter your search request..."
        type="text"
        value={inputSearch}
        onChange={handleOnChange}
      />
      <button onClick={handleOnClick}>
        <img src={searchIcon} alt="search icon" />
      </button>
    </div>
  );
};

export { Search };
