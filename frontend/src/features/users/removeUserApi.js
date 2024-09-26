import axios from "axios"
import {removeUserFail, removeUserRequest, removeUserReset, removeUserSuccess, clearRemoveUserError} from "./removeUserSlice"

export const removeUser=(id)=>async(dispatch)=>{
    try {
        dispatch(removeUserRequest());
        const {data}=await axios.delete(`http://localhost:8080/api/v1/admin/user/${id}`, {withCredentials:true});
        dispatch(removeUserSuccess(data.success));
    } catch (error) {
        dispatch(removeUserFail(error.response.data.message));
    }


}


export const resetRemoveUser=()=>async(dispatch)=>{
    dispatch(removeUserReset());
}

export const removeUserError=()=>async(dispatch)=>{
    dispatch(clearRemoveUserError());
}