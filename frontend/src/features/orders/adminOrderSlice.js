import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loading:false,
    orders:null,
    error:null,
    totalAmount:null,

};

const adminOrderSlice=createSlice({
    name:'adminOrder',
    initialState,
    reducers:{
       allOrderRequest(state, action){
         state.loading=true;
       },

       allOrderSuccess(state, action){
          state.loading=false;
          state.orders=action.payload.orders;
          state.totalAmount=action.payload.totalAmount;
       },
       allOrderFail(state, action){
        state.loading=false;
        state.error=action.payload;

       },

       clearAllOrderError(state, action){
      state.error=null;
       }
    }
})


export const {allOrderFail, allOrderRequest, allOrderSuccess, clearAllOrderError} =adminOrderSlice.actions;

export default adminOrderSlice.reducer;