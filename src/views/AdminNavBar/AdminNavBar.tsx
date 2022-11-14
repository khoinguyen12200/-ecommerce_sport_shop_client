import React from 'react'
import './AdminNavBar.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { GrUserAdmin } from 'react-icons/gr'
import { MdAdminPanelSettings } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { logout } from '../../redux/authSlice'


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
                <LogoutModal/>
            </Dropdown.Menu>
        </Dropdown>
    )
}

function LogoutModal() {
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <>
            <Dropdown.Item className='text-danger' onClick={handleShow}>Đăng xuất</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn đăng xuất?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Thôi
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminNavBar