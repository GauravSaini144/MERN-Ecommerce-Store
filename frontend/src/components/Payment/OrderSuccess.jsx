import React from 'react'
import shoppingBag from "../../assets/shopping-bag.png"
import "./OrderSuccess.css";
import {useNavigate} from "react-router-dom"
function OrderSuccess() {
    const navigate=useNavigate();
  return (
   <>
   <title>Trendy Order Placed</title>
   <div className='success-main'>
    <div className="Icon-img">
        <img src={shoppingBag} alt="Order Placed Successfully" />
        </div>
        <div className='success-msg'>
            <h1>
                Order Placed Successfully
            </h1>
        </div>
        <div className='actionBtn'><button onClick={()=>navigate("/orders")}>Check Orders</button><button onClick={()=>navigate("/products")}>Continue Shopping</button></div>
        </div></>
  )
}

export default OrderSuccess