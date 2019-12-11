import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from "react-router-dom";

const RestrictedRoute = ({
    component: Component,
    authUser,
    ...rest
  }) => (
    <Route
      {...rest}
      render={props => (authUser.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location },
          }}
        />
      ))
        }
    />
  );
  
  RestrictedRoute.propTypes = {
    authUser: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired,
  };

  export default RestrictedRoute;
  