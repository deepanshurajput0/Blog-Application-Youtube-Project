import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'
import blogReducer from './blogSlice/blogSlice'
import categoryReducer from './categorySlice/categorySlice'
const store = configureStore({
   reducer:{
    user:userReducer,
    blog:blogReducer,
    category:categoryReducer
   }
})


export default store



