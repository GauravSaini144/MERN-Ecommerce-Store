import axios from "axios";
import {myOrderRequest, myOrderSuccess, myOrderFail, clearMyOrderError} from "./myOrderSlice";

export const myOrders=()=>async(dispatch)=>{
    try {
        dispatch(myOrderRequest());
        
        const {data} = await axios.get("http://localhost:8080/api/v1/orders/me",{withCredentials:true});
        dispatch(myOrderSuccess(data.orders));
    } catch (error) {

        dispatch(myOrderFail(error.response.data.message));
        
    }


}


export const clearOrderError=()=>async(dispatch)=>{
    dispatch(clearMyOrderError());
}