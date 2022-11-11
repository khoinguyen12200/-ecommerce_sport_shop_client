import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import BaseNavbar from '../../views/BaseNavbar/BaseNavbar'
import Information from './Information/Information'
import { useEffect } from 'react';
import CartManagement from '../Base/CartManagement'

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
        <div className='UserContainer'>
            <CartManagement/>
            <BaseNavbar />
            <Routes>
                <Route path='/' element={<Information />} />
            </Routes>
        </div>
    )
}

export default User