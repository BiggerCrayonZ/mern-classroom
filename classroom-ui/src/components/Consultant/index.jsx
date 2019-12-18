import React from "react";
import { connect } from "react-redux";
import "./Consultant.scss";

import Clock from "../Clock";

const Consultant = () => {
  return (
    <div className="consultant">
      <Clock />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps)(Consultant);
