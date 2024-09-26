import axios from "axios";
import {logoutRequest, logoutSuccess, logoutFail, clearLogoutErrors} from "./userSlice";
export const logout=()=>async(dispatch)=>{
    try{
        dispatch(logoutRequest());
       await axios.get("http://localhost:8080/api/v1/logout",{
        withCredentials:true
       });
        dispatch(logoutSuccess());

    }
    catch(error){
     dispatch(logoutFail(error.response.data.message));
    }
}