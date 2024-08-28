import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blogController.js'
import singleUpload from '../middlewares/multer.js'
const router = express()

router.post('/create',authMiddleware,isAdmin,singleUpload,createBlog)
router.get('/allblogs', getAllBlogs)
router.put('/update/:id', authMiddleware,isAdmin,singleUpload ,updateBlog)
router.get('/delete/:id', authMiddleware,isAdmin,deleteBlog)


export default router