import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actionTypes/loginActionTypes.js';
import { toastAction } from '../../utils/toastAction.js';

export const loginUser = credentials => {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response && response.status === 200) {
        dispatch(loginSuccess(response.data.details));
        return response;
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toastAction.error(error.response.data.error);
    }
  };
};

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});
