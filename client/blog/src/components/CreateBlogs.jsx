import { useEffect, useState } from "react";
import { createBlogStart, createBlogSuccess, createBlogFail } from "../redux/blogSlice/blogSlice";
import { getCategoryStart, getCategorySuccess, getCategoryFail } from "../redux/categorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [category, setCategory] = useState("");
   const dispatch = useDispatch()
   const {  loading } = useSelector((state)=>state.blog)
   const { user } = useSelector((state)=>state.user)
   const  { categories } = useSelector((state)=>state.category)  
   const  changeImageHandler =(e)=>{
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onloadend =()=>{
        setImagePrev(reader.result)
        setImage(file)
      }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData()
    myForm.append('title',title)
    myForm.append('content', content)
    myForm.append('file', image)
    myForm.append('category', category)
    myForm.append('author', user._id)
    try {
      dispatch(createBlogStart());
      const res = await fetch("/api/v1/create", {
        method: "POST",
        body: myForm,
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(createBlogFail(data.message));
        toast.error(data.message);
      } else {
        dispatch(createBlogSuccess(data));
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(createBlogFail(error.message));
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

useEffect(()=>{
  getAllCategories()
},[])
  return (
    <div>
      <div>
        <h1 className=" text-center text-4xl font-poppins font-bold mt-20" >Create Your Blogs </h1>
      </div>

      <div className=" z-[-10]">
        <div>
          <div className="">
            <form onSubmit={submitHandler} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  name="title"
                  onChange={(e)=>setTitle(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div>
                {
                    imagePrev && (
                        <img src={imagePrev} />
                    )
                }
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Image</span>
                </label>
                <input type="file" 
                onChange={changeImageHandler} 
                className="file-input w-full max-w-xs" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-40"
                  placeholder="Content"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                  name="content"
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="select w-full max-w-xs">
                  <option disabled selected>
                    Select Your Category
                  </option>
                  {
                    categories?.map(item=>(
                      <option key={item._id} value={item.category} >{item.category} </option>
                    ))
                   }
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {
                    loading ? <span className="loading loading-spinner loading-xs"></span> : <>
                    Create Blog
                    </>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogs;
