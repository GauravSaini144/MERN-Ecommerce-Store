import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import FormImg from "../../assets/FormImg.png"
import {City, Country, State} from "country-state-city"
import "./Shipping.css";
import { setShippingInfo } from '../../features/cart/cartApi';
import OrderStepper from './OrderStepper';
function Shipping() {
  const dispatch=useDispatch();
  const {shippingInfo}=useSelector((state)=>state.Cart);
  const [address, setAddress]=useState(shippingInfo?shippingInfo.address:"");
  const [city, setCity]=useState(shippingInfo?shippingInfo.city:"");
  const [state, setState]=useState(shippingInfo?shippingInfo.state:"");
  const [country, setCountry]=useState(shippingInfo?shippingInfo.country:"");
  const [pinCode, setPincode]=useState(shippingInfo?shippingInfo.pinCode:"");
  const [phone, setPhone]=useState(shippingInfo?shippingInfo.phone:"");  

  const navigate=useNavigate();

    const {isAuthenticated}=useSelector((state)=>state.User);
    if(!isAuthenticated){
        navigate("/login");
        toast("Please Login");
    }

    const handleForm=(event)=>{
      event.preventDefault();
     
      
     
    
      
     
      
     
      
      if(phone.length!=10){
        toast.error("contact number should be of 10 digits");
        return;
      } if(address==undefined){
        toast.error("please fill address");
        return;
      }
      if(pinCode==undefined){
        toast.error("please fill pincode");
        return;
      }
      if(country==undefined){
        toast.error("please fill country");
        return;
      }
      if(state==undefined){
        toast.error("please fill state");
        return;
      }

      if(city==undefined){
        toast.error("please fill city");
        return;
      }
      
       
      dispatch(setShippingInfo({address,country,state,city,pinCode,phone}));
      navigate("/order/confirm");

    }
    return (
        <>
        <title>Trendy Shipping</title>
        <div className='max-w-screen-2xl container  md:px-20 px-4 flex flex-col md:flex-row ' id='shippingTopDiv'>
         
          <div className="shippingForm w-1/2 mt-4 mb-10 order-2" >
          <OrderStepper index={0}/> 
            <h1 className='text-4xl mt-4' id='shippingHeading'>Shipping Details</h1>
            <form  onSubmit={handleForm}>
        <label className="input input-bordered flex items-center gap-2 shippingInput mt-6">
  
      <input type="number" className="grow" placeholder="Contact Number*" name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />
    </label>
    
    <label className="input input-bordered flex items-center gap-2 shippingInput mb-4 mt-4">
    
      <input type="text" className="grow" placeholder='Address*' name='address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
    </label>


    <label className="input input-bordered flex items-center gap-2 shippingInput mb-4 mt-4">
    
    <input type="number" className="grow" placeholder='Pincode*' name='pincode' value={pinCode} onChange={(e)=>setPincode(e.target.value)}/>
  </label>

<label className='flex flex-col items-center gap-1 justify-center select-btn' >
  
  <select className="select select-bordered mb-4 " value={country} onChange={(e)=>setCountry(e.target.value)}>
  <option value={""}>Country</option>
   {Country &&
   Country.getAllCountries().map((item)=>{
   return <option key={item.isoCode} value={item.isoCode} >{item.name}</option>
   })

   }
</select>



<select className="select select-bordered mb-4" value={state} onChange={(e)=>setState(e.target.value)}>
  <option value={""}>State</option>
   { country &&
    State &&
    State.getStatesOfCountry(country).map((item)=>{
      return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
    })
   }
</select>


<select className="select select-bordered mb-4" value={city} onChange={(e) => setCity(e.target.value)}>
  <option value="">City</option>
  {state && City && City.getCitiesOfState(country, state).map((item) => {
   return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
})}
</select>
</label>
    
          
            
          <button className='btn w-40 text-white bg-blue-600 hover:bg-blue-500 mt-8' id="button" >Next</button>
          
          </form>
          </div>
          <div className='w-full md:w-1/2 ' id='shippingImageDiv' >
             <img src={FormImg} alt="" id='shippingImage'/>
          </div>
          </div>
        </>
      );
}

export default Shipping