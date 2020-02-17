import React from "react";
import PropTypes from "prop-types";

import BookEl from './BookEl';

const BookItem = ({ item, spaces }) => (
  <div className="book_item">
    <div>{item.label}</div>
    <div>
      {item.row.map(el => <BookEl key={`el_${el._id}`} el={el} spaces={spaces} />)}
    </div>
  </div>
);

BookItem.propTypes = {
  item: PropTypes.object,
  spaces: PropTypes.number,
};

BookItem.defaultProps = {
  item: {},
  spaces: 0,
};

export default BookItem;
