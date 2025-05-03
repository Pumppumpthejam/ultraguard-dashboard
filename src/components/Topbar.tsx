import React from 'react';

const Topbar = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border rounded-md text-sm focus:outline-none"
        />
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/32"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
