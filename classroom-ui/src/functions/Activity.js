export const normalizeActs = act => {
  const arr = act.map(x => ({
    ...x,
    date: new Date(x.date).toLocaleDateString()
  }));
  return arr;
};

export default {
  normalizeActs,
};
