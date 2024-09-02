import { BiTrendingUp } from "react-icons/bi";

const Analytics = () => {
  return (
    <div className=" ml-32 font-poppins" >
      <h1 className=" text-4xl font-semibold" >Analytics</h1>
      <div className=" " >
      <div className="card bg-base-100 w-52 border  border-neutral-700/80 shadow-lg rounded-md">
  <div className="card-body">
     <p className="">Users</p>
     <div className=" flex space-x-3" >
    <div>
    <BiTrendingUp color="green" />
    </div>
    <h2 className="card-title">100</h2>
     </div>
     <p>Total Users</p>
  </div>
</div>
      </div>
    </div>
  )
}

export default Analytics