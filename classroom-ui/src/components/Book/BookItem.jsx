import React from "react";
import PropTypes from "prop-types";

const BookItem = ({ item }) => (
  <div className="book_item">
    <div>{item.label}</div>
    <div></div>
  </div>
);

BookItem.propTypes = {
  item: PropTypes.object
};

BookItem.defaultProps = {
  item: {}
};

export default BookItem;
