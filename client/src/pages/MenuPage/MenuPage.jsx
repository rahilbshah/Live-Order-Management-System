import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { menu } from '../../constant';

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/category');
        if (res.data) setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(90vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {categories.map(category => (
        <Link
          to={`/menu/${category.slug}`}
          key={category._id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{
            backgroundImage: `url(${category.img})`,
          }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-4">{category.desc}</p>
            <button
              className={`hidden 2xl:block bg-${category.color} text-${category.color === 'black' ? 'white' : 'red-500'} py-2 px-4 rounded-md`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
