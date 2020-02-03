import React from "react";
import "./Control.scss";

import Consultant from "../../components/Consultant";
import ActivityController from "../../components/ActivityController";

const Book = () => (
  <div className="book">
    <ActivityController />
    <div></div>
  </div>
);

const ControlPage = () => {
  return (
    <div className="control">
      <Consultant />
      <Book />
    </div>
  );
};

export default ControlPage;
