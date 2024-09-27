import axios from "axios"
import { newReviewRequest, newReviewFail, newReviewSuccess, newReviewReset, clearReviewError} from "./reviewSlice"
import { Reviews } from "@mui/icons-material"

export const addReview=(reviewData)=>async(dispatch)=>{
    try{
    const config={
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true,

    }
    dispatch(newReviewRequest());

    const {data}=await axios.put("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/review", reviewData, config);

    dispatch(newReviewSuccess(data.success));


}
catch(error){
    dispatch(error.response.data.message);
}
}
export const resetReview=()=>async(dispatch)=>{
    dispatch(newReviewReset());

}
export const reviewError=()=>async(dispatch)=>{
    dispatch(clearReviewError());
}