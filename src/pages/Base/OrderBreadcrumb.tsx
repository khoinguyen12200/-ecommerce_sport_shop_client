import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = {}

function OrderBreadcrumb({}: Props) {
    const location = useLocation();
    const path = location.pathname;

  return (
    <div className='d-flex orderBreadcrumb'>
        <Link className={`link ${path==='/cart' && 'active'}`} to='/cart'>
            <div className='d-flex align-items-center justify-content-center'>
                1. Giỏ hàng
            </div>
        </Link>
        <Link className={`link ${path==='/make_order' && 'active'}`} to='/make_order'>
            <div className='d-flex align-items-center justify-content-center'>
                2. Thông tin đặt hàng
            </div>
        </Link>
        <Link className={`link ${path==='/payment' && 'active'}`} to='/payment'>
            <div className='d-flex align-items-center justify-content-center'>
                3. Thanh toán
            </div>
        </Link>
    </div>
  )
}

export default OrderBreadcrumb