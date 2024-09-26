import { createSlice } from "@reduxjs/toolkit";
const initialState=
{

loading:false,
user:null,
error:null
};

const userDetailSlice=createSlice({
    name:"userDetail",
    initialState,
    reducers:{
        userDetailRequest(state,action){
            state.loading=true;
            
           },
        
           userDetailSuccess(state, action){
            
            state.loading=false;
           state.user=action.payload;
           
           },
             
        
           userDetailFail(state, action){
            state.loading=false;
            state.error=action.payload;
           },

           clearUserDetailError(state,action){
           
            state.error=null;
            
        },
        
    }
});

export const {
userDetailFail,userDetailRequest,userDetailSuccess, clearUserDetailError

} =userDetailSlice.actions;
export default userDetailSlice.reducer; 
