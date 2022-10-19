import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './Home';
import BaseNavbar from '../../views/BaseNavbar/BaseNavbar';
import Login from './Login/Login';

type Props = {}

function Base({}: Props) {
  return (
    <div className='BaseContainer'>
        <BaseNavbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    </div>
  )
}

export default Base