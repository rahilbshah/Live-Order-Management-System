import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice/userSlice';
import cartSlice from './cart-slice/cartSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
