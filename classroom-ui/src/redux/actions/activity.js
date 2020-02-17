import { GET_ALL_SUCCESS } from "../constants/activity.types";
import Activities from "../../api/Activities";
import { normalizeActs, mapActivities } from "../../functions/Activity";

import { loading, loaded } from "./load";

import Swal from "sweetalert2";

export function getAllActivities(sync = null, search = "") {
  return async dispatch => {
    await dispatch(loading("activity"));
    try {
      const ActivityApi = new Activities();
      ActivityApi.getAll(search)
        .then(async response => {
          const { data } = response;
          const act = normalizeActs(data.result);
          const labels = mapActivities(act);
          console.log({ labels });
          const conflicts = Boolean(labels.hourConflict.length > 0);
          if (sync && search === '') {
            await Swal.fire({
              icon: conflicts ? 'warning' : 'success',
              title: `Sincronización completada ${conflicts ? 'con conflictos' : ''}`,
              text: sync,
            });
          }
          const { count } = data;
          const {
            activities, hourConflict, map, hMin, hMax
          } = labels;
          await dispatch({
            type: GET_ALL_SUCCESS,
            activities,
            count,
            hourConflict,
            map,
            search,
            hMin,
            hMax,
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
                await dispatch(loaded("file"));
                await dispatch(getAllActivities(response.data.msg));
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
