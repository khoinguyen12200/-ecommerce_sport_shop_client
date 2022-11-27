import { isFulfilled } from '@reduxjs/toolkit';
import React, { useEffect, useMemo } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setOrderInformation } from '../../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import './MakeOrder.scss'

type Props = {}

function MakeOrder({ }: Props) {
    const user = useAppSelector(state => state.account.user);
    const products = useAppSelector(state => state.cart.products) || [];
    const navigate = useNavigate();
    const [loaded, setLoaded] = React.useState(false);
    const dispatch = useAppDispatch();

    const countChecked = useMemo(() => {
        return products.reduce((a, b) => a + (b.checked ? b.quantity : 0), 0);
    }, [products])

    const listCheckedProducts = useMemo(() => {
        return products.filter(product => product.checked);
    }, [products])

    useEffect(() => {
        setLoaded(true);
    }, [])

    useEffect(() => {
        if (countChecked === 0 && loaded) {
            toast.warning('Bạn chưa chọn sản phẩm nào để đặt hàng');
            navigate('/cart');
        }
    }, [countChecked, loaded])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()) as unknown;
        const orderInformation = data as OrderInformation;
        dispatch(setOrderInformation(orderInformation));
        navigate('/payment');
    }

    useEffect(() => {
        if(user) {
            autoFill()
        }
    },[user])

    function autoFill() {
        if (user) {
            //get all form input and fill with user data
            const form = document.querySelector('form') as HTMLFormElement;
            const inputs = form.querySelectorAll('input');
            const userData = user as any;
            inputs.forEach(input => {
                const name = input.getAttribute('name');

                if(name) {
                    userData.hasOwnProperty(name) && (input.value = userData[name]);
                }
            })
        }
    }


    return (
        <div className='contentOrderProcess MakeOrder d-flex align-item-center justify-content-center'>
            <form className='form' onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" name='name' placeholder="Nguyễn XXX YYYY" required aria-required />
                    <label htmlFor="name">Tên</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="email" name='email' placeholder="name@example.com" required aria-required />
                    <label htmlFor="email">Email</label>
                </div>
                {/* phone number input */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="phone" name='phone' placeholder="Số điện thoại" required aria-required />
                    <label htmlFor="phone">Số điện thoại</label>
                </div>
                {/* address */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="address" name='address' placeholder="Địa chỉ" required aria-required />
                    <label htmlFor="address">Địa chỉ</label>
                </div>
                {/* city */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="city" name='city' placeholder="Thành phố" required aria-required />
                    <label htmlFor="city">Thành phố</label>
                </div>

                <div className="form-floating mb-5">
                    <input type="text" className="form-control" id="note" name='note' placeholder="Ghi chú" />
                    <label htmlFor="note">Ghi chú</label>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='submitBtn align-self-end btn btn-primary btn-lg rounded'>
                        Xác nhận thông tin
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MakeOrder