import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories:[],
    loading:false,
    error:null,
    message:null
}


const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        createCategoryStart:(state)=>{
            state.loading = true
        },
        createCategorySuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload.message
        },
        createCategoryFail:(state,action)=>{
          state.loading = false
          state.error = action.payload.message
        },
        getCategoryStart:(state)=>{
          state.loading = true

        },
        getCategorySuccess:(state,action)=>{
          state.loading = false
          state.categories = action.payload
          state.message = action.payload.message
        },
        getCategoryFail:(state,action)=>{
          state.loading = false
          state.error = action.payload.message
        }
    }
})

export const { createCategoryFail, createCategoryStart, createCategorySuccess, getCategoryFail, getCategorySuccess, getCategoryStart } = categorySlice.actions

export default categorySlice.reducer


