import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
/* Actions */
import { setInitUrl } from '../redux/actions/auth';
/* Comp */
import RestrictedRoute from './components/RestrictedRouter';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import MainView from '../views';

const classroomTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#25323a',
      light: '#4e5b64',
      dark: '#000a14'
    },
    secondary: {
      main: '#21cece',
      light: '#6cffff',
      dark: '#009c9d'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Poppins',
    ].join(','),
  }
});

const App = ({ location, initUrl, history, dispatch, match, user }) => {
  const [load, setLoad] = React.useState(true);
  React.useEffect(() => {
    setLoad(false);
  }, []);
  
  if (initUrl === "") {
    const {
      location: { pathname }
    } = history;
    dispatch(setInitUrl(pathname));
  }

  const { pathname } = location;
  if (pathname === '/') {
    if (!user.token) {
      return <Redirect to="/sign-in" />;
    }
    if (
      initUrl === '' ||
      initUrl === '/' ||
      initUrl === '/sign-in' ||
      initUrl === '/sign-up'
    ) {
      return <Redirect to="/app/home-page" />;
    }
    return <Redirect to={initUrl} />;
  }

  return (
    <MuiThemeProvider theme={classroomTheme}>
      {load && <LinearProgress />}
      <Switch>
        <RestrictedRoute
          authUser={user}
          component={MainView}
          path={`${match.url}app`}
        />
        <Route path="/sign-in" component={LogIn} />
        <Route path="/sign-out" component={LogOut} />
      </Switch>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  initURL: PropTypes.string
};

App.defaultProps = {
  initURL: '',
};

const mapStateToProps = ({ auth }) => {
  const { user, initUrl } = auth;
  return {
    user,
    initUrl
  };
};

export default connect(mapStateToProps)(App);
