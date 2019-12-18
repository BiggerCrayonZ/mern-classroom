import React from "react";
import PropTypes from "prop-types";

const Watch = ({ time }) => {
  let hour = time.getHours();
  let minutes = time.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return (
    <div className="watch">
      <div className="watch_label">
        <span>{hour}</span>
        <span>:</span>
        <span>{minutes}</span>
      </div>
      <div className="watch_ampm">
        <span>{ampm}</span>
      </div>
    </div>
  );
};

Watch.propTypes = {
  time: PropTypes.instanceOf(Date)
};

export default Watch;
