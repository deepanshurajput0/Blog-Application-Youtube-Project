import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const authMiddleware =async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token) return res.status(400).json({
            message:'Unauthorised user'
        })
       const decoded = jwt.verify(token,process.env.JWT_SECRET)
       if(!decoded){
        return res.status(401).json({
            message:'Invalid Token'
        })
       }
       req.user = await userModel.findById(decoded._id)
      next()
    } catch (error) {
        return res.status(401).json({
            message:'Internal Server Error'
        })
    }
}


export const isAdmin =(req,res,next)=>{
    if (!req.user || req.user.role !== 'admin') {
        return res.status(400).json({
            message: `${req.user ? req.user.role : 'undefined role'} is not allowed to access this resource`
        });
    }
    next();
}


