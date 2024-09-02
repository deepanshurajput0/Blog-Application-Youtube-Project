import express from 'express'
import { login, regsiter, logout, getMyProfile, getAllUsers } from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
const router = express()

router.post('/register',regsiter)

router.get('/allusers', authMiddleware, isAdmin ,getAllUsers)

router.post('/login',  login)

router.get('/me',authMiddleware,getMyProfile)

router.get('/logout' , logout)

export default router