import React from "react";
import { connect } from "react-redux";
import "./GeneralList.scss";

const GeneralList = () => {
  return (
    <div className="generalList">
      GeneralList
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps)(GeneralList);
