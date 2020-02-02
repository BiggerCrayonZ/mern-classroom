import {
  INIT_URL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
} from "../constants/actionTypes";

import {
  setStorage, getStorage, emptyStorage,
} from '../../functions/User';

const defaultState = () => ({
  initUrl: "",
  user: getStorage('user'),
});

const initialState = { ...defaultState() };

const authenticate = (state, _user) => {
  const user = { ..._user };
  setStorage(user);
  return ({ ...state, user });
}

const unauthenticate = () => {
  emptyStorage();
  return defaultState();
};


export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case INIT_URL: {
      return {
        ...state,
        initUrl: action.payload
      };
    }
    case AUTH_LOGOUT_SUCCESS:
      return unauthenticate();
    case AUTH_LOGIN_SUCCESS: {
      return authenticate(state, action.user); 
    }
    default:
      return state;
  }
}
