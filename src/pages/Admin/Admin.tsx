import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import AdminNavBar from '../../views/AdminNavBar/AdminNavBar'
import AdminSideBar from '../../views/AdminSideBar/AdminSideBar'
import './Admin.scss'
import Product from './Products/Products'
import { useEffect } from 'react';
import Category from './Category/Category';
type Props = {}

function Admin({ }: Props) {
  const account = useAppSelector(state => state.account);
  useEffect(() => {
    if (account.role !== 'admin') {

    }
  }, [account]);
  return (
    <div className='AdminPages d-flex'>
      {account.role !== 'ROLE_ADMIN' && (
        <Navigate to='/' />
      )}
      <AdminSideBar />
      <div className='AdminLayout d-flex flex-column'>
        <AdminNavBar />
        <div className='AdminContent'>
          <Routes>
            <Route path='product' element={<Product />} />
            <Route path='category' element={<Category />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin