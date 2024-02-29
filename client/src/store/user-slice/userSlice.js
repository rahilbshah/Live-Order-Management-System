import { createSlice } from '@reduxjs/toolkit';

const user =
  localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
  user,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      const { payload } = action;
      localStorage.setItem('user', JSON.stringify(payload));
      state.user = payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      const { payload } = action;
      state.loading = false;
      state.error = payload;
    },
    logout(state) {
      localStorage.removeItem('user');
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
