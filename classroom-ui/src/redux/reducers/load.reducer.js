import { LOADING, LOADED } from "../constants/actionTypes";

export default function(state = {}, action) {
  const { type } = action;
  switch (type) {
    case LOADING: {
      const { flag } = action;
      return {
        ...state,
        [flag]: true,
      };
    }
    case LOADED: {
      const { flag } = action;
      return {
        ...state,
        [flag]: false,
      };
    }
    default:
      return state;
  }
}
