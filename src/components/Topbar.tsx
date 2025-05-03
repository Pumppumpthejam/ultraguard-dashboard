import React from "react";

const Topbar: React.FC = () => {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border rounded-md text-sm w-48"
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
