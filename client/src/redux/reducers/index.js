import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './loginReducer';
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
