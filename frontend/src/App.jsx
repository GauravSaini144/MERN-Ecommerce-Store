import { useEffect, useState } from 'react'
import Login from './components/Login'
import './App.css'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Footer from './components/Footer'
import {Routes, Route, useNavigate} from "react-router-dom"
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import Products from './components/Product/Products'
import { Toaster } from 'react-hot-toast'
import { clearLoadError, loadUser } from './features/users/loadUserApi.js'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './components/Profile/Profile.jsx'
import UpdateProfile from './components/Profile/UpdateProfile.jsx'
import UpdatePassword from './components/Profile/UpdatePassword.jsx'
import ForgotPassword from './components/Profile/ForgotPassword.jsx'
import PasswordReset from './components/Profile/PasswordReset.jsx'
import Cart from './components/cart/Cart.jsx'
import Shipping from './components/OrderPlace/Shipping.jsx'
import ConfirmOrder from './components/OrderPlace/ConfirmOrder.jsx'
import axios from 'axios'
import Payment from './components/Payment/Payment.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import OrderSuccess from './components/Payment/OrderSuccess.jsx'
import MyOrder from './components/myOrders/MyOrder.jsx'
import OrderDetails from './components/OrderDetails/OrderDetails.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import ProductList from './components/admin/ProductList.jsx'
import NewProduct from './components/admin/NewProduct.jsx'
import UpdateProduct from './components/admin/UpdateProduct.jsx'
import OrderList from './components/admin/OrderList.jsx'
import UpdateOrder from './components/admin/UpdateOrder.jsx'
import UserList from './components/admin/UserList.jsx'
import UpdateUserRole from './components/admin/UpdateUserRole.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import AboutUs from './components/AboutUs.jsx'
import ContactUs from './components/ContactUs.jsx'
function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [stripeApiKey, setStripeApiKey]=useState("");
  
  const getStripeApiKey=async()=>{
    const {data}=await axios.get("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/stripeapikey",{withCredentials: true});
    setStripeApiKey(data.stripeApiKey);
  


  }
  
  useEffect(()=>{
    
   dispatch(clearLoadError());

  dispatch(loadUser());
  getStripeApiKey();
  },[dispatch]);

  // window.addEventListener('contextmenu', (e)=>e.preventDefault());

  const {error, isAuthenticated, user} =useSelector(state=>state.User);

  
  return (
    <>
     <Navbar/>
    <Routes>
    
     
     <Route exact path='/' element={<Home/>} />
     <Route  path='/product/:id' element={<ProductDetail/>} />
     <Route exact path='/login' element={<Login/>}/>
     <Route exact path='/signup' element={<Signup/>} />
     <Route exact path='/products' element={<Products/>} />
     <Route exact path='/about' element={<AboutUs/>} />
     <Route exact path='/contact' element={<ContactUs/>} />

     <Route path='/products/:keyword' element={<Products/>}/>
       <Route path='/password/forgot' element={<ForgotPassword/>} />
    <Route path='/password/reset/:token' element={<PasswordReset/>}/>
    { isAuthenticated? <Route exact path='/account' element={<Profile/>} />:<Route exact path='/account' element={<PageNotFound/>} />
    
    }

    {isAuthenticated?<Route path='/account/update' element={<UpdateProfile/>} />:<Route exact path='/account' element={<PageNotFound/>} />}

    {isAuthenticated?<Route path='/account/password/update' element={<UpdatePassword/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
   
    { isAuthenticated?<Route path='/cart' element={<Cart/>} />:<></>}
    { isAuthenticated?<Route path='/shipping' element={<Shipping/>} />:<></>}
{stripeApiKey && isAuthenticated?<Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment  apiKey={stripeApiKey}/></Elements>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated?<Route path='/success' element={<OrderSuccess/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated?<Route path='/orders' element={<MyOrder/>} />:<Route exact path='/account' element={<PageNotFound/>} />}

{ isAuthenticated?<Route path='/order/confirm' element={<ConfirmOrder/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated?<Route path='/order/:id' element={<OrderDetails/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/dashboard' element={<Dashboard/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/products' element={<ProductList/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/product' element={<NewProduct/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/product/:id' element={<UpdateProduct/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/orders' element={<OrderList/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/order/:id' element={<UpdateOrder/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/users' element={<UserList/>} />:<Route exact path='/account' element={<PageNotFound/>} />}
{ isAuthenticated && user.user.role==="admin"?<Route path='/admin/user/:id' element={<UpdateUserRole/>} />:<Route exact path='/account' element={<PageNotFound/>} />}





     </Routes>
     <Toaster/> 
     <Footer/>
    
    </>
  )
}

export default App
