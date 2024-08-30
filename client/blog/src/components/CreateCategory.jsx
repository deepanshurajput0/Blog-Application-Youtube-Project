import { useEffect, useState } from "react"
import { createCategoryFail, createCategorySuccess, createCategoryStart, getCategoryFail, getCategorySuccess, getCategoryStart } from "../redux/categorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [category,setCategory] = useState('')
  const dispatch = useDispatch()
  const { loading, categories } = useSelector((state)=>state.category)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(createCategoryStart());
      const res = await fetch("/api/v1/create/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({category}),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(createCategoryFail(data.message));
        toast.error(data.message);
      } else {
        dispatch(createCategorySuccess(data));
        toast.success(data.message);
        getAllCategories()
        setCategory('')
      }
    } catch (error) {
      dispatch(createCategoryFail(error.message));
      toast.error(error.message);
    }
  };
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
          
          setCategory('')
        }
      } catch (error) {
        dispatch(getCategoryFail(error.message));
        toast.error(error.message);
      }
   }

   const handleDelete=async(id)=>{
     try { 
      const res = await fetch(`/api/v1/remove/category/${id}`,{
        method:'DELETE'
      });

      const data = await res.json()
      if(res.ok){
        dispatch(getCategorySuccess(categories.filter(category=>category._id !== id)))
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
      
     } catch (error) {
      toast.error(error.message);
     }
   }
   useEffect(()=>{
    getAllCategories()
   },[])
  return (
    <div className=" mt-20 flex flex-col md:flex md:flex-row md:justify-evenly " >
          <form onSubmit={submitHandler} className=" w-[400px]">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  name="category"
                  onChange={(e)=>setCategory(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {
                    loading ? <span className="loading loading-spinner loading-xs"></span> : <>
                    Create Category
                    </>
                  }
                </button>
              </div>
              </form>

       <div className=" mt-10" >
        <h1 className=" text-3xl font-semibold  text-center font-poppins" > All Categories  </h1>
        <div className="overflow-x-auto mt-10">
        <table  className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Categories</th>
            <th>Remove</th>
          </tr>
        </thead>
        {
      categories?.map((item,i)=>(
        <tbody key={item._id} >
        {/* row 1 */}
        <tr>
          <th>{i}</th>
          <td>{item?.category}</td>
          <td onClick={()=>handleDelete(item._id)} className=" cursor-pointer ml-10" >
            <RiDeleteBin5Line size={20} />
          </td>
        </tr>
        {/* row 2 */}
      </tbody>
      ))
     }
      </table>
   


</div>

       </div>
    </div>
  )
}

export default CreateCategory