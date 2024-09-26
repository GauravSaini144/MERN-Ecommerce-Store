import React, { useState } from 'react'
import "./CartItemsCard.css"
import { Link } from 'react-router-dom';
import { removeItem } from '../../features/cart/cartApi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addItemsToCart } from '../../features/cart/cartApi';
function CartItemsCard({item}) {
  
    
    const dispatch=useDispatch();
    const handleRemoveItem=(id)=>{
      dispatch(removeItem(id));
      toast.success("removed from cart")
    }

    const increaseQty=(id, qunatity)=>{
      
      if(item.stock<=qunatity){
        return;
      }
      let newQty=qunatity+1;
      
      dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQty=(id, quantity)=>{

    if(quantity==1){
      return;
    }
    let newQty=quantity-1;

      dispatch(addItemsToCart(id,newQty));
    }
  return (

    <>
    
    <div className='cartitem-container'>

<div className='cartitem-detail'>
<div className='cartitem-img'>
<Link to={`/product/${item.product}`}>
<img src={item.image} alt="" />  </Link>
</div>

<div className='cartitem-name'>
<p>{item.name}</p>
</div></div>

<div className='cartitem-quantity'>
<button onClick={()=>decreaseQty(item.product, item.quantity)} className='px-2 py-0 bg-blue-500 text-white hover:bg-blue-600 text-2xl'>-</button><input readOnly type='number' value={item.quantity} className='w-8 align-center text-center'/><button  onClick={()=>increaseQty(item.product, item.quantity)} className='px-2 py-0 bg-blue-500 text-white hover:bg-blue-600 text-2xl'>+</button>
</div>

<div className='cartitem-price'>
<p>{item.price*item.quantity} &#8377;</p>
</div>

<div className='cartitem-remove'>
<button className='text-red-500 text-2xl'onClick={()=>handleRemoveItem(item.product)}>X</button>
</div>
    </div>
  
    </>
  )
}

export default CartItemsCard