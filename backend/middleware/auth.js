import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import asyncError from "./asyncError.js";
import jwt from "jsonwebtoken";
export const isAuthenticatedUser=asyncError(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token)
        {   
            req.user=null;
            return next(new ErrorHandler("please login to access this resource",401));

        }else{
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();}
});
export const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role :${req.user.role} is not allowed to access this resource`,403)
        );
        
        }
    next();
    }
}