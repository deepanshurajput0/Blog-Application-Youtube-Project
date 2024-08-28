import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blogController.js'
import singleUpload from '../middlewares/multer.js'
const router = express()

router.post('/create',authMiddleware,singleUpload,createBlog)
router.get('/allblogs', getAllBlogs)
router.put('/update/:id', authMiddleware,singleUpload ,updateBlog)
router.get('/delete/:id', authMiddleware,deleteBlog)


export default router