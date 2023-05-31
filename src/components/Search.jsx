import React, { useState } from "react";
import searchIcon from "../images/search.svg";

const Search = () => {
  return (
    <div className="searchContainer">
      <input placeholder="Enter your search request..." type="text" />
      <button>
        <img src={searchIcon} alt="search icon" />
      </button>
    </div>
  );
};

export { Search };
