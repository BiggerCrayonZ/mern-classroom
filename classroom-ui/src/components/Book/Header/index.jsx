import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const BookHeader = ({ spaces, hMin }) => (
  <div className="book_header_span">
    <div></div>
    {spaces > 0 && (
      <div className="book_header">
        {Array(spaces)
          .fill()
          .map((x, i) => (
            <div className="book_header_item">{`${i + hMin} : 00`}</div>
          ))}
      </div>
    )}
  </div>
);

BookHeader.propTypes = {
  spaces: PropTypes.number,
  hMin: PropTypes.number
};

BookHeader.defaultProps = {
  spaces: 0,
  hMin: 0
};

const mapStateToProps = ({ activity }) => {
  const { hMin, hMax } = activity;
  const spaces = hMax - hMin;
  return {
    spaces,
    hMin
  };
};

export default connect(mapStateToProps)(BookHeader);
