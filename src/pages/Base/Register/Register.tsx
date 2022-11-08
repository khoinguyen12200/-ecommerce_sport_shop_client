import React from 'react'
import './Register.scss';
import ImageSporterus from "../../../assets/icons/sporterus-high-resolution-logo-transparent-background.png";
import axios, { AxiosError } from 'axios';
import { ENDPOINT } from '../../../config/config';
import { toast } from 'react-toastify';


type Props = {}

function Register({ }: Props) {



    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        if(!validateEmail(email)) {
            alert('Email không hợp lệ');
            return;
        }
        if (password !== password2) {
            alert('Mật khẩu không khớp');
            return;
        }

        toast.promise(
            sendRegister(),
            {
                pending: 'Đang đăng ký...',
                success: 'Đăng ký thành công',
                error: 'Đăng ký thất bại'
            }
        )
        
    
    }

    async function sendRegister() {
        const res = await axios.post(ENDPOINT + '/registry/user', {
            email: email,
            password: password
        }).catch((err: AxiosError) => {
            const data = err.response?.data as any;
            toast.error(data?.message || '');
            throw err.response?.data;
        })
        toast.success('Đăng ký thành công, hãy kiểm tra email để kích hoạt tài khoản', {
            autoClose: 10000
        })
    }

    function validateEmail(email: string) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }



    return (
        <div className='RegisterPage'>
            <div className='registerContainer mt-5'>
                <div className='registerForm'>
                    <img src={ImageSporterus} className='logo mb-5 text-center' />
                    <form method="post" className='form' onSubmit={submit}>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='form-control rounded-pill fs-5 mb-3 px-3' />
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Mật khẩu' className='form-control rounded-pill fs-5 mb-3 px-3' />
                        <input type='password' value={password2} onChange={e => setPassword2(e.target.value)} placeholder='Nhập lại mật khẩu' className='form-control rounded-pill fs-5 mb-3 px-3' />
                        <div className='text-center'>
                        <button type='submit' className='btn btn-dark rounded m-auto fs-5 px-5 mt-3'>Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register