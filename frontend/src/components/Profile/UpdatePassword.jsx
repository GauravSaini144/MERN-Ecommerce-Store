import React, { useEffect, useState } from 'react'
import "./UpdatePassword.css";
import FormImg from "../../assets/FormImg.png";
import { useSelector,useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { clearPasswordError , updatePassword} from '../../features/users/updatePasswordApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
function UpdatePassword() {
    const {error, isUpdated, loading}=useSelector((state)=>state.Profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
        if(error){
            toast.error(error);
            dispatch(clearPasswordError());
        }
    const [oldPassword, setOldPassword]=useState("");
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");


    const handleOld=(event)=>{
        setOldPassword(event.target.value);
    }
    
    const handleNew=(event)=>{
        setNewPassword(event.target.value);
    }
    
    const handleConfirm=(event)=>{
        setConfirmPassword(event.target.value);
    }

    const handleForm=(event)=>{
        event.preventDefault();
        dispatch(updatePassword({oldPassword, newPassword, confirmPassword}));

    }

    if(isUpdated){
        navigate("/account");
        toast.success("Passowrd Updated");
        location.replace(location.href);

    }

  return (
   <>
   <title>Trendy Update Password</title>
   { loading?<Loader/>:<div className='max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row  ' id='PasswordTopDiv'>
   <div className="LoginForm w-1/2 mt-12  order-2" >
     
     <h1 className='text-4xl' id='PasswordHeading'>Update Password</h1>
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
<input type="password" className="grow" placeholder='Old Password*' name='oldPassword' value={oldPassword} onChange={handleOld}/>
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
<input type="password" className="grow" placeholder='New Password*' name='newPassword' value={newPassword} onChange={handleNew}/>
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
   <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="button" >Update</button>
   
   </form>
   </div>
   <div className='w-full md:w-1/2 ' id='PasswordImageDiv' >
      <img src={FormImg} alt="" id='PasswordImage'/>
   </div>
   </div>}</>
  )
}

export default UpdatePassword