import Order from "../models/orderModel.js";
import Produt from "../models/productModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import asyncError from "../middleware/asyncError.js";
import Product from "../models/productModel.js";

export const newOrder=asyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;

    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order,
    });
});

// grt single order detail

export const getSingleOrder=asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
       
    }
    res.status(200).json({
        success:true,
        order,
    });
})

//get logged in user orders

export const myOrders=asyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});
 
    res.status(200).json({
        success:true,
        orders,
    });
});

// get all orders -----admin 

export const getAllOrders=asyncError(async(req,res,next)=>{
    const orders=await Order.find();
    if(!orders){
        return next(new ErrorHandler("No Order found ",404));
    }
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
});


// update order status-----admin

export const updateOrder=asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("order not found with this id ",404));
    }
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }
    if(req.body.status==="Shipped"){
    order.orderItems .forEach(async(Order)=>{
        await updateStock(Order.product,Order.quantity);
    });}
    order.orderStatus = req.body.status;
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        
    });
});

async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});

}

// delete order admin 

 
export const deleteOrder=asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHandler("order not found with this id ",404));
    }
     await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"order deleted successfully",
        
    });
});

