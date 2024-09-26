import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminUsers, allUserError } from '../../features/users/allUserApi';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { removeUser, resetRemoveUser, removeUserError } from '../../features/users/removeUserApi';
import Loader from '../Loader/Loader';
function UserList() {
    const {loading, error, users}=useSelector((state)=>state.allUser);
    const {loading:removeLoading, error:removeError,isDeleted}=useSelector((state)=>state.removeUser);
    const {id}=useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
     if(error){
        toast.error(error);
        dispatch(allUserError());
     }
     if(removeError){
        toast.error(removeError);
        dispatch(removeUserError());
     }

     if(isDeleted){
        toast.success("User Deleted");
        dispatch(resetRemoveUser());
     }
     dispatch(getAdminUsers());

    },[dispatch, error, removeError, isDeleted]);
    
  return (
<>
<title>Trendy User List</title>
<div className='dashboard-main'>
   <div className='dashboard-sidebar'>
 
 <Sidebar/>

   </div>

   { loading? <Loader/>:
   <div className='all-products'>
    <div className='all-products-heading'>
        <h1>All Users</h1>
    </div>
   <div className="overflow-x-auto Table-main">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Username</th>
        <th>User Id</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { users && users.map((user)=>(
      <tr key={user._id}>
    
        <td>
          <div className="flex items-center gap-3">
            
            <div>
              <div className="font-bold">{user.name}</div>
              
            </div>
          </div>
        </td>
        <td>
          {user._id}
        </td>
        <td>{user.email}</td>
        <td style={{color: user.role === 'admin' ? 'green' : 'red'}}>{user.role}</td>

        <th>
          <button className="btn btn-ghost btn-xs"><Link to={`/admin/user/${user._id}`}> Edit</Link></button>
          <button className="btn btn-ghost btn-xs" onClick={()=>dispatch(removeUser(user._id))} >Remove</button>
        </th>
      </tr>
    )) 
    }
   
     </tbody>
    {/* foot */}
   
    
  </table>
  
</div>
   </div>}
   </div>
  
</>
  )
}

export default UserList