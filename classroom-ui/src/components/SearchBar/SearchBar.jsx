import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.scss";

import {
  getAllActivities,
  filterByState,
} from "../../redux/actions/activity";

import InputSearch from "./components/InputSearch";

const SearchBar = ({ dispatch, filterParam }) => {

  const refresh = async () => {
    await dispatch(getAllActivities());
  };
  
  const singleFilter = async (param, value) => {
    await dispatch(filterByState(param, value));
  };

  const search = (search = '') => dispatch(getAllActivities(search));

  return (
    <div className="searchBar">
      <InputSearch
        search={search}
        refresh={refresh}
        filterParam={filterParam}
        singleFilter={singleFilter}
      />
    </div>
  );
};

SearchBar.protoTypes = {
  dispatch: PropTypes.func.isRequired,
  filterParam: PropTypes.string,
};

SearchBar.defaultProps = {
  filterParam: '',
};

export default SearchBar;
