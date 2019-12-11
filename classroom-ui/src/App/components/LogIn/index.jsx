import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./style.scss";
import {
  ButtonBase,
  TextField,
} from '@material-ui/core';

const LogIn = ({ title, subTitle }) => {
  const [form, setForm] = React.useState({
    user: '',
    pass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      [name]: value,
    })
  };

  return (
    <div className="login">
      <div className="login_card">
        <div className="login_title">
          <div className="login_title_first">{title}</div>
          <div className="login_title_last">{subTitle}</div>
        </div>
        <div className="login_controls">
          <TextField
            id="user"
            name="user"
            label="Username"
            value={form.user}
            onChange={handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={form.pass}
            onChange={handleChange}
          />
          <ButtonBase
            className="login_submit"
          >
            SIGN UP
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};
LogIn.defaultProps = {
  title: "Classroom Control",
  subTitle: "Async and Powerfull"
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user
  };
};

export default connect(mapStateToProps)(LogIn);
