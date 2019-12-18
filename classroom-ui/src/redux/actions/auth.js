import { INIT_URL, AUTH_LOGIN_SUCCESS } from "../constants/actionTypes";

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
          const { data } = response;
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            user: data,
          });
        })
        .catch(loginErr => {
          const {
            response: { data, status }
          } = loginErr;
          if (status === 401) {
            Swal.fire({
              icon: 'warning',
              title: "Upsss...",
              text: data.message
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: "Error",
              text: data.message
            });
          }
        });
    } catch (loginErr) {
      console.log({ loginErr });
    }
  };
}
