import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    products:[],
    error:null,
};

const adminProductsSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{
        adminProductsRequest(state, action){
            state.loading=true;
            
        },
        adminProductsSuccess(state, action){
            state.loading=false;
            state.products=action.payload;

        },

        adminProductsFail(state, action){
            state.loading=false;
            state.error=action.payload;
        },

        clearAdminProductsError(state, action){
            state.error=null;
        }

    }
});

export const {adminProductsFail, adminProductsRequest, adminProductsSuccess, clearAdminProductsError}=adminProductsSlice.actions;

export default adminProductsSlice.reducer;