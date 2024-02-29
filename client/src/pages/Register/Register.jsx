import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastAction } from '../../utils/toastAction';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', user);
      if (res.data && res.status === 201) {
        toastAction.success(res.data.message);
      }
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.log(err);
      toastAction.error(err.response.data.error);
    }
  };
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[90%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="h-1/3 w-full md:h-full md:w-1/2">
          <img
            src="/loginBg.png"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-3 flex flex-col gap-2 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-xl">Welcome</h1>
          <form
            className="flex flex-wrap flex-col gap-3 p-4 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-1">
              <label className="text-red-200">Email</label>
              <input
                type="text"
                name="email"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-red-200">Username</label>
              <input
                type="text"
                name="username"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-red-200">Password</label>
              <input
                type="password"
                name="password"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button
              className="w-52 bg-red-500 text-white rounded-md p-1 mt-3"
              type="submit"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
