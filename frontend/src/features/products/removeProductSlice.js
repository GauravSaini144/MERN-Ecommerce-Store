import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loading:false,
    success:false,
    message:null,
    error:null,
};

const removeProductSlice=createSlice({
    name:'removeProduct',
    initialState,
    reducers:{
        removeProductRequest(state, action){
            
            state.loading=true;
        },
        removeProductSuccess(state, action){
           
            state.loading=false;
            state.success=true;
            state.message=action.payload;
        },
        removeProductFail(state, action){
          
            state.loading=true;
            state.error=action.payload;
        },
        removeProductReset(state, action){
            state.loading=false;
            state.success=false;
            state.message=null;
        },
        clearRemoveProductError(state, action){
         state.error=null;
        }

    }
});

export const {removeProductFail, removeProductRequest, removeProductReset, removeProductSuccess, clearRemoveProductError} = removeProductSlice.actions;
export default removeProductSlice.reducer;