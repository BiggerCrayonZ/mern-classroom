import React from "react";
import PropTypes from "prop-types";

const GeneralListLabel = ({ labelTime }) => {
  return (
    <div className="generalList_head">
      <div />
      <div className="generalList_head_label">
        {`${labelTime} ${labelTime < 12 ? 'AM' : 'PM'} `}
      </div>
    </div>
  );
};

GeneralListLabel.propTypes = {
  labelTime: PropTypes.number
};

GeneralListLabel.propTypes = {
  labelTime: 0
};

export default GeneralListLabel;
