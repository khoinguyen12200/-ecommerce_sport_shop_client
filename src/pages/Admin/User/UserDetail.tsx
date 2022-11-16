import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BaseContent from '../BaseContent'
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { useAppDispatch } from '../../../redux/store';
import { setLoading } from '../../../redux/loadingSlice';
import { ROLES } from '../../../config/constant';

type Props = {}

function UserDetail({ }: Props) {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [user, setUser] = React.useState<UserInterface>();

    useEffect(() => {
        fetchUser();
    }, [id])

    async function fetchUser() {
        dispatch(setLoading(true))
        const res = await axios.get(ENDPOINT + '/admin/user/' + id).finally(() => {
            dispatch(setLoading(false));
        });
        setUser(res.data.data);
    }

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(setLoading(true));
        //get all data from form
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const userData = {
            ...user,
            ...data,
        }
        await axios.put(ENDPOINT + '/admin/user/' + id, userData).finally(() => {
            dispatch(setLoading(false));
        });
        fetchUser();
    }

    async function handleDelete() {
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?');
        if (confirm) {

            dispatch(setLoading(true));
            await axios.delete(ENDPOINT + '/admin/user/' + id).finally(() => {
                dispatch(setLoading(false));
            }).then(() => {
                navigate('/admin/user');
            })
        }
    }
    return (
        <BaseContent
            backLink="/admin/user"
            title={user?.name}
        >
            <form onSubmit={handleSubmitForm} className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="">Tên</label>
                        <input type="text" className="form-control" name='name' defaultValue={user?.name} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" className="form-control" name='email' defaultValue={user?.email} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mật khẩu</label>
                        <input type="password" className="form-control" name="password" autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Quyền</label>
                        <select name="role" className="form-control" defaultValue={user?.role}>
                            <option value={ROLES.ADMIN}>Admin</option>
                            <option value={ROLES.USER}>User</option>
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" className="form-control" name='phone' defaultValue={user?.phone} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Địa chỉ</label>
                        <input type="text" className="form-control" name='address' defaultValue={user?.address} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Thành phố</label>
                        <input type="text" className="form-control" name='city' defaultValue={user?.city} required />
                    </div>
                </div>
                <button
                    className='btn btn-primary'
                >
                    <i className="fa-solid fa-floppy-disk me-2"></i>
                    Lưu lại
                </button>
            </form>

        </BaseContent>
    )
}

export default UserDetail