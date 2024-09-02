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
    const { category, search='', page=1 } = req.query
    const limit = 6
    const query ={
      title:{$regex:search, $options:'i'}
    }
    const skip =(page -1 ) * limit
    if(category){
      query.category = category;
    }
    const blogs = await blogModel.find(query).skip(skip).limit(limit)
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
  }
}


export const getSingleBlog=async(req,res)=>{
  try {
    const { id } = req.params
    const blog = await blogModel.findById(id)
    res.status(200).json(blog)
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



// Controller to get blog statistics (blogs posted per month)
export const getBlogStats = async (req, res) => {
  try {
    const stats = await blogModel.aggregate([
      {
        // Group blogs by year and month of the publishedAt date
        $group: {
          _id: {
            year: { $year: "$publishedAt" },
            month: { $month: "$publishedAt" },
          },
          totalBlogs: { $sum: 1 }, // Count the number of blogs per group
        },
      },
      {
        // Sort results by year and month
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        // Format the response with month and year labels
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalBlogs: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const getAllBlogsByAdmin =async(req,res)=>{
  try {
    const allbogs = await blogModel.find({})
    res.status(200).json(allbogs)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}