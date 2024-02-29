import { useState } from 'react';
import './App.css';
import Notification from './components/Notification/Notification';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import Featured from './components/Featured/Featured';
import MenuPage from './pages/MenuPage/MenuPage';
import Category from './pages/Category/Category';
import Product from './pages/Product/Product';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import Register from './pages/Register/Register';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  return (
    <Router>
      <Notification />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:category" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
        className={'text-[14px] font-bold'}
      />
      <Footer />
    </Router>
  );
}

export default App;
