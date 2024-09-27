import axios from "axios";
import {newProductFail, newProductRequest, newProductReset, newProductSuccess, clearNewProductError} from "./newProductSlice"

export const createNewProduct=(productData)=>async(dispatch)=>{

    try {
        dispatch(newProductRequest());
        const config={
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:true,
        };
        const {data}=await axios.post("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/admin/product/new",productData,config);
        dispatch(newProductSuccess(data));
      

    } catch (error) {

        dispatch(newProductFail(error.response.data.message));
         
    }
}

export const resetNewProduct=()=>async(dispatch)=>{
    dispatch(newProductReset());
}

export const newProductError=()=>async(dispatch)=>{
    dispatch(clearNewProductError());
}