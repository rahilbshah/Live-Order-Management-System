import React from 'react';
import Menu from '../Menu/Menu';
import CartIcon from '../CartIcon/CartIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../utils/toastAction';
import { logout } from '../../store/user-slice/userSlice';

const Navbar = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      toastAction.success('Logout Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      <div className="hidden md:flex gap-4 flex-1">
        <Link to="/">Homepage</Link>
        <Link to="/menu">Menu</Link>
        {user && <Link to="/orders">Orders</Link>}
      </div>
      <div className="text-xl md:font-bold flex-1 md:text-center">Massimo</div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        {user?.isAdmin ? (
          <Link to="/add-product">Add Product</Link>
        ) : (
          <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
            <img src="/phone.png" alt="" width={20} height={20} />
            <span>123 456 7890</span>
          </div>
        )}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <button className="cursor-pointer" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
