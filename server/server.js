import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import cors from 'cors'
import { connectDB } from './config/db.js'
const app = express()

dotenv.config({})

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

app.use(express.json())

app.use(cookieParser())

app.use(cors())

app.use('/api/v1',userRoutes)
app.use('/api/v1',blogRoutes)
app.use('/api/v1',categoryRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
    connectDB()
})