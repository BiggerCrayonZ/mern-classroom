import { GET_ALL_SUCCESS } from "../constants/activity.types";
import Activities from "../../api/Activities";
import { normalizeActs } from "../../functions/Activity";

import { loading, loaded } from "./load";

import Swal from "sweetalert2";

export function getAllActivities(search = '') {
  return async dispatch => {
    await dispatch(loading("activity"));
    try {
      const ActivityApi = new Activities();
      ActivityApi.getAll(search)
        .then(async response => {
          const { data } = response;
          const activities = normalizeActs(data.result);
          const { count } = data;
          await dispatch({
            type: GET_ALL_SUCCESS,
            activities,
            count,
            search,
          });
          await dispatch(loaded("activity"));
        })
        .catch(async err => {
          if (Object.keys(err).length > 0) {
            const { data, status } = err;
            if (status === 404) {
              await dispatch({
                type: GET_ALL_SUCCESS,
                activities: [],
              });
            } else if (status === 401) {
              Swal.fire({
                icon: "warning",
                title: "Upsss...",
                text: data.message
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err,
            });
          }
          await dispatch(loaded("activity"));
        });
    } catch (err) {
      console.log({ getAll: err });
    }
  };
}
