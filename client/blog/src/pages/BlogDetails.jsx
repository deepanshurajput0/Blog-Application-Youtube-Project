import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const BlogDetails = () => {
  const [blogData, setBlogData] = useState(null)
  const { id } = useParams()
  const getSingleBlog =async()=>{
    try {
     const res = await fetch(`/api/v1/single/blog/${id}`, {
       method: "GET",
       credentials:'include'
     });
     const data = await res.json();
     if (!res.ok) {
       toast.error(data.message);
     } else {
       setBlogData(data)
     }
   } catch (error) {
     toast.error(error.message);
   }
  }
  
  useEffect(()=>{
    getSingleBlog()
  },[])
  return (
    <div className=" font-poppins p-5 mt-24 space-y-10">
        <div>
            <h1 className=" text-3xl font-bold" >{blogData?.title}</h1>
        </div>
        <img className=" md:h-[500px] " src={blogData?.image?.url} alt="" />

        <div className=" flex items-center gap-3" >
        <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full p-2 pl-4">
    <span className="text-[15px]">D</span>
  </div> 
    <h2 className=" font-semibold" >Created By - Deepanshu</h2>
        </div>
        <p>
            {blogData?.content}
        </p>
    </div>
  )
}

export default BlogDetails