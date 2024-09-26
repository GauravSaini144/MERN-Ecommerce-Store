import  React, { useEffect, useState } from 'react';
import FormImg from "../assets/FormImg.png"
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { clearErrors,login } from '../features/users/userApi';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";
export default function Login() {
  const {user, isAuthenticated,loading, error}=useSelector(state=>state.User);
  const dispatch=useDispatch();
  
  if(error){
    toast.error(error);
    dispatch(clearErrors());
  }
  const [input, setInput]=useState({email:"", password:""});
  const navigate=useNavigate();
  const handleOnChange=(event)=>{
    setInput((currdata)=>{
      currdata[event.target.name]=event.target.value;
      return{
        ...currdata
    }
    })
  }

  if(isAuthenticated){
    navigate("/products");

    toast.success("Loggin Successfully");
    location.replace(location.href);

  }
  const handleFormSubmit=(event)=>{
    event.preventDefault();
    let email=input.email;
    let password=input.password;
    dispatch(login(email,password));
    
    setInput({email:"", password:""});
  }
  return (
    <>
    <title>Trendy Login</title>
     <div className='max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row  ' id='LoginTopDiv'>
      <div className="LoginForm w-1/2 mt-12  order-2" >
        
        <h1 className='text-4xl' id='LoginHeading'>Login</h1>
        <form onSubmit={handleFormSubmit} >
    <label className="input input-bordered flex items-center gap-2 LoginInput mt-6">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email*" name='email' value={input.email} onChange={handleOnChange}/>
</label>
<p className='forgotPass text-blue-600 cursor-pointer ml-auto mt-4' onClick={()=>navigate("/password/forgot")}>forgot password</p>
<label className="input input-bordered flex items-center gap-2 LoginInput mb-4">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" placeholder='Password*' name='password' value={input.password} onChange={handleOnChange} />
</label>
      <a> don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>navigate("/signup")}>Sign up</span></a><br />
      
      <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="button" > {loading? <span className="loading loading-spinner loading-md"></span>:"Login"}</button>
      
      </form>
      </div>
      <div className='w-full md:w-1/2 ' id='LoginImageDiv' >
         <img src={FormImg} alt="" id='LoginImage'/>
      </div>
      </div>
    </>
  );
}
