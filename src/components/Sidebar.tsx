import React, { useState } from "react";
import {
  Shield,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const auth = useAuth();
  const location = useLocation();

  // ✅ Prevent render until auth is fully loaded
  if (!auth || !auth.user) return null;

  const { user } = auth;
  const isAdmin = user.role === "admin";

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    Admin: true,
    Guarding: true,
    Reports: true,
  });

  const toggleMenu = (section: string) => {
    setOpenMenus((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarSection = ({
    title,
    icon,
    sectionKey,
    items,
  }: {
    title: string;
    icon: JSX.Element;
    sectionKey: string;
    items: { name: string; to: string }[];
  }) => (
    <div className="mb-3">
      <div
        className="flex items-center justify-between cursor-pointer text-white px-4 py-2 hover:bg-blue-800 rounded-md"
        onClick={() => toggleMenu(sectionKey)}
      >
        <div className="flex items-center gap-2 font-semibold uppercase text-sm">
          {icon}
          {title}
        </div>
        {openMenus[sectionKey] ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )}
      </div>
      {openMenus[sectionKey] && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-2 py-1 rounded-md text-sm ${
                isActive(item.to)
                  ? "bg-blue-700 text-white font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-blue-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#0A1128] text-white h-screen w-64 flex flex-col justify-between py-6 shadow-lg">
      <div className="px-4">
        <div className="text-xl font-bold mb-6 tracking-wide">Ultraguard</div>

        {isAdmin && (
  <SidebarSection
    title="Admin"
    icon={<Settings size={18} />}
    sectionKey="Admin"
    items={[
      { name: "Devices", to: "/devices" },
      { name: "Upload Devices", to: "/admin/upload-devices" },
      { name: "System Settings", to: "/settings" },
      { name: "Add Client", to: "/admin/add-client" },
    ]}
  />
)}


        {/* 🔄 Shared: Guarding */}
        <SidebarSection
          title="Guarding"
          icon={<Shield size={18} />}
          sectionKey="Guarding"
          items={[
            { name: "Sites", to: "/sites" },
            { name: "Waypoints", to: "/waypoints" },
            { name: "Shifts", to: "/shifts" },
            ...(isAdmin
              ? [{ name: "Devices", to: "/devices" }]
              : []), // Only admins see this device link again
          ]}
        />

        {/* 📊 Shared: Reports */}
        <SidebarSection
          title="Reports"
          icon={<FileText size={18} />}
          sectionKey="Reports"
          items={[
            { name: "Upload CSV", to: "/upload" },
            { name: "Summary", to: "/reports" },
          ]}
        />
      </div>

      <div className="px-4 space-y-2">
        <Link
          to="/switch-account"
          className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm"
        >
          <User size={16} />
          Switch Account
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center w-full gap-2 text-gray-300 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
