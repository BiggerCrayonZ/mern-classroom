import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import "./style.scss";
import {
  ButtonBase,
  TextField,
} from '@material-ui/core';
/* Actions */
import { login } from '../../../redux/actions/auth';

const LogIn = ({
  title,
  subTitle,
  dispatch,
  user,
  history,
}) => {
  const [form, setForm] = React.useState({
    userId: '',
    password: '',
  });

  React.useEffect(() => {
    if (user.token !== null && user.token !== undefined) {
      history.push('/');
    }
  // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  };

  const onSubmit = (_form) => {
    if (_form.userId === '' || _form.password === '') {
      Swal.fire({
        title: 'Uppssss ...',
        text: 'Check user and password fields',
        icon: 'warning',
      })
    } else {
      dispatch(login({ email: _form.userId, password: _form.password }));
    }
  }

  return (
    <div className="login">
      <div className="login_card">
        <div className="login_title">
          <div className="login_title_first">{title}</div>
          <div className="login_title_last">{subTitle}</div>
        </div>
        <div className="login_controls">
          <TextField
            id="userId"
            name="userId"
            placeholder="Nickname, userid, email ..."
            value={form.userId}
            onChange={handleChange}
            onKeyUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const { keyCode } = e;
              if (keyCode === 13) {
                onSubmit(form);
              }
            }}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="secret doom, secret word, ..."
            value={form.password}
            onChange={handleChange}
            onKeyUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const { keyCode } = e;
              if (keyCode === 13) {
                onSubmit(form);
              }
            }}
          />
          <ButtonBase
            className="login_submit"
            onClick={() => onSubmit(form)}
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
  subTitle: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};
LogIn.defaultProps = {
  title: "Classroom Control",
  subTitle: "Async and Powerfull",
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user
  };
};

export default connect(mapStateToProps)(LogIn);
