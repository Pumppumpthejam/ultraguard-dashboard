import React from "react";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-gray-900 border-b border-gray-700 text-white">
      {/* Left: Mobile Menu Button + Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      {/* Right: Search + User Info */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-md text-sm w-48 bg-gray-800 text-white border border-gray-600 placeholder-gray-400"
        />
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
