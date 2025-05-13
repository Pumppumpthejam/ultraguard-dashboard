import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import RequireAuth from "./RequireAuth";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <RequireAuth>
      <div className="bg-gray-950 text-white min-h-screen flex flex-col">

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity lg:hidden ${
            isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        >
          <div
            className={`absolute left-0 top-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-40 hidden lg:block">
          <Sidebar />
        </div>

        {/* Topbar */}
        <div className="fixed top-0 left-0 w-full h-16 bg-gray-900 border-b border-gray-700 z-30 lg:pl-64">
          <Topbar onMenuClick={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className="flex-1 pt-20 pb-10 px-4 lg:pl-64 overflow-auto">
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
};

export default Layout;
