/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import { logout } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const UserNavbar = () => {
  const account = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <div className="d-flex">
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block mr-4"
              to="/"
            >
               <i className="fa-solid fa-home mr-2"></i>
              Trang chủ
            </Link>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/cart"
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i>
              <span className="mb-0 text-sm font-weight-bold">
                Giỏ hàng
              </span>
            </Link>
          </div>
          <Nav className="align-items-center d-none d-md-flex" navbar>

            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle bg-white text-dark">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {account.email}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" left>
                <DropdownItem onClick={(e) => { e.preventDefault(); handleLogout() }}>
                  <i className="ni ni-user-run" />
                  <span>Đăng xuất</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
