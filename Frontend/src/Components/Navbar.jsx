import { useEffect, useState } from "react";
import {
  Bell,
  Sun,
  Settings,
  LogIn,
  Fuel,
  Moon
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
const getHomePath = () => {
  if (!user) return "/";
  if (user.role === "admin") return "/admin-dashboard";
  if (user.role === "owner") return "/ownerDashboard"; // Or wherever they should go
  return "/";
};
  return (
    <header className="h-16 px-8 flex items-center justify-between shadow-lg bg-gray-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Fuel className="w-7 h-7 text-green-500" />
         <span 
            className="text-black dark:text-white cursor-pointer font-bold text-xl" 
            onClick={() => navigate(getHomePath())}
          >
            BookMy<span className="text-green-500">CNG</span>
          </span>
        </h1>
        
        {/* Navigation Buttons */}
        {user?(
            <nav className="hidden md:flex items-center gap-4 text-sm font-semibold pt-1">
          <Link to="/about" className="px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            How it works
          </Link>
          <Link to="/contact" className="px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Contact Us
          </Link>
        </nav>
    ):(<></>)}
        
      </div>

      {/* Right: Tools & Auth */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell className="text-slate-900 dark:text-white" size={22} />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button>
          <Settings size={21} className="text-slate-900 dark:text-white" />
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              className="w-11 h-11 rounded-full border-2 border-green-400"
              alt="Profile"
            />
            <div className="hidden md:block">
              <h3 className="font-semibold">{user.fullName.split(" ")[0]}</h3>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-2 px-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-green-500/30"
          >
            <LogIn size={18} /> Join us
          </Link>
        )}
      </div>
    </header>
  );
}