import axios from "axios";
import {updateProductFail, updateProductRequest, updateProductSuccess, resetUpdateProduct, clearUpdateProductError} from "./updateProductSlice"

export const updateMyProduct=(id, productData)=>async(dispatch)=>{
    try {
        dispatch(updateProductRequest());
        const config={
            headers:{
                'Content-Type':'application/json',

            },
            withCredentials:true,
        };

        const {data}=await axios.put(`http://localhost:8080/api/v1/admin/product/${id}`, productData, config);
        dispatch(updateProductSuccess(data.success));
    } catch (error) {
        dispatch(updateProductFail(error.response.data.message));
    }
}

export const updateProductReset=()=>async(dispatch)=>{

    dispatch(resetUpdateProduct());

}

export const updateProductError=()=>async(dispatch)=>{
    dispatch(clearUpdateProductError());
}

