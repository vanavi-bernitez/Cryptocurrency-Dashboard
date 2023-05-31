import React, { useState } from "react";
import searchIcon from "../images/search.svg";

const Search = () => {
  const [inputSearch, setInputSearch] = useState('');

  const handleOnChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleOnClick = () => {
    console.log(inputSearch);
    setInputSearch('');
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
