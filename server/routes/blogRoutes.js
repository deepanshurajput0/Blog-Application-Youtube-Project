import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { createBlog, deleteBlog, getAllBlogs, getBlogStats, getSingleBlog, updateBlog } from '../controllers/blogController.js'
import singleUpload from '../middlewares/multer.js'
const router = express()

router.post('/create',authMiddleware,isAdmin,singleUpload,createBlog)
router.get('/stats', authMiddleware,isAdmin,getBlogStats);
router.get('/allblogs', getAllBlogs)
router.get('/single/blog/:id', getSingleBlog)
router.put('/update/:id', authMiddleware,isAdmin,singleUpload ,updateBlog)
router.delete('/delete/:id', authMiddleware,isAdmin,deleteBlog)


export default router