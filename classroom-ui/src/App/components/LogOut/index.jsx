import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { unauthenticate } from '../../../redux/actions/auth';

class LogOut extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(unauthenticate());
  }

  render() {
    return (
      <Redirect to="/sign-in" />
    );
  }
}

export default connect()(LogOut);
