import  React, { useState } from 'react';
import FormImg from "../assets/FormImg.png"
import { useNavigate } from 'react-router-dom';

import "./Signup.css"
import { signup, clearErrors } from '../features/users/userSignupApi';
import { useSelector, useDispatch } from 'react-redux';
import {toast} from "react-hot-toast";
export default function Signup() {
  const [input, setInput]=useState({username:"", email:"", password:""});
  const [avatar, setAvatar]=useState();
  const [avatarPreview, setAvatarPreview]=useState("/");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user, isAuthenticated, error, loading}=useSelector(state=>state.User);

  if(error){
    toast.error(error);
    dispatch(clearErrors());
  }

  if(isAuthenticated){
    toast.success("Signup Successfully");
    navigate("/products");
  }

  const handleOnChange=(event)=>{
    setInput((currdata)=>{
      currdata[event.target.name]=event.target.value;
      return{
        ...currdata
      }
    })
  }
  const AvatarChange = (event) => {
    const reader = new FileReader();

    reader.onload = () => {
        // Handle the result (e.g., setAvatar or any other logic)
        setAvatar(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
};


  const handleFormSubmit=(event)=>{
    event.preventDefault();
    let name=input.username;
    let email=input.email;
    let password=input.password;
    dispatch(signup({name, email,password, avatar}));
    

    
    setInput({username:"", email:"", password:""});
    setAvatar();
    


  }
  return (
    <>
    <title>Trendy Sign Up</title>
     <div className=' max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row  ' id='TopDiv'>
      <div className="Form w-1/2 mt-12  order-2 mb-16" >
        
        <h1 className='text-4xl' id='Heading'>Sign up</h1>
        <form onSubmit={handleFormSubmit} encType='mutipart/form-data' >
        <label className="input input-bordered flex items-center gap-2 Input mt-6">
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
  <input type="text" className="grow" placeholder="Email*" name='email' value={input.email} onChange={handleOnChange} />
</label>
<label className="input input-bordered flex items-center gap-2 mt-4 Input">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="Username*" name='username' value={input.username} onChange={handleOnChange} />
</label>
<label className="input input-bordered flex items-center gap-2 mt-4 Input mb-4">
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
  <input type="password" className="grow" placeholder='Password*' name='password' value={input.password} onChange={handleOnChange}/>
</label>

 <label>Set Profile Image</label>
<label className="  input-bordered flex mt-1 Input  mb-4 bg-white" id="FileInput">

<input type="file" className="file-input w-full" name='avatar' accept='image/*' onChange={AvatarChange} />
</label>
      <a> already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>navigate("/login")}>Login</span></a><br />
      
      <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="button" > {loading? <span class="loading loading-spinner loading-md"></span>:"Signup"}</button>
      
      </form>
      </div>
      <div className='w-full md:w-1/2 ' id='ImageDiv' >
         <img src={FormImg} alt="" id='Image'/>
      </div>
      </div>
    </>
  );
}
