import React, { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOrderDetails, orderDetailError } from '../../features/orders/orderDetailApi';
import CategoryIcon from '@mui/icons-material/Category';
import "./UpdateOrder.css";

import { adminUpdateOrder, resetUpdateOrder, updateOrderError } from '../../features/orders/updateOrderApi';
function UpdateOrder() {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {order,loading,error}=useSelector((state)=>state.orderDetails);
    const [status, setStatus]=useState("");
    const {isUpdated, loading:updateLoading, error:updateError}=useSelector((state)=>state.updateOrder);
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(orderDetailError());
        }
    
          if(updateError){
              toast.error(updateError);
              dispatch(updateOrderError());
          }

          if(isUpdated){
            toast.success("order updated");
            dispatch(resetUpdateOrder());
          }
        dispatch(getOrderDetails(id));

        
  
       
    },[dispatch, id , error, isUpdated, updateError]);
    console.log(order);

    const handleForm=(e)=>{
      e.preventDefault();

      if(status!==""){
        dispatch(adminUpdateOrder(id,{status}));
      }

    }

  return (
   <>
   <title>Trendy Update Order</title>
   {order&&
   
   
    
   <div className='orderDetail-main'>
 <div className='updateOrder'>
        <form onSubmit={handleForm}>
        <label  className="input input-bordered flex items-center gap-1">
 <CategoryIcon/>
 <select className="border-none outline-none" value={status} onChange={(e)=>setStatus(e.target.value)} >
  <option defaultChecked defaultValue={""}>Order Status</option>
   {
    order.orderStatus==="Processing"? <option value="Shipped">Shipped</option>:order.orderStatus==="Shipped"? <option value="Delivered">Delivered</option>:order.orderStatus==="Delivered"?<></>:<></> 
   } 
   {
    
   }
 
</select>

</label>
<button className='status-btn'>Update Status</button>
        </form>
       </div>
    <div className='ship-info'> 
    <div className='ship-head'><h1>
                Shipping Info
             </h1>
             </div>

             <div className='ship-details'>
                <div><p>{order.user.name}</p></div>
                <div><p>{order.user.email}</p></div>
                <div><p>{order.shippingInfo.phone}</p></div>
                <div><p>{order.shippingInfo.address}</p></div>
                <div><p>{order.shippingInfo.pinCode}</p></div>
                <div><p>{order.shippingInfo.state},{order.shippingInfo.country}</p></div>
             </div>
    </div>
    <hr />
    <div className='pay-info'>
     <div className='pay-head'><p>Payment Details</p></div>

     <div className='pay-details'>
        <div><span>Payment Status : </span><p>{order.paymentInfo.status==="succeeded"?<>Paid Successfully</>:"Not Paid Yet"}</p></div>
        <div><span>Payment Date :</span><p>{order.paidAt}</p></div>
     </div>
    </div>
    <hr />
    <div className='product-info'>
    <div className='product-head'>
      <p>Ordered Items</p>
    </div>
      {
        order.orderItems.map((product)=>(
             <div key={product._id} className='order-item'>
               <div className='order-img'><img src={product.image} alt="" /></div>
               <div className='order-name'><p>{product.name}</p></div>
               <div className='order-quantity'><p>{product.quantity}</p></div>
               <div className='order-price'><p>{product.price}/-</p></div>
             </div>
        ))
      }
       
    </div>
    <hr />
    <div className='product-pricing'>
        <div><span>Order Placed Date:</span><p>{order.createdAt}</p></div>
        <div><span>Order Status:</span><p style={{color: order.orderStatus === 'Processing' ? 'red' : order.orderStatus=="Shipped" ? 'orange':order.orderStatus=="Delivered" ? 'green':'' }}>{order.orderStatus}</p></div>
        <div><span>Products Total:</span><p>{order.itemsPrice}/-</p></div>
        <div><span>Shipping Charges:</span><p>{order.shippingPrice}/-</p></div>
        <div><span>Tax:</span><p>{order.taxPrice}/-</p></div>
        <div><span>Total Amount:</span><p>{order.totalPrice}/-</p></div>
        

    </div>
   </div>}
   </>
  )
}

export default UpdateOrder