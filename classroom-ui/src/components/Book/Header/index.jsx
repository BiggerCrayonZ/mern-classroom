import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const BookHeader = ({ spaces, hMin, isLoading }) => (
  <div className="book_header_span">
    <div></div>
    {spaces > 0 && !isLoading && (
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
  hMin: PropTypes.number,
  isLoading: PropTypes.bool,
};

BookHeader.defaultProps = {
  spaces: 0,
  hMin: 0,
  isLoading: false,
};

const mapStateToProps = ({ activity, load }) => {
  const { hMin, hMax } = activity;
  const spaces = hMax - hMin;
  const isLoading = Boolean(load.activity);
  return {
    isLoading,
    spaces,
    hMin,
  };
};

export default connect(mapStateToProps)(BookHeader);
