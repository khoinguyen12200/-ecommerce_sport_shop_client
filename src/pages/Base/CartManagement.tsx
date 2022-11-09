import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../config/config';
import { fetchCart } from '../../redux/cartSlice';

type Props = {}

function CartManagement({ }: Props) {
    const products = useAppSelector(state => state.cart.products);
    const accessToken = useAppSelector(state => state.account.accessToken);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(accessToken) {
            setTimeout(() => {
                dispatch(fetchCart({}))
            }, 1000);
        }
    }, [accessToken])

    return (
        <>

        </>
    )
}

export default CartManagement