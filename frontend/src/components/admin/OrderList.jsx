import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminOrder, clearOrderError } from '../../features/orders/adminOrderApi';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { removeAdminOrder, removeOrderError, resetRemoveOrder } from '../../features/orders/removeOrderApi';
function OrderList() {

    const dispatch=useDispatch();
    const {loading, error, orders}=useSelector((state)=>state.adminOrders);
    const {loading:removeLoading, error:removeError, isRemoved, message}=useSelector((state)=>state.removeOrder);

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearOrderError());
        }
        if(removeError){
          toast.error(removeError);
          dispatch(removeOrderError());
      }

      if(isRemoved){
        toast.success(message);
        dispatch(resetRemoveOrder());
      }
      dispatch(getAdminOrder());
    },[dispatch, error, removeError, isRemoved, message]);
  return (
    <>
    <title>Trendy Orders</title>
    <div className='dashboard-main'>
   <div className='dashboard-sidebar'>
 
 <Sidebar/>

   </div>
   <div className='all-products'>
    <div className='all-products-heading'>
        <h1>All Products</h1>
    </div>
   <div className="overflow-x-auto Table-main">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Product</th>
        <th>order Id</th>
        <th>Status</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { orders && orders.map((orderInfo)=>(
        orderInfo.orderItems.map((order)=>(
      <tr key={order._id}>
    
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" pro-img h-16 w-16">
                <img 
                  src={order.image}
                  alt="Product Image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{order.name}</div>
              {/* <div className="text-sm opacity-50">United States</div> */}
            </div>
          </div>
        </td>
        <td>
          {orderInfo._id}
        </td>
        <td style={{color: orderInfo.orderStatus === 'Processing' ? 'red' : orderInfo.orderStatus=="Shipped" ? 'orange':orderInfo.orderStatus=="Delivered" ? 'green':'' }}>{orderInfo.orderStatus}</td>
        <td>{order.quantity}</td>
        <td>{order.price}</td>

        <th>
          <button className="btn btn-ghost btn-xs"> <Link to={`/admin/order/${orderInfo._id}`}>Edit</Link></button>
          <button className="btn btn-ghost btn-xs" onClick={()=>dispatch(removeAdminOrder(orderInfo._id))}>Remove</button>
        </th>
      </tr>))
    )) 
    }
   
     </tbody>
    {/* foot */}
   
    
  </table>
  
</div>
   </div>
   </div>
   </>
  )
}

export default OrderList