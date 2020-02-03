import { GET_ALL_SUCCESS } from "../constants/activity.types";
import Activities from "../../api/Activities";
import { normalizeActs } from "../../functions/Activity";

import { loading, loaded } from "./load";

import Swal from "sweetalert2";

export function getAllActivities(search = "") {
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
            search
          });
          await dispatch(loaded("activity"));
        })
        .catch(async err => {
          if (Object.keys(err).length > 0) {
            const { data, status } = err;
            if (status === 404) {
              await dispatch({
                type: GET_ALL_SUCCESS,
                activities: []
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
              text: err
            });
          }
          await dispatch(loaded("activity"));
        });
    } catch (err) {
      console.log({ getAll: err });
    }
  };
}

export function syncActivities(file = null) {
  return async dispatch => {
    await dispatch(loading("activity"));
    await dispatch(loading("file"));
    try {
      const ActivityApi = new Activities();
      ActivityApi.clean()
        .then(async cleanRes => {
          if (cleanRes.status === 200) {
            ActivityApi.upload(file)
              .then(async response => {
                await Swal.fire({
                  icon: "success",
                  title: "Sincronización completada",
                  text: response.data.msg
                });
                await dispatch(loaded("file"));
                await dispatch(getAllActivities());
                await dispatch(loaded("activity"));
              })
              .catch(async uploadErr => {
                console.log({ uploadErr });
                if (uploadErr.status === 400) {
                  Swal.fire({
                    icon: "warning",
                    title: "Problemas con sincronizar ...",
                    text: uploadErr.data.activityErr
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: uploadErr
                  });
                }
                await dispatch(loaded("activity"));
                await dispatch(loaded("file"));
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: cleanRes.data.message
            });
            await dispatch(loaded("activity"));
            await dispatch(loaded("file"));
          }
        })
        .catch(async cleanErr => {
          console.log({ cleanErr });
          await dispatch(loaded("activity"));
          await dispatch(loaded("file"));
        });
    } catch (err) {
      console.log({ err });
    }
  };
}
