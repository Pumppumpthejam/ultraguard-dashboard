// src/pages/Dashboard.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  useAuth(); // ✅ Protects this route

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
      <p>Welcome to Ultraguard. Use the sidebar to start managing sites and patrol data.</p>
    </div>
  );
};

export default Dashboard;
