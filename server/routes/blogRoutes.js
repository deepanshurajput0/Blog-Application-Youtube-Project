import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createBlog } from '../controllers/blogController.js'
const router = express()

router.post('/create',authMiddleware,createBlog)


export default router