import axios from "axios";
import { allUserFail, allUserRequest, allUserSuccess, clearAllUserError} from "./allUserSlice"


export const getAdminUsers=()=>async(dispatch)=>{
    try {
        dispatch(allUserRequest());

        const {data}=await axios.get("http://localhost:8080/api/v1/admin/users", {withCredentials:true});

        dispatch(allUserSuccess(data.users));

    } catch (error) {
        dispatch(allUserFail(error.response.data.message));
    }
}

export const allUserError=()=>async(dispatch)=>{
    dispatch(clearAllUserError());
}