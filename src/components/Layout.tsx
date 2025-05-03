import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar (absolute on mobile, static on desktop) */}
      <Sidebar />

      {/* Content area with padding on large screens to avoid being under sidebar */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
