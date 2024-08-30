import userModel from '../models/userModel.js'
import { sendToken } from '../utils/sendToken.js'
import bcrypt from 'bcryptjs'
export const regsiter=async(req,res)=>{
    try {
       const { username, email, password } = req.body
       if( !username || !email || !password){
          return res.status(400).json({
              message:"All Fields are required"
          })
       }        
       const existingUser = await userModel.findOne({email})
       if(existingUser){
          return res.status(401).json({
              message:"User Already exists"
          })
       }
       const hashedPassword = await bcrypt.hash(password,10)

       const user = await userModel.create({
          username,
          email,
          password:hashedPassword,
       })
      sendToken(res,user,'User Registered Successfully',201) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}


export const login = async(req,res)=>{
    try {
     const { email ,password } = req.body
     if(!email || !password){
       return res.status(400).json({
         message:'All fields are required'
       })  
     }
     const user = await userModel.findOne({email})
     if(!user){
         return res.status(401).json({
             message:'Invalid email & password'
           })  
          }
     const comparePassword = await bcrypt.compare(password,user.password)
     if(!comparePassword){
      return res.status(401).json({
        message:'Invalid email & password'
      })  
     }
    sendToken(res,user,`Welcome back ${user.username}`,201)
    } catch (error) {
     console.log(error)
     res.status(500).json({
         message:"Internal Server error"
     })
    }
 }
 


export const getMyProfile=async(req,res)=>{
    try {
     const currentUser = await userModel.findById(req.user._id)
     res.status(200).json(currentUser)       
    } catch (error) {
        console.log(error)
    }
}

export const logout=async(req,res)=>{
    try {
      res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:'none'
      }).json(
        {   success:true,
            message:"Logout Successfully"
         }
     )   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}



