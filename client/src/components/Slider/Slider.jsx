import React, { useEffect, useState } from 'react';
import { sliderDate } from '../../constant';
import { Link } from 'react-router-dom';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide(prev =>
          prev === sliderDate.length - 1 ? 0 : prev + 1,
        ),
      4000,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {sliderDate[currentSlide].title}
        </h1>
        <Link to={'/orders'} className="bg-red-500 text-white py-4 px-8">
          Order Now
        </Link>
      </div>
      <div className="w-full flex-1">
        <img
          src={sliderDate[currentSlide].image}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Slider;
