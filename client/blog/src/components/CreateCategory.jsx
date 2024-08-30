import { useState } from "react"
import { createCategoryFail, createCategorySuccess, createCategoryStart } from "../redux/categorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
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
      }
    } catch (error) {
      dispatch(createCategoryFail(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className=" w-[400px] mt-20 " >
          <form onSubmit={submitHandler} className="card-body">
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
    </div>
  )
}

export default CreateCategory