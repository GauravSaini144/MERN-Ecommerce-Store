import axios from "axios";
import {updateUserFail, updateUserRequest, updateUserReset, updateUserSuccess, clearUpdateUserError} from "./updateUserSlice"

export const adminUpdateUser=(id, userData)=>async(dispatch)=>{
try {
    dispatch(updateUserRequest());

    const config={
        headers:{
            'Content-Type':'application/json',
        },
        withCredentials:true,
    };

    const {data}=await axios.put(`http://localhost:8080/api/v1/admin/user/${id}`, userData, config);

    dispatch(updateUserSuccess(data.success));

} catch (error) {
    dispatch(updateUserFail(error.response.data.message));
}
}

export const resetUpdateUser=()=>async(dispatch)=>{
    dispatch(updateUserReset());
}

export const updateUserError=()=>async(dispatch)=>{
    dispatch(clearUpdateUserError());
}