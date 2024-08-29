import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
const Navbar = () => {
    const [nav, setNav] = useState(true)
    const { user } = useSelector((state)=>state.user)
  return (
    <nav className=" font-poppins fixed top-0 left-0 w-full z-50 bg-white/3 backdrop-blur-lg border-b border-neutral-700/80 shadow-lg  h-16 ">
    <div className=" flex justify-between mx-5 mt-5 " >
        <Link to={'/'} >
        <div className=" flex items-center space-x-4">
          <FaCode size={30} />
          <h1 className=" font-semibold text-[20px]" >Tech</h1>
        </div>
        </Link>
        <div className=" cursor-pointer md:hidden" onClick={()=>setNav(!nav)} >
            {
                nav ?   <IoMenu size={30} /> :    <RxCross2 size={30} />
            }
        </div>
       {
        !nav ?   <div className=" md:hidden cursor-pointer absolute w-full flex flex-col items-center text-center mt-8 bg-black">
        <ul className=" space-y-24 h-[800px] mt-20 " >
            <li>
                <Link>Blogs</Link>
            </li>
            <li>
                <Link>About</Link>
            </li>
            <li>
                <Link>Contact Us</Link>
            </li>
            <li>
            {
                      user ? <Link to={'/logout'} >
                      <button className="bg-white text-black h-10 w-32 rounded-3xl font-semibold transition-transform duration-300 transform hover:scale-105">
                 Logout
               </button>
                      </Link>  :      <Link to={'/login'} >
                      <button className="bg-white text-black h-10 w-32 rounded-3xl font-semibold transition-transform duration-300 transform hover:scale-105">
                 Login
               </button>
                      </Link>
            }
            </li>
        </ul>
    </div>  : null
       }

<div className=" hidden md:flex">
        <ul className=" flex space-x-16 items-center" >
            <li>
                <Link>Blogs</Link>
            </li>
            <li>
                <Link>About</Link>
            </li>
            <li>
                <Link>Contact Us</Link>
            </li>
            <li>
        {
            user ? <Link to={'/logout'} >
            <button className="bg-white text-black h-10 w-32 rounded-3xl font-semibold transition-transform duration-300 transform hover:scale-105">
       Logout
     </button>
            </Link>  :      <Link to={'/login'} >
            <button className="bg-white text-black h-10 w-32 rounded-3xl font-semibold transition-transform duration-300 transform hover:scale-105">
       Login
     </button>
            </Link>
        }

            </li>
        </ul>
    </div>
    </div>
  </nav>
  )
}

export default Navbar

