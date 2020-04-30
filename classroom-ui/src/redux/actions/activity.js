import {
  EMPTY_SUCCESS,
  FILTER_BY_STATE_SUCCESS,
  GET_ALL_SUCCESS,
} from "../constants/activity.types";
import Activities from "../../api/Activities";
import { normalizeActs, mapActivities } from "../../functions/Activity";

import { loading, loaded } from "./load";

import Swal from "sweetalert2";

export function getAllActivities(sync = null, search = "", showLoading = true) {
  return async dispatch => {
    if (showLoading) await dispatch(loading("activity"));
    try {
      const ActivityApi = new Activities();
      ActivityApi.getAll(search)
        .then(async response => {
          const { data } = response;
          const act = normalizeActs(data.result);
          const labels = mapActivities(act);
          console.log({ labels });
          const conflicts = Boolean(labels.hourConflict.length > 0);
          if (sync && search === "") {
            await Swal.fire({
              icon: conflicts ? "warning" : "success",
              title: `Sincronización completada ${
                conflicts ? "con conflictos" : ""
              }`,
              text: `${sync} ${conflicts ? 'con horarios que conflictuan favor de verificar y asignar en todo caso' : ''}`
            });
          }
          const { count } = data;
          const { activities, hourConflict, map, hMin, hMax } = labels;
          await dispatch({
            type: GET_ALL_SUCCESS,
            activities,
            count,
            hourConflict,
            map,
            search,
            hMin,
            hMax
          });
          if (showLoading) await dispatch(loaded("activity"));
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
          if (showLoading) await dispatch(loaded("activity"));
        });
    } catch (err) {
      console.log({ getAll: err });
    }
  };
}

export function filterByState(param, value) {
  return async dispatch => {
    await dispatch({ type: FILTER_BY_STATE_SUCCESS, param, value });
  }
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

export function remove(id = null, trigger) {
  return async dispatch => {
    await dispatch(loading("remove"));
    try {
      Swal.fire({
        title: 'Atención',
        text: '¿Está seguro de eliminar la actividad?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '!Si, hazlo¡'
      }).then(async (result) => {
        if (result.value) {
          const ActivityApi = new Activities();
          await ActivityApi.remove(id);
          Swal.fire(
            '!Eliminado¡',
            'Se a borrado la actividad',
            'success'
          );
          trigger();
          await dispatch(getAllActivities(null, '', false));
        }
      })
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.message,
      });
    }
    await dispatch(loaded("remove"));
  }
}

export function deleteRegister() {
  return async dispatch => {
    await dispatch(loading("activity"));
    await dispatch(loading("file"));
    try {
      const ActivityApi = new Activities();
      const clean = await ActivityApi.clean();
      console.log({ clean })
      const { success } = clean.data;
      if (success) {
        await dispatch({ type: EMPTY_SUCCESS });
        Swal.fire({
          icon: "success",
          title: "Registro limpio",
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Al eliminar hubo un error",
          text:
            "Parece que ocurrio un error al eliminar los registros, verifique con el administrador"
        });
      }
    } catch (cleanErr) {
      console.log({ cleanErr });
    } finally {
      await dispatch(loaded("activity"));
      await dispatch(loaded("file"));
    }
  };
}

export function updateActivity(act, trigger) {
  return async dispatch => {
    await dispatch(loading("activityUpdate"));
    try {
      const ActivityApi = new Activities();
      const result = await ActivityApi.update(act);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Registro actualizado",
        });
        trigger();
        await dispatch(getAllActivities(null, '', false));
      } else {
        Swal.fire({
          icon: "error",
          title: "Al editar hubo un error",
          text: result.msg,
        });
      }
    } catch (err) {
      console.log({ err });
    } finally {
      await dispatch(loaded("activityUpdate"));
    }
  }
}
