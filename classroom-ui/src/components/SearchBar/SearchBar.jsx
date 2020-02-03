import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.scss";

import { getAllActivities } from "../../redux/actions/activity";

import InputSearch from "./components/InputSearch";

const SearchBar = ({ dispatch }) => {

  const refresh = async () => {
    await dispatch(getAllActivities());
  };

  const search = (search = '') => dispatch(getAllActivities(search));

  return (
    <div className="searchBar">
      <InputSearch
        search={search}
        refresh={refresh}
      />
    </div>
  );
};

SearchBar.protoTypes = {
  dispatch: PropTypes.func.isRequired
};

export default SearchBar;
