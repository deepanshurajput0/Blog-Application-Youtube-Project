import { useEffect } from "react";
import { getBlogsFail, getBlogsSuccess ,getBlogsStart } from '../redux/blogSlice/blogSlice'
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllBlogs = () => {

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

const handleDelete =async(id)=>{
  try {
    const res = await fetch(`/api/v1/delete/${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(getBlogsSuccess(blog.filter(blogs => blogs._id !== id)));
        toast.success(data.message);
    } else {
        toast.error(data.message);
    }
} catch (error) {
    toast.error(error.message);
}
}

useEffect(()=>{
  getAllBlogs()
},[])

  return (
    <div className=" mt-16 flex flex-col gap-y-14 items-center md:flex md:flex-row md:justify-evenly md:flex-wrap" >
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
                   <Link to={`/dashboard/edit/${item._id}`} >
                   <MdOutlineEdit className="cursor-pointer" size={20} />
                   </Link>
                  </button>
                  <button onClick={()=>handleDelete(item._id)} className="btn cursor-pointer btn-primary rounded-lg">
                    <RiDeleteBinLine className="cursor-pointer"  />
                  </button>
                </div>
              </div>
              </div>
            ))
          }
    </div>
  )
}

export default AllBlogs


