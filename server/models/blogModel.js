import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        required:true,
    },
    publishedAt:{
        type:Date,
        default:Date.now
    }
})

const blogModel = mongoose.model('blog',blogSchema)

export default blogModel




