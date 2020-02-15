import React from "react";
import PropTypes from "prop-types";
import "./Book.scss";

import { CircularProgress } from "@material-ui/core";
import { CloudOff } from "@material-ui/icons";

import BookItem from "./BookItem";

const Book = ({ activity, loading }) => {
  if (loading) {
    return (
      <div className="book_loading">
        <CircularProgress color="secondary" />
      </div>
    );
  } else if (activity.map.length > 0) {
    return (
      <div className="book">
        {activity.map.map(item => (<BookItem item={item} />))}
      </div>
    );
  }
  return (
    <div className="book_loading">
      <CloudOff />
      <span>Registro vacío</span>
    </div>
  );
};

Book.propTypes = {
  activity: PropTypes.object,
  loading: PropTypes.bool
};

Book.defaultProps = {
  activity: {},
  loading: false
};

export default Book;
