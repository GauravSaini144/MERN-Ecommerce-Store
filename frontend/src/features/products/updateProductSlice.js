import { createSlice } from "@reduxjs/toolkit";


const initialState={
loading:false,
isUpdated:false,
error:null,
};

const updateProductSlice=createSlice({
  name:'updateProduct',
  initialState,
  reducers:{
   updateProductRequest(state, action){
        state.loading=true;
        
     },
     updateProductSuccess(state, action){
      state.loading=false;
      state.isUpdated=action.payload;
     },
     updateProductFail(state, action){
    state.loading=false;
    state.error=action.payload;
     },
     resetUpdateProduct(state, action){
     state.isUpdated=false;
     },

     clearUpdateProductError(state, action){
   state.error=null;
     }
    }
});

export const {updateProductFail, updateProductRequest, updateProductSuccess, resetUpdateProduct, clearUpdateProductError} = updateProductSlice.actions;

export default updateProductSlice.reducer;


