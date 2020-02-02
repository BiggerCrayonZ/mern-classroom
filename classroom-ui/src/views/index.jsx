import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./views.scss";
import { Route, Switch, withRouter } from "react-router-dom";

import { getAllActivities } from "../redux/actions/activity";

import Nav from "../components/Nav";
import ControlPage from "./ControlPage";

const UserControl = () => (
  <div className="w-100 h-100">
    <h1>User Control</h1>
  </div>
);
const MainView = ({ match, dispatch }) => {
  React.useEffect(() => {
    dispatch(getAllActivities());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-100 h-100 layout">
      <Nav />
      <Switch>
        <Route
          exact
          path={`${match.url}/home-page`} component={ControlPage}
        />
        <Route
          exact
          path={`${match.url}/user-control`}
          component={UserControl}
        />
      </Switch>
    </div>
  );
};

MainView.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default withRouter(connect(mapStateToProps)(MainView));
