import React, { useEffect } from 'react'
import './Login.scss'

import ImageSporterus from '../../../assets/icons/sporterus-high-resolution-logo-transparent-background.png';
import useFetch from '../../../hooks/useFetch';
import { ENDPOINT } from '../../../config/config';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { updateToken } from '../../../redux/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

type Props = {}

function Login({ }: Props) {

    const account = useAppSelector(state => state.account);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [res, loading, dispatchFetch] = useFetch(undefined, { toast: true });
    const dispatch = useAppDispatch();

    useEffect(() => {
        let data = res?.data;
        if (data) {
            dispatch(updateToken({
                accessToken: data.token,
                role: data.role,
                email: data.email,
                id: data.id
            }))
        }
    }, [loading, res])

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toast.promise(
            sendForm(),
            {
                pending: 'Đang đăng nhập...',
                success: 'Đăng nhập thành công',
                error: 'Đăng nhập thất bại'
            }
        )
    }

    async function sendForm() {
        const res = await axios.post(ENDPOINT + '/login_check', {
            username: email,
                password: password
        })
        const data = res.data;
        dispatch(updateToken({
            accessToken: data.token,
            role: data.role,
            email: data.email,
            id: data.id
        }))
    }

    return (
        <div className='LoginPage'>
            {
                account.accessToken && (
                    account.role === 'ROLE_ADMIN' ? 
                    <Navigate to='/admin' /> :
                    <Navigate to='/user' />
                )
            }
            <div className='loginContainer mt-5'>
                <div className='loginForm'>
                    <img src={ImageSporterus} className='logo mb-5 text-center' />
                    <form className='form' onSubmit={submit}>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='form-control rounded-pill fs-5 mb-3 px-3' />
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Mật khẩu' className='form-control rounded-pill fs-5 mb-3 px-3' />
                        <button className='btn btn-primary rounded-pill fs-5 w-100'>
                            Đăng nhập
                        </button>
                        <div className='mt-5 text-center'>
                            <a className='btn btn-dark btn-sm mx-2 rounded-lg'>
                                Đăng ký
                            </a>
                            <a className='btn btn-secondary btn-sm rounded-lg mx-2'>
                                Quên mật khẩu
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login