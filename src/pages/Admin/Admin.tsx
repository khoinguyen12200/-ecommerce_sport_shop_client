import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import AdminNavBar from '../../views/AdminNavBar/AdminNavBar'
import AdminSideBar from '../../views/AdminSideBar/AdminSideBar'
import './Admin.scss'
import Product from './Product/Product'
import { useEffect } from 'react';
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
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin