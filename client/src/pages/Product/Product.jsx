import React, { useEffect, useState } from 'react';
import { singleProduct } from '../../constant';
import Price from '../../components/Price/Price';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${id}`);
        if (res.data) setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {product.img && (
        <div className=" w-full h-1/2 md:h-[70%]">
          <img
            src={product.img}
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
      )}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {product.title}
        </h1>
        <p>{product.desc}</p>
        <Price
          price={product.price}
          id={product._id}
          options={product.options}
        />
      </div>
    </div>
  );
};

export default Product;
