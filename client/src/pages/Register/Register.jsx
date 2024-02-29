import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
          <form className="flex flex-wrap flex-col gap-3 p-4 justify-center items-center">
            <div className="w-full flex flex-col gap-1">
              <label className="text-red-200">Email</label>
              <input
                type="text"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Email"
                // onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-red-200">Username</label>
              <input
                type="text"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Username"
                // onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-red-200">Password</label>
              <input
                type="password"
                className="ring-1 ring-red-200 p-2 rounded-md"
                placeholder="Password"
                // onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button className="w-52 bg-red-500 text-white rounded-md p-1 mt-3">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
