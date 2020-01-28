import { LOADING, LOADED } from "../constants/actionTypes";

export function loading(flag = "") {
  return async dispatch => {
    dispatch({
      type: LOADING,
      flag
    });
  };
}

export function loaded(flag = "") {
  return async dispatch => {
    dispatch({
      type: LOADED,
      flag
    });
  };
}
