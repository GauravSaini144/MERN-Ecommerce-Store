
import { createSlice } from "@reduxjs/toolkit";

const initialState={
loading:false,
isAuthenticated:false,
user:null,
error:null,
isUpdated:false,
};

const userSlice=createSlice({
    name:"User",
    initialState,
    reducers:{
    loginRequest(state,action){
    
        state.loading=true,
        state.isAuthenticated=false
    
    },
    loginFail(state,action){
    
    state.loading=false,
    state.isAuthenticated=false,
    state.user=null,
    state.error=action.payload

    },
    
    loginSuccess(state,action){
       
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload;
        state={...state};
    
    },
    clearLoginErrors(state,action){
   
    state.error=null,
    state={...state}
    },

    signupRequest(state,action){
        
        state.loading=true,
        state.isAuthenticated=false
    
    },
    signupFail(state,action){
    
    state.loading=false,
    state.isAuthenticated=false,
    state.user=null,
    state.error=action.payload

    },
    
    signupSuccess(state,action){
       
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload;
        state={...state};
    
    },
    clearSignupErrors(state,action){
   
    state.error=null
    
    },



logoutRequest(state, action){
    state.loading=true;
},

logoutSuccess(state, action){
state.loading=false;
state.isAuthenticated=false;
state.user=null;
state.error=null;
},

logoutFail(state,action){
    state.loading=false;
    state.isAuthenticated=true;
    state.error=action.payload;
},
clearLogoutErrors(state,action){
   
    state.error=null
    },

    loadUserRequest(state,action){
        state.loading=true,
        state.isAuthenticated=false
    },
    loadUserSuccess(state,action){
       
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload;
        state={...state};
    },

    loadUserFail(state, action){
        
        state.loading=false;
        state.isAuthenticated=false;
        state.user=null;
        state.error=action.payload;
    
    },

    ClearLoadError(state,action){
  
        state.error=null
    }
}
})

export const {
    loginRequest,
    loginFail,
    loginSuccess,
    clearLoginErrors,
    signupRequest,
    signupFail,
    signupSuccess,
    clearSignupErrors,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    clearLogoutErrors,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    ClearLoadError
}=userSlice.actions;

export default userSlice.reducer;