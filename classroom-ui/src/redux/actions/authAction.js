import {
    INIT_URL,
} from '../constants/actionTypes';

export const setInitUrl = url => ({
  type: INIT_URL,
  payload: url
});
