import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadUser } from '../../features/users/loadUserApi'
import "./Profile.css";
function Profile() {
  //  location.reload();
    const {user, isAuthenticated,loading}=useSelector(state=>state.User);
    const dispatch=useDispatch();
    //  dispatch(loadUser());
    const navigate=useNavigate();
   
          
    
        
         
      



  return (<>
  <title>Trendy Profile</title>
  {loading?<Loader/>:( isAuthenticated?
    <div className='profile-container'>
      <div className='left-side'>
        <div className='profile-heading'>
          <h1>My Profile</h1>
        </div>
        <img src={user.user.avatar.url} alt="" />
      <i className="edit-logo fa-solid fa-circle-plus fa-flip-horizontal fa-2xl" style={{color:" #B197FC"}} onClick={()=>navigate("/account/update")} ></i>
      </div>
      <div className='right-side'>
        <div className='username'>
        <span>Username </span><p>{user.user.name}</p>
          
        </div>
        <div className='email'>
        <span>Email </span> <p> {user.user.email}</p>

        </div>
      <div className='profile-btn'>
        <button onClick={()=>navigate("/orders")}>My Orders</button>
        <button onClick={()=>navigate("/account/password/update")}>Change Password</button>
      </div>
      </div>

    </div>:<Loader/>)
  }
    </>
  )
}

export default Profile