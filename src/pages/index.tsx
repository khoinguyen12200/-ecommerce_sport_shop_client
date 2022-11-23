import React from 'react'
import './index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Base from './Base/Base'
import Login from './Base/Login/Login'
import Admin from './Admin/Admin'
import User from './User/User'
import Footer from '../views/Footer/Footer'
import Loading from '../Components/Loading/Loading'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { useEffect } from 'react';
import { getCategoriesData, setCategories } from '../redux/publicDataSlice'
import axios from 'axios'
import { ENDPOINT } from '../config/config'

type Props = {}

function Index({ }: Props) {
  const publicData = useAppSelector(state => state.publicData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!publicData.categories || publicData.categories.length === 0) {
      const res = axios.get(ENDPOINT+'/categories')
      res.then(res => {
        dispatch(setCategories(res.data.data))
      })
    }
  }, [publicData])

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

export default Index