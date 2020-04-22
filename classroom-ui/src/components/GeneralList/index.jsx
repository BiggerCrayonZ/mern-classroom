import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./GeneralList.scss";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";
import { Warning } from "@material-ui/icons";

import GeneralListItem from "./GeneralListItem";
import GeneralListLabel from "./GeneralListLabel";

const GeneralList = ({ loading, activities, selectActivity }) => {
  let flag = 0;

  const setFlag = (_start) => {
    flag = _start;
    return (<GeneralListLabel labelTime={_start} />)
  }

  return (
    <div className="generalList">
      {console.log({ loading })}
      {loading && <LinearProgress className="w-100" />}
      {!loading && activities.length === 0 && (
        <ListItem>
          <ListItemIcon>
            {loading ? <CircularProgress /> : <Warning />}
          </ListItemIcon>
          <ListItemText
            primary={loading ? "Cargando ..." : "Sin actividades almacenadas"}
          />
        </ListItem>
      )}
      {!loading && activities.length > 0 && (
        <div className="generalList_list">
            {activities.map(item => (
              <div key={`key_act_${item._id}`}>
                {item.startHour !== flag && setFlag(item.startHour)}
                <GeneralListItem item={item} selectActivity={selectActivity} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

GeneralList.propTypes = {
  activities: PropTypes.array,
  loading: PropTypes.bool,
  selectActivity: PropTypes.func,
};

GeneralList.defaultProps = {
  activities: [],
  loading: false,
  selectActivity: () => {},
};

const mapStateToProps = ({ auth, activity, load }) => {
  const { user } = auth;
  const { activities } = activity;
  const loading = Boolean(load.activity);
  return { user, activities, loading };
};

export default connect(mapStateToProps)(GeneralList);
