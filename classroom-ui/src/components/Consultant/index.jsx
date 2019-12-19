import React from "react";
import { connect } from "react-redux";
import "./Consultant.scss";

import Clock from "../Clock";
import SearchBar from "../SearchBar";

const Consultant = () => {
  return (
    <div className="consultant">
      <Clock />
      <SearchBar />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps)(Consultant);
