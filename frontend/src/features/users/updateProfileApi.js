import axios from "axios"
import {updateProfileRequest, updateProfileSuccess, updateProfileFail, updateProfileReset, ClearUpdateError} from "./profileSlice";

export const updateProfile=(userData)=>async(dispatch)=>{
    try{
        dispatch(updateProfileRequest());
        const config ={ withCredentials: true,headers:{'Content-Type':'multipart/form-data'}};
        const {data}=await axios.put("http://localhost:8080/api/v1/me/update", userData, config);
        dispatch(updateProfileSuccess(data.success));

    }
    catch(error){
       dispatch(updateProfileFail(error.response.data.message));
    }
}

export const ClearUpdateProfileError=()=>async(dispatch)=>{
    dispatch(ClearUpdateError());
}