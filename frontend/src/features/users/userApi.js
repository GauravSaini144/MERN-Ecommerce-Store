import axios from "axios";
import { clearLoginErrors, loginFail, loginRequest, loginSuccess } from "./userSlice";
import { config } from "dotenv";
export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest());
        const config ={ withCredentials: true,headers:{'Content-Type':'application/json'}};
        const {data}=await axios.post(
            'https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/login',
            {email,password},
            config
        );
        console.log(data);
        dispatch(loginSuccess(data));
    }
    catch(error){
        console.log(error.response);
        dispatch(loginFail(error.response.data.message));

    }

   
} 
export const clearErrors=()=>async(dispatch)=>{
    dispatch(clearLoginErrors());
}