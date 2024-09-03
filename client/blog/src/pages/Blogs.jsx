import { useDispatch, useSelector } from "react-redux"
import { getBlogsFail, getBlogsSuccess, getBlogsStart } from "../redux/blogSlice/blogSlice"
import toast from "react-hot-toast"
import { getCategoryFail, getCategorySuccess, getCategoryStart } from "../redux/categorySlice/categorySlice"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IoMdSearch } from "react-icons/io";
const Blogs = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const { blog } = useSelector((state)=>state.blog)
const getAllBlogs =async(category)=>{
  try {
   dispatch(getBlogsStart());
   const res = await fetch(`/api/v1/allblogs?search=${search}?category=${category}`, {
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

const getAllCategories =async()=>{
    try {
     dispatch(getCategoryStart());
     const res = await fetch("/api/v1/get/categories", {
       method: "GET",
       credentials:'include'
     });
     const data = await res.json();
     if (!res.ok) {
       dispatch(getCategoryFail(data.message));
       toast.error(data.message);
     } else {
       dispatch(getCategorySuccess(data));
       
       setCategories(data)
     }
   } catch (error) {
     dispatch(getCategoryFail(error.message));
     toast.error(error.message);
   }
}

useEffect(()=>{
  getAllBlogs()
  getAllCategories()
},[search])
  return (
    <div className=" mt-16" >
        <div className=" flex items-center space-x-5 justify-center pt-20" >
        <input 
        type="text" 
        placeholder="Type here"
        onChange={(e)=>setSearch(e.target.value)} 
        value={search}
        className="input input-bordered w-full max-w-xs" />
        <IoMdSearch size={25}  />
        </div>
        <div>
            <div className=" flex items-center justify-center space-x-10 mt-10 overflow-scroll" >
                <p>All Categories</p>
              {
                    categories?.map((item)=>(
                        <button onClick={()=>getAllBlogs(item?.category)} key={item._id} className="btn">{item?.category}</button>
                    ))
                }
            </div>
        </div>
        <div className="blogs mt-10 flex flex-col items-center gap-y-10 md:flex md:flex-row md:justify-evenly flex-wrap">
         {
          blog.map((item)=>(
            <div key={item._id} className="card  card-compact bg-[#0C090A] w-80 shadow-xl font-poppins rounded-lg">
            <figure>
              <img className=""
                src={item?.image?.url}
                alt="img" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.title}</h2>
              <p>{item?.content.substring(0,300)}....</p>
              <div className="card-actions justify-end">
               <Link to={`/blogdetail/${item._id}`} >
               <button className="btn  btn-primary rounded-lg">
                  Read More
                </button>
               </Link>
              </div>
            </div>
            </div>
          ))
         }
        </div>
    </div>
  )
}

export default Blogs