import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toastAction } from '../../utils/toastAction';
import { convertProductString } from '../../utils/objectStringify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    const fetchCatProducts = async () => {
      try {
        const res = await axios.get(`/api/order`);
        if (res.data) setOrders(res.data);
      } catch (error) {
        toastAction.error(error.response.data.message);
        if (error.response.status === 401) navigate('/login');
        console.log(error);
      }
    };
    if (!user) navigate('/');
    fetchCatProducts();
  }, [navigate, user]);
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/order/${id}`, { status });
      if (res.status === 200) {
        toastAction.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) return 'Loading';
  return (
    <div className="p-4 lg:px-10 xl:px-20">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="text-sm md:text-base bg-red-50 text-center"
            >
              <td className="hidden md:block py-6 px-1">{order._id}</td>
              <td className="py-6 px-1">
                {order.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{order.price}</td>
              <td className="hidden md:block py-6 px-1">
                {convertProductString(order.products)}
              </td>
              {user?.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-2"
                    onSubmit={e => handleUpdate(e, order._id)}
                  >
                    <input
                      placeholder={order.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                      onChange={e => setStatus(e.target.value)}
                    />
                    <button className="bg-red-400 p-2 rounded-full">
                      <img src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{order.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
