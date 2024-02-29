import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../utils/toastAction';
import { useNavigate } from 'react-router-dom';
import { removeCart } from '../../store/cart-slice/cartSlice';

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    state => state.cart,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      let products = [];

      cartItems.forEach(item => {
        const existingProductIndex = products.findIndex(
          product => product.title === item.title,
        );

        if (existingProductIndex !== -1) {
          products[existingProductIndex].optionsName.push(item.optionName);
        } else {
          products.push({
            title: item.title,
            quantity: item.quantity,
            optionsName: [item.optionName],
          });
        }
      });
      const res = await axios.post(`/api/order`, {
        status: 'In Progress',
        price: totalAmount,
        products,
      });
      if (res && res.status === 201) {
        toastAction.success(res.data.message);
        dispatch(removeCart());
        setTimeout(() => {
          navigate('/orders');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <img src={item.img} alt="" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">{item.title}</h1>
              <span>{item.optionName}</span>
            </div>
            <h2 className="font-bold">{item.price?.toFixed(2)}</h2>
            <span className="cursor-pointer">X</span>
          </div>
        ))}
      </div>
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-10 xl:px-20 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalQuantity} items)</span>
          <span className="">${totalAmount?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalAmount?.toFixed(2)}</span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
