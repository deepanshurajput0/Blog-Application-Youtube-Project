import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'
import blogReducer from './blogSlice/blogSlice'
const store = configureStore({
   reducer:{
    user:userReducer,
    blog:blogReducer
   }
})


export default store



