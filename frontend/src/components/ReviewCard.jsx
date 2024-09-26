import React from 'react'
import "./ReviewCard.css"
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
function ReviewCard({review}) {
  return (
   <>
    <div className='reviewCard shadow-2xl'>
      <p className='reviewUser '>{review.name}</p>
      <p className='reviewRating'><Rating name="half-rating-read" precision={0.5} value={review.rating} readOnly /></p>
      <p>{review.comment}</p></div>
    </>
  )
}

export default ReviewCard