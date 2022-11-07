import React, { useMemo } from 'react'
import { useAppSelector } from '../../../redux/store'
import './Cart.scss'
import ListProducts from './ListProducts'
import OrderSpace from './OrderSpace'

type Props = {}

function Cart({ }: Props) {
    const products = useAppSelector(state => state.cart.products) || [];
    return (
        <div className='CartPage'>
            <ListProducts/>
            <OrderSpace/>
        </div>
    )
}



export default Cart