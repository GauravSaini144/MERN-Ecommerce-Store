import axios from "axios";
import { allProductFail, allProductRequest, allProductSuccess, clearErrors} from "./productSlice.js";
export const getProduct=(keyword="", currentPage=1, price=[0,150000], category)=>async(dispatch)=>{
    try{
           
        dispatch(allProductRequest());
        let link;
        if(category){
         link=`http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;}
        else{
         link=`http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        }
        const {data}=await axios.get(link);
        console.log(data);
        dispatch(allProductSuccess(data))

    }catch(error){
        dispatch(allProductFail(error.response.data.message));
    }
}

export const clearAllErrors=()=>async(dispatch)=>{
 
    dispatch(clearErrors());
}
