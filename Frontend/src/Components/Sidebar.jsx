import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Menu,
  Search,
  ChevronLeft,
  LogOut,
  ArrowLeft,
  Fuel
} from "lucide-react";

import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sidebarData from "../Data/sidebarData";
import toast from "react-hot-toast";


export default function Sidebar() {
  const [collapse, setCollapse] = useState(true);
const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const handleLogout =()=>{
        localStorage.removeItem("user");

        localStorage.removeItem("token");
        toast.success("Logout Successful") 
        navigate("/login");
    }
  return (
    <motion.div
      animate={{
        width: collapse ? 85 : 290,
      }}
      transition={{ duration: .3 }}
      className="h-screen bg-slate-900 border-r border-slate-800 flex flex-col"
    >
      {/* Logo */}
      
      <div className="flex items-center justify-between px-5 py-4 border border-green-600 pb-5 border-l-0 border-r-0 border-t-0 mb-4">

        {!collapse && (
         <div className="flex flex-col">
  <h1
    onClick={() => navigate("/")}
    className="text-xl font-bold cursor-pointer w-[180px]"
  >

    {user ? (
     <div className="px-1 ">
      <div className="rounded-2xl flex items-center gap-3 border border-green-500 border-l-0 border-r-0 border-t-0 p-2">
            <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-12 h-12 rounded-full"
            />

            {!collapse && (
            <div>
                <h2 className="text-white font-semibold text-[16px] ">
                          {user.fullName.split(" ")[0]}_{user.fullName.split(" ")[2]}  
                </h2>
                <p className="text-slate-400 text-sm">
                    {user.role}
                </p>
            </div>
            )}
        </div>
        </div>

        ) : ( 
           <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Fuel className="w-7 h-7 text-green-500" />
          <span className="text-black dark:text-white cursor-pointer" onClick={() => navigate("/")}>
            BookMy<span className="text-green-500">CNG</span>
          </span>
        </h1>
        )}
    </h1>

    <p className="mt-1 text-[12px] text-slate-400 leading-4 w-[170px] ">
        {user
        ? ""
        : "Sign in to reserve slots and skip the queue."}
    </p>
    </div>
        )}
        <button
        onClick={() => setCollapse(!collapse)}
        className="
            w-11 h-11
            flex items-center justify-center
            rounded-full
            bg-gradient-to-r from-green-700 to-green-500
            text-white
            shadow-lg shadow-green-500/30
            hover:scale-110
            hover:shadow-xl hover:shadow-green-500/50
            active:scale-95
            transition-all duration-300
        "
        >
        {collapse ? <Menu size={20} /> : <ArrowLeft size={20} />}
        </button>

      </div>

   

     

      {/* Menus */}

     <div className="mt-2 flex-1 px-3">
  {sidebarData
  .filter((item) => {
      // 1. Get the current role from your user object
      // If no user exists, role is 'guest'
      const userRole = user ? user.role : 'guest'; 
      
      // 2. Check if the current item is allowed for this role
      return item.roles.includes(userRole);
    })
  .map((item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.title}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center justify-between rounded-xl px-5 py-3 mb-2 transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-green-800 to-green-500 text-white shadow-lg shadow-green-500/20"
              : "text-slate-300 hover:bg-slate-800"
          }`
        }
      >
        <div className="flex items-center gap-3">
          <Icon size={22} />
          {!collapse && <span>{item.title}</span>}
        </div>
{/* 
        {!collapse && item.badge && (
          <span className="bg-red-600 text-white-600 text-xs px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )} */}
      </NavLink>
    );
  })}
</div>
{!user?(<Link
  to="/login"
  className="
    mx-5 mt-4
    flex items-center justify-center gap-2
    py-3
    rounded-xl
    bg-gradient-to-r from-green-500 to-emerald-600
    text-white font-semibold
    hover:scale-[1.03]
    transition-all duration-300
    shadow-lg shadow-green-500/30
    mb-4
  "
>
  <LogIn size={18} />
  {!collapse && <span>Login</span>}
</Link>):(
    <></>
)}
      {/* Logout */}

      {user && (
  <div className="p-4">
    <button
        onClick={handleLogout}
      className="w-full p-3 flex items-center justify-center gap-3 rounded-xl bg-slate-800 hover:bg-black hover:text-red-700 text-red-600 font-bold transition-colors"
    >
      <LogOut size={20} />
      {!collapse && "Logout"}
    </button>
  </div>
)}

    </motion.div>
  );
}