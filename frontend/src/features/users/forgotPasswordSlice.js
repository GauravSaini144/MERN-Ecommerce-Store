import { createSlice } from "@reduxjs/toolkit";
const initialState={
loading:false,
error:null,
message:null,
isUpdated:false,
};

const passwordSlice=createSlice({
name:"ForgotPassword",
initialState,
reducers:{
    forgotPasswordRequest(state, action){
     state.loading=true;
     state.error=null;
    
    },
    forgotPasswordSuccess(state, action){
      state.loading=false;
      state.message=action.payload;
    },
    forgotPasswordFail(state, action){
     state.loading=false;
     state.error=action.payload;
    },
    passwordResetSuccess(state, action){
     state.loading=false;
     state.isUpdated=action.payload;
    },
    clearForgotPasswordErrors(state, action){
        state.error=null;
        state={...state};
    }
}
});

export const {forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, clearForgotPasswordErrors, passwordResetSuccess} =passwordSlice.actions;
export default passwordSlice.reducer;