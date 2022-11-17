import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import BaseNavbar from '../../views/BaseNavbar/BaseNavbar'
import Information from './Information/Information'
import { useEffect } from 'react';
import CartManagement from '../Base/CartManagement'
import Footer from '../../views/Footer/Footer'
import UserSideBar from '../../views/UserSideBar/UserSideBar'
import './User.scss';
import AdminNavbar from '../../Components/Navbars/AdminNavbar'
import { Container } from 'reactstrap'
import UserNavbar from '../../views/UserNavbar/UserNavbar'
type Props = {}

function User({ }: Props) {
    const account = useAppSelector(state => state.account);

    const navigate = useNavigate();


    useEffect(() => {
        if (!account.accessToken) {
            navigate('/login');
        }
    }, [account])


    return (
        <>
            <UserSideBar
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: require("../../assets/img/brand/argon-react.png"),
                    imgAlt: "..."
                }}
            />
            <div className="main-content">
                <UserNavbar/>
                <Routes>
                    <Route path="" element={<Information />} />
                    {/* <Route path="" element={<Dashboard />} />
                    <Route path="product" element={<Product />} />
                    <Route path="product/add" element={<AddProduct />} />
                    <Route path="product/edit/:id" element={<EditProduct />} />
                    <Route path="category" element={<Category />} />
                    <Route path="user" element={<User />} />
                    <Route path="user/:id" element={<UserDetail />} />
                    <Route path="user/add" element={<AddUser />} />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="invoice/:id" element={<InvoiceDetail />} />
                    <Route path="invoice/:id/update" element={<UpdateInvoice />} />
                    <Route path="invoice/create" element={<AddInvoice />} /> */}
                </Routes>
                <Container fluid>
                    {/* <AdminFooter /> */}
                </Container>
            </div>
        </>
    )
}

export default User