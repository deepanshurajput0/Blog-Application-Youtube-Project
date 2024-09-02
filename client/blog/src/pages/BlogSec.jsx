import { useDispatch, useSelector } from "react-redux"
import { getBlogsFail, getBlogsSuccess, getBlogsStart } from "../redux/blogSlice/blogSlice"
import toast from "react-hot-toast"
import { useEffect } from "react"
const BlogSec = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector((state)=>state.blog)
const getAllBlogs =async()=>{
  try {
   dispatch(getBlogsStart());
   const res = await fetch("/api/v1/allblogs", {
     method: "GET",
     credentials:'include'
   });
   const data = await res.json();
   if (!res.ok) {
     dispatch(getBlogsFail(data.message));
     toast.error(data.message);
   } else {
     dispatch(getBlogsSuccess(data));
     
   }
 } catch (error) {
   dispatch(getBlogsFail(error.message));
   toast.error(error.message);
 }
}

useEffect(()=>{
  getAllBlogs()
},[])
  return (
    <div className=" mt-16" >
        <h1 className=" text-4xl font-poppins font-bold text-center mt-9" > My Blogs </h1>
        <div className="blogs mt-10 flex flex-col items-center gap-y-10 md:flex md:flex-row md:justify-evenly flex-wrap">
         {
          blog.map((item)=>(
            <div key={item._id} className="card  card-compact bg-[#0C090A] w-80 shadow-xl font-poppins">
            <figure>
              <img className=""
                src={item?.image?.url}
                alt="img" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.title}</h2>
              <p>{item?.content.substring(0,300)}....</p>
              <div className="card-actions justify-end">
                <button className="btn  btn-primary rounded-lg">
                  Read More
                </button>
              </div>
            </div>
            </div>
          ))
         }
        </div>
    </div>
  )
}

export default BlogSec