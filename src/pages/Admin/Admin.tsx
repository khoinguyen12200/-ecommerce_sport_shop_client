import React from 'react'
import AdminNavBar from '../../views/AdminNavBar/AdminNavBar'
import AdminSideBar from '../../views/AdminSideBar/AdminSideBar'
import './Admin.scss'
type Props = {}

function Admin({}: Props) {
  return (
    <div className='AdminPages d-flex'>
        <AdminSideBar/>
        <div className='AdminLayout d-flex flex-column'>
            <AdminNavBar/>
        </div>
    </div>
  )
}

export default Admin