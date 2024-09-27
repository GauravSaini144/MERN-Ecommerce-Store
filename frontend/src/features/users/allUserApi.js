import axios from "axios";
import { allUserFail, allUserRequest, allUserSuccess, clearAllUserError} from "./allUserSlice"


export const getAdminUsers=()=>async(dispatch)=>{
    try {
        dispatch(allUserRequest());

        const {data}=await axios.get("https://trendy-ecommerce-store-6bvp.onrender.com/api/v1/admin/users", {withCredentials:true});

        dispatch(allUserSuccess(data.users));

    } catch (error) {
        dispatch(allUserFail(error.response.data.message));
    }
}

export const allUserError=()=>async(dispatch)=>{
    dispatch(clearAllUserError());
}