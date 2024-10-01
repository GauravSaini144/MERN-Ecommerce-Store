import axios from "axios"
import Cookies from "js-cookie";
import {loadUserRequest, loadUserSuccess, loadUserFail, ClearLoadError} from "./userSlice";
export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch(loadUserRequest());
       
        // let id=JSON.parse(localStorage.getItem('id'));
        const {data}=await axios.get("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/me",{withCredentials: true});
        
        dispatch(loadUserSuccess(data));
        
    }
    catch(error){
        
        dispatch(loadUserFail(error.response.data.message));}
       
}

export const clearLoadError=()=>async(dispatch)=>{
    dispatch(ClearLoadError());
}