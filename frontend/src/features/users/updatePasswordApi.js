import axios from "axios";
import {passwordUpdateRequest, passwordUpdateSuccess, passwordUpdateFail, ClearPasswordError} from "./profileSlice"

export const updatePassword=(passwords)=>async(dispatch)=>{
try{
    dispatch(passwordUpdateRequest());
const config ={ withCredentials: true,headers:{'Content-Type':'application/json'}};
const {data}=await axios.put("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/password/update", passwords,config);
dispatch(passwordUpdateSuccess(data.success));

}
catch(error){
    console.log(error.response.data.message);
dispatch(passwordUpdateFail(error.response.data.message));

}
}

export const clearPasswordError=()=>(dispatch)=>{
    dispatch(ClearPasswordError());
}
