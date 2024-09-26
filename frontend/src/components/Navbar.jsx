import React, { useEffect, useState } from 'react'
import Signup from './Signup.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/users/userLogoutApi.js';
import { toast } from 'react-hot-toast';
import { loadUser } from '../features/users/loadUserApi.js';
function Navbar() {

  const {isAuthenticated, user}=useSelector(state=>state.User);
  const {cartItems} =useSelector((state)=>state.Cart);
  const dispatch=useDispatch();
  const [badge, setBadge]=useState(0);
  const [keyword, setKeyword]=useState("");
  const history=[];
  const navigate=useNavigate();

  useEffect(()=>{
    let count=0;
    cartItems.map((item)=>{
     count++;
    })
    setBadge(count);
    
  },[cartItems])

  const SearchForm=(e)=>{
    e.preventDefault();
    if(keyword.trim()){
      history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`);
    }else{
      // history.push("/products");
      // navigate(`/products`);
    }
  }

  const LogoutClick=()=>{
    dispatch(logout());
    toast.success("logged out");
    navigate("/");
    location.replace(location.href);


  
  }
  
  return (
   <> 
   <div className="navbar z-10 max-w-screen-2xl top-0 right-0 left-0 sticky " id="Navbar">
  <div className="flex-1  ml-0" >
  <i className="fa-solid fa-arrow-trend-up fa-lg mt-1 cursor-pointer" onClick={()=>navigate("/")}></i><a id='Title' className=" text-2xl text-solid ml-1 cursor-pointer" onClick={()=>navigate("/")}>Trendy</a>
  </div>
  
  <div className="flex-none">
  <div className="form-control ">
    <form onSubmit={SearchForm}>
  <label className="input input-bordered flex items-center gap-2 h-8 ml-3" >
  <input type="text" className=" grow Search" placeholder="Search"  onChange={(e)=>setKeyword(e.target.value)} />
  <button>
  <svg
  
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg></button>
</label></form>


    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mx-1">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {badge>0&&isAuthenticated?
          <span className="badge badge-secondary badge-sm indicator-item">{badge}</span>:<></>
          }
          </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          {/* <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span> */}
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={()=>{if(isAuthenticated){navigate("/cart")}else{navigate("/login")}}}>View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end ">
     
     { !isAuthenticated? ( <button className="text-dark cursor-pointer" onClick={()=>navigate("/login")}>Login </button>):
    
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        
        <div className="w-10 rounded-full ">
        {user.user.avatar?<img src={user.user.avatar.url}/>: <i className="fa-solid fa-user fa-lg"></i>}
        </div>
      </div>}
      {
        !isAuthenticated? <></>:
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         <Link to={"/orders"}> <li><p>My Orders</p></li></Link>
      <Link to={"/account"}>  <li>
        <p>
            Profile
            </p>
        </li></Link>
      {
          user.user.role==="admin"?<Link to={"/admin/dashboard"}><li><p> Dashboard</p></li></Link>:<></>
      }
        <li onClick={LogoutClick}> <p>Logout</p></li>
        
      </ul>}

    </div>

  </div>

 
    
</div>

<hr className='hline' />
<div className='navbar-2'>
    <ul>
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/products"}>Products</Link></li>
      <li><Link to={"/products/?name=mens"}>Mens</Link></li>
      <li><Link to={"/products/?name=womens"}>Womens</Link></li>
      <li><Link to={"/products/?name=shoes"}>Shoes</Link></li>
      <li><Link to={"/about"}>About Us</Link></li>
      <li><Link to={"/contact"}>Contact Us</Link></li>
      

          </ul>
  </div>
   </>
  )
}

export default Navbar