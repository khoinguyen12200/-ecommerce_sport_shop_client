import React, { useMemo } from 'react'
import { useAppSelector } from '../../../redux/store'
import './Cart.scss'
import ListProducts from './ListProducts'
import OrderSpace from './OrderSpace'

type Props = {}

function Cart({ }: Props) {
    return (
        <div className='CartPage contentOrderProcess'>
            <ListProducts/>
            <OrderSpace/>
        </div>
    )
}



export default Cart