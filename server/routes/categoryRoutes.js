import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createCategory } from '../controllers/categoryController.js'
const router = express()

router.post('/create/category',authMiddleware,createCategory)


export default router