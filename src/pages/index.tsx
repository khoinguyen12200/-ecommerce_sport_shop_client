import React from 'react'
import './index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Base from './Base/Base'
import Login from './Base/Login/Login'
import Admin from './Admin/Admin'
import User from './User/User'
import Footer from '../views/Footer/Footer'
import Loading from '../Components/Loading/Loading'

type Props = {}

function index({ }: Props) {
  return (
    <div className=''>
      <Loading />
      <Routes>
        <Route path='/*' element={<Base />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/user/*' element={<User />} />
      </Routes>
    </div>
  )
}

export default index