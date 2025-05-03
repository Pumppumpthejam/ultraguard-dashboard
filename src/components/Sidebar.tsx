import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold">ULTRAGUARD</div>
        <nav className="space-y-2 px-4">
          <a href="#" className="block px-4 py-2 rounded bg-blue-600">Dashboard</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">(GPS) Devices</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">Sites</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">Shifts</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">Reports</a>
        </nav>
      </div>
      <div className="space-y-2 px-4 py-6 border-t border-gray-700">
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">Add Account</a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">Switch Account</a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700 text-red-400">Log Out</a>
      </div>
    </aside>
  );
};

export default Sidebar;
