import axios from "axios";
import {ProductDetailFail, ProductDetailSuccess, ProductDetailRequest, clearErrors} from "./DetailSlice";

export const getproductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch(ProductDetailRequest());
        const {data}=await axios.get(`http://localhost:8080/api/v1/product/${id}`);
        dispatch( ProductDetailSuccess(data));
    }catch(error){
        dispatch(ProductDetailFail(error.response.data.message));
    }
}
export const clearAllErrors=()=>async(dispatch)=>{
 
    dispatch(clearErrors());
}
