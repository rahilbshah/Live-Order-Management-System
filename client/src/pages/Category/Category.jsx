import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [catProduct, setCatProduct] = useState([]);
  const { pathname } = useLocation();
  const cat = pathname.split('/')[2];
  useEffect(() => {
    const fetchCatProducts = async () => {
      try {
        const res = await axios.get(`/api/product?cat=${cat}`);
        if (res.data) setCatProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCatProducts();
  }, [cat]);
  return (
    <div className="flex flex-wrap text-red-500">
      {catProduct.map(item => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          to={`/product/${item._id}`}
          key={item._id}
        >
          {item.img && (
            <div className="h-[80%]">
              <img
                src={item.img}
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
          )}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-xl uppercase p-1">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-1 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
