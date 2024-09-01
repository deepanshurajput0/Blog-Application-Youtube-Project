import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blog:[],
    loading:false,
    error:null,
    message:null
}


const blogSlice = createSlice({
    name:"blog",
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
        getBlogsStart:(state)=>{
            state.loading = true
        },
        getBlogsSuccess:(state,action)=>{
            state.loading = false
            state.blog = action.payload
            state.message = action.payload.message
        },
        getBlogsFail:(state,action)=>{
          state.loading = false
          state.error = action.payload.message
        },
        updateBlogsStart:(state)=>{
            state.loading = true
        },
        updateBlogsSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload.message
        },
        updateBlogsFail:(state,action)=>{
          state.loading = false
          state.error = action.payload.message
        },
        
    }
})

export const { createBlogFail, createBlogSuccess, createBlogStart, getBlogsFail, getBlogsSuccess, getBlogsStart, updateBlogsFail, updateBlogsStart, updateBlogsSuccess } = blogSlice.actions

export default blogSlice.reducer


