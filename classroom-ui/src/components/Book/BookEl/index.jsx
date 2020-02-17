import React from "react";
import PropTypes from "prop-types";

import { ButtonBase } from "@material-ui/core";

const BookEl = ({ el, spaces }) => (
  <ButtonBase
    className="book_el"
    style={{
      width: `${(100 / spaces) * el.duration}%`,
      marginLeft: `${(100 / spaces) * el.before}%`
    }}
  >
    {el.title}
  </ButtonBase>
);

BookEl.propTypes = {
  el: PropTypes.object.isRequired,
  spaces: PropTypes.number.isRequired
};

export default BookEl;
