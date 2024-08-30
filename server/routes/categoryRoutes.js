import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createCategory, deleteCategory, getAllCategories } from '../controllers/categoryController.js'
const router = express()

router.post('/create/category',authMiddleware,createCategory)

router.post('/get/categories',authMiddleware,getAllCategories)

router.post('/remove/category/:id',authMiddleware, deleteCategory)


export default router