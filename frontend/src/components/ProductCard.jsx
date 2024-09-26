import React from 'react'
import "./ProductCard.css";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ProductCard({product}) {
  return (

<>
<Link to={`/product/${product._id}`}
>
<div className='Main'>
  <div className='Img'><img  src={ product.images&&product.images[0].url}  alt="Image" className='productImg'/></div>
  <div className='item-detail'>
  <div className='detail'><h1> <b>{product.name}</b></h1> 
  <div className='ratings'>
  <Rating name="half-rating-read" precision={0.5} value={product.ratings} readOnly />
  </div>
  <p><b>&#8377;{product.price}</b></p>
  </div></div>
  {/* <div className='action'><button className='btn'>Cart</button> <button className='btn'>Buy</button></div> */}
</div>
</Link>
</>
  )
}

export default ProductCard