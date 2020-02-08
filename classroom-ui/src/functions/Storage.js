export const setItem = (id, data, persist = false) => {
  const stringJSON = JSON.stringify(data);
  if (persist) {
    window.localStorage.setItem(id, stringJSON);
  } else {
    window.sessionStorage.setItem(id, stringJSON);
  }
};

export const getItem = (id, persist = false) => {
  const item = persist
    ? window.localStorage.getItem(id)
    : window.sessionStorage.getItem(id);
  try {
    const json = JSON.parse(item);
    return json || {};
  } catch {
    return {};
  }
};

export const findItem = id => {
  const item =
    window.localStorage.getItem(id) || window.sessionStorage.getItem(id);
  try {
    const json = JSON.parse(item);
    return json || {};
  } catch {
    return {};
  }
};

export const removeItem = (id, persist = false) => {
  const item = getItem(id, persist);
  if (persist) {
    window.localStorage.removeItem(id);
  } else {
    window.sessionStorage.removeItem(id);
  }
  return item;
};

export const removeAllItems = id => {
  window.localStorage.removeItem(id);
  window.sessionStorage.removeItem(id);
};

export default {
  setItem,
  getItem,
  findItem,
  removeItem,
  removeAllItems
};
