import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        maxLength:[30,"name cannot exceed 30 characters"],
        minLength:[4,"name should have more than 5 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"],

    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"password should be greater than 8 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});
userSchema.pre("save", async function (next){
if(!this.isModified("password")){
    next();
}
this.password=await bcrypt.hash(this.password,10);
});
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// generating password reset token
userSchema.methods.getResetPasswordToken= function(){
    // generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;

};
const User=mongoose.model("User",userSchema);
export default User;
