import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loading:false,
    success:false,
    error:null,
}

const reviewSlice=createSlice({

name:'reviews',
initialState,
reducers:{
    newReviewRequest(state, action){
     state.loading=true;
    },
    newReviewSuccess(state, action){
     state.loading=false;
     state.success=action.payload;
    },
    newReviewFail(state, action){
    state.loading=false;
    state.error=action.payload;
    },

    newReviewReset(state, action){
   state.loading=false;
   state.success=false;
    },

    clearReviewError(state, action){
        state.error=null;
    }
}


});


export const { newReviewRequest, newReviewFail, newReviewSuccess, newReviewReset, clearReviewError} =reviewSlice.actions;

export default reviewSlice.reducer;