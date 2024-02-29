import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastAction } from '../../utils/toastAction';

const AddProduct = () => {
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    price: 0,
    catSlug: '',
  });

  const [option, setOption] = useState({
    title: '',
    additionalPrice: 0,
  });
  const [options, setOptions] = useState([]);
  const [file, setFile] = useState();
  const handleChangeImg = e => {
    const target = e.target;
    const item = target.files[0];
    setFile(item);
  };
  const navigate = useNavigate();

  const upload = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'restaurant');

    const res = await axios.post(import.meta.env.VITE_IMAGE_URL, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data.url;
  };
  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = e => {
    setOption(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await axios.post('/api/product', {
        img: url,
        ...inputs,
        options,
      });
      if (res && res.status === 201) {
        toastAction.success(res.data.message);
        setTimeout(() => {
          navigate(`/product/${res.data.newProduct._id}`);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 lg:px-10 xl:px-20 h-[calc(100vh-6rem)] md:h-[calc(155vh-9rem)] flex items-center justify-center text-red-500">
      <form className="flex flex-wrap gap-6" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <img src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            id="file"
            onChange={handleChangeImg}
            className="hidden"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Category</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="pizzas"
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex">
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeOption}
            />
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button
              className="bg-gray-500 p-2 text-white"
              onClick={e => {
                e.preventDefault();
                setOptions(prev => [...prev, option]);
              }}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map(opt => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions(prev =>
                    prev.filter(item => item.title !== opt.title),
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> ({opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
