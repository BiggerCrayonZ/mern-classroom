import { GET_ALL_SUCCESS } from "../constants/activity.types";

const defaultState = () => ({
  activities: [],
  hourConflict: [],
  map: [],
  count: 0,
  hMin: 0,
  hMax: 0,
});

const initialState = { ...defaultState() };

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_ALL_SUCCESS: {
      const {
        activities,
        count,
        search,
        hourConflict,
        map,
        hMin,
        hMax,
      } = action;
      return {
        ...state,
        activities,
        hourConflict,
        map,
        hMin,
        hMax,
        count: search === '' ? (count) : state.count,
      };
    }
    default:
      return state;
  }
}
