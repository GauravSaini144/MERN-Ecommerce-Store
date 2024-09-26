import {createSlice} from "@reduxjs/toolkit"


const initialState={
    loading:false,
    order:null,
    error:null,
}

const orderDetailsSlice=createSlice({
    name:'orderDetails',
    initialState,
    reducers:{
        orderDetailsRequest(state, action){
            state.loading=true;
        },

        orderDetailsSuccess(state, action){
            state.loading=false;
            state.order=action.payload;
        },

        orderDetailsFail(state, action){
          state.error=action.payload;
          state.loading=false;
        },
        clearOrderDetailError(state, action)
        {
            state.error=null;
        }
        
    }
});

export const { orderDetailsRequest, orderDetailsFail, orderDetailsSuccess, clearOrderDetailError} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
