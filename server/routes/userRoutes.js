import express from 'express'
import { login, regsiter, logout } from '../controllers/userController.js'

const router = express()

router.post('/register',regsiter)


router.post('/login',  login)

router.get('/logout' , logout)

export default router