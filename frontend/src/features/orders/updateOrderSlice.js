import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loading:false,
    isUpdated:false,
    error:false,
};

const updateOrderSlice=createSlice({

    name:'updateOrder',
    initialState,
    reducers:{
        updateOrderRequest(state, action){
          state.loading=true;

        },
        updateOrderSuccess(state, action){
      state.loading=false;
      state.isUpdated=action.payload;
        },
        updateOrderFail(state, action){
      state.error=action.payload;
      state.loading=false;
        },
        updateOrderReset(state, action){
          state.isUpdated=false;
        },
        clearupdateOrderError(state, action){
state.error=null;
        },
    }
})

export const { updateOrderFail, updateOrderRequest, updateOrderReset, updateOrderSuccess, clearupdateOrderError} = updateOrderSlice.actions;
export default updateOrderSlice.reducer;