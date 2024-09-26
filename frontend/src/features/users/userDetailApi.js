import axios from "axios";
import { userDetailFail, userDetailRequest, userDetailSuccess, clearUserDetailError} from "./userDetailsSlice"

export const getAdminUserDetail=(id)=>async(dispatch)=>{
    try {

        dispatch(userDetailRequest());
        const {data}=await axios.get(`http://localhost:8080/api/v1/admin/user/${id}`, {withCredentials:true});
        dispatch(userDetailSuccess(data.user));
    } catch (error) {

        dispatch(userDetailFail(error.response.data.message));
        
    }
}

export const userDetailError=()=>async(dispatch)=>{
    dispatch(clearUserDetailError());
}