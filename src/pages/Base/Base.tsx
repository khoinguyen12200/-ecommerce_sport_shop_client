import React from 'react'
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'
import Home from './Home';
import BaseNavbar from '../../views/BaseNavbar/BaseNavbar';
import Login from './Login/Login';
import Product from './Products/Products';
import ProductShow from './ProductShow/ProductShow';
import Cart from './Cart/Cart';
import Register from './Register/Register';
import VerifySuccess from './Register/VerifySuccess';
import CartManagement from './CartManagement';
import MakeOrder from './MakeOrder/MakeOrder';
import OrderBreadcrumb from './OrderBreadcrumb';
import './Base.scss'
import Payment from './Payment/Payment';


type Props = {}

function Base({ }: Props) {
  const loaction = useLocation();

  return (
    <div className='BaseContainer'>
      <CartManagement />
      <BaseNavbar />
      {
        ['/cart', '/make_order', '/payment'].includes(loaction.pathname) &&
        <OrderBreadcrumb />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify_success' element={<VerifySuccess />} />
        <Route path='/products' element={<Product />} />
        <Route path='/product/:id' element={<ProductShow />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/make_order' element={<MakeOrder/>} />
        <Route path='/payment' element={<Payment/>} />
      </Routes>
    </div>
  )
}

export default Base