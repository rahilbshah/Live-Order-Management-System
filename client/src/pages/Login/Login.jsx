import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/loginActions';
import { useDispatch } from 'react-redux';
import { toastAction } from '../../utils/toastAction';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(credentials));
      if (response && response.status === 200) {
        toastAction.success(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Login error:', error);
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
            className="flex flex-wrap flex-col gap-4 p-4 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-2">
              <label className="text-red-200">Email</label>
              <input
                type="text"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-red-200">Password</label>
              <input
                type="password"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-52 bg-red-500 text-white rounded-md p-1 my-3"
            >
              LOGIN
            </button>
            <Link to="/register" className="link">
              Create the new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
