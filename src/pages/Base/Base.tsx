import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home';
import BaseNavbar from '../../views/BaseNavbar/BaseNavbar';
import Login from './Login/Login';
import Product from './Products/Products';
import ProductShow from './ProductShow/ProductShow';
import Cart from './Cart/Cart';
import Register from './Register/Register';
import VerifySuccess from './Register/VerifySuccess';
import CartManagement from './CartManagement';


type Props = {}

function Base({ }: Props) {
  return (
    <div className='BaseContainer'>
      <CartManagement />
      <BaseNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify_success' element={<VerifySuccess />} />
        <Route path='/products' element={<Product />} />
        <Route path='/product/:id' element={<ProductShow />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default Base