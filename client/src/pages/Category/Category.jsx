import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cart-slice/cartSlice';

const Category = () => {
  const [catProduct, setCatProduct] = useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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

  const handleClick = id => {
    const product = catProduct.find(product => product._id === id);
    const { title, img, quantity, price, options } = product;
    dispatch(
      addItem({
        id,
        title,
        img,
        quantity,
        price,
        optionName: options[0].title,
      }),
    );
  };
  return (
    <div className="flex flex-wrap text-red-500">
      {catProduct.map(item => (
        <div
          key={item._id}
          className="w-full border-r-2 border-b-2 border-red-500  sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
        >
          <Link className="h-[50vh]" to={`/product/${item._id}`}>
            {item.img && (
              <div className="h-[80%]">
                <img
                  src={item.img}
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </Link>
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-xl uppercase p-1">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button
              className="hidden group-hover:block uppercase bg-red-500 text-white p-1 rounded-md"
              onClick={() => handleClick(item._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
