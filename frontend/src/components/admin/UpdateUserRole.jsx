import React, {useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "./NewProduct.css"
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAdminUserDetail, userDetailError } from '../../features/users/userDetailApi';
import { useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { adminUpdateUser, updateUserError, resetUpdateUser } from '../../features/users/updateUserApi';
function UpdateUserRole() {
    const {loading, error, user}=useSelector((state)=>state.userDetail);
    const {loading:updateLoading, error:updateError, isUpdated}=useSelector((state)=>state.updateUser);
    const dispatch=useDispatch();
    const {id}=useParams();
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [role, setRole]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
if(error){
    toast.error(error);
    dispatch(userDetailError());
}

if(updateError){
    toast.error(updateError);
    dispatch(updateUserError());
}

if(isUpdated){
    toast.success("user updated");
    dispatch(resetUpdateUser());
    navigate("/admin/users");
}
if(user===null){
dispatch(getAdminUserDetail(id));}

if(user!==null){
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
}
    },[dispatch, error, user, id, updateError, isUpdated]);


    const handleForm=(e)=>{
        e.preventDefault();
        if(updateLoading===false){
       dispatch(adminUpdateUser(id, {name, email, role}));
      }
      }
      return (
        <>
        <title>Trendy Update User</title>
        <div className='dashboard-main'>
       <div className='dashboard-sidebar'>
     
     <Sidebar/>
    
       </div>
       <div className='new-product-main'>
        <div className='new-product-heading'>
            <h1>Update User </h1>
        </div>
        <form onSubmit={handleForm} className='new-product-form'>
    
        <label className="input input-bordered Form-field flex items-center gap-1">
      <AccountCircleIcon/>
      <input type="text" className="field" placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)}  />
    </label>
    
    
    <label className="input input-bordered flex Form-field items-center gap-1">
      <EmailIcon />
      <input type="email" className="field" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
    </label>
    
    <label  className="input input-bordered flex Form-field items-center gap-1">
     <AdminPanelSettingsIcon/>
     <select className="border-none outline-none w-full" value={role} onChange={(e)=>setRole(e.target.value)} >
      <option value="admin">Admin</option>
      <option value="user">User</option>
      
      
    </select>
    
    </label>
    
     <button  className='create-btn'>{updateLoading?<span className="loading loading-spinner loading-md"></span>:"Update"}</button>
        </form>
        </div>
        </div>
        </>
  )
}

export default UpdateUserRole