import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    isUpdated:false,
    error:null,
};

const updateUserSlice=createSlice({
    name:'updateUser',
    initialState,
    reducers:{
        updateUserRequest(state, action){
           state.loading=true;
        },

        updateUserSuccess(state, action){
            state.loading=false;
            state.isUpdated=action.payload;
        },
        
        updateUserFail(state, action){
            state.loading=false;
            state.error=action.payload;

        },
        
        updateUserReset(state, action){
        state.isUpdated=false;
        },
        
        clearUpdateUserError(state, action){
         state.error=null;
        },
        
    }
})

export const {updateUserFail, updateUserRequest, updateUserReset, updateUserSuccess, clearUpdateUserError}=updateUserSlice.actions;
export default updateUserSlice.reducer;