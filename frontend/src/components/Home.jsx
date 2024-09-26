import React, { useEffect, useState } from 'react'
import "./Home.css"
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../features/products/productApi.js';
import Loader from './Loader/Loader.jsx';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";
import Skeleton from './Loader/Skeleton.jsx';
import { loadUser } from '../features/users/loadUserApi.js';
import MouseIcon from '@mui/icons-material/Mouse';

function Home() {

  const dispatch=useDispatch();
  const {loading, error, products, productsCount}=useSelector((state)=>state.Product);
  useEffect(()=>{
     if(error){
      return toast.error(error);
     }
   dispatch(getProduct());
  

  },[dispatch]);
 
 

  return (
   
      <>
      <title>Trendy Home</title>
    <div className='banner'>
    <p > Trendy </p>
    <h1>Check  Amazing  Products  Below</h1>
    <a href="#productHead">
        <button className='Button'><MouseIcon/></button>
    </a>
    </div>

    <h1 id='productHead'>Featured Products</h1>
    <hr className='bg-black mb-10 '/>
    <div id='productContainer'>
      
    { loading?<Skeleton/>: products.map(product=>(<div key={product._id} className="product-block"><ProductCard  product={product}/></div>))}
      
    </div>
    <div className='Products-button'><Link to={"/products"}><button>Show All  <i className="fa-solid fa-arrow-right-long"></i></button></Link></div>
    </>
  )
    }
    
  


export default Home