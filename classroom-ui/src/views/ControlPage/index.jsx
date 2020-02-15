import React from "react";
import "./Control.scss";

import Book from "../../components/Book";
import Consultant from "../../components/Consultant";
import ActivityController from "../../components/ActivityController";

const ActivityBook = () => (
  <div className="activityBook">
    <ActivityController />
    <Book />
  </div>
);

const ControlPage = () => {
  return (
    <div className="control">
      <Consultant />
      <ActivityBook />
    </div>
  );
};

export default ControlPage;
