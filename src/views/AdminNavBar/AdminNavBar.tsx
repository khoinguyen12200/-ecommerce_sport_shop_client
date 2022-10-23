import React from 'react'
import './AdminNavBar.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppSelector } from '../../redux/store'
import { GrUserAdmin } from 'react-icons/gr'
import { MdAdminPanelSettings } from 'react-icons/md';
import {RiHome2Line} from 'react-icons/ri'
import { Dropdown } from 'react-bootstrap'


type Props = {}

const AdminNavBar = (props: Props) => {
    return (
        <div className='AdminNavBar'>
            <div className="navContent d-flex justify-content-between">
                <div className="navLeft d-flex align-items-center px-3">
                    <Link to='/' className='btn btn-dark'>
                        <RiHome2Line className='fs-5 mx-2' />
                        Trang chủ
                    </Link>
                </div>
                <div className="navRight d-flex align-items-center px-3" style={{ height: 60 }}>
                    <AdminUser />
                </div>
            </div>
        </div>
    )
}

function AdminUser() {
    const account = useAppSelector(state => state.account);
    return (
        <Dropdown className="adminUser">
            <Dropdown.Toggle split={false} className="rounded-pill" variant="light" id="dropdown-basic">
                <span className='text px-2'>
                    {account.email}
                </span>
                <MdAdminPanelSettings className='fs-4' />
            </Dropdown.Toggle>

            <Dropdown.Menu align={'end'}>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AdminNavBar