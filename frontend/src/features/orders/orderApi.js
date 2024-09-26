import {createOrderRequest, createOrderSuccess, createOrderFail, clearOrderError} from "./orderSlice"
import axios from "axios"

export const createOrder=(order)=>async(dispatch)=>{
    try {
        dispatch(createOrderRequest());
        const config={
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:true,
        };
        const {data}=await axios.post("http://localhost:8080/api/v1/order/new", order, config);
        dispatch(createOrderSuccess(data.order));
        
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
}

export const clearError=()=>async(dispatch)=>{
    dispatch(clearOrderError());
}