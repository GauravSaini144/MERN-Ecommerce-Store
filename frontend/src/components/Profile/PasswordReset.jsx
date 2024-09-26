import React from 'react'
import { useState, useEffect } from 'react';
import { passwordReset , clearForgotError} from '../../features/users/forgotPasswordApi';
import { useSelector, useDispatch } from 'react-redux';
import FormImg from "../../assets/FormImg.png"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function PasswordReset() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {loading, isUpdated, error}=useSelector((state)=>state.ForgotPassword);
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const {token}=useParams();

 if(isUpdated){
    toast.success("password reset successfuly");
    navigate("/products");
    location.replace(location.href);

 }
 if(error){
    toast.error(error);
    dispatch(clearForgotError());
 }
    
    const handleNew=(event)=>{
        setPassword(event.target.value);
    }
    
    const handleConfirm=(event)=>{
        setConfirmPassword(event.target.value);
    }

    const handleForm=(event)=>{
        event.preventDefault();
        dispatch(passwordReset({password, confirmPassword}, token));

    }


  return (
   <>
   <title>Trendy Password Reset</title>
   <div className='max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row  ' id='PasswordTopDiv'>
   <div className="LoginForm w-1/2 mt-12  order-2" >
     
     <h1 className='text-4xl' id='PasswordHeading'>Set New Password</h1>
     <form onSubmit={handleForm} >

<label className="input input-bordered flex items-center gap-2 mt-4 PasswordInput mb-4">
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
<input type="password" className="grow" placeholder='New Password*' name='newPassword' value={password} onChange={handleNew}/>
</label>



<label className="input input-bordered flex items-center gap-2 mt-4 PasswordInput mb-4">
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
<input type="password" className="grow" placeholder='Confirm Password*' name='confirmPassword' value={confirmPassword} onChange={handleConfirm}/>
</label>
   
   
     {/* <span className="loading loading-spinner loading-md"></span></>: */}
     {loading?<span className="loading loading-dots loading-lg"></span>:
   <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="button" >Reset</button>
     }
   </form>
   </div>
   <div className='w-full md:w-1/2 ' id='PasswordImageDiv' >
      <img src={FormImg} alt="" id='PasswordImage'/>
   </div>
   </div></>
  )
}

export default PasswordReset