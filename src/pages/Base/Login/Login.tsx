import React, { useEffect } from 'react'
import './Login.scss'

import ImageSporterus from '../../../assets/icons/sporterus-high-resolution-logo-transparent-background.png';
import useFetch from '../../../hooks/useFetch';

type Props = {}

function Login({ }: Props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [res, loading, fetch] = useFetch('http://localhost:3000/api/login');

    useEffect(() => {
    },[]);

    return (
        <div className='LoginPage'>
            <div className='loginContainer mt-5'>
                <div className='loginForm'>
                    <img src={ImageSporterus} className='logo mb-5 text-center' />
                    <div className='title'>
                        {/* <h1 className='text-center mb-4'>Đăng nhập</h1> */}
                    </div>
                    <input type='text' placeholder='Email' className='form-control rounded-pill fs-5 mb-3 px-3' />
                    <input type='password' placeholder='Mật khẩu' className='form-control rounded-pill fs-5 mb-3 px-3' />
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
                </div>
            </div>
        </div>
    )
}

export default Login