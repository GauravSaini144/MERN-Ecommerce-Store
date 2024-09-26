import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    users:null,
    error:null,
};

const allUserSlice=createSlice({
    name:'allUser',
    initialState,
    reducers:{
        allUserRequest(state, action){


            state.loading=true;

        },
        allUserSuccess(state, action){
           
            state.loading=false;
            state.users=action.payload;
        },
        allUserFail(state, action){

            state.loading=false;
            state.error=action.payload;
        },
        clearAllUserError(state, action){


            state.error=null;
        },
      


    }
})

export const { allUserFail, allUserRequest, allUserSuccess, clearAllUserError} =allUserSlice.actions;
export default allUserSlice.reducer;