import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { toastAction } from '../../utils/toastAction';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id }) => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/product/${id}`);
      if (res && res.status === 200) {
        toastAction.success(res.data.message);
        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!user && !user?.isAdmin) return;
  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <img src="/delete.png" alt="" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;
