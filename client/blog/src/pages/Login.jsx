import { Link } from "react-router-dom";
import { useState } from "react";
import { loginFail, loginStart, loginSuccess } from "../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const Login = () => {
  const [user, setUser] = useState({
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
      dispatch(loginStart());
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(loginFail(data.message));
        toast.error(data.message);
      } else {
        dispatch(loginSuccess(data));
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(loginFail(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="hero font-poppins mt-10 bg-black min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login Now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={submitHandler} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
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
                  name="password"
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-primary">
                  {
                    loading ? <span className="loading loading-spinner loading-xs"></span> : <>
                    Login
                    </>
                  }
                </button>
                <p className=" text-[15px] mt-5 text-center">
                  Dont have an account ?{" "}
                  <Link to={"/signup"}>Register Now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
