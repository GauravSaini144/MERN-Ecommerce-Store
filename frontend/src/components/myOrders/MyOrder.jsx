import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import toast from "react-hot-toast"
import { myOrders, clearOrderError } from '../../features/orders/myOrderApi';
import "./MyOrder.css"
import { Link } from 'react-router-dom';
function MyOrder() {
  const {orders, error}=useSelector((state)=>state.myOrders);
  const dispatch=useDispatch();
  
useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(clearOrderError());
  }

  dispatch(myOrders());
},[dispatch, error]);
  
  return (
    <>
  <title>Trendy My Orders</title>
  <div className='main-table'>
    <h1>My Orders</h1>
    <div className=" main overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Product</th>
        <th>Status</th>
        <th>Quantity</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      { orders && orders.map((order)=>(
               order.orderItems&& order.orderItems.map((item)=>(

      <tr key={item._id}>
       
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="h-20 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="text-sm opacity-50"></div>
            </div>
          </div>
        </td>
        <td>
        {order.orderStatus}
          <br />
          <span className="badge badge-ghost badge-sm"></span>
        </td>
        <td>{item.quantity}</td>
        <td>
        {item.price* item.quantity}/-
        </td>
        <th>
          <button className="btn btn-ghost btn-xs"><Link to={`/order/${order._id}`}>details</Link></button>
        </th>
      </tr>
      ))
      
    ))

}
</tbody>
    {/* foot */}
   
  </table>
</div>
</div>
    </>
  )
}

export default MyOrder