import React from 'react'
import { Link } from 'react-router-dom'
import { FaBeer, FaUserCircle } from 'react-icons/fa';
import './BaseNavbar.scss'

type Props = {}

function BaseNavbar({ }: Props) {
  return (
    <div className='BaseNavbar'>
      <div className='navigateSpace'>
        <Link to='/' className='logoContainer'>
          <div className='logo'>
            <img src={require('../../assets/icons/full_logo_white_transparent.png')} />
          </div>
        </Link>
      </div>
      <div className='userSpace'>
        <Link to='login' className='itemLink fs-5'>
          <FaUserCircle className='icon'/>
        </Link>
      </div>
    </div>
  )
}

export default BaseNavbar