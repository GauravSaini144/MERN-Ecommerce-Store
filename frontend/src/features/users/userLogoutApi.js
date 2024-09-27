import axios from "axios";
import {logoutRequest, logoutSuccess, logoutFail, clearLogoutErrors} from "./userSlice";
export const logout=()=>async(dispatch)=>{
    try{
        dispatch(logoutRequest());
       await axios.get("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/logout",{
        withCredentials:true
       });
        dispatch(logoutSuccess());

    }
    catch(error){
     dispatch(logoutFail(error.response.data.message));
    }
}