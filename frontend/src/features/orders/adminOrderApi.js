import axios from "axios"

import {allOrderFail, allOrderRequest, allOrderSuccess, clearAllOrderError} from "./adminOrderSlice"

export const getAdminOrder=()=>async(dispatch)=>{
    try {
        dispatch(allOrderRequest());
        const {data}=await axios.get("http://localhost:8080/api/v1/admin/orders", {withCredentials:true});
        dispatch(allOrderSuccess(data));
    } catch (error) {
        dispatch(allOrderFail(error.response.data.message));
    }
}

export const clearOrderError=()=>async(dispatch)=>{
    dispatch(clearAllOrderError());
}