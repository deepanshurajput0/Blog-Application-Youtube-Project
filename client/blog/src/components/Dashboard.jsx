// DashboardLayout.jsx
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex mt-24">
      {/* Menu Icon */}
      <div
        onClick={() => setToggle(!toggle)}
        className="bg-white inline-block rounded-full h-[50px] w-[50px] p-2 ml-10 cursor-pointer"
      >
        <BiMenuAltRight color="black" size={30} />
      </div>

      {/* Sidebar */}
      {toggle && (
        <div className="h-screen absolute top-14 bg-[#0C090A] text-white w-64 px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard/blogs"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
                onClick={() => setToggle(false)} 
              >
                <span className="material-icons-outlined">article</span>
                <span className="ml-2">All Blogs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/create-blog"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
                onClick={() => setToggle(false)} 
              >
                <span className="material-icons-outlined">edit</span>
                <span className="ml-2">Create Blog</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/create-category"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
                onClick={() => setToggle(false)} 
              >
                <span className="material-icons-outlined">category</span>
                <span className="ml-2">Create Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/analytics"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
                onClick={() => setToggle(false)} 
              >
                <span className="material-icons-outlined">analytics</span>
                <span className="ml-2">Analytics</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
