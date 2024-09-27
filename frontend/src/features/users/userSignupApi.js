import axios from "axios";
import { signupRequest,
    signupFail,
    signupSuccess,
    clearSignupErrors} from "./userSlice.js";

export const signup=(userData)=>async(dispatch)=>{
   try{
    dispatch(signupRequest());
    const config ={ withCredentials: true,headers:{'Content-Type':'application/json'}};

    const {data}=await axios.post("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/register",
        userData,
        config,
    );
    dispatch(signupSuccess(data));
   }catch(error){
    dispatch(signupFail(error.response.data.message));

   }

}
export const clearErrors=()=>async(dispatch)=>{
dispatch(clearSignupErrors());
}