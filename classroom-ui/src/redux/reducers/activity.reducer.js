import {
  GET_ALL_SUCCESS,
  EMPTY_SUCCESS,
  FILTER_BY_STATE_SUCCESS,
} from "../constants/activity.types";
import { singleFilterByParam } from "../../functions/Activity";

const defaultState = () => ({
  activities: [],
  hourConflict: [],
  map: [],
  count: 0,
  hMin: 0,
  hMax: 0,
  filterParam: '',
});

const initialState = { ...defaultState() };

const filterByState = (state, filterParam, value) => {
  const activities = singleFilterByParam(filterParam, value, state.activities);
  return ({ ...state, activities, filterParam });
}

export default function (state = initialState, action) {
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
        filterParam: '',
      };
    }
    case FILTER_BY_STATE_SUCCESS:
      return filterByState(state, action.param, action.value);
    case EMPTY_SUCCESS:
      return defaultState();
    default:
      return state;
  }
}
