import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blog:null,
    loading:false,
    error:null,
    message:null
}


const blogSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        createBlogStart:(state)=>{
            state.loading = true
        },
        createBlogSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload.message
        },
        createBlogFail:(state,action)=>{
          state.loading = false
          state.error = action.payload.message
        },
    }
})

export const { createBlogFail, createBlogSuccess, createBlogStart } = blogSlice.actions

export default blogSlice.reducer


