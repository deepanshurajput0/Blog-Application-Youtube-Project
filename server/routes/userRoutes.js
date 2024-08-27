import express from 'express'
import { login, regsiter, logout, getMyProfile } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = express()

router.post('/register',regsiter)

router.post('/login',  login)

router.get('/myprofile',authMiddleware,getMyProfile)

router.get('/logout' , logout)

export default router