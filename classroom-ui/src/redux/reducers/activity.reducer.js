import { GET_ALL_SUCCESS } from "../constants/activity.types";

const defaultState = () => ({
  activities: [],
  count: 0,
});

const initialState = { ...defaultState() };

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_ALL_SUCCESS: {
      const { activities, count, search } = action;
      return {
        ...state,
        activities,
        count: search === '' ? (count) : state.count,
      };
    }
    default:
      return state;
  }
}
