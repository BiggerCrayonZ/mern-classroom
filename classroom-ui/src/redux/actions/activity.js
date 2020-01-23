import { GET_ALL_SUCCESS } from "../constants/activity.types";
import Activities from "../../api/Activities";
import { normalizeActs } from "../../functions/Activity";
import Swal from "sweetalert2";

export function getAllActivities() {
  return async dispatch => {
    try {
      const ActivityApi = new Activities();
      ActivityApi.getAll()
        .then(response => {
          const { data } = response;
          const activities = normalizeActs(data.result);
          dispatch({
            type: GET_ALL_SUCCESS,
            activities
          });
        })
        .catch(err => {
          const {
            response: { data, status }
          } = err;
          if (status === 401) {
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
        });
    } catch (err) {
      console.log({ getAll: err });
    }
  };
}
