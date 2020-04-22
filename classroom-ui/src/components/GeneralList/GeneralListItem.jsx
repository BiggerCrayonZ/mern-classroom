import React from "react";
import PropTypes from "prop-types";

import { Launch } from '@material-ui/icons';
import { ButtonBase } from '@material-ui/core';

const GeneralListItem = ({ item, selectActivity }) => {
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
          <div className="generalList_item_footer">
            <span className="generalList_item_location">{`${item.primaryLocation} - ${item.secondaryLocation}`}</span>
            <div className="generalList_item_actions">
              <ButtonBase
                className={item.conflict && 'generalList_item_actions_con'}
                title={`Ver detalles de ${item.title}`}
                onClick={() => selectActivity(item)}
              >
                <Launch />
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GeneralListItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectActivity: PropTypes.func.isRequired,
};

export default GeneralListItem;
