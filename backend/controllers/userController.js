import ErrorHandler from "../utils/errorhandler.js";
import asyncError from "../middleware/asyncError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto, { publicEncrypt } from "crypto"
import cloudinary from "cloudinary"
// register user

export const registerUser =asyncError(async(req,res,next)=>{
const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale",
});
const {name,email,password}=req.body;
const user=await User.create({
    name,email,password,
    avatar:{
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
    },
    

});
sendToken(user,201,res);

});
 export const loginUser=asyncError(async(req,res,next)=>{
    const {email, password}=req.body;
    if(!email||!password){
        return next(new ErrorHandler("please enter email or password",400));
        
    }
    
    const user = await User.findOne({email}).select("password");
    if(!user){
        return next(new ErrorHandler("User Not Found, Enter Correct Info",401));

    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));

    }
  sendToken(user,200,res);
 });
 
 //logout user
 export const logout= asyncError((req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    req.body=null;
    req.user=null;
    res.status(200).json({
        success:true,
        message:"Logged out",
    });
 })

// forgot password
export const forgotPassword=asyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found ",404));


    }

    // get resetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not request this email then ignore it.`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,

        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined; 
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }
});

// Reset Password
export const resetPassword=asyncError(async(req,res,next)=>{
    // creating tokem hash

    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},

    });
    if(!user){
        return next(new ErrorHandler("User not found ",400));
    }
    if(req.body.password!=req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password ",400));

    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
});

export const getUserDetails= asyncError(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id);
    res.status(200).json({ 
        success:true,
        user,
    });
});

// update user password
export const updatePassword= asyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password incorrect",401));

    }
    if(req.body.newPassword!=req.body.confirmPassword){
        return next(new ErrorHandler("new password not match with confirm password",400));
    }
    user.password=req.body.newPassword;
    await user.save();
    res.status(200).json({
        success:true,
        user,
       });
});


//update user profile

export const updateProfile=asyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };

    // cloudinary 

    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
        });
        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    }
    
    const user=await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
 } );

   res.status(200).json({
    success:true,
    user,
   });
});

// get all users (admin)
export const getAllUsers= asyncError(async(req,res,next)=>{

    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    });
});

// get single user detail (admin)
export const getUser=asyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next( new ErrorHandler("User not exist with this id ",401));

    }
    res.status(200).json({
        success:true,
        user,
    });
});



//update user  role (admin)

export const updateUserRole=asyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    const checkUser=await User.findById(req.params.id);
    if(!checkUser){
        return next(ErrorHandler("User not exist with this ID",401));

    }
    
    
    const user=await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
 } );

   res.status(200).json({
    success:true,
    user,
   });
});

// delete user (admin)
export const deleteUser=asyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(ErrorHandler("User not exist with this Id",401));

    }

    

    let publicId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(publicId);
   await  User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
    });
});