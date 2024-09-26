import React, { useEffect, useState } from 'react'
import Loader from "./Loader/Loader"
import "./ProductDetail.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getproductDetails } from '../features/products/productDetailApi';
import ReviewCard from './ReviewCard';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { addItemsToCart } from '../features/cart/cartApi';
import toast from 'react-hot-toast';
// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addReview, reviewError, resetReview } from '../features/reviews/reviewApi';


function ProductDetail() {
  const [addItems, setAddItems]=useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0.5);
  const [comment, setComment]=useState("");

  const navigate=useNavigate();

    const dispatch=useDispatch();
    const {isAuthenticated}=useSelector((state)=>state.User);
    const {loading, product, error}=useSelector((state)=>state.productDetails);
    const {error:reviewError, success}=useSelector((state)=>state.newReview);
    const {id}=useParams();

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit=(e)=>{
      if(rating===0){
        toast.error("minimum half star rating!!");
        return;
      }   
      if(comment.length===0){
        toast.error("please leave a comment!!");
        return;
      }
      let productId=id;
      dispatch(addReview({rating, comment, productId}));
      setOpen(false);
         
    }
  
    useEffect(()=>{
     if(error){
      toast.error(error);
     }

     if(reviewError){
      toast.error(reviewError);
      dispatch(reviewError());
     }
     if(success){
      toast.success("Review Add");
      dispatch(resetReview());
     }
        dispatch(getproductDetails(id));
        
    },[dispatch, error, reviewError, success]);


    const handleAddtoCart=()=>{
      if(isAuthenticated){
      dispatch(addItemsToCart(id,addItems));
      toast.success("Added in Cart");}
      else{
        navigate("/login");
        toast.error("Please Login First");
      }
    } 



  return (
    <>
    <title>Trendy Product Details</title>
    {
      loading?<Loader/>: <>
      <title>{product.name} details</title>

      <div className='topDiv'>
      
      </div>
  <div className='productDetail'>
  <div className="card lg:card-side detailContainer">
    
    <div className='imageSlider'>
    <div className="carousel rounded-box w-64">
      {/* 
    <div className="carousel-item w-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        className="w-full"
        alt="Tailwind CSS Carousel component" />
    </div>
   
   */}
  {
    product.images && product.images.map(obj=>  <div key={obj.public_id} className="carousel-item w-full detailImgDiv">
             <img 
        src={obj.url}
        
    
        className="detailImg"
        alt="Product Images" />
    </div>)
  }
  </div>
  </div>
    
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <div className='flex rating-container'>
      <div className="rating">
     
      <Rating name="half-rating-read"  value={product.ratings} precision={0.5} readOnly />
    
    </div>
    ({product.numOfReviews} Reviews)
    </div>
      <p className='text-xl'>&#8377;{product.price}</p>
      <div><button onClick={()=>addItems==1?{}:setAddItems((prev)=>prev-1)} className='btn bg-slate-800 text-white hover:bg-slate-600 text-xl'>-</button><input readOnly type='number' value={addItems} onChange={(event)=>setAddItems(event.target.value)} className='w-8 align-center text-center'/><button  onClick={()=>(addItems===product.stock)?{}:setAddItems((prev)=>prev+1)} className='btn bg-slate-800 text-white hover:bg-slate-600 text-xl'>+</button></div>
      <p>{product.description}</p>
     <p>Stock : <span style={{color:product.stock>0?'green':'red'}}>{product.stock>0?"In Stock":"Out of Stock"}</span></p>
      <div className="card-actions justify-end">
        <button className='btn btn-primary' onClick={handleAddtoCart} >Add to Cart</button>
        {/* <button className="btn btn-primary" onClick={handleClickOpen}>Add Review</button> */}
      </div>
    </div>
  </div></div>

{/* ................Review Dailog box..................... */}

<>
      {/* <Button variant="outlined" >
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         Give Review
        </DialogTitle>
        <DialogContent className='flex flex-col'>

        <Rating name="half-rating"  value={rating} precision={0.5} className='mb-4'  onChange={(event, newValue) => {
          setRating(newValue);
        }} />
       
       <textarea name=""  id="" className='textarea textarea-bordered' cols={30} rows={4} placeholder='Honest Review' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>

{/* ............................................................... */}

<div className='lastDiv'>

</div>
  <div className='reviewsContainer'>
    <div className='review-btn'>
    <button onClick={handleClickOpen}>Add a review</button></div>
  <h2 className='reviewHeading mb-2'>Reviews ({product.numOfReviews})</h2>
  <hr className='w-full mb-4'/>
  </div>
  { product.reviews && product.reviews[0]?(
  <div className='reviews'>
    {product.reviews && product.reviews.map((review)=><ReviewCard review={review} key={review._id} />)}
  
  </div>):(<p className='noReviews'>No Reviews Yet</p>)}
 
  <div className='lastDiv'>
  
  </div>

      </>
    }
    </>
   )

}

export default ProductDetail