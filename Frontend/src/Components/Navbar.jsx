import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Sun,
  Settings,
  UserCircle,
  LogIn,
  UserPlus,
  Fuel,
  Moon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

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
  return (
<header className="h-15 px-8 flex items-center justify-between shadow-lg
bg-gray-100 dark:bg-slate-900
border-b border-slate-200 dark:border-slate-800
text-slate-900 dark:text-white">
      {/* Left */}

      <div>

        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
                <Fuel className="w-7 h-7 text-green-500" />
                <span className="text-black dark:text-white cursor-pointer" onClick={() => navigate("/")}>
                    BookMy<span className="text-green-500">CNG</span>
                </span>
        </h1>

      </div>

      {/* Search */}

    

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell
            className="text-black-900 dark:text-white"
            size={22}
          />

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

          <Settings
            size={21}
            className="text-black-900 dark:text-white"
          />

        </button>

       {
  user ? (

    <div className="flex items-center gap-3">

      <img
        src="https://i.pravatar.cc/100"
        className="w-11 h-11 rounded-full border-2 border-green-400"
        alt="Profile"
      />

      <div className="hidden md:block">

        <h3 className="font-semibold text-slate-800">
          {user.name}
        </h3>

        <p className="text-xs text-slate-500">
          User
        </p>

      </div>

    </div>

  ) : (

    <div className="flex items-center gap-3">

      <Link
        to="/login"
 className="
    w-full min-w-[100px]
    flex
    items-center
    justify-center
    gap-3
    py-2
    rounded-2xl
    bg-gradient-to-r
    from-green-500
    to-emerald-600
    text-white
    font-semibold
    hover:scale-[1.03]
    transition-all
    duration-300
    shadow-lg
    shadow-green-500/30
  "
      >
            <LogIn size={20} />Join us
      </Link>

   

    </div>

  )
}

      </div>

    </header>
  );
}