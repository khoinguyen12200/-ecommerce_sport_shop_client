import React from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import AdminNavBar from '../../views/AdminNavBar/AdminNavBar'
import AdminSideBar from '../../views/AdminSideBar/AdminSideBar'
import './Admin.scss'
import Product from './Products/Products'
import { useEffect } from 'react';
import Category from './Category/Category';
import AddProduct from './Products/AddProduct'
import EditProduct from './Products/EditProduct'
import { fetchCategories } from '../../redux/adminDataSlice'
import Dashboard from './Dashboard/Dashboard'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AdminNavbar from '../../Components/Navbars/AdminNavbar'
import AdminFooter from '../../Components/Footers/AdminFooter'
import { Container } from 'react-bootstrap'
import User from './User/User'
import UserDetail from './User/UserDetail'
import AddUser from './User/AddUser'
import Invoice from './Invoice/Invoice'
import InvoiceDetail from './Invoice/InvoiceDetail'
import UpdateInvoice from './Invoice/UpdateInvoice';
import AddInvoice from './Invoice/AddInvoice';


type Props = {}


const Admin = (props: any) => {
  const mainContent = React.useRef(null) as any;
  const location = useLocation();

  const account = useAppSelector(state => state.account);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])


  useEffect(() => {
    if (account.role !== 'ROLE_ADMIN') {
      navigate('/');
    }
  }, [account]);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if(document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: number) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            element={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Sidebar
        {...props}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={"Dashboard"}
        />
        <Routes>
          <Route path="" element={<Dashboard/>} />
          <Route path="product" element={<Product/>} />
          <Route path="product/add" element={<AddProduct/>} />
          <Route path="product/edit/:id" element={<EditProduct/>} />
          <Route path="category" element={<Category/>} />
          <Route path="user" element={<User/>}/>
          <Route path="user/:id" element={<UserDetail/>}/>
          <Route path="user/add" element={<AddUser/>}/>
          <Route path="invoice" element={<Invoice/>}/>
          <Route path="invoice/:id" element={<InvoiceDetail/>}/>
          <Route path="invoice/:id/update" element={<UpdateInvoice/>}/>
          <Route path="invoice/create" element={<AddInvoice/>}/>
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};


function Admin1({ }: Props) {
  const account = useAppSelector(state => state.account);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])


  useEffect(() => {
    if (account.role !== 'ROLE_ADMIN') {
      navigate('/');
    }
  }, [account]);



  return (
    <div className='AdminPages d-flex'>
      {account.role !== 'ROLE_ADMIN' && (
        <Navigate to='/' />
      )}
      <AdminSideBar />
      <div className='AdminLayout d-flex flex-column'>
        <AdminNavBar />
        <div className='AdminContent'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='product' element={<Product />} />
            <Route path='product/add' element={<AddProduct />} />
            <Route path='product/edit/:id' element={<EditProduct />} />
            <Route path='category' element={<Category />} />

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin