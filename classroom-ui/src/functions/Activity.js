function timeConvert(num) {
  let date = new Date(null);
  date.setSeconds(num);
  return date.toISOString().substr(11, 5);
}

const getDurationPattern = el => {
  let pattern = [];
  let i = el.startHour;
  const limit = el.duration + el.startHour;
  do {
    pattern = [...pattern, i];
    i++;
  } while (i < limit);
  return pattern.map(x => (String(x)));
};

const getConflict = (pattern, act) => {
  let flag = false;
  pattern.forEach((el) => {
    const { durationPattern } = el;
    if (durationPattern.some(x => act.durationPattern.includes(x))){
      flag = true;
    }
  });
  return flag;
}

export const normalizeActs = act => {
  const arr = act.map(x => ({
    ...x,
    date: new Date(x.date).toLocaleDateString(),
    start: timeConvert(x.startHour * 60 * 60),
    end: timeConvert((x.startHour + x.duration) * 60 * 60),
    durationPattern: getDurationPattern(x)
  }));
  return arr;
};

export const mapActivities = acts => {
  let pattern = {};
  let activities = [];
  let hourConflict = [];
  acts.forEach(x => {
    const act = { ...x };
    const label = `${act.primaryLocation} - ${act.secondaryLocation}`;
    if (pattern[label] === undefined) {
      pattern = {
        ...pattern,
        [label]: {
          primary: act.primaryLocation,
          secondary: act.secondaryLocation,
          label,
          row: [act]
        }
      };
    } else {
      const found = getConflict(pattern[label].row, act);
      if (found) {
        hourConflict = [...hourConflict, act];
        act.conflict = true;
      } else {
        pattern[label].row = [...pattern[label].row, act];
        act.conflict = false;
      }
    }
    pattern[label].row.sort((a, b) => {
      if (a.startHour > b.startHour) return 1;
      if (a.startHour < b.startHour) return -1;
      return 0;
    });
    activities = [...activities, act];
  });
  const map = Object.entries(pattern).map(x => ({ ...x[1] }));
  map.sort((a, b) => {
    if (a.secondary > b.secondary) return 1;
    if (a.secondary < b.secondary) return -1;
    return 0;
  });
  map.sort((a, b) => {
    if (a.primary > b.primary) return 1;
    if (a.primary < b.primary) return -1;
    return 0;
  });
  return { map, pattern, hourConflict, activities };
};

export default {
  normalizeActs,
  mapActivities
};
