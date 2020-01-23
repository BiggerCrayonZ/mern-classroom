import { GET_ALL_SUCCESS } from "../constants/activity.types";

const defaultState = () => ({
  activities: []
});

const initialState = { ...defaultState() };

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_ALL_SUCCESS: {
      const { activities } = action;
      return {
        ...state,
        activities,
      };
    }
    default:
      return state;
  }
}
