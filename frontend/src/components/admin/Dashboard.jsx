import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import "./Dashboard.css"
import { getAdminProducts } from '../../features/products/adminProductApi'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminOrder } from '../../features/orders/adminOrderApi'
import { getAdminUsers } from '../../features/users/allUserApi'
import { Link } from 'react-router-dom'
function Dashboard() {

  const {loading, error, products}=useSelector((state)=>state.adminProducts);
  const {orders, totalAmount}=useSelector((state)=>state.adminOrders);
  const {users} = useSelector((state)=>state.allUser);
  
  const dispatch=useDispatch();
   useEffect(()=>{
    if(products && products.length===0){
    dispatch(getAdminProducts());
  
  }

      dispatch(getAdminOrder());
      dispatch(getAdminUsers());
    
   },[dispatch, products]);
   
  return (
  <>
  <title>Trendy Dashboard</title>
  <div className='dashboard-main'>
   <div className='dashboard-sidebar'>
 
 <Sidebar/>

   </div>
   <div className='dashboard'>

    <div className='dashboard-heading'>
      <h1>Dashboard</h1>
    </div>
    <div className="stats shadow">
  <div className="stat">
    <div className="stat-title">Total Amount</div>
    <div className="stat-value">Rs. {totalAmount&& totalAmount}</div>
    <div className="stat-desc"></div>
  </div>
</div>
    <div className='dashboard-content'>
    <Link to={"/admin/products"}><div className='dashboard-amount'><span>Products</span><p>{products&& products.length}</p></div></Link>
    <Link to={"/admin/orders"}><div className='dashboard-orders'><span>Orders</span><p>{orders&& orders.length}</p></div></Link>
    <Link to={"/admin/users"}><div className='dashboard-users'><span>Users</span><p>{users&& users.length}</p></div></Link>


    </div>
    
   </div>
  </div>
  </>
  )
}

export default Dashboard