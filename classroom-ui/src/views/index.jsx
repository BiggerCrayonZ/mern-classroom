import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./views.scss";
import { Route, Switch, withRouter } from "react-router-dom";

import Nav from '../components/Nav';
import ControlPage from './ControlPage';

const MainView = ({ match }) => {
  return (
    <div className="w-100 h-100 layout">
      <Nav />
      <Switch>
        <Route
          exact
          path={`${match.url}/home-page`}
          component={ControlPage}
        />
        <Route
          exact
          path={`${match.url}/control`}
          component={ControlPage}
        />
      </Switch>
    </div>
  );
};

MainView.propTypes = {
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default withRouter(connect(mapStateToProps)(MainView));
