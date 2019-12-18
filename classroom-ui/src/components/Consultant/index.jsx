import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './Consultant.scss';

import Clock from '../Clock';

const Consultant = () => {
    return (
        <div className="consultant">
            <Clock />
        </div>
    );
}

Consultant.propTypes = {};

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user };
  };

export default connect(mapStateToProps)(Consultant);
