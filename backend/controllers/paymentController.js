import Stripe from "stripe";
import asyncError from "../middleware/asyncError.js";



export const processPayment=asyncError(async(req,res,next)=>{
    try{
     const stripe= new Stripe(process.env.STRIPE_API_SECRET);

    const {amount}=req.body;
    const mypayment=await stripe.paymentIntents.create({
    
        amount,
        currency:"inr",
        metadata:{
            company:"Trendy Ecommerce",
        },
    });

    res.status(200).json({success:true,
        client_secret:mypayment.client_secret
    });}catch(error){

    }
    
    
});

export const sendStripeApiKey=asyncError(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY,
        

    });
});