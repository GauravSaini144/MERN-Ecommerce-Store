import React from 'react'
import Cart from "../../assets/Cart.png"
import "./EmptyCart.css";
import { useNavigate } from 'react-router-dom';

function EmptyCart() {
    const navigate=useNavigate();
  return (
    <>
    <div className='empty-cart'>
<div className='empty-img'>
<img src={Cart} alt="" />

</div>
<div className='empty-msg'>
    <p>Cart is Empty</p>
    <button onClick={()=>navigate("/products")}>View Products</button>
</div>
    </div>
    </>
  )
}

export default EmptyCart