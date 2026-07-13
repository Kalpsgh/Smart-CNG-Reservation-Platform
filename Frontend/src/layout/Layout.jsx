import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>

      </div>

    </div>
  );
}