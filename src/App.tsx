// App.tsx - Main route definitions with nested RequireAuth

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Reports from "./pages/Reports";
import Shifts from "./pages/Shifts";
import SitesOverview from "./pages/SitesOverview";
import SiteEdit from "./pages/SiteEdit";
import UploadCSV from "./pages/UploadCSV";
import Waypoints from "./pages/Waypoints";
import CreateClient from "./pages/CreateClient";
import AdminUploadDevices from "./pages/AdminUploadDevices";
import AdminPanel from "./pages/AdminPanel";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Navigate to="/" />} />

          <Route element={<RequireAuth allowedRoles={["admin", "client"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/sites" element={<SitesOverview />} />
            <Route path="/sites/:id" element={<SiteEdit />} />
            <Route path="/waypoints" element={<Waypoints />} />
            <Route path="/shifts" element={<Shifts />} />
            <Route path="/upload-csv" element={<UploadCSV />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/panel" element={<AdminPanel />} />
            <Route path="/admin/create-client" element={<CreateClient />} />
            <Route path="/admin/upload-devices" element={<AdminUploadDevices />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
// ✅ Main route definitions with nested RequireAuth