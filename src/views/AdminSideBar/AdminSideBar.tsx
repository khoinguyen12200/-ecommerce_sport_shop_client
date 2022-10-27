import React from 'react'
import { Link } from 'react-router-dom'
import './AdminSideBar.scss'
import Image from 'react-bootstrap/Image'
import {AiFillDashboard} from 'react-icons/ai';
import {GiConverseShoe} from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
type Props = {}

function AdminSideBar({ }: Props) {
    return (
        <div className='AdminSideBar'>
            <div className="list">
                <div className="sideBarLogo">
                    <div className='logoContainer'>
                        <div className='logo'>
                            <Image src={require('../../assets/icons/full_logo_white_transparent.png')} />
                        </div>
                    </div>
                </div>
                <div className="sideBarItems">
                    <ItemLink to='/admin' Icon={<AiFillDashboard/>} text='Tổng quan' />
                    <ItemLink to='/admin/product' Icon={<GiConverseShoe/>} text='Sản phẩm' />
                    <ItemLink to='/admin/category' Icon={<MdCategory/>} text='Phân loại' />
                    <ItemLink to='/admin' Icon={<AiFillDashboard/>} text='Tổng quan' />
                    <ItemLink to='/admin' Icon={<AiFillDashboard/>} text='Tổng quan' />
                    <ItemLink to='/admin' Icon={<AiFillDashboard/>} text='Tổng quan' />
                </div>
            </div>

        </div>
    )
}

interface ItemLinkProp {
    to: string;
    Icon: any;
    text: string;
}

function ItemLink({ to, Icon, text }: ItemLinkProp) {
    return (
    <Link to={to} className='itemLink'>
        {Icon}
        <span className="text">
            {text}    
        </span> 
    </Link>
    )
}

export default AdminSideBar