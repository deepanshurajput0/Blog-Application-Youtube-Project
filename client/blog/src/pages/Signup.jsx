import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerStart, registerSuccess, registerFail } from "../redux/userSlice/userSlice";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const { loading } = useSelector((state)=>state.user)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerStart());
      const res = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(registerFail(data.message));
        toast.error(data.message);
      } else {
        dispatch(registerSuccess(data));
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(registerFail(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="hero font-poppins mt-10 bg-black min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={submitHandler} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  value={user.username}
                  onChange={handleChange}
                  name="username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  value={user.email}
                  onChange={handleChange}
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-primary">
                  {
                    loading ? <span className="loading loading-spinner loading-xs"></span> : <>
                    Register
                    </>
                  }
                </button>
                <p className=" text-[15px] mt-5 text-center">
                  Already have an account ? <Link to={"/login"}>Login Now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
