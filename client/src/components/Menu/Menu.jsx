import React, { useState } from 'react';
import CartIcon from '../CartIcon/CartIcon';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const user = false;
  const links = [
    { id: 1, title: 'Homepage', url: '/' },
    { id: 2, title: 'Menu', url: '/menu' },
  ];
  return (
    <div>
      <img
        src={'/open.png'}
        alt=""
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map(item => (
            <Link to={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          <Link to={user ? '/orders' : 'login'} onClick={() => setOpen(false)}>
            {user ? 'Orders' : 'Login'}
          </Link>
          <Link to="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
