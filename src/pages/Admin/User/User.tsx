import React, { useEffect } from 'react'
import BaseContent from '../BaseContent'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppDispatch } from '../../../redux/store';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { setLoading } from '../../../redux/loadingSlice';
import { Table } from 'react-bootstrap';
import { ROLES } from '../../../config/constant';

type Props = {}

function User({ }: Props) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const navigate = useNavigate();

    const { role, name, email } = useMemo(() => {
        return {
            role: searchParams.get('role'),
            name: searchParams.get('name'),
            email: searchParams.get('email'),
        }
    }, [searchParams])

    const [users, setUsers] = React.useState<UserInterface[]>([]);

    useEffect(() => {
        dispatch(setLoading(true));
        fetchUsers().finally(() => {
            dispatch(setLoading(false));
        })
    }, [role, name, email])

    async function fetchUsers() {
        const params = {
            role,
            name,
            email,
        }

        const res = await axios.get(ENDPOINT + '/admin/user', {
            params,
        });

        setUsers(res.data.data);
    }


    return (
        <BaseContent
            title="Tài khoản"
            rightContent={
                <Link to="/admin/user/add" className="btn btn-primary">Thêm tài khoản</Link>
            }
        >
            <Filters />
            <hr />
            <Table
                striped
                bordered
                hover
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vai trò</th>
                        <th>Tên</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: UserInterface, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.role}</td>
                            <td>{user.name}</td>
                            <td>
                                {user.email}
                                <Link to={`/admin/user/${user.id}`} className="text-primary ml-2">
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </BaseContent>
    )
}

/**
 * User role
 * User name
 * User email
 */
function Filters() {
    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const navigate = useNavigate();

    const { role, name, email } = useMemo(() => {
        return {
            role: searchParams.get('role'),
            name: searchParams.get('name'),
            email: searchParams.get('email'),
        }
    }, [searchParams])

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set('role', e.target.value)
        location.search = searchParams.toString();
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        searchParams.set('name', e.target.value)
        location.search = searchParams.toString();
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        searchParams.set('email', e.target.value)
        location.search = searchParams.toString();
    }
    function submit() {
        navigate(location);
    }

    return (
        <div className="row">
            <div className="col-3">
                <div className="form-group">
                    <label htmlFor="role">Vai trò</label>
                    <select className="form-control" id="role" defaultValue={role || ''} onChange={handleRoleChange}>
                        <option value="">Tất cả</option>
                        <option value={ROLES.ADMIN} >Admin</option>
                        <option value={ROLES.USER} >User</option>
                    </select>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label htmlFor="name">Tên</label>
                    <input type="text" className="form-control" id="name" defaultValue={name || ''} onChange={handleNameChange} />
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" defaultValue={email || ''} onChange={handleEmailChange} />
                </div>
            </div>
            {/* submit */}
            <div className="col-3">
                <div className="form-group">
                    <label>&nbsp;</label>
                    <button className="btn btn-dark d-block w-100" onClick={submit}>Tìm kiếm</button>
                </div>
            </div>
        </div>
    )
}

export default User