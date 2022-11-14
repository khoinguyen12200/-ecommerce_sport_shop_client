import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBeer, FaUserCircle } from 'react-icons/fa';
import './BaseNavbar.scss'
import { useAppSelector } from '../../redux/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import UserDropDown from './UserDropDown';

type Props = {}

function BaseNavbar({ }: Props) {
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location]);

  const products = useAppSelector(state => state.cart.products) || [];

  const count = useMemo(() => {
    return products.reduce((a, b) => a + b.quantity, 0);
  }, [products])



  const account = useAppSelector(state => state.account);

  return (
    <div className={`BaseNavbar ${loading && 'loading'}`}>
      <div className='navigateSpace'>
        <Link to='/' className='logoContainer'>
          <div className='logo'>
            <img src={require('../../assets/icons/full_logo_brown_transparent.png')} />
          </div>
        </Link>
        <div className="navigateItem dropDown">
          <span>
            Sản phẩm
          </span>
          <div className='dropDownContent'>
            <SectionCategories />
          </div>
        </div>
      </div>
      <div className='userSpace'>
        <Link to='/cart' className='itemLink fs-5 position-relative px-3 mr-1'>
          <AiOutlineShoppingCart />
          <span style={{ fontSize: 8, top: 15, right: 0 }} className='position-absolute px-1 translate-middle badge rounded-pill bg-secondary'>
            {count}
          </span>
        </Link>
        {
          !account.accessToken ?
            <Link to='login' className='itemLink'>
              <FaUserCircle className='fs-5' />
            </Link> :
            (
              account.role === 'ROLE_ADMIN' ?
                <Link to={'admin'} className='itemLink'>
                  <small style={{ fontSize: 14 }} className='mx-2'>
                    {account.email}
                  </small>
                  <FaUserCircle className='fs-5 ml-1' />
                </Link> :
                <UserDropDown />
            )
        }
      </div>
    </div>
  )
}

function SectionCategories() {

  return (
    <div>
      <h4>
        <Link to='/products' className='simpleLink'>
          Tất cả sản phẩm
        </Link>
      </h4>
      <div className='mt-5 mb-5 mx-5 d-flex justify-content-around'>
        <Giay />
        <QuanAo />
        <PhuKien />
      </div>
    </div>
  )
}

function Giay() {
  return (
    <div className='text-start'>
      <h5>
        <Link to='/products?category=giay' className='simpleLink'>
          Giày
        </Link>
      </h5>
      <div>
        <h6>
          <Link to='/products?category=giay-chay-bo' className='simpleLink text-muted'>
            Giày chạy bộ
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=giay-bong-ro' className='simpleLink text-muted'>
            Giày bóng rổ
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=giay-bong-da' className='simpleLink text-muted'>
            Giày bóng đá
          </Link>
        </h6>
      </div>
    </div>
  )
}

function QuanAo() {
  return (
    <div className='text-start'>
      <h5>
        <Link to='/products?category=quan-ao' className='simpleLink'>
          Quần áo
        </Link>
      </h5>
      <div>
        <h6>
          <Link to='/products?category=ao-thun' className='simpleLink text-muted'>
            Áo thun
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=ao-khoac' className='simpleLink text-muted'>
            Áo khoác
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=quan-short' className='simpleLink text-muted'>
            Quần short
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=quan-dai' className='simpleLink text-muted'>
            Quần dài thể thao
          </Link>
        </h6>
      </div>
    </div>
  )
}

function PhuKien() {
  return (
    <div className='text-start'>
      <h5>
        <Link to='/products?category=phu-kien' className='simpleLink'>
          Trang bị khác
        </Link>
      </h5>
      <div>
        <h6>
          <Link to='/products?category=bong' className='simpleLink text-muted'>
            Banh / Bóng
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=tui' className='simpleLink text-muted'>
            Túi xách
          </Link>
        </h6>
        <h6>
          <Link to='/products?category=balo' className='simpleLink text-muted'>
            Balo
          </Link>
        </h6>

      </div>
    </div>
  )
}

export default BaseNavbar