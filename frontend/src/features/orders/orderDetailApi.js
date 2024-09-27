import axios from "axios";
import {orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, clearOrderDetailError} from "./OrderDetailSlice.js";

export const getOrderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch(orderDetailsRequest());

        const {data}=await axios.get(`https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/order/${id}`, {withCredentials:true});
        dispatch(orderDetailsSuccess(data.order));
    } catch (error) {

        dispatch(orderDetailsFail(error.response.data.message));
        
    }


}

export const orderDetailError=()=>async(dispatch)=>{
    dispatch(clearOrderDetailError());
}