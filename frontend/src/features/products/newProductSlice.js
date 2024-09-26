import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    success:false,
    product:null,
    error:null,
};

const newProductSlice=createSlice({
    name:'newproduct',
    initialState,
    reducers:{
        newProductRequest(state, action){
            
            state.loading=true;
        },
        newProductSuccess(state, action){
         state.loading=false;
         state.product=action.payload.product;
         state.success=action.payload.success;
        },
        newProductFail(state, action){
            state.loading=false;
            state.error=action.payload;
        },
        newProductReset(state, action){
           state.loading=false;
           state.success=false;

        },

        clearNewProductError(state, action){
         state.error=null;
        },


    }
})

export const {newProductFail, newProductRequest, newProductReset, newProductSuccess, clearNewProductError}=newProductSlice.actions;
export default newProductSlice.reducer;