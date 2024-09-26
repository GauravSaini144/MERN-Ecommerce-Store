import {createSlice} from "@reduxjs/toolkit"
const initialState={
    loading:false,
    orders:null,
    error:null,
}

const myOrdersSlice=createSlice({
    name:'myOrders',
    initialState,
    reducers:{
        myOrderRequest(state, action){
            state.loading=true;

        },

        myOrderSuccess(state, action){
            state.loading=false;
            state.orders=action.payload;

        },
        myOrderFail(state, action){
          state.error=action.payload;
        },
        clearMyOrderError(state, action){
           state.error=null;
        }
    }
});

export const {myOrderRequest, myOrderSuccess, myOrderFail, clearMyOrderError} =myOrdersSlice.actions;

export default myOrdersSlice.reducer;