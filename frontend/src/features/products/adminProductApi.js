import axios from "axios"
import {adminProductsFail, adminProductsRequest, adminProductsSuccess, clearAdminProductsError} from "./adminProductSlice"

export const getAdminProducts=()=>async(dispatch)=>{
 try {
    dispatch(adminProductsRequest());

    const {data}=await axios.get("http://localhost:8080/api/v1/admin/products",{withCredentials:true});
    dispatch(adminProductsSuccess(data.products));


 } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));

 }

}

export const adminProductsError=()=>async(dispatch)=>{
    dispatch(clearAdminProductsError());
}