import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createBlog, getAllBlogs } from '../controllers/blogController.js'
import singleUpload from '../middlewares/multer.js'
const router = express()

router.post('/create',authMiddleware,singleUpload,createBlog)

router.get('/allblogs', getAllBlogs)


export default router