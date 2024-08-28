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
    const { category, search='' } = req.query
    const query ={
      title:{$regex:search, $options:'i'}
    }
    if(category){
      query.category = category;
    }
    const blogs = await blogModel.find(query)
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
  }
}



export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id 
    const { title, content, category } = req.body;
    const file = req?.file;
    const myBlog = await blogModel.findOne({_id:id, author:userId});
    if (!myBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (title) myBlog.title = title;
    if (content) myBlog.content = content;
    if (category) myBlog.category = category;

    if (file) {
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      
      await cloudinary.v2.uploader.destroy(myBlog.image.public_id);
      
      myBlog.image = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }

    await myBlog.save();

    res.status(200).json({
      message: 'Post Updated Successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id 
    const myBlog = await blogModel.findOne({_id:id, author:userId});
    if (!myBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await cloudinary.v2.uploader.destroy(myBlog.image.public_id);
    
    await myBlog.deleteOne()

    res.status(200).json({
      message: 'Post Deleted Successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


