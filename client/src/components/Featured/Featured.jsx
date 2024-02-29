import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/product');
        if (res.data) setFeaturedProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      <div className="w-max flex">
        {featuredProducts.map((item, index) => (
          <div
            key={index}
            className="w-screen h-[100vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {item.img && (
              <div className="flex-1 w-full hover:rotate-[60deg] flex justify-center items-center transition-all duration-500">
                <img
                  src={item.img}
                  alt=""
                  className="object-contain w-[65%] h-[65%]"
                />
              </div>
            )}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
