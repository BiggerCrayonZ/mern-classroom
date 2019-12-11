import { INIT_URL } from "../constants/actionTypes";

const defaultState = () => ({
  initUrl: "",
  user: {}
});

const initialState = { ...defaultState() };

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case INIT_URL: {
      return {
        ...state,
        initUrl: action.payload
      };
    }
    default:
      return state;
  }
}
