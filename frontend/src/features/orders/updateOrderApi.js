import axios from "axios"
import {updateOrderFail, updateOrderRequest, updateOrderReset, updateOrderSuccess, clearupdateOrderError} from "./updateOrderSlice"

export const adminUpdateOrder=(id, orderData)=>async(dispatch)=>{
    try {
        dispatch(updateOrderRequest());
        const config={
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:true,
        };
        const {data}=await axios.put(`http://localhost:8080/api/v1/admin/order/${id}`, orderData, config);
        dispatch(updateOrderSuccess(data.success));
    } catch (error) {
        
        dispatch(updateOrderFail(error.response.data.message));
    }
}

export const resetUpdateOrder=()=>async(dispatch)=>{
    dispatch(updateOrderReset());
}

export const updateOrderError=()=>async(dispatch)=>{
    dispatch(clearupdateOrderError());
}
