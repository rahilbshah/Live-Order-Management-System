import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { totalQuantity } = useSelector(state => state.cart);
  return (
    <Link to="/cart" className="flex items-center gap-2">
      <div className="w-8 h-8 md:w-5 md:h-5">
        <img src="/cart.png" alt="" className="w-full h-full" />
      </div>
      <span>Cart ({totalQuantity})</span>
    </Link>
  );
};

export default CartIcon;
