import React from 'react'
import { ROLES } from '../../../config/constant'
import BaseContent from '../BaseContent'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { useAppDispatch } from '../../../redux/store';
import { setLoading } from '../../../redux/loadingSlice';

type Props = {}

function AddUser({ }: Props) {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        if(data.password !== data.password2) {
            alert('Mật khẩu không khớp');
            return;
        }

        dispatch(setLoading(true));
        const res = await axios.post(ENDPOINT + '/admin/user', data).finally(() => {
            dispatch(setLoading(false));
        });
        navigate('/admin/user/' + res.data.data.id);
    }

    return (
        <BaseContent
            title="Thêm tài khoản"
            backLink="/admin/user"
        >
            <form action="POST" onSubmit={handleSubmitForm}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" className="form-control" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="">Mật khẩu</label>
                    <input type="password" className="form-control" name="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="">Nhập lại mật khẩu</label>
                    <input type="password" className="form-control" name="password2" required />
                </div>
                <div className="form-group">
                    <label htmlFor="">Quyền</label>
                    <select name="role" className="form-control">
                        <option value={ROLES.ADMIN} >Admin</option>
                        <option value={ROLES.USER}>User</option>
                    </select>
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

export default AddUser