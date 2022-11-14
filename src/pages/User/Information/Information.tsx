import axios from 'axios';
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../../../config/config';
import { reloadUserData, setUser } from '../../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import './Information.scss';
import { useEffect } from 'react';

type Props = {}

function Information({ }: Props) {
    const user = useAppSelector(state => state.account.user);
    const dispatch = useAppDispatch();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //get all data from form to json
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        //send data to server
        await toast.promise(
            updateUser(data),
            {
                pending: 'Đang cập nhật...',
                success: 'Cập nhật thành công',
                error: 'Cập nhật thất bại'
            }
        )

    }

    async function updateUser(data: any) {
        const res = await axios.post(ENDPOINT + '/user/update', data);
        dispatch(setUser(res.data.data))
    }

    useEffect(() => {
        dispatch(reloadUserData({}))
    }, [])

    return (
        <div className='InformationPage'>
            <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1344,c_limit/beba11dc-27f3-4fac-97cc-560674ebfe6f/nike-just-do-it.png"
                alt="" className="bg" />
            <div className="userWrapper">
                <div className='avatarWrapper'>
                    <div className='userAvatar'>
                        <AiOutlineUser />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" name='name' placeholder="name@example.com" defaultValue={user?.name} />
                        <label htmlFor="name">Tên</label>
                    </div>
                    {/* phone number input */}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="phone" name='phone' placeholder="Số điện thoại" defaultValue={user?.phone} />
                        <label htmlFor="phone">Số điện thoại</label>
                    </div>
                    {/* address */}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="address" name='address' placeholder="Địa chỉ" defaultValue={user?.address} />
                        <label htmlFor="address">Địa chỉ</label>
                    </div>
                    {/* city */}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="city" name='city' placeholder="Thành phố" defaultValue={user?.city} />
                        <label htmlFor="city">Thành phố</label>
                    </div>

                    <button className='submitBtn btn btn-dark btn-lg d-block rounded'>
                        Lưu lại
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Information