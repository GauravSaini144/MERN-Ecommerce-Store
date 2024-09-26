import React, { useEffect, useRef } from 'react'
import "./Payment.css"
import OrderStepper from '../OrderPlace/OrderStepper'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyIcon from '@mui/icons-material/Key';
import {CardCvcElement, CardNumberElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {createOrder, clearError} from "../../features/orders/orderApi.js"

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Payment({secret, apiKey}) {
  const apikey=secret;
  const navigate=useNavigate();
  const orderInfo=JSON.parse(localStorage.getItem('orderInfo'));
   let netTotal=parseFloat(orderInfo.netTotal);
  const {user}=useSelector((state)=>state.User);
  const {shippingInfo, cartItems}=useSelector((state)=>state.Cart);
  const {error}=useSelector((state)=>state.newOrder);
  const dispatch=useDispatch();
  const stripe=useStripe();
  const elements = useElements();
  const payBtn=useRef(null);

  const paymentData={
     amount:Math.round(netTotal*100),
  };

  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.total,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:netTotal,
  };
  const handleSubmit=async(e)=>{
    
 e.preventDefault();

   payBtn.current.disabled=true;
   try {
    const config={
      headers:{
        
  
        'Content-Type':'application/json',
      },
      withCredentials:true,
    };
    const {data}=await axios.post("http://localhost:8080/api/v1/payment/process",paymentData,config);
    console.log(data);
    const client_secret=data.client_secret;
   
    
    if(!stripe|| !elements){
      return;
    }
    const result=await stripe.confirmCardPayment(client_secret,{
      payment_method:{
        card:elements.getElement(CardNumberElement),
        billing_details:{
          name:user.user.name,
          email:user.user.email,
          address:{
            line1:shippingInfo.address,
            city:shippingInfo.city,
            state:shippingInfo.state,
            postal_code:shippingInfo.pincode,
            country:shippingInfo.country,
          }
        }
      },
    });

    if(result.error){
      payBtn.current.disabled=false;
      toast.error(result.error.message);
    }else{
      if(result.paymentIntent.status==="succeeded"){

        order.paymentInfo={
          id:result.paymentIntent.id,
          status:result.paymentIntent.status,
        }
         
        dispatch(createOrder(order));

        navigate("/success");
      }else{
        toast.error("There's some issue while processing payment");
      }
    }

   } catch (error) {
    payBtn.current.disabled=false;
    console.log(error);
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
   }
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearError());
    }
  },[error, dispatch]);
  return (
    <>
    <title>Trendy Payment</title>
    <div className='stepper'>
    <OrderStepper index={2} /></div>
     <div className='card-info-main'>
     <p>Card Details <hr /></p>
     <form onSubmit={handleSubmit} className='card-form'>
       
      <div className='card-input'>
        <CreditCardIcon/>
        <CardNumberElement className='card-field'/>
      </div>
      <div className='card-input'>
        <CalendarMonthIcon/>
        <CardExpiryElement className='card-field' />
      </div>
      <div className='card-input'>
        <KeyIcon/>
        <CardCvcElement className='card-field' />
      </div>
      <button ref={payBtn} className='pay-button'>Pay &#8377;{netTotal}</button>
     </form></div>
    
    </>
  )
}

export default Payment