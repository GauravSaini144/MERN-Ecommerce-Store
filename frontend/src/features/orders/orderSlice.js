import {createSlice} from '@reduxjs/toolkit';
const initialState={
    loading:false,
    error:null,
    order:null,
}

const orderSlice=createSlice({
    name:'newOrder',
    initialState,
    reducers:{

        createOrderRequest(state, action){
            state.loading=true;

        },

        createOrderSuccess(state, action){
            state.loading=false;
            state.order=action.payload;
        },
        createOrderFail(state, action){
            state.loading=false;
            state.error=action.payload;
        },

        clearOrderError(state, action){
           state.error=null;
        }

    }
});

export const {createOrderRequest, createOrderSuccess, createOrderFail, clearOrderError}=orderSlice.actions;
export default orderSlice.reducer;