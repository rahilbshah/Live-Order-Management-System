import { createSlice } from '@reduxjs/toolkit';

const items =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const totalAmount =
  localStorage.getItem('totalAmount') !== null
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0;

const totalQuantity =
  localStorage.getItem('totalQuantity') !== null
    ? JSON.parse(localStorage.getItem('totalQuantity'))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem('cartItems', JSON.stringify(item));
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        item =>
          item.id === newItem.id && item.optionName === newItem.optionName,
      );

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          img: newItem.img,
          price: newItem.price,
          quantity: newItem.quantity | 1,
          totalPrice: newItem.totalPrice | newItem.price,
          optionName: newItem.optionName,
        });
        state.totalQuantity++;
      } else {
        existingItem.quantity += newItem.quantity | 1;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),

        0,
      );

      setItemFunc(
        state.cartItems.map(item => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },
    deleteItem(state, action) {
      console.log(action.payload);
      const { id, optionName } = action.payload;
      console.log(id, optionName);
      const existingItem = state.cartItems.find(
        item => item.id === id && item.optionName === optionName,
      );
      console.log(existingItem);
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          item => item.id !== id || item.optionName !== optionName,
        );
        state.totalQuantity--;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );
      setItemFunc(
        state.cartItems.map(item => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },
    removeCart(state) {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalAmount');
      localStorage.removeItem('totalQuantity');
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, deleteItem, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
