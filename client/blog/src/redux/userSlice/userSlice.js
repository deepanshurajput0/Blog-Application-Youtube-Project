import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null,
    loading:false,
    isAuthenticated: false,
    error:null,
    message:null
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        registerStart:(state)=>{
            state.loading = true
        },
        registerSuccess:(state,action)=>{
            state.loading = false
            state.isAuthenticated = true,
            state.user = action.payload.user
            state.message = action.payload.message
        },
        registerFail:(state,action)=>{
          state.loading = false
          state.isAuthenticated = false;
          state.error = action.payload.message
        },
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        },
        loadUserStart:(state)=>{
            state.loading = true
         },
         loadUserSuccess:(state,action)=>{
            state.loading = false
            state.isAuthenticated = true;
            state.user = action.payload
         },
         loadUserFail:(state,action)=>{
            state.loading = false
            state.isAuthenticated = false;
            state.error = action.payload.message
         },
         logoutStart:(state)=>{
            state.loading = true
           },
           logoutSuccess:(state,action)=>{
            state.loading = false
            state.isAuthenticated = false;
            state.user = null
            state.message = action.payload.message;
           },
           logoutFail:(state,action)=>{
            state.loading = false
            state.isAuthenticated = false;
            state.error = action.payload.message
           }
    }
})

export const { registerFail, registerStart, registerSuccess, loginFail, loginStart, loginSuccess, loadUserFail, loadUserSuccess, loadUserStart, logoutFail, logoutStart, logoutSuccess } = userSlice.actions

export default userSlice.reducer


