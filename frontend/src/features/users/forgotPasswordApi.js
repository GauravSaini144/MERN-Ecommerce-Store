import axios from "axios";
import {forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, clearForgotPasswordErrors, passwordResetSuccess} from "./forgotPasswordSlice"

export const forgotPassword=(email)=>async(dispatch)=>{
    try {
        const config ={ withCredentials: true,headers:{'Content-Type':'application/json'}};

        dispatch(forgotPasswordRequest());
        const {data}=await axios.post("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/password/forgot",email,config);
         
        dispatch(forgotPasswordSuccess(data.message));
        
    } catch (error) {
        console.log(error);
        dispatch(forgotPasswordFail(error.response.data.message));
    }
}

export const passwordReset=(passwords, token)=>async(dispatch)=>{

try {
    const config ={ withCredentials: true,headers:{'Content-Type':'application/json'}};

    dispatch(forgotPasswordRequest());
    const {data}=await axios.put(`https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/password/reset/${token}`,passwords, config);
    dispatch(passwordResetSuccess(data.success));
    
} catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
}

}

export const clearForgotError=()=>async(dispatch)=>{
    dispatch(clearForgotPasswordErrors());
}