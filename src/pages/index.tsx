import React from 'react'
import './index.scss'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Base from './Base/Base'
import Login from './Base/Login/Login'

type Props = {}

function index({}: Props) {
  return (
    <div className='AppContainer'>
        <Routes>
          <Route path='/*' element={<Base/>} />
        </Routes>
    </div>
  )
}

export default index