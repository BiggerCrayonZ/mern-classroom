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

const GeneralList = ({ loading, activities }) => {
  return (
    <div className="generalList">
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
            <GeneralListItem key={`key_act_${item._id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

GeneralList.propTypes = {
  activities: PropTypes.array,
  loading: PropTypes.bool
};

GeneralList.defaultProps = {
  activities: [],
  loading: false
};

const mapStateToProps = ({ auth, activity, load }) => {
  const { user } = auth;
  const { activities } = activity;
  const loading = Boolean(load.activity);
  return { user, activities, loading };
};

export default connect(mapStateToProps)(GeneralList);
