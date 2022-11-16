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
/*eslint-disable*/
import classNames from "classnames";
import { useMemo, useState } from "react";
import { NavLink as NavLinkRRD, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

interface Props {

}

const Sidebar = (props: any) => {
  const location = useLocation();
  const [collapseOpen, setCollapseOpen] = useState<boolean>();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank"
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0">
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={require('../../assets/icons/full_logo_brown_transparent.png')}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon> */}
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>
            <NavigateItem
              to='/admin'
              name='Tổng quan'
              icon='fa-solid fa-gauge text-primary'
            />

            <NavigateItem
              to='/admin/product'
              listActives={['/admin/product', '/admin/product/add', '/admin/product/edit/*']}
              name='Sản phẩm'
              icon='fa-solid fa-shirt text-warning'
            />

            <NavigateItem
              to='/admin/category'
              listActives={['/admin/category', '/admin/category/add', '/admin/category/edit/*']}
              name='Danh mục'
              icon='fa-solid fa-list text-info'
            />

            <NavigateItem
              to='/admin/user'
              listActives={['/admin/user', '/admin/user/*', '/admin/user/add']}
              name='Tài khoản'
              icon='fa-solid fa-users text-dark'
            />

            <NavigateItem
              to='/admin/invoice'
              listActives={['/admin/invoice', '/admin/invoice/*']}
              name='Đơn hàng'
              icon='fa-solid fa-receipt text-success'
            />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}]
};

export default Sidebar;

function NavigateItem(props: any) {
  const path = useLocation();
  const pathName = path.pathname;

  const { icon, name, to, listActives } = props;

  function isPathValid(path: string) {
    const regex = new RegExp(path.replace('*', '.*') + '$');
    return regex.test(pathName);
  }

  const isActive = useMemo(() => {
    if (listActives) {
      return listActives.some((path: string) => isPathValid(path));
    }

    return isPathValid(to);
  }, [pathName]);




  return (
    <NavItem>
      <NavLink
        to={to}
        tag={Link}
        activeClassName="active"
        className={classNames("nav-link", {
          active: isActive
        })}
      >
        <i className={icon}></i>
        {name}
      </NavLink>
    </NavItem>
  )
}



{/* <Nav className="mb-md-3" navbar>
<NavItem>
  <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
    <i className="ni ni-spaceship" />
    Getting started
  </NavLink>
</NavItem>
<NavItem>
  <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
    <i className="ni ni-palette" />
    Foundation
  </NavLink>
</NavItem>
<NavItem>
  <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
    <i className="ni ni-ui-04" />
    Components
  </NavLink>
</NavItem>
</Nav>
<Nav className="mb-md-3" navbar>
<NavItem className="active-pro active">
  <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
    <i className="ni ni-spaceship" />
    Upgrade to PRO
  </NavLink>
</NavItem>
</Nav> */}