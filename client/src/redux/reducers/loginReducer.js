import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actionTypes/loginActionTypes.js';

const user =
  localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
  user,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
