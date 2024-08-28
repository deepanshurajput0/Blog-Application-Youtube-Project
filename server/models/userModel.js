import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

userSchema.methods.getJwtToken= function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
}

const userModel = mongoose.model('User',userSchema)

export default userModel

