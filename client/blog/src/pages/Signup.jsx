import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div>
        <div className="hero font-poppins mt-10 bg-black min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register Now</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          <input type="text" placeholder="username" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-primary">
            Register
          </button>
          <p className=" text-[15px] mt-5 text-center" >
            Already have an account  ? <Link to={'/login'} >Login Now</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default Signup