import React, { useState } from "react";
import searchIcon from "../images/search.svg";
import { queryCoin } from "../helpers/queryCoin";

const Search = ({ data, onSearchChange, onSearchActive }) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleOnChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleOnClick = () => {
    const queryData = queryCoin(data, inputSearch);
    onSearchChange(queryData);
    onSearchActive(true)
  
    // console.log(queryData);
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
