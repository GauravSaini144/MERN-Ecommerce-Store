import axios from "axios"
import Cookies from "js-cookie";
import {loadUserRequest, loadUserSuccess, loadUserFail, ClearLoadError} from "./userSlice";
export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch(loadUserRequest());
       
        // let id=JSON.parse(localStorage.getItem('id'));
        const {data}=await axios.get("http://localhost:8080/api/v1/me",{withCredentials: true});
        console.log(data);
        dispatch(loadUserSuccess(data));
        
    }
    catch(error){
        
        dispatch(loadUserFail(error.response.data.message));}
       
}

export const clearLoadError=()=>async(dispatch)=>{
    dispatch(ClearLoadError());
}