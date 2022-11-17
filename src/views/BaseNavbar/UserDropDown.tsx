import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { authLogout, logout } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import {HiInformationCircle} from 'react-icons/hi'
import {ImExit} from 'react-icons/im'



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
        <Link to="/user" className='userDropDown itemLink'>
            <FaUserCircle onClick={toggleShow} className='fs-5' />
            {/* <div className="dropDownMenu shadow" data-show={show && 'true'}>
                <Link to='/user' className="dropDownItem">
                    <HiInformationCircle className='me-1 mb-1'/> Thông tin
                </Link>
                <div onClick={handleLogout} className="dropDownItem text-danger">
                    <ImExit className='me-1 mb-1'/> Đăng xuất
                </div>
            </div> */}
        </Link>
    )
}

export default UserDropDown