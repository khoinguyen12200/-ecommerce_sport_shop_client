import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { authLogout, logout } from '../../redux/authSlice';
import { toast } from 'react-toastify';

type Props = {}

function UserDropDown({ }: Props) {
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        //on click out side .userDropDown
        function handleClickOutside(event: any) {
            if (event.target.closest('.userDropDown')) return;
            setShow(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    function handleLogout() {
        dispatch(authLogout(null))
        toast.success('Đăng xuất thành công');
    }

    return (
        <div className='userDropDown btn'>
            <FaUserCircle onClick={toggleShow} className='icon ml-1' />
            <div className="dropDownMenu shadow" data-show={show && 'true'}>
                <Link to='/user' className="dropDownItem">
                    Thông tin
                </Link>
                <div onClick={handleLogout} className="dropDownItem text-danger">
                    Đăng xuất
                </div>
            </div>
        </div>
    )
}

export default UserDropDown