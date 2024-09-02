import { BiTrendingUp } from "react-icons/bi";
import { FaArrowUpLong } from "react-icons/fa6";
import LineChartContainer from "./LineChartContainer.jsx";

const Analytics = () => {
  return (
    <div className=" ml-32 font-poppins" >
      <h1 className=" text-4xl font-semibold" >Analytics</h1>
      <div className=" flex flex-col gap-y-5 mt-20 absolute items-center md:flex md:flex-row  md:gap-16" >
      <div className="card bg-base-100 w-52 border  border-neutral-700/80 shadow-lg rounded-md">
  <div className="card-body">
     <p className="">Users</p>
     <div className=" flex space-x-3" >
   
    <h2 className="card-title">100</h2>
    <div>
    <BiTrendingUp size={'20'} color="green" />
    </div>
     </div>
     <p>Total Users</p>
  </div>
</div>
      <div className="card bg-base-100 w-52 border  border-neutral-700/80 shadow-lg rounded-md">
  <div className="card-body">
     <p className="">Blogs</p>
     <div className=" flex space-x-3" >
   
    <h2 className="card-title">50</h2>
    <div>
    <FaArrowUpLong size={'20'} color="green" />
    </div>
     </div>
     <p>All Blogs</p>
  </div>
</div>
      <div className="card bg-base-100 w-52 border  border-neutral-700/80 shadow-lg rounded-md">
  <div className="card-body">
     <p className="">Comments</p>
     <div className=" flex space-x-3" >
   
    <h2 className="card-title">20</h2>
    <div>
    <FaArrowUpLong size={'20'} color="green" />
    </div>
     </div>
     <p>Total Comments</p>
  </div>
</div>

      </div>
      <div className=" md:mt-80 md:static absolute left-5  mt-[40rem]  md:h-[400px]   h-[200px]" >
  <LineChartContainer/>
</div>
    </div>
  )
}

export default Analytics