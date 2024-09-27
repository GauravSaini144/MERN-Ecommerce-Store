import axios from "axios"

import {allOrderFail, allOrderRequest, allOrderSuccess, clearAllOrderError} from "./adminOrderSlice"

export const getAdminOrder=()=>async(dispatch)=>{
    try {
        dispatch(allOrderRequest());
        const {data}=await axios.get("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/admin/orders", {withCredentials:true});
        dispatch(allOrderSuccess(data));
    } catch (error) {
        dispatch(allOrderFail(error.response.data.message));
    }
}

export const clearOrderError=()=>async(dispatch)=>{
    dispatch(clearAllOrderError());
}