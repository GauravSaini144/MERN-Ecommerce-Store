import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    isDeleted:false,
    error:null,
};

const removeUserSlice=createSlice({
    name:'removeUser',
    initialState,
    reducers:{
        removeUserRequest(state, action){

            state.loading=true;

        },
        removeUserSuccess(state, action){

            state.loading=false;
            state.isDeleted=action.payload;
        },
        removeUserFail(state, action){
            state.loading=false;
            state.error=action.payload;

        },
        removeUserReset(state, action){

            state.isDeleted=false;

        },
        clearRemoveUserError(state, action){

            state.error=null;
        },
    }
});

export const {removeUserFail, removeUserRequest, removeUserReset, removeUserSuccess, clearRemoveUserError}=removeUserSlice.actions;
export default removeUserSlice.reducer;