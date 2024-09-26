import React from 'react'
import "./ConfirmOrder.css"
import OrderStepper from './OrderStepper'
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
function ConfirmOrder() {
 const navigate=useNavigate();
  const {shippingInfo, cartItems}=useSelector((state)=>state.Cart);
  const {user}=useSelector((state)=>state.User);
  const Address=`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`;
  const total=cartItems.reduce((acc, item)=>{
   return item.price*item.quantity+acc
  },0);
  console.log("total"+total);

  const shippingCharges=total>1000? 200:0;
  let tax=total*0.18;
  tax=parseFloat(tax.toFixed(2));
  
  const netTotal=(total+tax+shippingCharges).toFixed(2);
  // netTotal=netTotal.toFixed(2);

  const clickPayment=()=>{
    localStorage.setItem("orderInfo", JSON.stringify({netTotal,total, tax, shippingCharges}));
    navigate("/process/payment");
  }
  return (
<>
<title>Trendy Confirm Order</title>
<div className='stepper'>
<OrderStepper index={1} /></div>
<div className="OrderInfo">
    <div className='items-details'>

      <div className='shipping-heading'><p>Shipping Info</p>  
      </div>

      <div className="userInfo">
        
      <div><span>Name:</span><p>{user.user.name}</p></div>
      <div><span>Contact no:</span><p>{shippingInfo.phone}</p></div>
      <div><span>Address:</span> <p>{Address}</p></div>
     <div> <span>Pincode:</span> <p>{shippingInfo.pinCode}</p></div>
      </div>
      
      <div className='cartItems'>
{
      cartItems.map((item)=>{
      return <div className="item" key={item.product}>
        <div className='item-img'>
          <img src={item.image} alt="" />
        </div>
        <div className="item-name"
        ><Link to={`/product/${item.product}`}>
          <p>{item.name}</p>
          </Link>
        </div>
        <div className='item-quantity'>
            <p>{item.quantity}x {item.price}&#8377;={item.quantity*item.price}&#8377;</p>
        </div>
       </div>
      })
      }
    </div> 
      </div>
    
    <div className='order-summary'>

      <div className='order-heading'><p>Order Summary</p></div>
       
  <div className='order-info'>
      <div className='grossTotal'>
        <span>Total Price :</span><p>₹
        {total} 
        </p>
        </div>    
      <div className='shipping-charge'> <span>
        Shipping Charges:
        </span><p>₹
        {shippingCharges} 
        </p></div>
      <div className='tax'>
       <span>Tax:</span><p>₹
       {tax} 
       </p>
      </div>

      <div className='total'>
        <span>Total Amount:</span>
        <p>₹
        {netTotal} /- 
        </p>
      </div>
     
      </div>
      <div className='pay-btn'> <button onClick={clickPayment}>Payment</button></div>
    </div>

    </div>
</>    
)
}

export default ConfirmOrder