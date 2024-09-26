import React from 'react'
import CartItemsCard from './CartItemsCard'
import "./Cart.css"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';
function Cart() {
  const navigate=useNavigate();
    const {cartItems}=useSelector((state)=>state.Cart);
  return (

    <>
    <title>Trendy Cart</title>
    {cartItems.length==0?<EmptyCart/>:
    <>
    
    <div className='cart-main'>
        <h1>Cart</h1>

        {cartItems && cartItems.map((item)=>{
            
      return  <div key={item.product} className='cart-items'>
            <hr />
            
<CartItemsCard item={item} />
<hr />

</div>
})
}
{/* <hr className='h-4 color-orange-700' /> */}
<div className='cart-summary'><button onClick={()=>navigate("/shipping")} className='cart-button'>Cart Total &nbsp; ₹
 &nbsp;{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}</button></div>

    </div>
    </>}
    </>
  )
}

export default Cart