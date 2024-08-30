import { useState } from "react"
import { createCategoryFail, createCategorySuccess, createCategoryStart } from "../redux/categorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [category,setCategory] = useState('')
  const dispatch = useDispatch()
  const { loading } = useSelector((state)=>state.category)
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
        setCategory('')
      }
    } catch (error) {
      dispatch(createCategoryFail(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className=" mt-20 flex flex-col " >
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
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Categories</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td className=" ml-10" >
          <RiDeleteBin5Line size={20} />
        </td>
      </tr>
      {/* row 2 */}
    </tbody>
  </table>
</div>

       </div>
    </div>
  )
}

export default CreateCategory