import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      {/* Sidebar - fixed on desktop */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 hidden lg:block">
        <Sidebar />
      </div>

      {/* Topbar - fixed */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white z-30 border-b border-gray-200 lg:pl-64">
        <Topbar />
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 min-h-screen lg:pl-64">
        <main className="pt-20 px-4 pb-10"> {/* ← padding top ensures map is pushed below Topbar */}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
