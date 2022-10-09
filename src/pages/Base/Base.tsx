import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './Home';
import BaseNavbar from '../../views/BaseNavbar/BaseNavbar';

type Props = {}

function Base({}: Props) {
  return (
    <div className='BaseContainer'>
        <BaseNavbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
        </Routes>
    </div>
  )
}

export default Base