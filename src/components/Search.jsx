import React, { useState } from "react";
import searchIcon from "../images/search.svg";
import { getSearch } from "../helpers/getSearch";

const Search = ({ onSearchActive, onIdChange }) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleOnChange = (event) => {
    setInputSearch(event.target.value);
  };

  const fillSearch = async (query) => {
    if (inputSearch === "") {
      onIdChange(null);
    } else {
      const coinsId = await getSearch(query);
      onIdChange(coinsId);
    }
  };

  const handleOnClick = () => {
    fillSearch(inputSearch);
    onSearchActive(true);
    setInputSearch("");
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
