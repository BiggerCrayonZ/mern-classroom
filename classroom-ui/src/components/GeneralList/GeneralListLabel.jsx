import React from "react";
import PropTypes from "prop-types";

const GeneralListLabel = ({ label }) => {
  return (
    <div className="generalList_head">
      <div />
      <div className="generalList_head_label">
        {`${label} ${label < 12 ? 'AM' : 'PM'} `}
      </div>
    </div>
  );
};

GeneralListLabel.propTypes = {
  label: PropTypes.any
};

GeneralListLabel.propTypes = {
  label: 0
};

export default GeneralListLabel;
