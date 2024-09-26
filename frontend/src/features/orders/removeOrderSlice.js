import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    isRemoved:false,
    message:null,
    error:null,
};

const removeOrderSlice= createSlice({
    name:'removeOrder',
    initialState,
    reducers:{
        removeOrderRequest(state, action){

            state.loading=true;
            
        },
        removeOrderSuccess(state, action){

            state.loading=false;
            state.isRemoved=action.payload.success;
            state.message=action.payload.message;
        },
        removeOrderFail(state, action){
 
            state.error=action.payload;
            state.loading=false;
        },
        removeOrderReset(state, action){
          state.isRemoved=false;

        },
        clearRemoveOrderError(state, action){
                    state.error=null; 
        },
    }
})


export const {removeOrderFail, removeOrderRequest, removeOrderReset, removeOrderSuccess, clearRemoveOrderError}=removeOrderSlice.actions;
export default removeOrderSlice.reducer;