import blogModel from "../models/blogModel.js";
import cloudinary from 'cloudinary'
import getDataUri from "../utils/dataUri.js";
export const createBlog=async(req,res)=>{
  try {
    const { title, content, category  } = req.body;
    const file = req.file
    const fileUri = getDataUri(file)
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)
    await blogModel.create({
        title,
        image:{
          public_id:mycloud.public_id,
          url:mycloud.secure_url
        },
        content,
        category,
        author:req.user._id,

    })
    res.status(200).json({
      message:'Post created Successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
  }
}


export const getAllBlogs=async(req,res)=>{
  try {
    const blogs = await blogModel.find({})
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
  }
}


