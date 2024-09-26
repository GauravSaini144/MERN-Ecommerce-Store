import React, { useState } from 'react'
import FormImg from "../../assets/FormImg.png";
import "./ForgotPassword.css"
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { clearForgotError, forgotPassword } from '../../features/users/forgotPasswordApi';
function ForgotPassword() {
    const dispatch=useDispatch();
    const {loading, error, message}=useSelector((state)=>state.ForgotPassword);

    if(error){
        toast.error(error);
        dispatch(clearForgotError());
    }

    if(message){
        toast.success(message);
    }
    const [email, setEmail]=useState("");
    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }

    const handleForm=(event)=>{
        event.preventDefault();
        dispatch(forgotPassword({email}));
        
    }
  return (
    <>
    <title>Trendy Forgot Password</title> 
    <div className='max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row  ' id='LoginTopDiv'>
    <div className="ForgotForm w-1/2 mt-12  order-2" >
      
      <h1 className='text-4xl' id='ForgotHeading'>Forgot Password</h1>
      <form  className='mt-4' onSubmit={handleForm}>
     
      <div role="alert" className="alert">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="stroke-info h-6 w-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span>{message?message:"Enter your registered email address"}</span>
</div>
  <label className="input input-bordered flex items-center gap-2 ForgotInput mt-6">
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
<input type="text" className="grow" placeholder="Email*" name='email' value={email} onChange={handleEmail}/>
</label>


   {loading?<span className="loading loading-dots loading-lg mt-8"></span>:
    <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="button" >Send</button>
   }
    </form>
    </div>
    <div className='w-full md:w-1/2 ' id='ForgotImageDiv' >
       <img src={FormImg} alt="" id='ForgotImage'/>
    </div>
    </div>
  </>
  )
}

export default ForgotPassword