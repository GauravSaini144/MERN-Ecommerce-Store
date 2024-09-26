import { createSlice } from "@reduxjs/toolkit";
const initialState=
{
isAuthenticated:false,
loading:false,
isUpdated:false,
error:null
};

const profileSlice=createSlice({
    name:"Profile",
    initialState,
    reducers:{
        updateProfileRequest(state,action){
            state.loading=true;
            state.isAuthenticated=false;
            state={...state};
           },
        
           updateProfileSuccess(state, action){
            
            state.loading=false;
           state.isUpdated=action.payload;
           state={...state};
           },
             
           updateProfileReset(state, action){
          
          state.isUpdated=false;
          state={...state};
           },
        
           updateProfileFail(state, action){
            state={...state};
            state.loading=false;
            state.error=action.payload;
           },

           ClearUpdateError(state,action){
           
            state.error=null;
            state={...state};
        },
        passwordUpdateRequest(state, action){
            state.loading=true;
            state.isAuthenticated=false;
            state={...state};
        },
        passwordUpdateSuccess(state, action){
            state.loading=false;
            state.isUpdated=action.payload;
            state={...state};
        },
        passwordUpdateFail(state, action){
           
            state.loading=false;
            state.error=action.payload;
            state={...state};
        },
        ClearPasswordError(state, action){
            state.error=null;
            state={...state};
        }
        
    }
});

export const { updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updateProfileReset,
    passwordUpdateRequest,
    passwordUpdateSuccess,
    passwordUpdateFail,
    ClearPasswordError,
ClearUpdateError} =profileSlice.actions;
export default profileSlice.reducer; 
