import { GET_ALL_SUCCESS } from "../constants/activity.types";

const defaultState = () => ({
  activities: [],
  hourConflict: [],
  map: [],
  count: 0,
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
      } = action;
      return {
        ...state,
        activities,
        hourConflict,
        map,
        count: search === '' ? (count) : state.count,
      };
    }
    default:
      return state;
  }
}
