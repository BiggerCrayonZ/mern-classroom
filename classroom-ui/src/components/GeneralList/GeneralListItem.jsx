import React from "react";
import PropTypes from "prop-types";

const GeneralListItem = ({ item }) => {
  return (
    <div
      className={`generalList_item ${item.conflict && 'generalList_item_conflict'}`}
      title={`${item.title} - ${item.desc}`}
    >
      <div className="generalList_item_detail">
        <div>
          <span className="generalList_item_title">{item.title}</span>
          <span className="generalList_item_subtitle">{item.subTitle}</span>
        </div>
        <div>
          <span className="generalList_item_hour">{`${item.start} - ${item.end}`}</span>
          <span className="generalList_item_location">{`${item.primaryLocation} - ${item.secondaryLocation}`}</span>
        </div>
      </div>
    </div>
  );
};

GeneralListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default GeneralListItem;
