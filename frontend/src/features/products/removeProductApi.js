import axios from "axios";
import {removeProductFail, removeProductRequest, removeProductReset, removeProductSuccess, clearRemoveProductError} from "./removeProductSlice"


export const removeProduct=(id)=>async(dispatch)=>{
    try {
        dispatch(removeProductRequest());

        const {data}=await axios.delete(`http://localhost:8080/api/v1/admin/product/${id}`,{withCredentials:true});
        dispatch(removeProductSuccess(data.message));
    } catch (error) {
        dispatch(removeProductFail(error.response.data.message));
    }
}

export const resetRemoveProduct=()=>async(dispatch)=>{
    dispatch(removeProductReset());
}

export const removeProductError=()=>async(dispatch)=>{
    dispatch(clearRemoveProductError());
}