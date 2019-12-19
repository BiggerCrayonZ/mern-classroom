import React from "react";

import { Search } from "@material-ui/icons";

const InputSearch = props => {
  return (
    <div className="searchBar_input">
      <Search />
      <input
        type="text"
        name="searchAll"
        id="searchAll"
        placeholder="Busqueda Rápida"
      />
    </div>
  );
};

export default InputSearch;
