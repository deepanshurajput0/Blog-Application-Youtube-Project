
const CreateBlogs = () => {
  return (
    <div>
        <div>
            <h1>Create Your Blogs </h1>
        </div>

        <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="Title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Image</span>
          </label>
          <input type="file" className="file-input w-full max-w-xs" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea className="textarea textarea-bordered" placeholder="Content"></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select className="select w-full max-w-xs">
            <option disabled selected>Select Your Category</option>
            <option>Tech</option>
            <option>Travels</option>
            <option>Food</option>
            <option>Sports & Entertainment</option>
</select>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create Blog</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default CreateBlogs