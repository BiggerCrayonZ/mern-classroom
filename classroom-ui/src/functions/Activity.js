function timeConvert(num) {
  let date = new Date(null);
  date.setSeconds(num);
  return date.toISOString().substr(11, 5);
}

export const normalizeActs = act => {
  const arr = act.map(x => ({
    ...x,
    date: new Date(x.date).toLocaleDateString(),
    start: timeConvert(x.startHour * 60 * 60),
    end: timeConvert((x.startHour + x.duration) * 60 * 60),
  }));
  return arr;
};

export default {
  normalizeActs
};
