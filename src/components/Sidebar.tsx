import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Building2,
  Clock,
  FileText,
  LogOut,
  UserPlus,
  SwitchCamera,
  Menu
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // toggle for mobile

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-700 text-white"
        : "text-gray-300 hover:bg-blue-600"
    }`;

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ULTRAGUARD</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-64 bg-gray-900 text-white flex flex-col justify-between p-4 fixed lg:static z-50 h-screen`}
      >
        <div>
          <h1 className="text-2xl font-bold mb-6 hidden lg:block">ULTRAGUARD</h1>
          <nav className="space-y-2">
            <Link to="/" className={linkClass("/")}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/devices" className={linkClass("/devices")}>
              <MapPin size={18} /> (GPS) Devices
            </Link>
            <Link to="/sites" className={linkClass("/sites")}>
              <Building2 size={18} /> Sites
            </Link>
            <Link to="/shifts" className={linkClass("/shifts")}>
              <Clock size={18} /> Shifts
            </Link>
            <Link to="/reports" className={linkClass("/reports")}>
              <FileText size={18} /> Reports
            </Link>
          </nav>
        </div>

        <div className="space-y-2 text-sm">
          <button className="flex items-center gap-2 hover:text-blue-400 w-full text-left">
            <UserPlus size={16} /> Add Account
          </button>
          <button className="flex items-center gap-2 hover:text-blue-400 w-full text-left">
            <SwitchCamera size={16} /> Switch Account
          </button>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full text-left">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
