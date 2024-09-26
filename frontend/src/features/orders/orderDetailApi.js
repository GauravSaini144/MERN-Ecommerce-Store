import axios from "axios";
import {orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, clearOrderDetailError} from "./OrderDetailSlice.js";

export const getOrderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch(orderDetailsRequest());

        const {data}=await axios.get(`http://localhost:8080/api/v1/order/${id}`, {withCredentials:true});
        dispatch(orderDetailsSuccess(data.order));
    } catch (error) {

        dispatch(orderDetailsFail(error.response.data.message));
        
    }


}

export const orderDetailError=()=>async(dispatch)=>{
    dispatch(clearOrderDetailError());
}