import React from 'react'
import { Link } from 'react-router-dom'
import { FaBeer, FaUserCircle } from 'react-icons/fa';
import './BaseNavbar.scss'
import { useAppSelector } from '../../redux/store';

type Props = {}

function BaseNavbar({ }: Props) {
  const account = useAppSelector(state => state.account);

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
        {
            !account.role ?
            <Link to='login' className='itemLink fs-5'>
              <FaUserCircle className='icon' />
            </Link> :
            <Link to={account.role === 'ROLE_USER' ? 'user' : 'admin'} className='itemLink fs-5'>
              <small style={{fontSize: 14}} className='mx-2'>
                {account.email}
              </small>
              <FaUserCircle className='icon ml-1' />
            </Link>
        }
      </div>
    </div>
  )
}

export default BaseNavbar