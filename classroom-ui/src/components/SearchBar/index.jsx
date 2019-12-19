import React from "react";
import "./SearchBar.scss";

import InputSearch from "./components/InputSearch";

const SearchBar = props => {
  return (
    <div className="searchBar">
      <InputSearch />
    </div>
  );
};

export default SearchBar;
