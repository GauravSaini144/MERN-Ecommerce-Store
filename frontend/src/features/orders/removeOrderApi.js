import axios from "axios";

import {removeOrderFail, removeOrderRequest, removeOrderReset, removeOrderSuccess, clearRemoveOrderError} from "./removeOrderSlice"

export const removeAdminOrder=(id)=>async(dispatch)=>{
    try {
        dispatch(removeOrderRequest());

        const {data}=await axios.delete(`https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/admin/order/${id}`, {withCredentials:true});
        dispatch(removeOrderSuccess(data));
    } catch (error) {
        dispatch(removeOrderFail(error.response.data.message));
    }
}

export const resetRemoveOrder=()=>async(dispatch)=>{
    dispatch(removeOrderReset());
}

export const removeOrderError=()=>async(dispatch)=>{
    dispatch(clearRemoveOrderError());
}