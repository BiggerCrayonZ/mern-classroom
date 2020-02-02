import {
  INIT_URL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
} from "../constants/actionTypes";
import { loading, loaded } from './load';

import Swal from "sweetalert2";

import User from "../../api/User";

export const setInitUrl = url => ({
  type: INIT_URL,
  payload: url
});

export function login(data) {
  return async (dispatch) => {
    try {
      const UserApi = new User();
      UserApi.logIn({ ...data })
        .then(response => {
          if (response.data) {
            const { data } = response;
            dispatch({
              type: AUTH_LOGIN_SUCCESS,
              user: data,
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: "Upsss...",
              text: 'Login no procesable',
            });
          }
        })
        .catch(loginErr => {
          console.log({ loginErr });
          const { response } = loginErr;
          if (loginErr.response) {
            if (response.status === 401) {
              Swal.fire({
                icon: 'warning',
                title: "Upsss...",
                text: response.data.message
              });
            } else if (response.data) {
              Swal.fire({
                icon: 'error',
                title: "Error",
                text: response.data.message
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: "Upsss...",
                text: 'Login no procesable',
              });
            }
          } else {
            Swal.fire({
              icon: 'warning',
              title: "Upsss...",
              text: loginErr,
            });
          }
        });
    } catch (loginErr) {
      console.log({ loginErr });
    }
  };
}

export function unauthenticate() {
  return async (dispatch) => {
    await dispatch(loading('authUser'));
    try {
      await dispatch({
        type: AUTH_LOGOUT_SUCCESS,
      });
    } catch (loginErr) {
      console.log({ loginErr });
      Swal.fire({
        icon: 'warning',
        title: "Upsss...",
        text: loginErr,
      });
    } finally {
      await dispatch(loaded('authUser'));
    }
  };
}

